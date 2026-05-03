from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from html import unescape
from urllib.parse import parse_qs, quote_plus, unquote, urlencode, urlparse
from urllib.request import Request, urlopen
import json
import os
import re


PORT = int(os.environ.get("PORT", "4173"))
APP_DIR = Path(__file__).resolve().parent / "app"


PROJECT_REGISTRY = [
    {
        "id": "base",
        "name": "Base",
        "aliases": ["base", "base chain", "coinbase l2"],
        "receipts": [
            {
                "title": "Base official docs",
                "url": "https://docs.base.org/",
                "type": "docs",
                "priority": 95,
            },
            {
                "title": "Base homepage",
                "url": "https://base.org/",
                "type": "official",
                "priority": 85,
            },
            {
                "title": "Base official blog",
                "url": "https://base.mirror.xyz/",
                "type": "blog",
                "priority": 75,
            },
        ],
    },
    {
        "id": "arbitrum",
        "name": "Arbitrum",
        "aliases": ["arbitrum", "arb", "arbitrum one", "arbitrum orbit"],
        "receipts": [
            {
                "title": "Arbitrum homepage",
                "url": "https://arbitrum.io/",
                "type": "official",
                "priority": 88,
            },
            {
                "title": "Arbitrum official docs",
                "url": "https://docs.arbitrum.io/",
                "type": "docs",
                "priority": 84,
            },
            {
                "title": "Arbitrum official blog",
                "url": "https://blog.arbitrum.io/",
                "type": "blog",
                "priority": 78,
            },
            {
                "title": "Arbitrum status",
                "url": "https://status.arbitrum.io/",
                "type": "status",
                "priority": 70,
            },
        ],
    },
    {
        "id": "polymarket",
        "name": "Polymarket",
        "aliases": ["polymarket", "poly market"],
        "receipts": [
            {
                "title": "Polymarket official docs",
                "url": "https://docs.polymarket.com/",
                "type": "docs",
                "priority": 95,
            },
            {
                "title": "Polymarket homepage",
                "url": "https://polymarket.com/",
                "type": "official",
                "priority": 85,
            },
            {
                "title": "Polymarket API reference",
                "url": "https://docs.polymarket.com/api-reference",
                "type": "docs",
                "priority": 80,
            },
        ],
    },
    {
        "id": "opensea",
        "name": "OpenSea",
        "aliases": ["opensea", "open sea"],
        "receipts": [
            {
                "title": "OpenSea developer docs",
                "url": "https://docs.opensea.io/",
                "type": "docs",
                "priority": 95,
            },
            {
                "title": "OpenSea blog",
                "url": "https://opensea.io/blog",
                "type": "blog",
                "priority": 80,
            },
            {
                "title": "OpenSea Learn",
                "url": "https://learn.opensea.io/",
                "type": "docs",
                "priority": 75,
            },
        ],
    },
    {
        "id": "genlayer",
        "name": "GenLayer",
        "aliases": ["genlayer", "gen layer"],
        "receipts": [
            {
                "title": "GenLayer official docs",
                "url": "https://docs.genlayer.com/",
                "type": "docs",
                "priority": 100,
            },
            {
                "title": "GenLayer homepage",
                "url": "https://www.genlayer.com/",
                "type": "official",
                "priority": 90,
            },
            {
                "title": "GenLayer FAQ",
                "url": "https://docs.genlayer.com/FAQ",
                "type": "docs",
                "priority": 75,
            },
        ],
    },
    {
        "id": "arc",
        "name": "Arc",
        "aliases": ["arc", "arc network", "circle arc"],
        "receipts": [
            {
                "title": "Arc official docs",
                "url": "https://docs.arc.network/",
                "type": "docs",
                "priority": 95,
            },
            {
                "title": "Arc homepage",
                "url": "https://www.arc.network/",
                "type": "official",
                "priority": 85,
            },
            {
                "title": "Arc status",
                "url": "https://status.arc.network/",
                "type": "official",
                "priority": 70,
            },
        ],
    },
    {
        "id": "sentient",
        "name": "Sentient",
        "aliases": ["sentient", "sentient agi", "sentient foundation"],
        "receipts": [
            {
                "title": "Sentient homepage",
                "url": "https://sentient.foundation/",
                "type": "official",
                "priority": 85,
            },
            {
                "title": "Sentient news",
                "url": "https://sentient.foundation/news",
                "type": "blog",
                "priority": 75,
            },
            {
                "title": "Sentient GitHub",
                "url": "https://github.com/sentient-agi",
                "type": "github",
                "priority": 65,
            },
        ],
    },
    {
        "id": "citrea",
        "name": "Citrea",
        "aliases": ["citrea"],
        "receipts": [
            {
                "title": "Citrea official GitHub README",
                "url": "https://raw.githubusercontent.com/chainwayxyz/citrea/nightly/README.md",
                "type": "github",
                "priority": 100,
            },
            {
                "title": "Citrea Mainnet announcement",
                "url": "https://www.blog.citrea.xyz/citrea-mainnet-is-live/",
                "type": "blog",
                "priority": 70,
            },
            {
                "title": "Citrea Foundation announcement",
                "url": "https://www.blog.citrea.xyz/citrea-introduces-the-citrea-foundation/",
                "type": "blog",
                "priority": 60,
            },
        ],
    },
    {
        "id": "monad",
        "name": "Monad",
        "aliases": ["monad"],
        "receipts": [
            {
                "title": "Monad official docs",
                "url": "https://docs.monad.xyz/",
                "type": "docs",
                "priority": 90,
            },
            {
                "title": "Monad official links",
                "url": "https://docs.monad.xyz/resources/official-links",
                "type": "docs",
                "priority": 80,
            },
            {
                "title": "Monad blog",
                "url": "https://blog.monad.xyz/",
                "type": "blog",
                "priority": 65,
            },
        ],
    },
    {
        "id": "megaeth",
        "name": "MegaETH",
        "aliases": ["megaeth", "mega eth", "mega"],
        "receipts": [
            {
                "title": "MegaETH token page",
                "url": "https://www.megaeth.com/token",
                "type": "official",
                "priority": 95,
            },
            {
                "title": "MegaETH docs",
                "url": "https://docs.megaeth.com/",
                "type": "docs",
                "priority": 80,
            },
        ],
    },
    {
        "id": "berachain",
        "name": "Berachain",
        "aliases": ["berachain", "bera"],
        "receipts": [
            {
                "title": "Berachain official docs",
                "url": "https://docs.berachain.com/",
                "type": "docs",
                "priority": 90,
            },
            {
                "title": "BERA token docs",
                "url": "https://docs.berachain.com/learn/guides/bera-staking",
                "type": "docs",
                "priority": 85,
            },
        ],
    },
    {
        "id": "initia",
        "name": "Initia",
        "aliases": ["initia", "init"],
        "receipts": [
            {
                "title": "Initia docs",
                "url": "https://docs.initia.xyz/",
                "type": "docs",
                "priority": 90,
            },
            {
                "title": "INIT tokenomics",
                "url": "https://docs.initia.xyz/home/core-concepts/init-token/tokenomics",
                "type": "docs",
                "priority": 85,
            },
        ],
    },
    {
        "id": "eclipse",
        "name": "Eclipse",
        "aliases": ["eclipse"],
        "receipts": [
            {
                "title": "Eclipse official docs",
                "url": "https://docs.eclipse.xyz/",
                "type": "docs",
                "priority": 95,
            },
            {
                "title": "Eclipse homepage",
                "url": "https://www.eclipse.xyz/",
                "type": "official",
                "priority": 85,
            },
            {
                "title": "Eclipse blog",
                "url": "https://www.eclipse.xyz/blog",
                "type": "blog",
                "priority": 75,
            },
        ],
    },
    {
        "id": "succinct",
        "name": "Succinct",
        "aliases": ["succinct"],
        "receipts": [
            {
                "title": "Succinct official docs",
                "url": "https://docs.succinct.xyz/",
                "type": "docs",
                "priority": 95,
            },
            {
                "title": "Succinct homepage",
                "url": "https://www.succinct.xyz/",
                "type": "official",
                "priority": 85,
            },
            {
                "title": "Succinct blog",
                "url": "https://blog.succinct.xyz/",
                "type": "blog",
                "priority": 75,
            },
        ],
    },
    {
        "id": "movement",
        "name": "Movement",
        "aliases": ["movement", "movement network"],
        "receipts": [
            {
                "title": "Movement official docs",
                "url": "https://docs.movementnetwork.xyz/",
                "type": "docs",
                "priority": 95,
            },
            {
                "title": "Movement homepage",
                "url": "https://www.movementnetwork.xyz/",
                "type": "official",
                "priority": 85,
            },
            {
                "title": "Movement blog",
                "url": "https://www.movementnetwork.xyz/blog",
                "type": "blog",
                "priority": 75,
            },
        ],
    },
    {
        "id": "espresso",
        "name": "Espresso",
        "aliases": ["espresso", "espresso systems"],
        "receipts": [
            {
                "title": "Espresso official docs",
                "url": "https://docs.espressosys.com/",
                "type": "docs",
                "priority": 95,
            },
            {
                "title": "Espresso homepage",
                "url": "https://www.espressosys.com/",
                "type": "official",
                "priority": 85,
            },
            {
                "title": "Espresso FAQ",
                "url": "https://www.espressosys.com/faq",
                "type": "official",
                "priority": 70,
            },
        ],
    },
    {
        "id": "camp",
        "name": "Camp Network",
        "aliases": ["camp", "camp network"],
        "receipts": [
            {
                "title": "Camp Network official docs",
                "url": "https://docs.campnetwork.xyz/",
                "type": "docs",
                "priority": 82,
            },
            {
                "title": "Camp Network homepage",
                "url": "https://www.campnetwork.xyz/",
                "type": "official",
                "priority": 100,
            },
            {
                "title": "Camp Network blog",
                "url": "https://www.campnetwork.xyz/blog",
                "type": "blog",
                "priority": 75,
            },
        ],
    },
    {
        "id": "story",
        "name": "Story Protocol",
        "aliases": ["story", "story protocol", "story foundation"],
        "receipts": [
            {
                "title": "Story official docs",
                "url": "https://docs.story.foundation/",
                "type": "docs",
                "priority": 95,
            },
            {
                "title": "Story homepage",
                "url": "https://www.story.foundation/",
                "type": "official",
                "priority": 85,
            },
            {
                "title": "Story quickstart",
                "url": "https://docs.story.foundation/quickstart",
                "type": "docs",
                "priority": 75,
            },
        ],
    },
    {
        "id": "hemi",
        "name": "Hemi",
        "aliases": ["hemi", "hemi network"],
        "receipts": [
            {
                "title": "Hemi official docs",
                "url": "https://docs.hemi.xyz/",
                "type": "docs",
                "priority": 95,
            },
            {
                "title": "Hemi homepage",
                "url": "https://hemi.xyz/",
                "type": "official",
                "priority": 85,
            },
            {
                "title": "Hemi getting started",
                "url": "https://docs.hemi.xyz/discover/getting-started",
                "type": "docs",
                "priority": 75,
            },
        ],
    },
    {
        "id": "botanix",
        "name": "Botanix",
        "aliases": ["botanix", "botanix labs"],
        "receipts": [
            {
                "title": "Botanix official docs",
                "url": "https://docs.botanixlabs.com/",
                "type": "docs",
                "priority": 95,
            },
            {
                "title": "Botanix homepage",
                "url": "https://botanixlabs.com/",
                "type": "official",
                "priority": 85,
            },
            {
                "title": "Botanix blog",
                "url": "https://botanixlabs.com/blog",
                "type": "blog",
                "priority": 75,
            },
        ],
    },
    {
        "id": "somnia",
        "name": "Somnia",
        "aliases": ["somnia", "somnia network"],
        "receipts": [
            {
                "title": "Somnia official docs",
                "url": "https://docs.somnia.network/",
                "type": "docs",
                "priority": 95,
            },
            {
                "title": "Somnia homepage",
                "url": "https://somnia.network/",
                "type": "official",
                "priority": 85,
            },
            {
                "title": "Somnia network info",
                "url": "https://docs.somnia.network/developer/network-info",
                "type": "docs",
                "priority": 75,
            },
        ],
    },
    {
        "id": "rialo",
        "name": "Rialo",
        "aliases": ["rialo"],
        "receipts": [
            {
                "title": "Rialo homepage",
                "url": "https://www.rialo.io/",
                "type": "official",
                "priority": 90,
            },
            {
                "title": "Rialo learn",
                "url": "https://www.rialo.io/learn",
                "type": "docs",
                "priority": 80,
            },
            {
                "title": "Rialo blog",
                "url": "https://www.rialo.io/blog",
                "type": "blog",
                "priority": 70,
            },
        ],
    },
    {
        "id": "seismic",
        "name": "Seismic",
        "aliases": ["seismic"],
        "receipts": [
            {
                "title": "Seismic official docs",
                "url": "https://docs.seismic.systems/",
                "type": "docs",
                "priority": 95,
            },
            {
                "title": "Seismic homepage",
                "url": "https://www.seismic.systems/",
                "type": "official",
                "priority": 85,
            },
            {
                "title": "Seismic overview",
                "url": "https://docs.seismic.systems/overview/how-seismic-works",
                "type": "docs",
                "priority": 75,
            },
        ],
    },
    {
        "id": "fluent",
        "name": "Fluent",
        "aliases": ["fluent"],
        "receipts": [
            {
                "title": "Fluent official docs",
                "url": "https://docs.fluent.xyz/",
                "type": "docs",
                "priority": 95,
            },
            {
                "title": "Fluent homepage",
                "url": "https://www.fluent.xyz/",
                "type": "official",
                "priority": 85,
            },
            {
                "title": "Fluent overview",
                "url": "https://docs.fluent.xyz/knowledge-base/fluent-overview/",
                "type": "docs",
                "priority": 75,
            },
        ],
    },
]


