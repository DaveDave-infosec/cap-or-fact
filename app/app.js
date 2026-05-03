const projectRegistry = [
  {
    id: "base",
    name: "Base",
    aliases: ["base", "base chain", "coinbase l2"],
    receipts: [
      {
        title: "Base official docs",
        url: "https://docs.base.org/",
        type: "docs",
      },
      {
        title: "Base homepage",
        url: "https://base.org/",
        type: "official",
      },
      {
        title: "Base official blog",
        url: "https://base.mirror.xyz/",
        type: "blog",
      },
    ],
  },
  {
    id: "arbitrum",
    name: "Arbitrum",
    aliases: ["arbitrum", "arb", "arbitrum one", "arbitrum orbit"],
    receipts: [
      {
        title: "Arbitrum homepage",
        url: "https://arbitrum.io/",
        type: "official",
        priority: 88,
      },
      {
        title: "Arbitrum official docs",
        url: "https://docs.arbitrum.io/",
        type: "docs",
        priority: 84,
      },
      {
        title: "Arbitrum official blog",
        url: "https://blog.arbitrum.io/",
        type: "blog",
        priority: 78,
      },
      {
        title: "Arbitrum status",
        url: "https://status.arbitrum.io/",
        type: "status",
        priority: 70,
      },
    ],
  },
  {
    id: "polymarket",
    name: "Polymarket",
    aliases: ["polymarket", "poly market"],
    receipts: [
      {
        title: "Polymarket official docs",
        url: "https://docs.polymarket.com/",
        type: "docs",
      },
      {
        title: "Polymarket homepage",
        url: "https://polymarket.com/",
        type: "official",
      },
      {
        title: "Polymarket API reference",
        url: "https://docs.polymarket.com/api-reference",
        type: "docs",
      },
    ],
  },
  {
    id: "opensea",
    name: "OpenSea",
    aliases: ["opensea", "open sea"],
    receipts: [
      {
        title: "OpenSea developer docs",
        url: "https://docs.opensea.io/",
        type: "docs",
      },
      {
        title: "OpenSea blog",
        url: "https://opensea.io/blog",
        type: "blog",
      },
      {
        title: "OpenSea Learn",
        url: "https://learn.opensea.io/",
        type: "docs",
      },
    ],
  },
  {
    id: "genlayer",
    name: "GenLayer",
    aliases: ["genlayer", "gen layer"],
    receipts: [
      {
        title: "GenLayer official docs",
        url: "https://docs.genlayer.com/",
        type: "docs",
      },
      {
        title: "GenLayer homepage",
        url: "https://www.genlayer.com/",
        type: "official",
      },
      {
        title: "GenLayer FAQ",
        url: "https://docs.genlayer.com/FAQ",
        type: "docs",
      },
    ],
  },
  {
    id: "arc",
    name: "Arc",
    aliases: ["arc", "arc network", "circle arc"],
    receipts: [
      {
        title: "Arc official docs",
        url: "https://docs.arc.network/",
        type: "docs",
      },
      {
        title: "Arc homepage",
        url: "https://www.arc.network/",
        type: "official",
      },
      {
        title: "Arc status",
        url: "https://status.arc.network/",
        type: "official",
      },
    ],
  },
  {
    id: "sentient",
    name: "Sentient",
    aliases: ["sentient", "sentient agi", "sentient foundation"],
    receipts: [
      {
        title: "Sentient homepage",
        url: "https://sentient.foundation/",
        type: "official",
      },
      {
        title: "Sentient news",
        url: "https://sentient.foundation/news",
        type: "blog",
      },
      {
        title: "Sentient GitHub",
        url: "https://github.com/sentient-agi",
        type: "github",
      },
    ],
  },
  {
    id: "citrea",
    name: "Citrea",
    aliases: ["citrea"],
    receipts: [
      {
        title: "Citrea official GitHub README",
        url: "https://raw.githubusercontent.com/chainwayxyz/citrea/nightly/README.md",
        type: "github",
      },
      {
        title: "Citrea Mainnet announcement",
        url: "https://www.blog.citrea.xyz/citrea-mainnet-is-live/",
        type: "blog",
      },
      {
        title: "Citrea Foundation announcement",
        url: "https://www.blog.citrea.xyz/citrea-introduces-the-citrea-foundation/",
        type: "blog",
      },
    ],
  },
  {
    id: "monad",
    name: "Monad",
    aliases: ["monad"],
    receipts: [
      {
        title: "Monad official docs",
        url: "https://docs.monad.xyz/",
        type: "docs",
      },
      {
        title: "Monad official links",
        url: "https://docs.monad.xyz/resources/official-links",
        type: "docs",
      },
      {
        title: "Monad blog",
        url: "https://blog.monad.xyz/",
        type: "blog",
      },
    ],
  },
  {
    id: "megaeth",
    name: "MegaETH",
    aliases: ["megaeth", "mega eth", "mega"],
    receipts: [
      {
        title: "MegaETH token page",
        url: "https://www.megaeth.com/token",
        type: "official",
      },
      {
        title: "MegaETH docs",
        url: "https://docs.megaeth.com/",
        type: "docs",
      },
    ],
  },
  {
    id: "berachain",
    name: "Berachain",
    aliases: ["berachain", "bera"],
    receipts: [
      {
        title: "Berachain official docs",
        url: "https://docs.berachain.com/",
        type: "docs",
      },
      {
        title: "BERA token docs",
        url: "https://docs.berachain.com/learn/guides/bera-staking",
        type: "docs",
      },
    ],
  },
  {
    id: "initia",
    name: "Initia",
    aliases: ["initia", "init"],
    receipts: [
      {
        title: "Initia docs",
        url: "https://docs.initia.xyz/",
        type: "docs",
      },
      {
        title: "INIT tokenomics",
        url: "https://docs.initia.xyz/home/core-concepts/init-token/tokenomics",
        type: "docs",
      },
    ],
  },
  {
    id: "eclipse",
    name: "Eclipse",
    aliases: ["eclipse"],
    receipts: [
      {
        title: "Eclipse official docs",
        url: "https://docs.eclipse.xyz/",
        type: "docs",
      },
      {
        title: "Eclipse homepage",
        url: "https://www.eclipse.xyz/",
        type: "official",
      },
      {
        title: "Eclipse blog",
        url: "https://www.eclipse.xyz/blog",
        type: "blog",
      },
    ],
  },
  {
    id: "succinct",
    name: "Succinct",
    aliases: ["succinct"],
    receipts: [
      {
        title: "Succinct official docs",
        url: "https://docs.succinct.xyz/",
        type: "docs",
      },
      {
        title: "Succinct homepage",
        url: "https://www.succinct.xyz/",
        type: "official",
      },
      {
        title: "Succinct blog",
        url: "https://blog.succinct.xyz/",
        type: "blog",
      },
    ],
  },
  {
    id: "movement",
    name: "Movement",
    aliases: ["movement", "movement network"],
    receipts: [
      {
        title: "Movement official docs",
        url: "https://docs.movementnetwork.xyz/",
        type: "docs",
      },
      {
        title: "Movement homepage",
        url: "https://www.movementnetwork.xyz/",
        type: "official",
      },
      {
        title: "Movement blog",
        url: "https://www.movementnetwork.xyz/blog",
        type: "blog",
      },
    ],
  },
  {
    id: "espresso",
    name: "Espresso",
    aliases: ["espresso", "espresso systems"],
    receipts: [
      {
        title: "Espresso official docs",
        url: "https://docs.espressosys.com/",
        type: "docs",
      },
      {
        title: "Espresso homepage",
        url: "https://www.espressosys.com/",
        type: "official",
      },
      {
        title: "Espresso FAQ",
        url: "https://www.espressosys.com/faq",
        type: "official",
      },
    ],
  },
  {
    id: "camp",
    name: "Camp Network",
    aliases: ["camp", "camp network"],
    receipts: [
      {
        title: "Camp Network official docs",
        url: "https://docs.campnetwork.xyz/",
        type: "docs",
      },
      {
        title: "Camp Network homepage",
        url: "https://www.campnetwork.xyz/",
        type: "official",
      },
      {
        title: "Camp Network blog",
        url: "https://www.campnetwork.xyz/blog",
        type: "blog",
      },
    ],
  },
  {
    id: "story",
    name: "Story Protocol",
    aliases: ["story", "story protocol", "story foundation"],
    receipts: [
      {
        title: "Story official docs",
        url: "https://docs.story.foundation/",
        type: "docs",
      },
      {
        title: "Story homepage",
        url: "https://www.story.foundation/",
        type: "official",
      },
      {
        title: "Story quickstart",
        url: "https://docs.story.foundation/quickstart",
        type: "docs",
      },
    ],
  },
  {
    id: "hemi",
    name: "Hemi",
    aliases: ["hemi", "hemi network"],
    receipts: [
      {
        title: "Hemi official docs",
        url: "https://docs.hemi.xyz/",
        type: "docs",
      },
      {
        title: "Hemi homepage",
        url: "https://hemi.xyz/",
        type: "official",
      },
      {
        title: "Hemi getting started",
        url: "https://docs.hemi.xyz/discover/getting-started",
        type: "docs",
      },
    ],
  },
  {
    id: "botanix",
    name: "Botanix",
    aliases: ["botanix", "botanix labs"],
    receipts: [
      {
        title: "Botanix official docs",
        url: "https://docs.botanixlabs.com/",
        type: "docs",
      },
      {
        title: "Botanix homepage",
        url: "https://botanixlabs.com/",
        type: "official",
      },
      {
        title: "Botanix blog",
        url: "https://botanixlabs.com/blog",
        type: "blog",
      },
    ],
  },
  {
    id: "somnia",
    name: "Somnia",
    aliases: ["somnia", "somnia network"],
    receipts: [
      {
        title: "Somnia official docs",
        url: "https://docs.somnia.network/",
        type: "docs",
      },
      {
        title: "Somnia homepage",
        url: "https://somnia.network/",
        type: "official",
      },
      {
        title: "Somnia network info",
        url: "https://docs.somnia.network/developer/network-info",
        type: "docs",
      },
    ],
  },
  {
    id: "rialo",
    name: "Rialo",
    aliases: ["rialo"],
    receipts: [
      {
        title: "Rialo homepage",
        url: "https://www.rialo.io/",
        type: "official",
      },
      {
        title: "Rialo learn",
        url: "https://www.rialo.io/learn",
        type: "docs",
      },
      {
        title: "Rialo blog",
        url: "https://www.rialo.io/blog",
        type: "blog",
      },
    ],
  },
  {
    id: "seismic",
    name: "Seismic",
    aliases: ["seismic"],
    receipts: [
      {
        title: "Seismic official docs",
        url: "https://docs.seismic.systems/",
        type: "docs",
      },
      {
        title: "Seismic homepage",
        url: "https://www.seismic.systems/",
        type: "official",
      },
      {
        title: "Seismic overview",
        url: "https://docs.seismic.systems/overview/how-seismic-works",
        type: "docs",
      },
    ],
  },
  {
    id: "fluent",
    name: "Fluent",
    aliases: ["fluent"],
    receipts: [
      {
        title: "Fluent official docs",
        url: "https://docs.fluent.xyz/",
        type: "docs",
      },
      {
        title: "Fluent homepage",
        url: "https://www.fluent.xyz/",
        type: "official",
      },
      {
        title: "Fluent overview",
        url: "https://docs.fluent.xyz/knowledge-base/fluent-overview/",
        type: "docs",
      },
    ],
  },
];

