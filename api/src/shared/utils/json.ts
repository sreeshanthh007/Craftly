import { logger } from "./logger";

export const parseJSON = <T>(raw: string): T | null => {
  try {
    let cleaned = raw.replace(/```json\n?|```/g, '').trim();
    
    // 2. Extract content between first and last braces/brackets
    const firstBrace = cleaned.search(/[\{\[]/);
    const lastBrace = Math.max(cleaned.lastIndexOf('}'), cleaned.lastIndexOf(']'));
    
    if (firstBrace !== -1 && lastBrace !== -1) {
      cleaned = cleaned.substring(firstBrace, lastBrace + 1);
    }

    // 3. Try parsing as-is
    try {
      return JSON.parse(cleaned) as T;
    } catch {
      // 4. Handle common LLM JSON issues: trailing commas and control characters
      const sanitized = cleaned
        .replace(/,\s*([\}\]])/g, '$1') // Trailing commas
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, ""); // Control characters
      
      return JSON.parse(sanitized) as T;
    }
  } catch (error) {
    logger.error('JSON Parse Error:', error);
    logger.debug('Raw content was:', raw);
    return null;
  }
};