OFFICIAL_X_BY_PROJECT = {
    "base": "https://x.com/base",
    "arbitrum": "https://x.com/arbitrum",
    "polymarket": "https://x.com/Polymarket",
    "opensea": "https://x.com/opensea",
    "genlayer": "https://x.com/GenLayerFDN",
    "arc": "https://x.com/Arc",
    "sentient": "https://x.com/SentientAGI",
    "citrea": "https://x.com/citrea_xyz",
    "monad": "https://x.com/monad_xyz",
    "megaeth": "https://x.com/megaeth",
    "berachain": "https://x.com/berachain",
    "initia": "https://x.com/initia",
    "eclipse": "https://x.com/EclipseFND",
    "succinct": "https://x.com/SuccinctLabs",
    "movement": "https://x.com/movementfdn",
    "espresso": "https://x.com/EspressoSys",
    "camp": "https://x.com/campnetworkxyz",
    "story": "https://x.com/StoryProtocol",
    "hemi": "https://x.com/hemi_xyz",
    "botanix": "https://x.com/botanix",
    "somnia": "https://x.com/Somnia_Network",
    "rialo": "https://x.com/RialoHQ",
    "seismic": "https://x.com/SeismicSys",
    "fluent": "https://x.com/fluentxyz",
}


FOUNDER_X_BY_PROJECT = {
    "citrea": [
        {
            "name": "Orkun Kilic",
            "title": "Orkun founder X",
            "url": "https://x.com/0x_orkun",
            "aliases": ["orkun", "orkun kilic", "0x_orkun"],
        }
    ]
}