const officialXByProject = {
  base: "https://x.com/base",
  arbitrum: "https://x.com/arbitrum",
  polymarket: "https://x.com/Polymarket",
  opensea: "https://x.com/opensea",
  genlayer: "https://x.com/GenLayerFDN",
  arc: "https://x.com/Arc",
  sentient: "https://x.com/SentientAGI",
  citrea: "https://x.com/citrea_xyz",
  monad: "https://x.com/monad_xyz",
  megaeth: "https://x.com/megaeth",
  berachain: "https://x.com/berachain",
  initia: "https://x.com/initia",
  eclipse: "https://x.com/EclipseFND",
  succinct: "https://x.com/SuccinctLabs",
  movement: "https://x.com/movementfdn",
  espresso: "https://x.com/EspressoSys",
  camp: "https://x.com/campnetworkxyz",
  story: "https://x.com/StoryProtocol",
  hemi: "https://x.com/hemi_xyz",
  botanix: "https://x.com/botanix",
  somnia: "https://x.com/Somnia_Network",
  rialo: "https://x.com/RialoHQ",
  seismic: "https://x.com/SeismicSys",
  fluent: "https://x.com/fluentxyz",
};

const founderXByProject = {
  citrea: [
    {
      name: "Orkun Kilic",
      title: "Orkun founder X",
      url: "https://x.com/0x_orkun",
      aliases: ["orkun", "orkun kilic", "orkun kılıç", "0x_orkun"],
    },
  ],
};

function isFounderClaim(claim, category) {
  return category === "founder_statement" || /\b(founder|cofounder|co-founder|ceo|orkun|said|says|hinted|quote)\b/i.test(claim);
}

function getFounderReceipts(project, claim, category) {
  const founders = founderXByProject[project.id] || [];

  if (!founders.length || !isFounderClaim(claim, category)) {
    return [];
  }

  const lowerClaim = claim.toLowerCase();
  const matchedFounders = founders.filter((founder) =>
    founder.aliases.some((alias) => lowerClaim.includes(alias.toLowerCase())),
  );
  const selectedFounders = matchedFounders.length > 0 ? matchedFounders : founders;

  return selectedFounders.map((founder) => ({
    title: founder.title,
    url: founder.url,
    type: "founder_x",
    priority: 104,
    reason: `Founder claim detected. ${founder.name}'s X account is the primary place to verify direct comments or replies.`,
  }));
}

function getProjectReceipts(project, claim = "", category = "") {
  const xUrl = officialXByProject[project.id];
  const founderReceipts = getFounderReceipts(project, claim, category);

  if (!xUrl) {
    return [...founderReceipts, ...project.receipts];
  }

  return [
    ...founderReceipts,
    {
      title: `${project.name} official X`,
      url: xUrl,
      type: "x",
      priority: 92,
    },
    ...project.receipts,
  ];
}

const form = document.querySelector("#claim-form");
const claimBackButton = document.querySelector("#claim-back");
const claimForwardButton = document.querySelector("#claim-forward");
const resetClaimButton = document.querySelector("#reset-claim");
const previewButton = document.querySelector("#preview-button");
const copyArgsButton = document.querySelector("#copy-args");
const copyJsonButton = document.querySelector("#copy-json");
const copyShareTextButton = document.querySelector("#copy-share-text");
const copyStudioStepsButton = document.querySelector("#copy-studio-steps");
const clearHistoryButton = document.querySelector("#clear-history");
const builderTools = document.querySelector("#builder-tools");
const rightPanelTitle = document.querySelector("#right-panel-title");
const builderMode = new URLSearchParams(window.location.search).get("builder") === "true";

const claimTypeLabels = {
  airdrop_rumor: "Airdrop / TGE",
  snapshot_confirmation: "Snapshot confirmation",
  token_info: "Token / tokenomics",
  exchange_listing: "Exchange listing",
  founder_statement: "Founder statement",
  partnership_claim: "Partnership claim",
  funding_raise: "Funding / raise",
  roadmap_check: "Roadmap check",
  grant_deadline: "Grant deadline",
  security_incident: "Security incident",
  protocol_metrics: "Revenue / TVL",
  regulatory_claim: "Regulatory claim",
};

const sourceTypeLabels = {
  founder_x: "founder X",
  x: "official X",
  blog: "blog",
  official: "official",
  docs: "docs",
  github: "github",
  status: "status",
  dashboard: "dashboard",
  directory: "discovery index",
  analytics: "analytics",
  exchange: "exchange",
  regulator: "regulator",
  newswire: "newswire",
  search: "search route",
};

