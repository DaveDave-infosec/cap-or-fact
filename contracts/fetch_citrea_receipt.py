# v0.2.16
# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }

from genlayer import *


class FetchCitreaReceipt(gl.Contract):
    content: str

    def __init__(self):
        self.content = ""

    @gl.public.write
    def fetch_citrea_docs(self) -> None:
        def fetch_web_url_content() -> str:
            response = gl.nondet.web.get("https://docs.citrea.xyz/essentials/readme")
            return response.body.decode("utf-8")

        self.content = gl.eq_principle.strict_eq(fetch_web_url_content)

    @gl.public.view
    def show_content(self) -> str:
        return self.content