SOURCE_PROFILES = {
    "airdrop_rumor": {"x": 90, "blog": 75, "official": 38, "docs": 18, "github": 16},
    "snapshot_confirmation": {"x": 92, "blog": 72, "official": 45, "docs": 24, "github": 18},
    "token_info": {"official": 78, "docs": 68, "github": 48, "blog": 36, "x": 26},
    "exchange_listing": {"exchange": 92, "x": 75, "blog": 64, "official": 52, "docs": 24},
    "founder_statement": {"founder_x": 120, "x": 86, "blog": 58, "official": 48, "docs": 18},
    "partnership_claim": {"x": 84, "blog": 74, "official": 62, "docs": 24},
    "funding_raise": {"blog": 84, "newswire": 82, "x": 76, "official": 58, "docs": 22},
    "roadmap_check": {"docs": 72, "blog": 66, "official": 52, "x": 42, "github": 34},
    "grant_deadline": {"official": 70, "blog": 66, "docs": 60, "x": 42},
    "security_incident": {"status": 92, "x": 82, "blog": 78, "official": 54, "docs": 44, "github": 36},
    "protocol_metrics": {"dashboard": 95, "analytics": 90, "official": 72, "docs": 56, "blog": 46, "x": 24},
    "regulatory_claim": {"regulator": 95, "official": 68, "blog": 46, "docs": 40, "x": 28},
}


