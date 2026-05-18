import type { MetadataRoute } from 'next'

const SITE_URL = 'https://www.mymechanicqld.com.au'

/**
 * robots.txt.
 *
 * Default rule allows all general-purpose web crawlers.
 *
 * Explicit AI/LLM crawler allows. Some site owners block these to prevent
 * model training on their content; we do the opposite. We want to be
 * discovered, indexed and cited by ChatGPT, Claude, Perplexity, Gemini,
 * Bing Copilot and Apple Intelligence search. Being explicit signals intent
 * and removes any ambiguity from those crawlers' default-deny logic.
 *
 * `/llms.txt` is referenced via the sitemap convention and the file lives
 * at the project root in `public/llms.txt`.
 */
export default function robots(): MetadataRoute.Robots {
  const disallow = ['/api/', '/_next/']
  const aiCrawlers = [
    'GPTBot',            // OpenAI - ChatGPT training + search
    'ChatGPT-User',      // OpenAI - ChatGPT user-initiated browsing
    'OAI-SearchBot',     // OpenAI - SearchGPT
    'ClaudeBot',         // Anthropic - Claude crawler
    'anthropic-ai',      // Anthropic - legacy name still in use
    'Claude-Web',        // Anthropic - Claude web tool
    'PerplexityBot',     // Perplexity AI
    'Perplexity-User',   // Perplexity user-initiated
    'Google-Extended',   // Google - Bard/Gemini opt-in
    'Applebot-Extended', // Apple - Apple Intelligence opt-in
    'Bytespider',        // ByteDance - TikTok/Doubao
    'Amazonbot',         // Amazon - Alexa
    'YouBot',            // You.com
    'cohere-ai',         // Cohere
  ]

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow,
      },
      ...aiCrawlers.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
