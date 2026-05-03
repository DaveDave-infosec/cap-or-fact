# v0.2.16
# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }

from genlayer import *


class CapOrFactAiSimpleV1(gl.Contract):
    claim: str
    category: str
    source_url: str
    fetched_content: str
    verdict: str
    summary: str
    result_text: str
    has_fetched: bool
    has_judged: bool

    def __init__(self):
        self.claim = ""
        self.category = ""
        self.source_url = ""
        self.fetched_content = ""
        self.verdict = "unjudged"
        self.summary = ""
        self.result_text = ""
        self.has_fetched = False
        self.has_judged = False

    @gl.public.write
    def set_case(self, claim: str, category: str, source_url: str) -> None:
        self.claim = claim
        self.category = category
        self.source_url = source_url
        self.fetched_content = ""
        self.verdict = "unjudged"
        self.summary = ""
        self.result_text = ""
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
            self.summary = "No receipt has been fetched yet. Run fetch_receipt first."
            self.result_text = "verdict: " + self.verdict + " | summary: " + self.summary
            self.has_judged = True
            return

        claim = self.claim
        category = self.category
        source_text = self.fetched_content[:7000]

        def get_ai_verdict() -> str:
            prompt = f"""
You are Cap or Fact, an onchain claim court.

Use only the source text to judge the claim.

Claim:
{claim}

Category:
{category}

Source text:
{source_text}

Return exactly one word:
FACT
CAP
UNCLEAR

Rules:
- FACT means the source clearly supports the claim.
- CAP means the source clearly contradicts the claim.
- UNCLEAR means the source is not enough to judge.
- Do not explain.
- Do not include punctuation.
"""
            result = gl.nondet.exec_prompt(prompt)
            verdict = result.strip().upper()

            if "FACT" in verdict and "CAP" not in verdict:
                return "FACT"
            if "CAP" in verdict:
                return "CAP"
            return "UNCLEAR"

        self.verdict = gl.eq_principle.strict_eq(get_ai_verdict)

        if self.verdict == "CAP":
            self.summary = "AI verdict: the fetched source contradicts the claim."
        elif self.verdict == "FACT":
            self.summary = "AI verdict: the fetched source supports the claim."
        else:
            self.summary = "AI verdict: the fetched source is not enough to judge the claim."

        self.result_text = "verdict: " + self.verdict + " | summary: " + self.summary
        self.has_judged = True

    @gl.public.view
    def get_result(self) -> str:
        return self.result_text