SOURCE_REASON_PROFILES = {
    "airdrop_rumor": {
        "x": "Official X is usually where airdrop and TGE signals appear first.",
        "blog": "Official blogs are strong for longer TGE or token announcements.",
        "official": "Official sites help confirm whether the project publicly supports the claim.",
        "docs": "Docs are useful backup, but usually slower for airdrop rumors.",
        "github": "GitHub is useful when the claim needs repo-level proof.",
    },
    "snapshot_confirmation": {
        "x": "Official X is prioritized because snapshot news is usually announced there first.",
        "blog": "Blog posts can confirm snapshot details with more context.",
        "official": "Official pages can confirm the current public snapshot status.",
        "docs": "Docs can support snapshot mechanics, but may not confirm timing.",
        "github": "GitHub is weaker here unless the snapshot is tied to published code or lists.",
    },
    "token_info": {
        "official": "Official token pages are strongest for live token claims.",
        "docs": "Docs are strong for tokenomics, staking, and native token details.",
        "github": "GitHub can support technical token details when docs point to code.",
        "blog": "Blogs help confirm launches or token updates with context.",
        "x": "Official X is useful for announcements, but weaker than docs for token structure.",
    },
    "exchange_listing": {
        "exchange": "Exchange pages are the strongest source for listing claims.",
        "x": "Official X can confirm listing announcements quickly.",
        "blog": "Blogs can confirm listing details after the announcement.",
        "official": "Official project pages can support listing claims when updated.",
        "docs": "Docs are usually secondary for listing claims.",
    },
    "founder_statement": {
        "founder_x": "Founder X is the strongest source for direct comments, replies, and quoted statements.",
        "x": "Founder and official X posts are strongest for direct statement claims.",
        "blog": "Blogs help when the quote appears in a formal announcement.",
        "official": "Official pages can confirm the team position.",
        "docs": "Docs are usually secondary for founder quotes.",
    },
    "partnership_claim": {
        "x": "Official X is strong when both sides announce the partnership publicly.",
        "blog": "Blogs are strong for detailed partnership announcements.",
        "official": "Official pages can confirm the relationship or integration.",
        "docs": "Docs are useful only when the partnership affects product setup.",
    },
    "funding_raise": {
        "blog": "Official blogs are strong for funding rounds and investor details.",
        "newswire": "Newswire sources help confirm formal raise announcements.",
        "x": "Official X can confirm the raise quickly, but usually needs backup.",
        "official": "Official pages can support the raise if the team posts it there.",
        "docs": "Docs are usually secondary for funding claims.",
    },
    "roadmap_check": {
        "docs": "Docs are strong for roadmap promises and product timelines.",
        "blog": "Blogs help verify milestone announcements and timeline changes.",
        "official": "Official pages can confirm current roadmap status.",
        "x": "Official X can confirm recent roadmap updates quickly.",
        "github": "GitHub helps when the roadmap depends on shipped code.",
    },
    "grant_deadline": {
        "official": "Official grant pages are strongest for deadlines and rules.",
        "blog": "Blogs can confirm grant calls and deadline updates.",
        "docs": "Docs help when the grant program is documented there.",
        "x": "Official X can flag deadline changes, but should be backed by a program page.",
    },
    "security_incident": {
        "status": "Status pages are strongest for incident timelines.",
        "x": "Official X is prioritized for urgent incident alerts.",
        "blog": "Blogs are strong for postmortems and incident summaries.",
        "official": "Official pages can confirm the project response.",
        "docs": "Docs are secondary unless the incident is documented there.",
        "github": "GitHub helps when the incident involves patched code.",
    },
    "protocol_metrics": {
        "dashboard": "Dashboards are strongest for TVL, revenue, fee, and volume claims.",
        "analytics": "Analytics pages are strong when they expose the underlying metric.",
        "official": "Official reports can confirm the metric and timeframe.",
        "docs": "Docs help define how the metric is calculated.",
        "blog": "Blogs can summarize metrics, but should link to data.",
        "x": "Official X is usually only a pointer for metrics claims.",
    },
    "regulatory_claim": {
        "regulator": "Regulator or court sources are strongest for legal claims.",
        "official": "Official project statements help confirm the team's position.",
        "blog": "Blogs can summarize regulatory updates with context.",
        "docs": "Docs are secondary unless compliance rules are published there.",
        "x": "Official X is useful for quick statements, but weaker than regulator sources.",
    },
}


