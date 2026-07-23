/**
 * Model & Gateway configuration
 */
const DEFAULT_MODEL = '@makers/deepseek-v4-flash';
export function resolveModelName(env?: Record<string, string | undefined>): string {
  return env?.AI_GATEWAY_MODEL || DEFAULT_MODEL;
}
/**
 * Map EdgeOne AI Gateway env vars to the names the Claude Agent SDK expects.
 * For OpenAI-compatible APIs (like Agnes AI), use OPENAI_ prefixed vars.
 * Returns a Record to be merged into query() options.env — does NOT mutate process.env.
 */
export function collectGatewayEnv(env: Record<string, string | undefined>): Record<string, string> {
  const result: Record<string, string> = {};
  // Try Anthropic protocol first (default behavior)
  if (env.AI_GATEWAY_BASE_URL) result.ANTHROPIC_BASE_URL = env.AI_GATEWAY_BASE_URL;
  if (env.AI_GATEWAY_API_KEY) result.ANTHROPIC_API_KEY = env.AI_GATEWAY_API_KEY;
  // Also support OpenAI-compatible protocol (for Agnes AI, etc.)
  if (env.AI_GATEWAY_BASE_URL) result.OPENAI_BASE_URL = env.AI_GATEWAY_BASE_URL;
  if (env.AI_GATEWAY_API_KEY) result.OPENAI_API_KEY = env.AI_GATEWAY_API_KEY;
  if (env.ANTHROPIC_CUSTOM_HEADERS) result.ANTHROPIC_CUSTOM_HEADERS = env.ANTHROPIC_CUSTOM_HEADERS;
  return result;
}