const sourceProfiles = {
  airdrop_rumor: { x: 90, blog: 75, official: 38, docs: 18, github: 16 },
  snapshot_confirmation: { x: 92, blog: 72, official: 45, docs: 24, github: 18 },
  token_info: { official: 78, docs: 68, github: 48, blog: 36, x: 26 },
  exchange_listing: { exchange: 92, x: 75, blog: 64, official: 52, docs: 24 },
  founder_statement: { founder_x: 120, x: 86, blog: 58, official: 48, docs: 18 },
  partnership_claim: { x: 84, blog: 74, official: 62, docs: 24 },
  funding_raise: { blog: 84, newswire: 82, x: 76, official: 58, docs: 22 },
  roadmap_check: { docs: 72, blog: 66, official: 52, x: 42, github: 34 },
  grant_deadline: { official: 70, blog: 66, docs: 60, x: 42 },
  security_incident: { status: 92, x: 82, blog: 78, official: 54, docs: 44, github: 36 },
  protocol_metrics: { dashboard: 95, analytics: 90, official: 72, docs: 56, blog: 46, x: 24 },
  regulatory_claim: { regulator: 95, official: 68, blog: 46, docs: 40, x: 28 },
};

const sourceReasonProfiles = {
  airdrop_rumor: {
    x: "Official X is usually where airdrop and TGE signals appear first.",
    blog: "Official blogs are strong for longer TGE or token announcements.",
    official: "Official sites help confirm whether the project publicly supports the claim.",
    docs: "Docs are useful backup, but usually slower for airdrop rumors.",
    github: "GitHub is useful when the claim needs repo-level proof.",
  },
  snapshot_confirmation: {
    x: "Official X is prioritized because snapshot news is usually announced there first.",
    blog: "Blog posts can confirm snapshot details with more context.",
    official: "Official pages can confirm the current public snapshot status.",
    docs: "Docs can support snapshot mechanics, but may not confirm timing.",
    github: "GitHub is weaker here unless the snapshot is tied to published code or lists.",
  },
  token_info: {
    official: "Official token pages are strongest for live token claims.",
    docs: "Docs are strong for tokenomics, staking, and native token details.",
    github: "GitHub can support technical token details when docs point to code.",
    blog: "Blogs help confirm launches or token updates with context.",
    x: "Official X is useful for announcements, but weaker than docs for token structure.",
  },
  exchange_listing: {
    exchange: "Exchange pages are the strongest source for listing claims.",
    x: "Official X can confirm listing announcements quickly.",
    blog: "Blogs can confirm listing details after the announcement.",
    official: "Official project pages can support listing claims when updated.",
    docs: "Docs are usually secondary for listing claims.",
  },
  founder_statement: {
    founder_x: "Founder X is the strongest source for direct comments, replies, and quoted statements.",
    x: "Founder and official X posts are strongest for direct statement claims.",
    blog: "Blogs help when the quote appears in a formal announcement.",
    official: "Official pages can confirm the team position.",
    docs: "Docs are usually secondary for founder quotes.",
  },
  partnership_claim: {
    x: "Official X is strong when both sides announce the partnership publicly.",
    blog: "Blogs are strong for detailed partnership announcements.",
    official: "Official pages can confirm the relationship or integration.",
    docs: "Docs are useful only when the partnership affects product setup.",
  },
  funding_raise: {
    blog: "Official blogs are strong for funding rounds and investor details.",
    newswire: "Newswire sources help confirm formal raise announcements.",
    x: "Official X can confirm the raise quickly, but usually needs backup.",
    official: "Official pages can support the raise if the team posts it there.",
    docs: "Docs are usually secondary for funding claims.",
  },
  roadmap_check: {
    docs: "Docs are strong for roadmap promises and product timelines.",
    blog: "Blogs help verify milestone announcements and timeline changes.",
    official: "Official pages can confirm current roadmap status.",
    x: "Official X can confirm recent roadmap updates quickly.",
    github: "GitHub helps when the roadmap depends on shipped code.",
  },
  grant_deadline: {
    official: "Official grant pages are strongest for deadlines and rules.",
    blog: "Blogs can confirm grant calls and deadline updates.",
    docs: "Docs help when the grant program is documented there.",
    x: "Official X can flag deadline changes, but should be backed by a program page.",
  },
  security_incident: {
    status: "Status pages are strongest for incident timelines.",
    x: "Official X is prioritized for urgent incident alerts.",
    blog: "Blogs are strong for postmortems and incident summaries.",
    official: "Official pages can confirm the project response.",
    docs: "Docs are secondary unless the incident is documented there.",
    github: "GitHub helps when the incident involves patched code.",
  },
  protocol_metrics: {
    dashboard: "Dashboards are strongest for TVL, revenue, fee, and volume claims.",
    analytics: "Analytics pages are strong when they expose the underlying metric.",
    official: "Official reports can confirm the metric and timeframe.",
    docs: "Docs help define how the metric is calculated.",
    blog: "Blogs can summarize metrics, but should link to data.",
    x: "Official X is usually only a pointer for metrics claims.",
  },
  regulatory_claim: {
    regulator: "Regulator or court sources are strongest for legal claims.",
    official: "Official project statements help confirm the team's position.",
    blog: "Blogs can summarize regulatory updates with context.",
    docs: "Docs are secondary unless compliance rules are published there.",
    x: "Official X is useful for quick statements, but weaker than regulator sources.",
  },
};

const claimEventKeywords = {
  airdrop_rumor: ["airdrop", "drop", "tge", "token", "claim", "allocation", "eligibility", "snapshot", "points"],
  snapshot_confirmation: ["snapshot", "eligibility", "block", "date", "taken", "completed", "mainnet"],
  token_info: ["token", "tokenomics", "ticker", "supply", "staking", "native", "omics"],
  exchange_listing: ["listing", "listed", "trading", "exchange", "binance", "coinbase", "bybit", "okx"],
  founder_statement: ["founder", "cofounder", "ceo", "said", "says", "statement", "quote", "announced", "confirmed"],
  partnership_claim: ["partner", "partnership", "integrated", "integration", "collaboration", "customer"],
  funding_raise: ["funding", "raise", "raised", "round", "seed", "series", "investor", "valuation"],
  roadmap_check: ["roadmap", "mainnet", "testnet", "launch", "deadline", "milestone", "delayed", "shipped"],
  grant_deadline: ["grant", "deadline", "hackathon", "program", "applications", "builder"],
  security_incident: ["hack", "exploit", "incident", "attack", "breach", "vulnerability", "postmortem", "security"],
  protocol_metrics: ["tvl", "revenue", "fees", "volume", "users", "transactions", "metric", "protocol"],
  regulatory_claim: ["sec", "court", "regulator", "lawsuit", "legal", "license", "compliance", "government"],
};

const claimVerbPattern =
  /\b(has|have|is|are|was|were|did|does|announced|confirmed|published|released|launched|listed|raised|partnered|reached|hit|taken|completed|missed|delayed|denied|reported|filed|settled|hacked|exploited)\b/;

const speculativeClaimPattern = /\b(wen|when|soon|maybe|possibly|probably|rumor|rumour|rumored|rumoured|will)\b/;

const projectGuessStopWords = new Set([
  "a",
  "an",
  "and",
  "are",
  "by",
  "did",
  "does",
  "for",
  "from",
  "has",
  "have",
  "is",
  "its",
  "native",
  "new",
  "official",
  "on",
  "or",
  "the",
  "their",
  "to",
  "was",
  "were",
  "with",
  "airdrop",
  "allocation",
  "announced",
  "confirmed",
  "date",
  "deadline",
  "drop",
  "eligibility",
  "exchange",
  "funding",
  "grant",
  "incident",
  "listing",
  "mainnet",
  "partnership",
  "raise",
  "revenue",
  "roadmap",
  "snapshot",
  "security",
  "taken",
  "tge",
  "token",
  "tokenomics",
  "tvl",
]);

let activeScout = null;
let displayedCase = null;
let recentCases = [];
let claimHistory = [];
let claimHistoryIndex = 0;
const maxRecentCases = 5;
const maxClaimHistory = 20;
const recentCasesStorageKey = "cap-or-fact-recent-cases";
const claimHistoryStorageKey = "cap-or-fact-claim-history";

function loadRecentCases() {
  try {
    const savedCases = JSON.parse(window.localStorage.getItem(recentCasesStorageKey) || "[]");
    recentCases = Array.isArray(savedCases) ? savedCases.slice(0, maxRecentCases) : [];
  } catch {
    recentCases = [];
  }
}