CLAIM_TYPE_LABELS = {
    "airdrop_rumor": "Airdrop / TGE",
    "snapshot_confirmation": "Snapshot confirmation",
    "token_info": "Token / tokenomics",
    "exchange_listing": "Exchange listing",
    "founder_statement": "Founder statement",
    "partnership_claim": "Partnership claim",
    "funding_raise": "Funding / raise",
    "roadmap_check": "Roadmap check",
    "grant_deadline": "Grant deadline",
    "security_incident": "Security incident",
    "protocol_metrics": "Revenue / TVL",
    "regulatory_claim": "Regulatory claim",
}


def find_project(claim):
    lower_claim = claim.lower()
    for project in PROJECT_REGISTRY:
        if any(claim_includes_alias(lower_claim, alias) for alias in project["aliases"]):
            return project
    return None


def claim_includes_alias(lower_claim, alias):
    normalized_alias = alias.lower()

    if " " in normalized_alias:
        return normalized_alias in lower_claim

    return re.search(rf"\b{re.escape(normalized_alias)}\b", lower_claim) is not None


def find_project_by_id(project_id):
    normalized_project_id = str(project_id or "").lower()

    if not normalized_project_id or normalized_project_id == "auto":
        return None

    for project in PROJECT_REGISTRY:
        if (
            project["id"] == normalized_project_id
            or project["name"].lower() == normalized_project_id
            or normalized_project_id in project["aliases"]
        ):
            return project
    return None


def resolve_project(claim, project_id):
    return find_project_by_id(project_id) or find_project(claim)


def is_founder_claim(claim, category):
    return category == "founder_statement" or re.search(
        r"\b(founder|cofounder|co-founder|ceo|orkun|said|says|hinted|quote)\b",
        claim,
        re.I,
    ) is not None


def get_founder_receipts(project, claim, category):
    founders = FOUNDER_X_BY_PROJECT.get(project["id"], [])

    if not founders or not is_founder_claim(claim, category):
        return []

    lower_claim = claim.lower()
    matched_founders = [
        founder
        for founder in founders
        if any(alias.lower() in lower_claim for alias in founder["aliases"])
    ]
    selected_founders = matched_founders or founders

    return [
        {
            "title": founder["title"],
            "url": founder["url"],
            "type": "founder_x",
            "priority": 104,
            "reason": f"Founder claim detected. {founder['name']}'s X account is the primary place to verify direct comments or replies.",
        }
        for founder in selected_founders
    ]


def get_project_receipts(project, claim="", category=""):
    x_url = OFFICIAL_X_BY_PROJECT.get(project["id"])
    founder_receipts = get_founder_receipts(project, claim, category)

    if not x_url:
        return [*founder_receipts, *project["receipts"]]

    return [
        *founder_receipts,
        {
            "title": f"{project['name']} official X",
            "url": x_url,
            "type": "x",
            "priority": 92,
        },
        *project["receipts"],
    ]


def make_judge_standard(project, category):
    project_name = project["name"] if project else "the named project"
    standards = {
        "airdrop_rumor": f"Return FACT only if official {project_name} sources confirm the airdrop, snapshot, native token, or TGE claim. Return CAP if official {project_name} sources directly contradict it. Return UNCLEAR if the evidence is rumor-based, unofficial, stale, or indirect.",
        "snapshot_confirmation": f"Return FACT only if official {project_name} sources confirm the snapshot date, snapshot block, eligibility list, or snapshot completion. Return CAP if official sources directly contradict the snapshot claim. Return UNCLEAR if evidence is rumor-based, unofficial, incomplete, or only implies a future snapshot.",
        "token_info": f"Return FACT only if official {project_name} docs, blog, or token pages confirm the token, tokenomics, staking, or native-token claim. Return CAP if official sources directly contradict it. Return UNCLEAR if the source is incomplete, indirect, or unofficial.",
        "exchange_listing": f"Return FACT only if the exchange or official {project_name} sources published a listing announcement or live trading page for the named token. Return CAP if official sources contradict it. Return UNCLEAR if evidence is unofficial or incomplete.",
        "founder_statement": f"Return FACT only if a primary source from the founder or official {project_name} channels clearly supports the quoted claim. Return CAP if the primary source contradicts it. Return UNCLEAR if the quote is secondhand or lacks context.",
        "partnership_claim": f"Return FACT only if official {project_name} sources or the named partner's official sources confirm the partnership, integration, collaboration, or customer relationship. Return CAP if official sources deny or contradict it. Return UNCLEAR if only media summaries, rumors, or vague ecosystem mentions are available.",
        "funding_raise": f"Return FACT only if official {project_name} sources, named investor sources, or authoritative filing/newswire sources confirm the raise, round, investors, or amount. Return CAP if official sources contradict it. Return UNCLEAR if the claim depends on rumors, leaked decks, or unsourced reports.",
        "roadmap_check": f"Return FACT only if official {project_name} roadmap and announcement sources establish the deadline and whether it was missed. Return CAP if official sources show the deadline was met or changed. Return UNCLEAR if evidence is incomplete.",
        "grant_deadline": f"Return FACT only if official {project_name} grant or hackathon pages confirm the stated deadline. Return CAP if official sources contradict it. Return UNCLEAR if no official source is found.",
        "security_incident": f"Return FACT only if official {project_name} incident reports, status pages, security advisories, postmortems, or verified exploit records confirm the security incident. Return CAP if official sources contradict it. Return UNCLEAR if evidence is only social chatter, screenshots, or incomplete monitoring data.",
        "protocol_metrics": f"Return FACT only if official {project_name} dashboards, docs, reports, analytics pages, or linked data sources confirm the revenue, fees, volume, or TVL claim for the stated period. Return CAP if official or primary data contradicts it. Return UNCLEAR if the metric, timeframe, or source is ambiguous.",
        "regulatory_claim": f"Return FACT only if a regulator, court, government source, or official {project_name} source confirms the claim. Return CAP if official sources contradict it. Return UNCLEAR if only media summaries or rumors are available.",
    }
    return standards.get(category, standards["airdrop_rumor"])


