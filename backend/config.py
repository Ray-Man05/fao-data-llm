import sys
import os
import tomllib
from pathlib import Path
from types import SimpleNamespace


def _namespace(d: dict) -> SimpleNamespace:
    ns = SimpleNamespace()
    for k, v in d.items():
        setattr(ns, k, _namespace(v) if isinstance(v, dict) else v)
    return ns


def _load() -> SimpleNamespace:
    path = Path(__file__).parent.parent / "config.toml"
    with open(path, "rb") as f:
        ns = _namespace(tomllib.load(f))

    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        raise RuntimeError("OPENROUTER_API_KEY environment variable is not set.")
    ns.llm.api_key = api_key

    return ns


settings = _load()