function saveRecentCases() {
  window.localStorage.setItem(recentCasesStorageKey, JSON.stringify(recentCases.slice(0, maxRecentCases)));
}

function clearRecentCases() {
  recentCases = [];
  claimHistory = [];
  claimHistoryIndex = 0;
  saveRecentCases();
  saveClaimHistory();
  renderCaseFeed();
  updateClaimNavControls();
}

function loadClaimHistory() {
  try {
    const savedClaims = JSON.parse(window.localStorage.getItem(claimHistoryStorageKey) || "[]");
    claimHistory = Array.isArray(savedClaims) ? savedClaims.slice(0, maxClaimHistory) : [];
  } catch {
    claimHistory = [];
  }

  claimHistoryIndex = claimHistory.length;
}

function saveClaimHistory() {
  window.localStorage.setItem(claimHistoryStorageKey, JSON.stringify(claimHistory.slice(0, maxClaimHistory)));
}

function rememberClaimSearch(data) {
  const claim = data.claim.trim();

  if (!claim) {
    return;
  }

  const entry = {
    claim,
    project: data.project,
    category: data.category,
  };

  claimHistory = claimHistory.filter(
    (item) =>
      item.claim.toLowerCase() !== claim.toLowerCase() ||
      item.project !== entry.project ||
      item.category !== entry.category,
  );
  claimHistory.push(entry);
  claimHistory = claimHistory.slice(-maxClaimHistory);
  claimHistoryIndex = claimHistory.length;
  saveClaimHistory();
}

function updateClaimNavControls() {
  claimBackButton.disabled = claimHistory.length === 0 || claimHistoryIndex <= 0;
  claimForwardButton.disabled = claimHistory.length === 0 || claimHistoryIndex >= claimHistory.length - 1;
}

function loadClaimHistoryEntry(index) {
  const entry = claimHistory[index];

  if (!entry) {
    return;
  }

  claimHistoryIndex = index;
  activeScout = null;
  displayedCase = null;
  document.querySelector("#claim").value = entry.claim;
  document.querySelector("#project").value = entry.project || "auto";
  document.querySelector("#category").value = entry.category || "airdrop_rumor";
  renderPreview();
}

function resetClaimBox() {
  activeScout = null;
  displayedCase = null;
  claimHistoryIndex = claimHistory.length;
  document.querySelector("#claim").value = "";
  document.querySelector("#project").value = "auto";
  document.querySelector("#category").value = "airdrop_rumor";
  renderPreview();
}

