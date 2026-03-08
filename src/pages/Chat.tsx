import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User } from "lucide-react";
import BottomNav from "@/components/BottomNav";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulated AI response (replace with real LLM integration via Lovable Cloud)
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Great question about "${text}"! 🧠\n\nTo get real AI-powered answers, connect **Lovable Cloud** to enable the AI Study Buddy with Gemini/GPT integration.\n\nThis will allow me to:\n- Answer detailed NEET questions\n- Explain concepts step by step\n- Provide practice problems\n- Help with doubt clearing`,
      };
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 1500);
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
              {msg.content.split("\n").map((line, i) => (
                <p key={i} className={i > 0 ? "mt-1.5" : ""}>
                  {line.split(/(\*\*.*?\*\*)/).map((part, j) =>
                    part.startsWith("**") && part.endsWith("**") ? (
                      <strong key={j}>{part.slice(2, -2)}</strong>
                    ) : (
                      part
                    )
                  )}
                </p>
              ))}
            </div>
          </motion.div>
        ))}

        {isTyping && (
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
            disabled={!input.trim()}
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