def format_claim_type(category):
    return CLAIM_TYPE_LABELS.get(category, category)


def score_receipt(receipt, claim, category):
    haystack = f"{receipt['title']} {receipt['url']} {receipt['type']}".lower()
    lower_claim = claim.lower()
    profile = SOURCE_PROFILES.get(category, SOURCE_PROFILES["airdrop_rumor"])
    score = receipt.get("priority", 50)

    score += profile.get(receipt["type"], 0)

    if "official" in haystack:
        score += 4
    if "raw.githubusercontent.com" in haystack:
        score += 18 if category == "token_info" else 6
    if "blog" in haystack or "mirror.xyz" in haystack:
        score += 4
    if "twitter.com" in haystack or "x.com" in haystack:
        score += 8
    if receipt["type"] == "founder_x" and is_founder_claim(claim, category):
        score += 120

    if category == "airdrop_rumor":
        if "tge" in lower_claim or "airdrop" in lower_claim or "claim" in lower_claim:
            if receipt["type"] in ["x", "blog"]:
                score += 18
        if "token" in haystack:
            score += 10

    if category == "snapshot_confirmation":
        if "snapshot" in haystack or "airdrop" in haystack or "eligibility" in haystack:
            score += 18

    if category == "token_info":
        if "token" in haystack:
            score += 18
        if "staking" in haystack:
            score += 10
        if "tokenomics" in haystack:
            score += 14
        if "docs" in haystack:
            score += 8

    if category == "exchange_listing" and "listing" in haystack:
        score += 16
    if category == "founder_statement" and receipt["type"] == "founder_x":
        score += 26
    if category == "founder_statement" and ("founder" in haystack or receipt["type"] == "x"):
        score += 14
    if category == "partnership_claim" and ("partner" in haystack or "partnership" in haystack or "integration" in haystack):
        score += 16
    if category == "funding_raise" and (
        "funding" in haystack
        or "raise" in haystack
        or "investor" in haystack
        or "seed" in haystack
        or "series" in haystack
    ):
        score += 16
    if category == "roadmap_check" and ("roadmap" in haystack or "docs" in haystack or "blog" in haystack):
        score += 12
    if category == "grant_deadline" and ("grant" in haystack or "hackathon" in haystack or "program" in haystack):
        score += 16
    if category == "security_incident" and (
        "security" in haystack
        or "incident" in haystack
        or "exploit" in haystack
        or "postmortem" in haystack
        or "status" in haystack
    ):
        score += 18
    if category == "protocol_metrics" and (
        "revenue" in haystack
        or "tvl" in haystack
        or "fees" in haystack
        or "dashboard" in haystack
        or "analytics" in haystack
    ):
        score += 20
    if category == "regulatory_claim" and (
        "regulator" in haystack
        or "court" in haystack
        or "government" in haystack
        or "compliance" in haystack
    ):
        score += 18

    return score


def explain_receipt_choice(receipt, category):
    if receipt["type"] == "directory":
        return "CryptoRank helps discover and verify early-stage projects before checking official channels."
    if receipt["type"] == "search":
        return "This route helps find official sources for projects outside the current registry."

    profile = SOURCE_REASON_PROFILES.get(category, SOURCE_REASON_PROFILES["airdrop_rumor"])
    return profile.get(receipt["type"], "This official source is useful evidence for this claim type.")


def is_same_receipt(first, second):
    return bool(first and second and first["title"] == second["title"] and first["url"] == second["url"])


def can_genlayer_fetch_receipt(receipt):
    return bool(
        receipt
        and not receipt.get("discoveryOnly")
        and receipt["type"] not in ["founder_x", "x", "directory", "search"]
    )


def choose_genlayer_receipt(receipts):
    for receipt in receipts:
        if can_genlayer_fetch_receipt(receipt):
            return receipt
    for receipt in receipts:
        if receipt and not receipt.get("discoveryOnly") and receipt["type"] not in ["founder_x", "x", "search"]:
            return receipt
    return None


def make_scout_status(project, category, best_receipt, genlayer_receipt):
    if not best_receipt:
        return f"Found {project['name']}, but no official receipt is registered yet."

    if not genlayer_receipt or is_same_receipt(best_receipt, genlayer_receipt):
        return f"Picked {best_receipt['title']} as the strongest {format_claim_type(category).lower()} receipt."

    return f"Picked {best_receipt['title']} as the strongest signal. GenLayer will fetch {genlayer_receipt['title']}."


