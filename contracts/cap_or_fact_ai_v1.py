# v0.2.16
# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }

from genlayer import *


class CapOrFactAiV1(gl.Contract):
    claim: str
    category: str
    source_url: str
    fetched_content: str
    verdict: str
    confidence_bucket: str
    summary: str
    source_notes: str
    ai_response: str
    has_fetched: bool
    has_judged: bool

    def __init__(self):
        self.claim = ""
        self.category = ""
        self.source_url = ""
        self.fetched_content = ""
        self.verdict = "unjudged"
        self.confidence_bucket = "unknown"
        self.summary = ""
        self.source_notes = ""
        self.ai_response = ""
        self.has_fetched = False
        self.has_judged = False

    @gl.public.write
    def set_case(self, claim: str, category: str, source_url: str) -> None:
        self.claim = claim
        self.category = category
        self.source_url = source_url
        self.fetched_content = ""
        self.verdict = "unjudged"
        self.confidence_bucket = "unknown"
        self.summary = ""
        self.source_notes = ""
        self.ai_response = ""
        self.has_fetched = False
        self.has_judged = False

    @gl.public.write
    def fetch_receipt(self) -> None:
        def fetch_web_url_content() -> str:
            response = gl.nondet.web.get(self.source_url)
            return response.body.decode("utf-8")

        self.fetched_content = gl.eq_principle.strict_eq(fetch_web_url_content)
        self.has_fetched = True

    @gl.public.write
    def judge_with_ai(self) -> None:
        if not self.has_fetched:
            self.verdict = "UNCLEAR"
            self.confidence_bucket = "low"
            self.summary = "No receipt has been fetched yet. Run fetch_receipt first."
            self.source_notes = "Missing fetched source content."
            self.has_judged = True
            return

        claim = self.claim
        category = self.category
        source_url = self.source_url
        source_text = self.fetched_content[:9000]

        def ai_judge():
            prompt = f"""
You are Cap or Fact, an onchain claim court for crypto claims.

Judge the claim using only the fetched source text.

Claim:
{claim}

Category:
{category}

Source URL:
{source_url}

Fetched source text:
{source_text}

Return JSON with exactly these keys:
{{
  "verdict": "FACT" | "CAP" | "UNCLEAR",
  "confidence_bucket": "low" | "medium" | "high",
  "summary": "1-3 short sentences explaining the verdict from the source",
  "source_notes": "short note about source quality or gaps"
}}

Rules:
- FACT means the source clearly supports the claim.
- CAP means the source clearly contradicts the claim.
- UNCLEAR means the source is missing, indirect, noisy, incomplete, or not enough to judge.
- Do not use outside knowledge.
- Do not invent facts.
"""
            result = gl.nondet.exec_prompt(prompt, response_format="json")
            if not isinstance(result, dict):
                raise gl.UserError("AI returned a non-JSON result.")

            verdict = str(result.get("verdict", "")).strip().upper()
            confidence = str(result.get("confidence_bucket", "")).strip().lower()
            summary = str(result.get("summary", "")).strip()
            source_notes = str(result.get("source_notes", "")).strip()

            if verdict not in ["FACT", "CAP", "UNCLEAR"]:
                raise gl.UserError("AI returned an invalid verdict.")

            if confidence not in ["low", "medium", "high"]:
                confidence = "low"

            if summary == "":
                summary = "The AI judge returned a verdict without a summary."

            if source_notes == "":
                source_notes = "No source notes returned."

            return {
                "verdict": verdict,
                "confidence_bucket": confidence,
                "summary": summary,
                "source_notes": source_notes,
            }

        def validate_ai_judge(leader_result) -> bool:
            if not isinstance(leader_result, gl.vm.Return):
                return False

            leader_data = leader_result.calldata
            if not isinstance(leader_data, dict):
                return False

            verdict = leader_data.get("verdict", "")
            confidence = leader_data.get("confidence_bucket", "")
            summary = leader_data.get("summary", "")

            return (
                verdict in ["FACT", "CAP", "UNCLEAR"]
                and confidence in ["low", "medium", "high"]
                and isinstance(summary, str)
                and len(summary) > 0
            )

        result = gl.vm.run_nondet_unsafe(ai_judge, validate_ai_judge)

        self.verdict = result["verdict"]
        self.confidence_bucket = result["confidence_bucket"]
        self.summary = result["summary"]
        self.source_notes = result["source_notes"]
        self.ai_response = (
            "verdict: " + self.verdict + "\n"
            + "confidence: " + self.confidence_bucket + "\n"
            + "summary: " + self.summary + "\n"
            + "source_notes: " + self.source_notes
        )
        self.has_judged = True

    @gl.public.view
    def get_case(self) -> str:
        preview = self.fetched_content[:900]

        return (
            "claim: " + self.claim + "\n"
            + "category: " + self.category + "\n"
            + "source_url: " + self.source_url + "\n"
            + "has_fetched: " + str(self.has_fetched) + "\n"
            + "has_judged: " + str(self.has_judged) + "\n"
            + "verdict: " + self.verdict + "\n"
            + "confidence: " + self.confidence_bucket + "\n"
            + "summary: " + self.summary + "\n"
            + "source_notes: " + self.source_notes + "\n"
            + "ai_response: " + self.ai_response + "\n"
            + "fetched_preview: " + preview
        )
