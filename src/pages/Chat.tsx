import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Mic, MicOff, Square } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const suggestedQuestions = [
  "Explain mitosis vs meiosis",
  "What is Le Chatelier's principle?",
  "Newton's 3rd law with examples",
  "Difference between DNA & RNA",
];

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! 👋 I'm your **NEET Study Buddy**. Ask me any question about Biology, Chemistry, or Physics and I'll help you understand the concept!\n\nTry one of the suggestions below or type your own question.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const recognitionRef = useRef<any>(null);

  const startRecording = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Voice input not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = true;
    recognition.continuous = true;
    recognitionRef.current = recognition;

    let finalTranscript = "";

    recognition.onresult = (event: any) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interim = transcript;
        }
      }
      setInput(finalTranscript + interim);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      if (event.error !== "aborted") {
        toast.error("Voice recognition failed. Try again.");
      }
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
    setIsRecording(true);
  }, []);

  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsRecording(false);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    // Build conversation history (skip the welcome message)
    const history = newMessages
      .filter((m) => m.id !== "welcome")
      .map((m) => ({ role: m.role, content: m.content }));

    let assistantContent = "";
    const assistantId = (Date.now() + 1).toString();

    try {
      abortRef.current = new AbortController();
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: history }),
        signal: abortRef.current.signal,
      });

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData.error || `Request failed (${resp.status})`);
      }

      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant" && last.id === assistantId) {
                  return prev.map((m, i) =>
                    i === prev.length - 1 ? { ...m, content: assistantContent } : m
                  );
                }
                return [...prev, { id: assistantId, role: "assistant", content: assistantContent }];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Flush remaining buffer
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages((prev) =>
                prev.map((m, i) =>
                  i === prev.length - 1 && m.id === assistantId
                    ? { ...m, content: assistantContent }
                    : m
                )
              );
            }
          } catch {}
        }
      }

      if (!assistantContent) {
        setMessages((prev) => [
          ...prev,
          { id: assistantId, role: "assistant", content: "I couldn't generate a response. Please try again." },
        ]);
      }
    } catch (err: any) {
      if (err.name === "AbortError") return;
      console.error("Chat error:", err);
      toast.error(err.message || "Failed to get response");
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setIsTyping(false);
      abortRef.current = null;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 flex flex-col">
      {/* Header */}
      <div className="px-5 pt-12 pb-3 flex items-center gap-3 border-b border-border/50">
        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
          <Bot className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-base font-bold font-display text-foreground">NEET Study Buddy</h1>
          <p className="text-[10px] text-muted-foreground">AI-powered doubt solving</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                msg.role === "user" ? "gradient-accent" : "gradient-primary"
              }`}
            >
              {msg.role === "user" ? (
                <User className="w-3.5 h-3.5 text-accent-foreground" />
              ) : (
                <Bot className="w-3.5 h-3.5 text-primary-foreground" />
              )}
            </div>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "gradient-primary text-primary-foreground rounded-tr-sm"
                  : "bg-secondary text-secondary-foreground rounded-tl-sm"
              }`}
            >
              <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 prose-headings:my-1.5">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          </motion.div>
        ))}

        {isTyping && messages[messages.length - 1]?.role !== "assistant" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2.5">
            <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
              <Bot className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <div className="bg-secondary rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1">
              <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </motion.div>
        )}

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="px-3 py-2 bg-secondary rounded-xl text-xs font-medium text-secondary-foreground hover:bg-muted transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-5 pb-20 pt-2 border-t border-border/50">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Ask a NEET question..."
            className="flex-1 bg-secondary rounded-xl px-4 py-3 text-sm text-secondary-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center disabled:opacity-50 transition-opacity"
          >
            <Send className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
