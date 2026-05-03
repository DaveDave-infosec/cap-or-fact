# v0.2.16
# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }

from genlayer import *

import json
import typing


class CapOrFact(gl.Contract):
    claim: str
    category: str
    judge_standard: str
    source_urls_text: str
    has_judged: bool
    verdict: str
    confidence_bucket: str
    receipts_summary: str
    source_notes: str
    share_card: str

    def __init__(self):
        self.claim = ""
        self.category = ""
        self.judge_standard = ""
        self.source_urls_text = ""
        self.has_judged = False
        self.verdict = "unjudged"
        self.confidence_bucket = "unknown"
        self.receipts_summary = ""
        self.source_notes = ""
        self.share_card = ""

    @gl.public.write
    def set_case(
        self,
        claim: str,
        category: str,
        judge_standard: str,
        source_urls_text: str,
    ) -> None:
        self.claim = claim
        self.category = category
        self.judge_standard = judge_standard
        self.source_urls_text = source_urls_text
        self.has_judged = False
        self.verdict = "unjudged"
        self.confidence_bucket = "unknown"
        self.receipts_summary = ""
        self.source_notes = ""
        self.share_card = ""

    @gl.public.view
    def get_case(self) -> typing.Any:
        return {
            "claim": self.claim,
            "category": self.category,
            "judge_standard": self.judge_standard,
            "source_urls": self.source_urls_text,
            "has_judged": self.has_judged,
            "verdict": self.verdict,
            "confidence_bucket": self.confidence_bucket,
            "receipts_summary": self.receipts_summary,
            "source_notes": self.source_notes,
            "share_card": self.share_card,
        }

    @gl.public.write
    def judge(self) -> typing.Any:
        if self.has_judged:
            return self.get_case()

        claim = self.claim
        category = self.category
        judge_standard = self.judge_standard
        source_urls = [
            url.strip()
            for url in self.source_urls_text.splitlines()
            if url.strip()
        ]

        def leader_fn() -> typing.Any:
            source_bundle = ""

            for url in source_urls:
                response = gl.nondet.web.get(url)
                body = response.body.decode("utf-8")
                source_bundle += f"\n\nSOURCE URL: {url}\nSOURCE TEXT:\n{body[:6000]}"

            prompt = f"""
You are judging whether an internet claim is true for a GenLayer Intelligent Contract.

Claim:
{claim}

Category:
{category}

Judge standard:
{judge_standard}

Source material:
{source_bundle}

Return only valid JSON with this exact schema:
{{
  "verdict": "FACT" | "CAP" | "UNCLEAR",
  "confidence_bucket": "low" | "medium" | "high",
  "receipts_summary": "2-4 short sentences explaining the verdict using the provided sources",
  "source_notes": "short note about source quality, gaps, or disagreement",
  "share_card": "one punchy sentence suitable for a social feed"
}}

Rules:
- FACT means the sources clearly support the claim.
- CAP means the sources clearly contradict the claim or show it is false.
- UNCLEAR means the evidence is missing, weak, indirect, stale, or conflicting.
- Prefer official sources over reposts, quote tweets, rumors, and summaries.
- Do not invent facts.
- Do not include markdown, comments, or extra text outside the JSON.
"""

            result = gl.nondet.exec_prompt(prompt)
            cleaned = result.replace("```json", "").replace("```", "").strip()
            return json.loads(cleaned)

        def validator_fn(leader_result) -> bool:
            if not isinstance(leader_result, gl.vm.Return):
                return False

            validator_data = leader_fn()
            leader_data = leader_result.calldata

            return (
                leader_data["verdict"] == validator_data["verdict"]
                and leader_data["confidence_bucket"] == validator_data["confidence_bucket"]
            )

        result = gl.vm.run_nondet_unsafe(leader_fn, validator_fn)

        self.verdict = result["verdict"]
        self.confidence_bucket = result["confidence_bucket"]
        self.receipts_summary = result["receipts_summary"]
        self.source_notes = result["source_notes"]
        self.share_card = result["share_card"]
        self.has_judged = True

        return self.get_case()
