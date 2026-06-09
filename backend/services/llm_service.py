import httpx
from models.schemas import ParsedData
from config import settings


def _build_prompt(data: ParsedData, lang: str) -> str:
    header = ", ".join(data.columns)
    rows_preview = "\n".join(
        ", ".join(str(row[col]) for col in data.columns) for row in data.rows[:100]
    )
    prompt_config = getattr(settings.prompt, lang)
    return prompt_config.template.format(
        columns=header,
        data_rows=rows_preview,
    )


async def analyze(data: ParsedData, lang: str = "en") -> str:
    if not hasattr(settings.prompt, lang):
        raise ValueError(f"Unsupported language: {lang}")

    prompt = _build_prompt(data, lang)
    prompt_config = getattr(settings.prompt, lang)

    headers = {
        "Authorization": f"Bearer {settings.llm.api_key}",
        "Content-Type": "application/json",
    }

    payload = {
        "model": settings.llm.model,
        "max_tokens": settings.llm.max_tokens,
        "messages": [
            {"role": "system", "content": prompt_config.system},
            {"role": "user", "content": prompt},
        ],
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{settings.llm.base_url}/chat/completions",
            headers=headers,
            json=payload,
            timeout=60.0,
        )

    if response.status_code != 200:
        raise RuntimeError(
            f"LLM request failed ({response.status_code}): {response.text}"
        )

    return response.json()["choices"][0]["message"]["content"]