def scout_claim(claim, category, project_id="auto"):
    project = resolve_project(claim, project_id)

    if not claim.strip():
        return {
            "mode": "claim needed",
            "status": "Write a claim first, then the scout can look for official receipts.",
            "judgeStandard": make_judge_standard(None, category),
            "receipts": [],
            "sourceUrls": [],
            "genlayerSourceUrls": [],
            "bestReceipt": None,
            "genlayerReceipt": None,
            "projectId": "auto",
            "projectName": "",
        }

    if not project:
        return {
            "mode": "needs live search",
            "status": "Live search is not connected for this project yet. The next version will check official docs, blogs, social posts, exchanges, regulators, and credible news.",
            "judgeStandard": make_judge_standard(None, category),
            "receipts": [],
            "sourceUrls": [],
            "genlayerSourceUrls": [],
            "bestReceipt": None,
            "genlayerReceipt": None,
            "projectId": "auto",
            "projectName": "",
        }

    receipts = []
    for receipt in get_project_receipts(project, claim, category):
        scored_receipt = dict(receipt)
        scored_receipt["score"] = score_receipt(receipt, claim, category)
        scored_receipt["reason"] = receipt.get("reason") or explain_receipt_choice(receipt, category)
        receipts.append(scored_receipt)

    receipts.sort(key=lambda receipt: receipt["score"], reverse=True)
    best_receipt = receipts[0] if receipts else None
    genlayer_receipt = choose_genlayer_receipt(receipts)

    return {
        "mode": f"{project['name']} source scout",
        "status": make_scout_status(project, category, best_receipt, genlayer_receipt),
        "judgeStandard": make_judge_standard(project, category),
        "receipts": receipts,
        "sourceUrls": [receipt["url"] for receipt in receipts],
        "genlayerSourceUrls": [genlayer_receipt["url"]] if genlayer_receipt else [],
        "bestReceipt": best_receipt,
        "genlayerReceipt": genlayer_receipt,
        "projectId": project["id"],
        "projectName": project["name"],
    }


def clean_html_text(value):
    value = re.sub(r"<[^>]+>", "", value)
    return unescape(value).strip()


def resolve_duckduckgo_url(url):
    parsed = urlparse(unescape(url))
    query = parse_qs(parsed.query)
    if "uddg" in query:
        return query["uddg"][0]
    return unescape(url)


