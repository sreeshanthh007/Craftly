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
    } catch (e) {
      // 4. Handle common LLM JSON issues: trailing commas, control characters, and bad escapes
      let sanitized = cleaned
        .replace(/,\s*([\}\]])/g, '$1') // Trailing commas
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, ""); // Control characters

      // 5. Attempt to fix common backslash issues in file contents
      // This is risky but often necessary for LLMs outputting paths or regex
      // We look for backslashes that are NOT followed by a valid JSON escape char
      sanitized = sanitized.replace(/\\(?![bfnrtu"\/])/g, "\\\\");

      try {
        return JSON.parse(sanitized) as T;
      } catch (innerError) {
        logger.error('JSON Parse failed after sanitization:', innerError);
        throw innerError; // Rethrow to show the error in logs with the "Raw content"
      }
    }
  } catch (error) {
    logger.error('JSON Parse Error:', error);
    logger.debug('Raw content was:', raw);
    return null;
  }
};