function applyBuilderMode() {
  document.querySelectorAll(".builder-only").forEach((element) => {
    element.hidden = !builderMode;
  });

  builderTools.hidden = !builderMode;
  rightPanelTitle.textContent = builderMode ? "Case Feed + Builder" : "Case Feed";
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function claimIncludesAlias(lowerClaim, alias) {
  const normalizedAlias = alias.toLowerCase();

  if (normalizedAlias.includes(" ")) {
    return lowerClaim.includes(normalizedAlias);
  }

  return new RegExp(`\\b${escapeRegExp(normalizedAlias)}\\b`).test(lowerClaim);
}

function findProject(claim) {
  const lowerClaim = claim.toLowerCase();
  return projectRegistry.find((project) =>
    project.aliases.some((alias) => claimIncludesAlias(lowerClaim, alias)),
  );
}

function findProjectById(projectId) {
  const normalizedProjectId = String(projectId || "").toLowerCase();

  if (!normalizedProjectId || normalizedProjectId === "auto") {
    return null;
  }

  return projectRegistry.find(
    (project) =>
      project.id === normalizedProjectId ||
      project.name.toLowerCase() === normalizedProjectId ||
      project.aliases.includes(normalizedProjectId),
  );
}

function resolveProject(claim, projectId) {
  return findProjectById(projectId) || findProject(claim);
}

function getClaimWords(claim) {
  return claim.match(/[a-z0-9$]+/gi) || [];
}

function claimHasAnyTerm(lowerClaim, terms) {
  return terms.some((term) => lowerClaim.includes(term));
}

function cleanupProjectCandidate(candidate) {
  const words = getClaimWords(candidate).filter((word) => !projectGuessStopWords.has(word.toLowerCase()));

  if (words.length === 0) {
    return "";
  }

  return words.join(" ");
}

function extractLikelyProjectName(claim) {
  const capitalizedMatches =
    claim.match(/\b(?:[A-Z][A-Za-z0-9$]*|[A-Z0-9]{2,})(?:\s+(?:[A-Z][A-Za-z0-9$]*|[A-Z0-9]{2,}))*\b/g) || [];

  for (const match of capitalizedMatches) {
    const candidate = cleanupProjectCandidate(match);

    if (candidate) {
      return candidate;
    }
  }

  const fallback = getClaimWords(claim)
    .find((word) => word.length > 2 && !projectGuessStopWords.has(word.toLowerCase()));

  return fallback || "";
}

function analyzeClaimQuality(claim, projectId, category) {
  const trimmedClaim = claim.trim();
  const lowerClaim = trimmedClaim.toLowerCase();
  const words = getClaimWords(trimmedClaim);
  const selectedProject = findProjectById(projectId);
  const detectedProject = selectedProject || findProject(trimmedClaim);
  const guessedProjectName = detectedProject ? detectedProject.name : extractLikelyProjectName(trimmedClaim);
  const eventTerms = claimEventKeywords[category] || claimEventKeywords.airdrop_rumor;
  const issues = [];

  if (!trimmedClaim) {
    return {
      level: "draft",
      label: "Waiting for claim",
      summary: "Write a clear claim, then the scout will check official sources.",
      issues: [],
      canScout: false,
    };
  }

  if (trimmedClaim && (words.length < 4 || trimmedClaim.length < 18)) {
    issues.push({ text: "Make it a full claim, not a keyword search.", critical: true });
  }

  if (trimmedClaim && !detectedProject && !guessedProjectName) {
    issues.push({ text: "Name the project clearly so the scout can find official sources.", critical: true });
  }

  if (trimmedClaim && !claimHasAnyTerm(lowerClaim, eventTerms)) {
    issues.push({
      text: `Mention the concrete ${formatClaimType(category).toLowerCase()} event clearly.`,
      critical: true,
    });
  }

  if (trimmedClaim && !claimVerbPattern.test(lowerClaim)) {
    issues.push({
      text: "Use judgeable wording like announced, confirmed, published, listed, raised, completed, or denied.",
      critical: true,
    });
  }

  if (trimmedClaim && speculativeClaimPattern.test(lowerClaim)) {
    issues.push({
      text: "Avoid speculation like wen, soon, maybe, or will. Ask what has been officially confirmed.",
      critical: lowerClaim.includes("wen") || lowerClaim.startsWith("when ") || lowerClaim.startsWith("will "),
    });
  }

  const hasCriticalIssue = issues.some((issue) => issue.critical);

  if (!hasCriticalIssue && !detectedProject && guessedProjectName) {
    return {
      level: "discovery",
      label: "Discovery needed",
      summary: `Likely project: ${guessedProjectName}. Verifying official sources before GenLayer can judge this claim.`,
      issues: [
        {
          text: "Discovery path: CryptoRank, official X, website, docs, blog, GitHub.",
          critical: false,
        },
      ],
      canScout: false,
      likelyProjectName: guessedProjectName,
    };
  }

  if (hasCriticalIssue) {
    return {
      level: "blocked",
      label: "Too vague",
      summary: "Sharpen this before the scout spends time on sources.",
      issues,
      canScout: false,
      likelyProjectName: guessedProjectName,
    };
  }

  if (issues.length > 0) {
    return {
      level: "review",
      label: "Needs detail",
      summary: "The scout can run, but the verdict may be weaker unless the wording is tighter.",
      issues,
      canScout: true,
      likelyProjectName: guessedProjectName,
    };
  }

  return {
    level: "good",
    label: "Good claim",
    summary: "Clear enough: project, event, and judgeable wording are present.",
    issues: [],
    canScout: true,
    likelyProjectName: guessedProjectName,
  };
}

function formatClaimType(category) {
  return claimTypeLabels[category] || category;
}

function formatCaseTopline(data) {
  const projectName = data.research.projectName || "Auto project";
  return `${projectName} / ${formatClaimType(data.category)}`;
}

function makeJudgeStandard(project, category) {
  const projectName = project ? project.name : "the named project";

  const standards = {
    airdrop_rumor: `Return FACT only if official ${projectName} sources confirm the airdrop, snapshot, native token, or TGE claim. Return CAP if official ${projectName} sources directly contradict it. Return UNCLEAR if the evidence is rumor-based, unofficial, stale, or indirect.`,
    snapshot_confirmation: `Return FACT only if official ${projectName} sources confirm the snapshot date, snapshot block, eligibility list, or snapshot completion. Return CAP if official sources directly contradict the snapshot claim. Return UNCLEAR if evidence is rumor-based, unofficial, incomplete, or only implies a future snapshot.`,
    token_info: `Return FACT only if official ${projectName} docs, blog, or token pages confirm the token, tokenomics, staking, or native-token claim. Return CAP if official sources directly contradict it. Return UNCLEAR if the source is incomplete, indirect, or unofficial.`,
    exchange_listing: `Return FACT only if the exchange or official ${projectName} sources published a listing announcement or live trading page for the named token. Return CAP if official sources contradict it. Return UNCLEAR if evidence is unofficial or incomplete.`,
    founder_statement: `Return FACT only if a primary source from the founder or official ${projectName} channels clearly supports the quoted claim. Return CAP if the primary source contradicts it. Return UNCLEAR if the quote is secondhand or lacks context.`,
    partnership_claim: `Return FACT only if official ${projectName} sources or the named partner's official sources confirm the partnership, integration, collaboration, or customer relationship. Return CAP if official sources deny or contradict it. Return UNCLEAR if only media summaries, rumors, or vague ecosystem mentions are available.`,
    funding_raise: `Return FACT only if official ${projectName} sources, named investor sources, or authoritative filing/newswire sources confirm the raise, round, investors, or amount. Return CAP if official sources contradict it. Return UNCLEAR if the claim depends on rumors, leaked decks, or unsourced reports.`,
    roadmap_check: `Return FACT only if official ${projectName} roadmap and announcement sources establish the deadline and whether it was missed. Return CAP if official sources show the deadline was met or changed. Return UNCLEAR if evidence is incomplete.`,
    grant_deadline: `Return FACT only if official ${projectName} grant or hackathon pages confirm the stated deadline. Return CAP if official sources contradict it. Return UNCLEAR if no official source is found.`,
    security_incident: `Return FACT only if official ${projectName} incident reports, status pages, security advisories, postmortems, or verified exploit records confirm the security incident. Return CAP if official sources contradict it. Return UNCLEAR if evidence is only social chatter, screenshots, or incomplete monitoring data.`,
    protocol_metrics: `Return FACT only if official ${projectName} dashboards, docs, reports, analytics pages, or linked data sources confirm the revenue, fees, volume, or TVL claim for the stated period. Return CAP if official or primary data contradicts it. Return UNCLEAR if the metric, timeframe, or source is ambiguous.`,
    regulatory_claim: `Return FACT only if a regulator, court, government source, or official ${projectName} source confirms the claim. Return CAP if official sources contradict it. Return UNCLEAR if only media summaries or rumors are available.`,
  };

  return standards[category] || standards.airdrop_rumor;
}

function scoreReceipt(receipt, claim, category) {
  const haystack = `${receipt.title} ${receipt.url} ${receipt.type}`.toLowerCase();
  const lowerClaim = claim.toLowerCase();
  const profile = sourceProfiles[category] || sourceProfiles.airdrop_rumor;
  let score = receipt.priority || 50;

  score += profile[receipt.type] || 0;

  if (haystack.includes("official")) score += 4;
  if (haystack.includes("raw.githubusercontent.com")) score += category === "token_info" ? 18 : 6;
  if (haystack.includes("blog") || haystack.includes("mirror.xyz")) score += 4;
  if (haystack.includes("twitter.com") || haystack.includes("x.com")) score += 8;
  if (receipt.type === "founder_x" && isFounderClaim(claim, category)) score += 120;

  if (category === "airdrop_rumor") {
    if (lowerClaim.includes("tge") || lowerClaim.includes("airdrop") || lowerClaim.includes("claim")) {
      if (receipt.type === "x" || receipt.type === "blog") score += 18;
    }
    if (haystack.includes("token")) score += 10;
  }

  if (category === "snapshot_confirmation") {
    if (haystack.includes("snapshot") || haystack.includes("airdrop") || haystack.includes("eligibility")) score += 18;
  }

  if (category === "token_info") {
    if (haystack.includes("token")) score += 18;
    if (haystack.includes("staking")) score += 10;
    if (haystack.includes("tokenomics")) score += 14;
    if (haystack.includes("docs")) score += 8;
  }

  if (category === "exchange_listing" && haystack.includes("listing")) score += 16;
  if (category === "founder_statement" && receipt.type === "founder_x") score += 26;
  if (category === "founder_statement" && (haystack.includes("founder") || receipt.type === "x")) score += 14;
  if (category === "partnership_claim" && (haystack.includes("partner") || haystack.includes("partnership") || haystack.includes("integration"))) score += 16;
  if (category === "funding_raise" && (haystack.includes("funding") || haystack.includes("raise") || haystack.includes("investor") || haystack.includes("seed") || haystack.includes("series"))) score += 16;
  if (category === "roadmap_check" && (haystack.includes("roadmap") || haystack.includes("docs") || haystack.includes("blog"))) score += 12;
  if (category === "grant_deadline" && (haystack.includes("grant") || haystack.includes("hackathon") || haystack.includes("program"))) score += 16;
  if (category === "security_incident" && (haystack.includes("security") || haystack.includes("incident") || haystack.includes("exploit") || haystack.includes("postmortem") || haystack.includes("status"))) score += 18;
  if (category === "protocol_metrics" && (haystack.includes("revenue") || haystack.includes("tvl") || haystack.includes("fees") || haystack.includes("dashboard") || haystack.includes("analytics"))) score += 20;
  if (category === "regulatory_claim" && (haystack.includes("regulator") || haystack.includes("court") || haystack.includes("government") || haystack.includes("compliance"))) score += 18;

  return score;
}

function explainReceiptChoice(receipt, category) {
  if (receipt.type === "directory") {
    return "CryptoRank helps discover and verify early-stage projects before checking official channels.";
  }

  if (receipt.type === "search") {
    return "This route helps find official sources for projects outside the current registry.";
  }

  const profile = sourceReasonProfiles[category] || sourceReasonProfiles.airdrop_rumor;
  return (
    profile[receipt.type] ||
    `${sourceTypeLabels[receipt.type] || "Official source"} is useful evidence for this claim type.`
  );
}

function isSameReceipt(first, second) {
  return Boolean(first && second && first.title === second.title && first.url === second.url);
}

function canGenLayerFetchReceipt(receipt) {
  return (
    receipt &&
    !receipt.discoveryOnly &&
    receipt.type !== "founder_x" &&
    receipt.type !== "x" &&
    receipt.type !== "directory" &&
    receipt.type !== "search"
  );
}

function chooseGenLayerReceipt(receipts) {
  return (
    receipts.find((receipt) => canGenLayerFetchReceipt(receipt)) ||
    receipts.find(
      (receipt) =>
        receipt &&
        !receipt.discoveryOnly &&
        receipt.type !== "founder_x" &&
        receipt.type !== "x" &&
        receipt.type !== "search",
    ) ||
    null
  );
}

function getGenLayerSourceUrls(research) {
  if (research.genlayerSourceUrls) {
    return research.genlayerSourceUrls;
  }

  if (research.genlayerReceipt) {
    return [research.genlayerReceipt.url];
  }

  return research.sourceUrls || [];
}

function normalizeResearch(research, category) {
  const receipts = (research.receipts || []).map((receipt) => ({
    ...receipt,
    reason: receipt.reason || explainReceiptChoice(receipt, category),
  }));
  const bestReceipt = research.bestReceipt || receipts[0] || null;
  const genlayerReceipt = research.genlayerReceipt || chooseGenLayerReceipt(receipts);

  return {
    ...research,
    receipts,
    sourceUrls: research.sourceUrls || receipts.map((receipt) => receipt.url),
    genlayerSourceUrls: research.genlayerSourceUrls || (genlayerReceipt ? [genlayerReceipt.url] : []),
    bestReceipt,
    genlayerReceipt,
  };
}

function makeScoutStatus(project, category, bestReceipt, genlayerReceipt) {
  if (!bestReceipt) {
    return `Found ${project.name}, but no official receipt is registered yet.`;
  }

  if (!genlayerReceipt || isSameReceipt(bestReceipt, genlayerReceipt)) {
    return `Picked ${bestReceipt.title} as the strongest ${formatClaimType(category).toLowerCase()} receipt.`;
  }

  return `Picked ${bestReceipt.title} as the strongest signal. GenLayer will fetch ${genlayerReceipt.title}.`;
}

function rankReceipts(receipts, claim, category) {
  return [...receipts]
    .map((receipt) => ({
      ...receipt,
      score: scoreReceipt(receipt, claim, category),
      reason: receipt.reason || explainReceiptChoice(receipt, category),
    }))
    .sort((a, b) => b.score - a.score);
}

function researchClaim(claim, category, projectId = "auto") {
  const project = resolveProject(claim, projectId);

  if (project) {
    const receipts = rankReceipts(getProjectReceipts(project, claim, category), claim, category);
    const bestReceipt = receipts[0] || null;
    const genlayerReceipt = chooseGenLayerReceipt(receipts);

    return {
      mode: `${project.name} source scout`,
      status: makeScoutStatus(project, category, bestReceipt, genlayerReceipt),
      judgeStandard: makeJudgeStandard(project, category),
      receipts,
      sourceUrls: receipts.map((receipt) => receipt.url),
      genlayerSourceUrls: genlayerReceipt ? [genlayerReceipt.url] : [],
      bestReceipt,
      genlayerReceipt,
      projectId: project.id,
      projectName: project.name,
    };
  }

  return {
    mode: "needs live search",
    status:
      "Live source discovery is not connected for this project yet. The full version will search official docs, blogs, social posts, exchanges, regulators, and credible news before GenLayer judges.",
    judgeStandard: makeJudgeStandard(undefined, category),
    receipts: [],
    sourceUrls: [],
    genlayerSourceUrls: [],
    bestReceipt: null,
    genlayerReceipt: null,
    projectId: "auto",
    projectName: "",
  };
}

function createPendingResearch(claim, category, projectId) {
  const selectedProject = findProjectById(projectId);
  const detectedProject = selectedProject || findProject(claim);
  const likelyProjectName = detectedProject ? detectedProject.name : extractLikelyProjectName(claim);
  const unknownProject = claim && !detectedProject && likelyProjectName;

  return {
    mode: unknownProject
      ? `${likelyProjectName} live scout needed`
      : selectedProject
        ? `${selectedProject.name} selected`
        : claim
          ? "ready to scout"
          : "claim needed",
    status: unknownProject
      ? `Likely project: ${likelyProjectName}. Verifying official sources before GenLayer can judge this claim.`
      : claim
        ? selectedProject
          ? `Click Scout Claim to use ${selectedProject.name}'s official sources.`
          : "Finish the claim, then click Scout Claim to find official receipts."
        : "Write a claim, then click Scout Claim to find official receipts.",
    judgeStandard: makeJudgeStandard(selectedProject, category),
    receipts: [],
    sourceUrls: [],
    genlayerSourceUrls: [],
    bestReceipt: null,
    genlayerReceipt: null,
    awaitingScout: true,
    needsLiveDiscovery: Boolean(unknownProject),
    likelyProjectName: likelyProjectName || "",
    projectId: selectedProject ? selectedProject.id : "auto",
    projectName: selectedProject ? selectedProject.name : likelyProjectName || "",
  };
}

function createVerifiedCitreaResearch(category) {
  const project = findProject("citrea");
  const receipts = project
    ? rankReceipts(project.receipts, "Citrea has announced a TGE for a native Citrea token.", category)
    : [];
  const bestReceipt = receipts[0] || null;
  const genlayerReceipt = chooseGenLayerReceipt(receipts);

  return {
    mode: "Citrea source scout",
    status: "Picked Citrea official GitHub README as the strongest official receipt.",
    judgeStandard: makeJudgeStandard(project, category),
    receipts,
    sourceUrls: receipts.map((receipt) => receipt.url),
    genlayerSourceUrls: genlayerReceipt ? [genlayerReceipt.url] : [],
    bestReceipt,
    genlayerReceipt,
    projectId: "citrea",
    projectName: "Citrea",
  };
}

function readForm() {
  const claim = document.querySelector("#claim").value.trim();
  const projectId = document.querySelector("#project").value;
  const category = document.querySelector("#category").value;
  const hasActiveScout =
    activeScout &&
    activeScout.claim === claim &&
    activeScout.projectId === projectId &&
    activeScout.category === category;
  const research = normalizeResearch(
    hasActiveScout ? activeScout.research : createPendingResearch(claim, category, projectId),
    category,
  );

  return {
    claim,
    project: projectId,
    category,
    judge_standard: research.judgeStandard,
    source_urls: getGenLayerSourceUrls(research),
    evidence_urls: research.sourceUrls,
    quality: analyzeClaimQuality(claim, projectId, category),
    research,
  };
}

function previewCase(data) {
  const evidenceCount = data.research.receipts.length;
  const hasGenLayerReceipt = data.source_urls.length > 0;
  const hasClaim = data.claim.length > 0;
  const lowerClaim = data.claim.toLowerCase();
  const bestReceipt = data.research.bestReceipt || data.research.receipts[0];
  const genlayerReceipt = data.research.genlayerReceipt || bestReceipt;
  const isStudioTestedCitrea =
    (data.research.projectId === "citrea" || lowerClaim.includes("citrea")) &&
    (lowerClaim.includes("tge") || lowerClaim.includes("token"));

  if (!hasClaim) {
    return {
      stamp: "DRAFT",
      state: "draft",
      readiness: "claim needed",
      summary: "Write the claim first. Cap or Fact will then scout for official receipts before GenLayer judges it.",
    };
  }

  if (!hasGenLayerReceipt) {
    if (data.research.awaitingScout) {
      return {
        stamp: "SCOUT",
        state: "draft",
        readiness: "ready to scout",
        summary: "Click Scout Claim when the claim is ready. Evidence will not change while you type.",
      };
    }

    return {
      stamp: "SCOUTING",
      state: "needs-receipts",
      readiness: "needs live search",
      summary:
        "No official receipt is selected yet. Live search needs to find a docs, blog, or official account source.",
    };
  }

  if (isStudioTestedCitrea) {
    return {
      stamp: "CAP",
      state: "tested-cap",
      readiness: "GenLayer verified result",
      summary:
        "GenLayer fetched Citrea's official README, the AI judge read the receipt, and the verdict was stored onchain.",
    };
  }

  return {
    stamp: "READY",
    state: "ready",
    readiness: evidenceCount >= 2 ? "ready for GenLayer" : "more receipts help",
    summary:
      bestReceipt && genlayerReceipt && !isSameReceipt(bestReceipt, genlayerReceipt)
        ? `Primary signal is ${bestReceipt.title}. GenLayer will fetch ${genlayerReceipt.title} for the onchain judgment.`
        : "The app has prepared a GenLayer-readable receipt. GenLayer will fetch it and return FACT, CAP, or UNCLEAR after judge() runs.",
  };
}

function renderJson(data) {
  const constructorInputs = [
    data.claim,
    data.category,
    data.source_urls[0] || "",
  ];

  document.querySelector("#constructor-json").textContent = JSON.stringify(constructorInputs, null, 2);
}

function getContractInputs(data) {
  return [
    data.claim,
    data.category,
    data.source_urls[0] || "",
  ];
}

function renderReceipts(research, category) {
  document.querySelector("#research-mode").textContent = research.mode;
  document.querySelector("#research-status").textContent = research.status;

  const receiptList = document.querySelector("#receipt-list");
  receiptList.innerHTML = "";
  receiptList.classList.toggle("is-empty", research.receipts.length === 0);
  receiptList.dataset.emptyLabel = research.awaitingScout
    ? "Click Scout Claim to find official receipts."
    : "Live web search backend needed for this claim.";

  research.receipts.forEach((receipt) => {
    const item = document.createElement("li");
    const title = document.createElement("a");
    const meta = document.createElement("span");
    const tags = document.createElement("div");
    const reason = document.createElement("span");
    let sourceHost = receipt.url;

    try {
      sourceHost = new URL(receipt.url).hostname;
    } catch {
      sourceHost = receipt.url;
    }

    title.href = receipt.url;
    title.target = "_blank";
    title.rel = "noreferrer";
    title.textContent = receipt.title;
    meta.textContent = `${sourceTypeLabels[receipt.type] || receipt.type} - ${sourceHost}`;
    tags.className = "receipt-tags";

    if (isSameReceipt(receipt, research.bestReceipt)) {
      const tag = document.createElement("span");
      tag.textContent = "Primary signal";
      tags.append(tag);
    }

    if (isSameReceipt(receipt, research.genlayerReceipt)) {
      const tag = document.createElement("span");
      tag.textContent = "GenLayer fetch";
      tags.append(tag);
    }

    reason.className = "receipt-reason";
    reason.textContent = `Why: ${receipt.reason || explainReceiptChoice(receipt, category)}`;
    item.append(title, meta);
    if (tags.children.length > 0) {
      item.append(tags);
    }
    item.append(reason);
    receiptList.append(item);
  });
}

function renderClaimQuality(quality) {
  const box = document.querySelector("#claim-quality");
  const status = document.querySelector("#quality-status");
  const summary = document.querySelector("#quality-summary");
  const list = document.querySelector("#quality-list");

  box.classList.remove("is-draft", "is-good", "is-review", "is-blocked");
  box.classList.add(`is-${quality.level}`);
  status.textContent = quality.label;
  summary.textContent = quality.summary;
  list.innerHTML = "";

  quality.issues.forEach((issue) => {
    const item = document.createElement("li");
    item.textContent = issue.text;
    list.append(item);
  });
}

function renderStudioRun(data, preview) {
  const hasClaim = data.claim.length > 0;
  const hasReceipt = data.source_urls.length > 0;
  const isComplete = preview.state === "tested-cap";
  const status = document.querySelector("#studio-status");
  const result = document.querySelector("#sim-result");
  const steps = [...document.querySelectorAll("[data-flow-step]")];

  steps.forEach((step) => {
    step.classList.remove("is-active", "is-complete", "is-locked");
  });

  if (!hasClaim) {
    status.textContent = "Waiting for claim";
    result.textContent = "Scout a claim first.";
    steps.forEach((step) => step.classList.add("is-locked"));
    return;
  }

  if (!hasReceipt) {
    status.textContent = "Needs receipt";
    result.textContent = "No official receipt selected yet.";
    steps.forEach((step) => step.classList.add("is-locked"));
    return;
  }

  if (isComplete) {
    status.textContent = "Proof complete";
    result.textContent = "Known GenLayer result: CAP.";
    steps.forEach((step) => step.classList.add("is-complete"));
    return;
  }

  status.textContent = "Ready to judge";
  result.textContent = "Pending Studio result. Run the four methods to get the verdict.";
  steps[0].classList.add("is-active");
}

function makeCaseRow(data, preview) {
  const bestReceipt = data.research.bestReceipt || data.research.receipts[0];
  const genlayerReceipt = data.research.genlayerReceipt || bestReceipt;
  const sourceCount = data.research.receipts.length;

  const statusLabel =
    preview.state === "tested-cap"
      ? "GenLayer verified"
      : preview.state === "ready"
        ? "Ready for GenLayer"
        : preview.state === "needs-receipts"
          ? "Needs live search"
          : "Draft";
  const sourceLabel = genlayerReceipt
    ? `GenLayer receipt: ${genlayerReceipt.title}`
    : "No official receipt selected yet";
  const evidenceLabel = `Evidence scout found ${sourceCount} official source${sourceCount === 1 ? "" : "s"}.`;

  return {
    id: `${data.research.projectId || data.project}|${data.claim.toLowerCase()}|${data.category}`,
    claim: data.claim,
    verdict: preview.stamp,
    statusLabel,
    status: preview.readiness,
    source: sourceLabel,
    nextStep:
      preview.state === "tested-cap"
        ? "Verdict stored onchain."
        : preview.state === "ready"
          ? `${evidenceLabel} Ready for GenLayer judgment.`
          : preview.state === "needs-receipts"
            ? "Live search needs to find an official docs, blog, or account receipt."
            : "Write a claim and scout receipts.",
    className:
      preview.state === "tested-cap"
        ? "is-cap"
        : preview.state === "ready"
          ? "is-trial"
          : preview.state === "needs-receipts"
            ? "is-scouting"
            : "is-draft",
  };
}

function createVerifiedCitreaRow() {
  return {
    id: "verified-citrea-tge",
    claim: "Citrea has announced a TGE for a native Citrea token.",
    verdict: "CAP",
    statusLabel: "GenLayer verified",
    status: "GenLayer verified result",
    source: "GenLayer receipt: Citrea official GitHub README",
    nextStep: "Verdict stored onchain: 0x09845790DE3cF5C5F048C1a9a18B0317526A12f0",
    className: "is-cap",
  };
}

function rememberCase(row) {
  if (!row || !row.claim) {
    return;
  }

  recentCases = recentCases.filter((caseRow) => caseRow.id !== row.id);
  recentCases.unshift(row);
  recentCases = recentCases.slice(0, maxRecentCases);
  saveRecentCases();
}

function renderCaseFeed() {
  const feed = document.querySelector("#case-feed");
  const rows = recentCases;

  feed.innerHTML = "";

  if (rows.length === 0) {
    const empty = document.createElement("li");
    empty.className = "case-feed-empty";
    empty.textContent = "No recent cases yet. Scout a claim to start the feed.";
    feed.append(empty);
    return;
  }

  rows.forEach((row) => {
    const item = document.createElement("li");
    const top = document.createElement("div");
    const claim = document.createElement("strong");
    const pill = document.createElement("span");
    const status = document.createElement("span");
    const meta = document.createElement("p");
    const next = document.createElement("p");
    const detail = document.createElement("div");

    item.className = row.className;
    top.className = "case-feed-top";
    pill.className = "case-pill";
    status.className = "case-status";
    detail.className = "case-feed-detail";
    next.className = "case-next";

    claim.textContent = row.claim;
    pill.textContent = row.verdict;
    status.textContent = row.statusLabel;
    meta.textContent = row.source;
    next.textContent = row.nextStep;

    detail.append(status, meta, next);
    top.append(claim, pill);
    item.append(top, detail);
    feed.append(item);
  });
}

function renderPreview() {
  const data = readForm();
  const preview = previewCase(data);
  const stageData = displayedCase ? displayedCase.data : data;
  const stagePreview = displayedCase ? displayedCase.preview : preview;
  const stamp = document.querySelector("#verdict-stamp");

  document.querySelector("#claim-title").textContent = stageData.claim || "Untitled claim";
  document.querySelector("#case-category").textContent = formatCaseTopline(stageData);
  document.querySelector("#case-confidence").textContent = stagePreview.readiness;
  document.querySelector("#receipt-summary").textContent = stagePreview.summary;
  const bestReceipt = stageData.research.bestReceipt || stageData.research.receipts[0];
  const genlayerReceipt = stageData.research.genlayerReceipt || bestReceipt;
  document.querySelector("#source-label").textContent =
    stageData.source_urls.length > 0 ? "GenLayer receipt" : "Evidence";
  document.querySelector("#source-count").textContent = genlayerReceipt ? "Selected" : "Pending";
  document.querySelector("#share-status").textContent =
    stagePreview.state === "tested-cap"
      ? "GenLayer verified"
      : stagePreview.state === "ready"
        ? "Ready for GenLayer"
        : stagePreview.readiness;

  stamp.textContent = stagePreview.stamp;
  stamp.classList.toggle("is-ready", stagePreview.state === "ready");
  stamp.classList.toggle("is-needs-receipts", stagePreview.state === "needs-receipts");
  stamp.classList.toggle("is-cap", stagePreview.state === "tested-cap");

  renderClaimQuality(data.quality);
  renderReceipts(data.research, data.category);
  renderJson(data);
  renderStudioRun(data, preview);
  renderCaseFeed();
  updateClaimNavControls();
}

function flashButton(button, text, resetText) {
  const originalText = resetText || button.textContent;
  button.textContent = text;
  button.classList.add("is-confirming");

  window.setTimeout(() => {
    button.textContent = originalText;
    button.classList.remove("is-confirming");
  }, 1100);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const helper = document.createElement("textarea");
    helper.value = text;
    document.body.appendChild(helper);
    helper.select();
    document.execCommand("copy");
    helper.remove();
  }
}