def fetch_text(url, timeout=5):
    request = Request(
        url,
        headers={
            "user-agent": "Mozilla/5.0 (compatible; CapOrFactSourceScout/1.0)",
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
    )
    with urlopen(request, timeout=timeout) as response:
        return response.read(350000).decode("utf-8", errors="ignore")


def search_web(query, limit=4):
    search_url = "https://duckduckgo.com/html/?" + urlencode({"q": query})

    try:
        html = fetch_text(search_url)
    except Exception:
        return []

    results = []
    pattern = re.compile(r'<a[^>]+class="result__a"[^>]+href="([^"]+)"[^>]*>(.*?)</a>', re.I | re.S)

    for url, title in pattern.findall(html):
        clean_url = resolve_duckduckgo_url(url)
        clean_title = clean_html_text(title)

        if clean_url and clean_title:
            results.append({"title": clean_title, "url": clean_url})

        if len(results) >= limit:
            break

    return results


def classify_discovered_url(url):
    lower_url = url.lower()

    if "x.com/" in lower_url or "twitter.com/" in lower_url:
        return "x"
    if "cryptorank.io" in lower_url:
        return "directory"
    if "github.com" in lower_url:
        return "github"
    if "docs." in lower_url or "/docs" in lower_url or "documentation" in lower_url:
        return "docs"
    if "blog." in lower_url or "/blog" in lower_url or "/news" in lower_url or "mirror.xyz" in lower_url or "medium.com" in lower_url:
        return "blog"
    return "official"


def classify_discovered_result(title, url, query, category):
    discovered_type = classify_discovered_url(url)
    haystack = f"{title or ''} {url or ''} {query or ''}".lower()

    if category == "founder_statement" and discovered_type == "x" and re.search(
        r"\b(founder|cofounder|co-founder|ceo|team|twitter|x account)\b",
        haystack,
    ):
        return "founder_x"

    return discovered_type


def make_discovered_receipt(title, url, source_type=None, priority=60, discovery_only=False):
    return {
        "title": title,
        "url": url,
        "type": source_type or classify_discovered_url(url),
        "priority": priority,
        "discoveryOnly": discovery_only,
    }


def add_discovered_receipt(receipts, seen_urls, title, url, source_type=None, priority=60, discovery_only=False):
    url = url.strip()
    normalized_url = url.rstrip("/").lower()

    if not url or normalized_url in seen_urls:
        return

    seen_urls.add(normalized_url)
    receipts.append(make_discovered_receipt(title, url, source_type, priority, discovery_only))


def discover_project_sources(claim, category, project_name):
    project_name = str(project_name or "").strip()
    receipts = []
    seen_urls = set()

    if not project_name:
        return {
            "mode": "live discovery",
            "status": "Name the project clearly so the scout can discover official sources.",
            "judgeStandard": make_judge_standard(None, category),
            "receipts": [],
            "sourceUrls": [],
            "genlayerSourceUrls": [],
            "bestReceipt": None,
            "genlayerReceipt": None,
            "projectId": "discovery",
            "projectName": "",
            "needsLiveDiscovery": True,
        }

    add_discovered_receipt(
        receipts,
        seen_urls,
        f"CryptoRank search for {project_name}",
        "https://cryptorank.io/search?query=" + quote_plus(project_name),
        "directory",
        82,
        True,
    )

    search_plan = [
        (f"{project_name} official website crypto", 74),
        (f"{project_name} official X crypto", 76),
        (f"{project_name} docs crypto", 68),
        (f"{project_name} blog news crypto", 66),
        (f"site:github.com {project_name} crypto", 62),
        (f"site:cryptorank.io {project_name}", 80),
    ]

    if category == "founder_statement":
        search_plan = [
            (f"{project_name} founder X account", 88),
            (f"{project_name} founder twitter", 84),
            *search_plan,
        ]

    for query, priority in search_plan:
        for result in search_web(query, limit=3):
            source_type = classify_discovered_result(result["title"], result["url"], query, category)
            title = result["title"] or f"{project_name} source"
            add_discovered_receipt(receipts, seen_urls, title, result["url"], source_type, priority)

    if len(receipts) == 1:
        add_discovered_receipt(
            receipts,
            seen_urls,
            f"Search official X for {project_name}",
            "https://x.com/search?q=" + quote_plus(project_name + " official"),
            "search",
            45,
            True,
        )
        if category == "founder_statement":
            add_discovered_receipt(
                receipts,
                seen_urls,
                f"Search founder X for {project_name}",
                "https://x.com/search?q=" + quote_plus(project_name + " founder"),
                "search",
                48,
                True,
            )
        add_discovered_receipt(
            receipts,
            seen_urls,
            f"Search GitHub for {project_name}",
            "https://github.com/search?q=" + quote_plus(project_name + " crypto"),
            "search",
            40,
            True,
        )

    scored_receipts = []
    for receipt in receipts:
        scored_receipt = dict(receipt)
        scored_receipt["score"] = score_receipt(receipt, claim, category)
        scored_receipt["reason"] = receipt.get("reason") or explain_receipt_choice(receipt, category)
        scored_receipts.append(scored_receipt)

    scored_receipts.sort(key=lambda receipt: receipt["score"], reverse=True)
    best_receipt = scored_receipts[0] if scored_receipts else None
    genlayer_receipt = choose_genlayer_receipt(scored_receipts)

    status = (
        f"Discovered source candidates for {project_name}. GenLayer will fetch {genlayer_receipt['title']}."
        if genlayer_receipt
        else f"Prepared discovery routes for {project_name}. Verify an official source before GenLayer judges."
    )

    return {
        "mode": f"{project_name} live discovery",
        "status": status,
        "judgeStandard": make_judge_standard({"name": project_name}, category),
        "receipts": scored_receipts,
        "sourceUrls": [receipt["url"] for receipt in scored_receipts],
        "genlayerSourceUrls": [genlayer_receipt["url"]] if genlayer_receipt else [],
        "bestReceipt": best_receipt,
        "genlayerReceipt": genlayer_receipt,
        "projectId": "discovered",
        "projectName": project_name,
        "needsLiveDiscovery": True,
    }


def send_json(handler, status_code, body):
    data = json.dumps(body, indent=2).encode("utf-8")
    handler.send_response(status_code)
    handler.send_header("content-type", "application/json; charset=utf-8")
    handler.send_header("cache-control", "no-store")
    handler.send_header("content-length", str(len(data)))
    handler.end_headers()
    handler.wfile.write(data)


def mime_type(file_path):
    extension = file_path.suffix.lower()
    return {
        ".css": "text/css; charset=utf-8",
        ".html": "text/html; charset=utf-8",
        ".js": "text/javascript; charset=utf-8",
        ".json": "application/json; charset=utf-8",
        ".png": "image/png",
        ".svg": "image/svg+xml",
    }.get(extension, "application/octet-stream")


class CapOrFactHandler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        return

    def do_GET(self):
        parsed = urlparse(self.path)

        if parsed.path == "/api/health":
            send_json(self, 200, {"ok": True, "service": "cap-or-fact-scout"})
            return

        requested_path = "/index.html" if parsed.path == "/" else parsed.path
        requested_path = unquote(requested_path).lstrip("/")
        file_path = (APP_DIR / requested_path).resolve()

        try:
            file_path.relative_to(APP_DIR.resolve())
        except ValueError:
            self.send_error(403)
            return

        if not file_path.exists() or not file_path.is_file():
            self.send_error(404)
            return

        data = file_path.read_bytes()
        self.send_response(200)
        self.send_header("content-type", mime_type(file_path))
        self.send_header("cache-control", "no-store")
        self.send_header("content-length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_POST(self):
        parsed = urlparse(self.path)

        if parsed.path not in ["/api/scout", "/api/discover"]:
            send_json(self, 404, {"ok": False, "error": "Not found"})
            return

        try:
            content_length = int(self.headers.get("content-length", "0"))
            raw_body = self.rfile.read(content_length).decode("utf-8")
            body = json.loads(raw_body) if raw_body else {}
            claim = str(body.get("claim", "")).strip()
            category = str(body.get("category", "airdrop_rumor"))

            if parsed.path == "/api/discover":
                project_name = str(body.get("projectName", "")).strip()
                research = discover_project_sources(claim, category, project_name)
                send_json(
                    self,
                    200,
                    {"ok": True, "claim": claim, "category": category, "projectName": project_name, "research": research},
                )
                return

            project = str(body.get("project", "auto"))
            research = scout_claim(claim, category, project)
            send_json(
                self,
                200,
                {"ok": True, "claim": claim, "category": category, "project": project, "research": research},
            )
        except Exception as error:
            send_json(self, 400, {"ok": False, "error": str(error)})


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", PORT), CapOrFactHandler)
    print(f"Cap or Fact running at http://localhost:{PORT}", flush=True)
    server.serve_forever()
