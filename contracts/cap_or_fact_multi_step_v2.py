# v0.2.16
# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }

from genlayer import *


class CapOrFactMultiStepV2(gl.Contract):
    claim: str
    category: str
    source_url_1: str
    source_url_2: str
    source_url_3: str
    source_1_text: str
    source_2_text: str
    source_3_text: str
    verdict: str
    summary: str
    result_text: str

    def __init__(self):
        self.claim = ""
        self.category = ""
        self.source_url_1 = ""
        self.source_url_2 = ""
        self.source_url_3 = ""
        self.source_1_text = ""
        self.source_2_text = ""
        self.source_3_text = ""
        self.verdict = "unjudged"
        self.summary = ""
        self.result_text = ""

    @gl.public.write
    def set_case(self, claim: str, category: str, source_url_1: str, source_url_2: str, source_url_3: str) -> None:
        self.claim = claim
        self.category = category
        self.source_url_1 = source_url_1
        self.source_url_2 = source_url_2
        self.source_url_3 = source_url_3
        self.source_1_text = ""
        self.source_2_text = ""
        self.source_3_text = ""
        self.verdict = "unjudged"
        self.summary = ""
        self.result_text = ""

    @gl.public.write
    def fetch_source_1(self) -> None:
        def fetch_web_url_content() -> str:
            response = gl.nondet.web.get(self.source_url_1)
            return response.body.decode("utf-8")

        self.source_1_text = gl.eq_principle.strict_eq(fetch_web_url_content)

    @gl.public.write
    def fetch_source_2(self) -> None:
        def fetch_web_url_content() -> str:
            response = gl.nondet.web.get(self.source_url_2)
            return response.body.decode("utf-8")

        self.source_2_text = gl.eq_principle.strict_eq(fetch_web_url_content)

    @gl.public.write
    def fetch_source_3(self) -> None:
        def fetch_web_url_content() -> str:
            response = gl.nondet.web.get(self.source_url_3)
            return response.body.decode("utf-8")

        self.source_3_text = gl.eq_principle.strict_eq(fetch_web_url_content)

    @gl.public.write
    def judge_with_ai(self) -> None:
        claim = self.claim
        category = self.category
        source_text = (
            "SOURCE 1:\n" + self.source_1_text[:3000]
            + "\n\nSOURCE 2:\n" + self.source_2_text[:2500]
            + "\n\nSOURCE 3:\n" + self.source_3_text[:2500]
        )

        def get_ai_verdict() -> str:
            prompt = f"""
You are Cap or Fact, an onchain claim court.

Use only the fetched source text to judge the claim.

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
- FACT means the sources clearly support the claim.
- CAP means the sources clearly contradict the claim.
- UNCLEAR means the sources are not enough to judge.
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
            self.summary = "AI verdict: the fetched receipts contradict the claim."
        elif self.verdict == "FACT":
            self.summary = "AI verdict: the fetched receipts support the claim."
        else:
            self.summary = "AI verdict: the fetched receipts are not enough to judge the claim."

        self.result_text = "verdict: " + self.verdict + " | summary: " + self.summary

    @gl.public.view
    def get_result(self) -> str:
        return self.result_text
