# v0.2.16
# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }

from genlayer import *


class CapOrFactMultiV2(gl.Contract):
    claim: str
    category: str
    source_url_1: str
    source_url_2: str
    source_url_3: str
    fetched_content: str
    verdict: str
    summary: str
    result_text: str
    has_fetched: bool
    has_judged: bool

    def __init__(self):
        self.claim = ""
        self.category = ""
        self.source_url_1 = ""
        self.source_url_2 = ""
        self.source_url_3 = ""
        self.fetched_content = ""
        self.verdict = "unjudged"
        self.summary = ""
        self.result_text = ""
        self.has_fetched = False
        self.has_judged = False

    @gl.public.write
    def set_case(
        self,
        claim: str,
        category: str,
        source_url_1: str,
        source_url_2: str,
        source_url_3: str,
    ) -> None:
        self.claim = claim
        self.category = category
        self.source_url_1 = source_url_1
        self.source_url_2 = source_url_2
        self.source_url_3 = source_url_3
        self.fetched_content = ""
        self.verdict = "unjudged"
        self.summary = ""
        self.result_text = ""
        self.has_fetched = False
        self.has_judged = False

    @gl.public.write
    def fetch_receipts(self) -> None:
        def fetch_all_receipts() -> str:
            combined = ""

            if self.source_url_1 != "":
                response_1 = gl.nondet.web.get(self.source_url_1)
                body_1 = response_1.body.decode("utf-8")
                combined += "\n\nSOURCE 1: " + self.source_url_1 + "\n" + body_1[:4000]

            if self.source_url_2 != "":
                response_2 = gl.nondet.web.get(self.source_url_2)
                body_2 = response_2.body.decode("utf-8")
                combined += "\n\nSOURCE 2: " + self.source_url_2 + "\n" + body_2[:4000]

            if self.source_url_3 != "":
                response_3 = gl.nondet.web.get(self.source_url_3)
                body_3 = response_3.body.decode("utf-8")
                combined += "\n\nSOURCE 3: " + self.source_url_3 + "\n" + body_3[:4000]

            return combined

        self.fetched_content = gl.eq_principle.strict_eq(fetch_all_receipts)
        self.has_fetched = True

    @gl.public.write
    def judge_with_ai(self) -> None:
        if not self.has_fetched:
            self.verdict = "UNCLEAR"
            self.summary = "No receipts have been fetched yet. Run fetch_receipts first."
            self.result_text = "verdict: " + self.verdict + " | summary: " + self.summary
            self.has_judged = True
            return

        claim = self.claim
        category = self.category
        source_text = self.fetched_content[:9000]

        def get_ai_verdict() -> str:
            prompt = f"""
You are Cap or Fact, an onchain claim court.

Use only the fetched source text to judge the claim.

Claim:
{claim}

Category:
{category}

Fetched source text:
{source_text}

Return exactly one word:
FACT
CAP
UNCLEAR

Rules:
- FACT means the sources clearly support the claim.
- CAP means the sources clearly contradict the claim.
- UNCLEAR means the sources are not enough to judge.
- Prefer official docs, official repos, and official announcements.
- Do not use outside knowledge.
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
        self.has_judged = True

    @gl.public.view
    def get_result(self) -> str:
        return self.result_text

    @gl.public.view
    def get_fetched_preview(self) -> str:
        return self.fetched_content[:900]
