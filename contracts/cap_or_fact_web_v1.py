# v0.2.16
# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }

from genlayer import *


class CapOrFactWebV1(gl.Contract):
    claim: str
    category: str
    source_url: str
    fetched_content: str
    verdict: str
    summary: str
    has_fetched: bool
    has_judged: bool

    def __init__(self):
        self.claim = ""
        self.category = ""
        self.source_url = ""
        self.fetched_content = ""
        self.verdict = "unjudged"
        self.summary = ""
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
    def judge(self) -> None:
        if not self.has_fetched:
            self.verdict = "UNCLEAR"
            self.summary = "No receipt has been fetched yet. Run fetch_receipt first."
            self.has_judged = True
            return

        claim_text = self.claim.lower()
        receipt_text = self.fetched_content.lower()

        if "citrea" in claim_text and "no citrea token" in receipt_text:
            self.verdict = "CAP"
            self.summary = "The fetched official Citrea docs include text saying there is no Citrea token."
        elif "tge" in claim_text and "token generation event" in receipt_text:
            self.verdict = "FACT"
            self.summary = "The fetched receipt mentions a token generation event."
        else:
            self.verdict = "UNCLEAR"
            self.summary = "The fetched receipt did not clearly prove or disprove the claim with this simple keyword judge."

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
            + "summary: " + self.summary + "\n"
            + "fetched_preview: " + preview
        )
