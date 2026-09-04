# Free and Low-Cost LLM Options Guide

## Purpose

Interns should learn LLM integration without depending on expensive enterprise platforms.

Always verify current provider limits/pricing before use.

## Recommended Options

| Option | Best For | Notes |
|---|---|---|
| Mock LLM | Always available, no key required | Must be supported in every project |
| Ollama local | Local/free model execution | Requires machine resources |
| Google Gemini API free tier | Low-cost/free API learning | Verify current free limits |
| Groq API | Fast hosted inference with rate limits | Verify current limits in account |
| Hugging Face Inference Providers | Serverless access to many models | Verify model/provider availability |
| OpenRouter / similar gateway | Optional low-cost model routing | Verify terms and keys |

## Recommended Intern Strategy

| Priority | Provider |
|---|---|
| 1 | Mock mode first |
| 2 | Ollama local if laptop supports it |
| 3 | Gemini free tier if API key available |
| 4 | Groq/Hugging Face if accessible |
| 5 | Paid provider only if mentor approves |

## Provider Abstraction

Use one adapter:

```text
LLMAdapter
  → MockLLMProvider
  → OllamaProvider
  → GeminiProvider
  → GroqProvider
  → HuggingFaceProvider
```

## Environment Variables

| Variable | Example |
|---|---|
| `LLM_ENABLED` | `true` / `false` |
| `LLM_PROVIDER` | `mock`, `ollama`, `gemini`, `groq`, `huggingface` |
| `LLM_MODEL` | provider/model name |
| `LLM_API_KEY` | only for hosted providers |
| `LLM_BASE_URL` | local or provider base URL |
| `LLM_MAX_TOKENS` | token cap |
| `LLM_TIMEOUT_SECONDS` | timeout |
| `LLM_TEMPERATURE` | recommended low value |

## Provider Selection Rule

For internship:

```text
Start with mock.
Add one free/low-cost real provider if possible.
Never make paid provider mandatory.
```

## Reference Links

- Gemini API pricing and free tier: https://ai.google.dev/gemini-api/docs/pricing
- Gemini API rate limits: https://ai.google.dev/gemini-api/docs/rate-limits
- Groq rate limits: https://console.groq.com/docs/rate-limits
- Groq API reference: https://console.groq.com/docs/api-reference
- Ollama: https://ollama.com/
- Hugging Face Inference Providers: https://huggingface.co/docs/inference-providers/index