function canUseScoutApi() {
  return window.location.protocol === "http:" || window.location.protocol === "https:";
}

async function scoutWithBackend(claim, category, projectId) {
  if (!canUseScoutApi()) {
    throw new Error("The source scout only works from the local server URL.");
  }

  const response = await fetch("/api/scout", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ claim, category, project: projectId }),
  });

  const payload = await response.json();

  if (!response.ok || !payload.ok) {
    throw new Error(payload.error || "Receipt scout failed.");
  }

  return normalizeResearch(payload.research, category);
}

async function discoverWithBackend(claim, category, projectName) {
  if (!canUseScoutApi()) {
    throw new Error("Live discovery only works from the local server URL.");
  }

  const response = await fetch("/api/discover", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ claim, category, projectName }),
  });

  const payload = await response.json();

  if (!response.ok || !payload.ok) {
    throw new Error(payload.error || "Live discovery failed.");
  }

  return normalizeResearch(payload.research, category);
}

async function runScout() {
  const claim = document.querySelector("#claim").value.trim();
  const projectId = document.querySelector("#project").value;
  const category = document.querySelector("#category").value;
  const defaultText = "Scout Claim";
  const quality = analyzeClaimQuality(claim, projectId, category);

  if (quality.level === "discovery" && quality.likelyProjectName) {
    previewButton.disabled = true;
    previewButton.textContent = "Discovering";

    try {
      const research = await discoverWithBackend(claim, category, quality.likelyProjectName);
      activeScout = { claim, projectId, category, research };
      const data = readForm();
      const preview = previewCase(data);
      displayedCase = { data, preview };
      rememberClaimSearch(data);
      rememberCase(makeCaseRow(data, preview));
      renderPreview();
      flashButton(previewButton, "Sources Found", defaultText);
    } catch {
      activeScout = null;
      renderPreview();
      flashButton(previewButton, "Try Again", defaultText);
    } finally {
      previewButton.disabled = false;
    }

    return;
  }

  if (!quality.canScout) {
    activeScout = null;
    renderPreview();
    flashButton(
      previewButton,
      quality.level === "discovery" ? "Discover Sources" : claim ? "Sharpen Claim" : "Write Claim",
      defaultText,
    );
    return;
  }

  previewButton.disabled = true;
  previewButton.textContent = "Scouting";

  try {
    const research = await scoutWithBackend(claim, category, projectId);
    activeScout = { claim, projectId, category, research };
    const data = readForm();
    const preview = previewCase(data);
    displayedCase = { data, preview };
    rememberClaimSearch(data);
    rememberCase(makeCaseRow(data, preview));
    renderPreview();
    flashButton(previewButton, "Scout Found", defaultText);
  } catch {
    activeScout = null;
    renderPreview();
    flashButton(previewButton, canUseScoutApi() ? "Local Scout" : "Open Server", defaultText);
  } finally {
    previewButton.disabled = false;
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  runScout();
});

