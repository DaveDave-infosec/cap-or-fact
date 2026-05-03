# v0.2.16
# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }

from genlayer import *


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
    fetched_preview: str

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
        self.fetched_preview = ""

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
        self.fetched_preview = ""

    @gl.public.view
    def get_case(self) -> str:
        return (
            "claim: " + self.claim + "\n"
            + "category: " + self.category + "\n"
            + "has_judged: " + str(self.has_judged) + "\n"
            + "verdict: " + self.verdict + "\n"
            + "confidence: " + self.confidence_bucket + "\n"
            + "summary: " + self.receipts_summary + "\n"
            + "source_notes: " + self.source_notes + "\n"
            + "share_card: " + self.share_card + "\n"
            + "fetched_preview: " + self.fetched_preview
        )

    @gl.public.write
    def fetch_first_receipt(self) -> None:
        if self.source_urls_text == "":
            self.fetched_preview = "No URL found in source_urls_text."
            return

        def fetch_receipt() -> str:
            response = gl.nondet.web.get(self.source_urls_text)
            body = response.body.decode("utf-8")
            return body[:1200]

        self.fetched_preview = gl.eq_principle.strict_eq(fetch_receipt)

    @gl.public.write
    def judge(self) -> None:
        if self.has_judged:
            return

        lower_claim = self.claim.lower()
        lower_sources = (self.source_urls_text + "\n" + self.fetched_preview).lower()

        if "citrea" in lower_claim and "no citrea token" in lower_sources:
            self.verdict = "CAP"
            self.confidence_bucket = "medium"
            self.receipts_summary = "Prepared demo verdict: official Citrea receipt text says there is no Citrea token."
            self.source_notes = "This version fetches one receipt URL, but AI judging is not enabled yet."
            self.share_card = "CAP: Citrea TGE claim needs official confirmation."
        else:
            self.verdict = "UNCLEAR"
            self.confidence_bucket = "low"
            self.receipts_summary = "The Studio-safe version needs stronger receipt text before it can stamp FACT or CAP."
            self.source_notes = "This is the web-fetch test contract. AI judging comes after this works cleanly."
            self.share_card = "UNCLEAR: more official receipts needed."

        self.has_judged = True
