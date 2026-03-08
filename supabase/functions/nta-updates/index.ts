const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  link: string;
  source: string;
}

function extractCDATA(text: string): string {
  const match = text.match(/<!\[CDATA\[(.*?)\]\]>/s);
  return match ? match[1].trim() : text.trim();
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
}

function parseRSSItems(xml: string): NewsItem[] {
  const items: NewsItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];

    const titleMatch = itemXml.match(/<title>([\s\S]*?)<\/title>/);
    const linkMatch = itemXml.match(/<link>([\s\S]*?)<\/link>/);
    const pubDateMatch = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
    const descMatch = itemXml.match(/<description>([\s\S]*?)<\/description>/);
    const sourceMatch = itemXml.match(/<source[^>]*>([\s\S]*?)<\/source>/);

    const rawTitle = titleMatch ? extractCDATA(titleMatch[1]) : '';
    const title = stripHtml(rawTitle);
    const link = linkMatch ? linkMatch[1].trim() : '';
    const date = pubDateMatch ? pubDateMatch[1].trim() : '';
    const rawDesc = descMatch ? extractCDATA(descMatch[1]) : '';
    const summary = stripHtml(rawDesc).slice(0, 300);
    const source = sourceMatch ? stripHtml(extractCDATA(sourceMatch[1])) : '';

    if (title) {
      items.push({
        id: crypto.randomUUID(),
        title,
        summary: summary || title,
        date: date ? new Date(date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        link,
        source,
      });
    }
  }

  return items;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Fetch from Google News RSS for NTA NEET queries
    const queries = [
      'NTA+NEET+2026',
      'NEET+exam+update+India',
    ];

    const allItems: NewsItem[] = [];

    for (const query of queries) {
      const rssUrl = `https://news.google.com/rss/search?q=${query}&hl=en-IN&gl=IN&ceid=IN:en`;
      
      const response = await fetch(rssUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; NewsBot/1.0)',
        },
      });

      if (!response.ok) {
        console.error(`RSS fetch failed for "${query}": ${response.status}`);
        continue;
      }

      const xml = await response.text();
      const items = parseRSSItems(xml);
      allItems.push(...items);
    }

    // Deduplicate by title similarity
    const seen = new Set<string>();
    const unique = allItems.filter((item) => {
      const key = item.title.toLowerCase().slice(0, 50);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    // Sort by date descending, limit to 20
    unique.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const result = unique.slice(0, 20);

    return new Response(JSON.stringify({ success: true, data: result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching NTA updates:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Failed to fetch updates' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