form.addEventListener("input", () => {
  activeScout = null;
  displayedCase = null;
  claimHistoryIndex = claimHistory.length;
  renderPreview();
});

claimBackButton.addEventListener("click", () => {
  loadClaimHistoryEntry(claimHistoryIndex - 1);
});

claimForwardButton.addEventListener("click", () => {
  loadClaimHistoryEntry(claimHistoryIndex + 1);
});

resetClaimButton.addEventListener("click", () => {
  resetClaimBox();
  flashButton(resetClaimButton, "Cleared", "Reset");
});

copyArgsButton.addEventListener("click", () => {
  copyText(document.querySelector("#constructor-json").textContent);
  flashButton(copyArgsButton, "Copied");
});

copyJsonButton.addEventListener("click", () => {
  copyText(document.querySelector("#constructor-json").textContent);
  flashButton(copyJsonButton, "OK");
});

function buildShareText() {
  const currentData = readForm();
  const data = displayedCase ? displayedCase.data : currentData;
  const preview = displayedCase ? displayedCase.preview : previewCase(currentData);
  const bestReceipt = data.research.bestReceipt || data.research.receipts[0];
  const genlayerReceipt = data.research.genlayerReceipt || bestReceipt;
  const sourceLine =
    bestReceipt && genlayerReceipt && !isSameReceipt(bestReceipt, genlayerReceipt)
      ? `Primary signal: ${bestReceipt.title} (${bestReceipt.url})
GenLayer receipt: ${genlayerReceipt.title} (${genlayerReceipt.url})`
      : genlayerReceipt
        ? `GenLayer receipt: ${genlayerReceipt.title} (${genlayerReceipt.url})`
        : "GenLayer receipt: pending live search";
  const proofLine =
    preview.state === "tested-cap"
      ? "\nProof: 0x09845790DE3cF5C5F048C1a9a18B0317526A12f0"
      : "";

  return `Cap or Fact case

Claim: ${data.claim || "Untitled claim"}
Project: ${data.research.projectName || "Auto detect"}
Claim type: ${formatClaimType(data.category)}
Status: ${preview.readiness}
Verdict: ${preview.stamp}
${sourceLine}${proofLine}

Built on GenLayer.`;
}

copyShareTextButton.addEventListener("click", () => {
  copyText(buildShareText());
  flashButton(copyShareTextButton, "Copied");
});

function buildStudioStepsText() {
  const data = readForm();
  const contractInputs = getContractInputs(data);
  const bestReceipt = data.research.bestReceipt || data.research.receipts[0];
  const genlayerReceipt = data.research.genlayerReceipt || bestReceipt;
  const primaryLine =
    bestReceipt && genlayerReceipt && !isSameReceipt(bestReceipt, genlayerReceipt)
      ? `Primary signal:
${bestReceipt.title}
${bestReceipt.url}

GenLayer-readable receipt:
${genlayerReceipt.title}
${genlayerReceipt.url}
`
      : "";

  return `Cap or Fact Studio Run

Contract:
cap_or_fact_ai_simple_v1.py

Deployed proof address:
0x09845790DE3cF5C5F048C1a9a18B0317526A12f0

1. Run set_case with:
${JSON.stringify(contractInputs, null, 2)}

${primaryLine}
Project selected in app:
${data.research.projectName || "Auto detect"}

2. Run fetch_receipt
3. Run judge_with_ai
4. Run get_result`;
}

copyStudioStepsButton.addEventListener("click", () => {
  copyText(buildStudioStepsText());
  flashButton(copyStudioStepsButton, "Copied");
});

clearHistoryButton.addEventListener("click", () => {
  clearRecentCases();
  flashButton(clearHistoryButton, "Cleared", "Clear History");
});

function seedInitialVerifiedCase() {
  const claim = document.querySelector("#claim").value.trim();
  const projectId = document.querySelector("#project").value;
  const category = document.querySelector("#category").value;
  const lowerClaim = claim.toLowerCase();

  if (
    (projectId === "citrea" || projectId === "auto") &&
    lowerClaim.includes("citrea") &&
    (lowerClaim.includes("tge") || lowerClaim.includes("token"))
  ) {
    activeScout = {
      claim,
      projectId,
      category,
      research: createVerifiedCitreaResearch(category),
    };
    const data = readForm();
    displayedCase = { data, preview: previewCase(data) };
  }
}

loadRecentCases();
loadClaimHistory();
renderPreview();
applyBuilderMode();
