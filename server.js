const fs = require("node:fs/promises");
const https = require("node:https");
const http = require("node:http");
const path = require("node:path");
const { URL } = require("node:url");

const PORT = Number(process.env.PORT || 4173);
const APP_DIR = path.join(__dirname, "app");
const X_BEARER_TOKEN = process.env.X_BEARER_TOKEN || process.env.TWITTER_BEARER_TOKEN || "";
const PUBLIC_BASE_URL = (process.env.PUBLIC_BASE_URL || process.env.RENDER_EXTERNAL_URL || "").replace(/\/$/, "");
const X_API_BASE_URL = (process.env.X_API_BASE_URL || "https://api.x.com").replace(/\/$/, "");

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
        priority: 95,
      },
      {
        title: "Base homepage",
        url: "https://base.org/",
        type: "official",
        priority: 85,
      },
      {
        title: "Base official blog",
        url: "https://base.mirror.xyz/",
        type: "blog",
        priority: 75,
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
        priority: 95,
      },
      {
        title: "Polymarket homepage",
        url: "https://polymarket.com/",
        type: "official",
        priority: 85,
      },
      {
        title: "Polymarket API reference",
        url: "https://docs.polymarket.com/api-reference",
        type: "docs",
        priority: 80,
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
        priority: 95,
      },
      {
        title: "OpenSea blog",
        url: "https://opensea.io/blog",
        type: "blog",
        priority: 80,
      },
      {
        title: "OpenSea Learn",
        url: "https://learn.opensea.io/",
        type: "docs",
        priority: 75,
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
        priority: 100,
      },
      {
        title: "GenLayer homepage",
        url: "https://www.genlayer.com/",
        type: "official",
        priority: 90,
      },
      {
        title: "GenLayer FAQ",
        url: "https://docs.genlayer.com/FAQ",
        type: "docs",
        priority: 75,
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
        priority: 95,
      },
      {
        title: "Arc homepage",
        url: "https://www.arc.network/",
        type: "official",
        priority: 85,
      },
      {
        title: "Arc status",
        url: "https://status.arc.network/",
        type: "official",
        priority: 70,
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
        priority: 85,
      },
      {
        title: "Sentient news",
        url: "https://sentient.foundation/news",
        type: "blog",
        priority: 75,
      },
      {
        title: "Sentient GitHub",
        url: "https://github.com/sentient-agi",
        type: "github",
        priority: 65,
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
        priority: 100,
      },
      {
        title: "Citrea Mainnet announcement",
        url: "https://www.blog.citrea.xyz/citrea-mainnet-is-live/",
        type: "blog",
        priority: 70,
      },
      {
        title: "Citrea Foundation announcement",
        url: "https://www.blog.citrea.xyz/citrea-introduces-the-citrea-foundation/",
        type: "blog",
        priority: 60,
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
        priority: 90,
      },
      {
        title: "Monad official links",
        url: "https://docs.monad.xyz/resources/official-links",
        type: "docs",
        priority: 80,
      },
      {
        title: "Monad blog",
        url: "https://blog.monad.xyz/",
        type: "blog",
        priority: 65,
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
        priority: 95,
      },
      {
        title: "MegaETH docs",
        url: "https://docs.megaeth.com/",
        type: "docs",
        priority: 80,
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
        priority: 90,
      },
      {
        title: "BERA token docs",
        url: "https://docs.berachain.com/learn/guides/bera-staking",
        type: "docs",
        priority: 85,
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
        priority: 90,
      },
      {
        title: "INIT tokenomics",
        url: "https://docs.initia.xyz/home/core-concepts/init-token/tokenomics",
        type: "docs",
        priority: 85,
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
        priority: 95,
      },
      {
        title: "Eclipse homepage",
        url: "https://www.eclipse.xyz/",
        type: "official",
        priority: 85,
      },
      {
        title: "Eclipse blog",
        url: "https://www.eclipse.xyz/blog",
        type: "blog",
        priority: 75,
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
        priority: 95,
      },
      {
        title: "Succinct homepage",
        url: "https://www.succinct.xyz/",
        type: "official",
        priority: 85,
      },
      {
        title: "Succinct blog",
        url: "https://blog.succinct.xyz/",
        type: "blog",
        priority: 75,
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
        priority: 95,
      },
      {
        title: "Movement homepage",
        url: "https://www.movementnetwork.xyz/",
        type: "official",
        priority: 85,
      },
      {
        title: "Movement blog",
        url: "https://www.movementnetwork.xyz/blog",
        type: "blog",
        priority: 75,
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
        priority: 95,
      },
      {
        title: "Espresso homepage",
        url: "https://www.espressosys.com/",
        type: "official",
        priority: 85,
      },
      {
        title: "Espresso FAQ",
        url: "https://www.espressosys.com/faq",
        type: "official",
        priority: 70,
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
        priority: 82,
      },
      {
        title: "Camp Network homepage",
        url: "https://www.campnetwork.xyz/",
        type: "official",
        priority: 100,
      },
      {
        title: "Camp Network blog",
        url: "https://www.campnetwork.xyz/blog",
        type: "blog",
        priority: 75,
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
        priority: 95,
      },
      {
        title: "Story homepage",
        url: "https://www.story.foundation/",
        type: "official",
        priority: 85,
      },
      {
        title: "Story quickstart",
        url: "https://docs.story.foundation/quickstart",
        type: "docs",
        priority: 75,
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
        priority: 95,
      },
      {
        title: "Hemi homepage",
        url: "https://hemi.xyz/",
        type: "official",
        priority: 85,
      },
      {
        title: "Hemi getting started",
        url: "https://docs.hemi.xyz/discover/getting-started",
        type: "docs",
        priority: 75,
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
        priority: 95,
      },
      {
        title: "Botanix homepage",
        url: "https://botanixlabs.com/",
        type: "official",
        priority: 85,
      },
      {
        title: "Botanix blog",
        url: "https://botanixlabs.com/blog",
        type: "blog",
        priority: 75,
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
        priority: 95,
      },
      {
        title: "Somnia homepage",
        url: "https://somnia.network/",
        type: "official",
        priority: 85,
      },
      {
        title: "Somnia network info",
        url: "https://docs.somnia.network/developer/network-info",
        type: "docs",
        priority: 75,
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
        priority: 90,
      },
      {
        title: "Rialo learn",
        url: "https://www.rialo.io/learn",
        type: "docs",
        priority: 80,
      },
      {
        title: "Rialo blog",
        url: "https://www.rialo.io/blog",
        type: "blog",
        priority: 70,
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
        priority: 95,
      },
      {
        title: "Seismic homepage",
        url: "https://www.seismic.systems/",
        type: "official",
        priority: 85,
      },
      {
        title: "Seismic overview",
        url: "https://docs.seismic.systems/overview/how-seismic-works",
        type: "docs",
        priority: 75,
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
        priority: 95,
      },
      {
        title: "Fluent homepage",
        url: "https://www.fluent.xyz/",
        type: "official",
        priority: 85,
      },
      {
        title: "Fluent overview",
        url: "https://docs.fluent.xyz/knowledge-base/fluent-overview/",
        type: "docs",
        priority: 75,
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
      aliases: ["orkun", "orkun kilic", "0x_orkun"],
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

const sourceProfiles = {
  airdrop_rumor: { x: 90, blog: 75, official: 38, docs: 18, github: 16 },
  snapshot_confirmation: { x: 92, blog: 72, official: 45, docs: 24, github: 18 },
  token_info: { official: 78, docs: 68, github: 48, blog: 36, x: 26 },
  exchange_listing: { exchange: 92, x: 75, blog: 64, official: 52, docs: 24 },
  founder_statement: { founder_post: 145, founder_x: 120, x: 86, blog: 58, official: 48, docs: 18 },
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
    founder_post: "A founder X post or reply is the strongest source for direct founder statement claims.",
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

function findProject(claim) {
  const lowerClaim = claim.toLowerCase();
  return projectRegistry.find((project) =>
    project.aliases.some((alias) => claimIncludesAlias(lowerClaim, alias)),
  );
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

function formatClaimType(category) {
  return claimTypeLabels[category] || category;
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
  if (receipt.type === "founder_post" && category === "founder_statement") score += 140;
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
  if (category === "founder_statement" && receipt.type === "founder_post") score += 36;
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
    if (category === "founder_statement") {
      return "CryptoRank can help confirm project identity, but founder comments must come from founder or official X.";
    }

    return "CryptoRank helps discover and verify early-stage projects before checking official channels.";
  }

  if (receipt.type === "search") {
    if (category === "founder_statement") {
      return "This route prioritizes X because founder comments, replies, and hints usually live there.";
    }

    return "This route helps find official sources for projects outside the current registry.";
  }

  const profile = sourceReasonProfiles[category] || sourceReasonProfiles.airdrop_rumor;
  return profile[receipt.type] || "This official source is useful evidence for this claim type.";
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

function getReceiptUrlForGenLayer(receipt) {
  if (!receipt) {
    return "";
  }

  return receipt.genlayerUrl || receipt.url;
}

function chooseGenLayerReceipt(receipts) {
  return receipts.find((receipt) => canGenLayerFetchReceipt(receipt)) || null;
}

function makeScoutStatus(project, category, bestReceipt, genlayerReceipt) {
  if (!bestReceipt) {
    return `Found ${project.name}, but no official receipt is registered yet.`;
  }

  if (!genlayerReceipt || isSameReceipt(bestReceipt, genlayerReceipt)) {
    if (!genlayerReceipt && bestReceipt.discoveryOnly) {
      return `Prepared ${bestReceipt.title} as a discovery route. Verify an official receipt before GenLayer judges.`;
    }

    return `Picked ${bestReceipt.title} as the strongest ${formatClaimType(category).toLowerCase()} receipt.`;
  }

  return `Picked ${bestReceipt.title} as the strongest signal. GenLayer will fetch ${genlayerReceipt.title}.`;
}

function makeFounderScout(research, category) {
  if (category !== "founder_statement") {
    return null;
  }

  const receipts = research.receipts || [];
  const projectName = research.projectName || "";
  const identityReceipt =
    receipts.find((receipt) => receipt.type === "directory") ||
    receipts.find((receipt) => ["official", "docs", "blog", "github"].includes(receipt.type));
  const founderReceipt = receipts.find((receipt) => receipt.type === "founder_x");
  const founderPost = receipts.find((receipt) => receipt.type === "founder_post");
  const founderSearch = receipts.find(
    (receipt) => receipt.type === "search" && receipt.title.toLowerCase().includes("founder"),
  );
  const officialX = receipts.find((receipt) => receipt.type === "x");
  const claimReceipt = research.genlayerReceipt || null;
  const hasKnownFounder = Boolean((founderReceipt && !founderReceipt.discoveryOnly) || founderPost);
  const candidateRoute = founderReceipt || founderPost || founderSearch || officialX || null;

  let mode = "x-first scout";
  let summary = "Founder claims need a verified founder or official X receipt before GenLayer judges.";

  if (research.awaitingScout) {
    mode = "waiting";
    summary = "Click Scout Claim to prepare founder identity and claim-receipt checks.";
  } else if (research.xScout && !research.xScout.enabled) {
    mode = "crawler pending";
    summary = research.xScout.status;
  } else if (claimReceipt) {
    mode = "receipt ready";
    summary = "A GenLayer-readable receipt is selected. GenLayer can judge after the contract fetches it.";
  } else if (research.xScout && research.xScout.enabled) {
    mode = "crawler ran";
    summary = research.xScout.status;
  } else if (hasKnownFounder) {
    mode = "founder mapped";
    summary = "Founder account is mapped. Find the exact post, reply, or quote before GenLayer judges.";
  } else if (candidateRoute) {
    mode = "candidate route";
    summary = "Founder/source candidates are prepared. Verify identity, then find the exact claim receipt.";
  }

  return {
    mode,
    summary,
    stages: [
      {
        label: "Project identity",
        value: projectName ? `Likely project: ${projectName}` : "Project not detected yet",
        detail: identityReceipt
          ? `Identity helper: ${identityReceipt.title}`
          : "Use official project links or discovery indexes to confirm the project.",
        status: projectName ? "ready" : "pending",
      },
      {
        label: "Founder candidate",
        value: candidateRoute ? candidateRoute.title : "Founder X account not selected yet",
        detail: hasKnownFounder
          ? "Known founder mapping found. A specific post or reply is still needed for judgment."
          : "X-first discovery should find the founder account before any claim judgment.",
        status: hasKnownFounder ? "ready" : candidateRoute ? "candidate" : "pending",
      },
      {
        label: "Identity verification",
        value: hasKnownFounder
          ? "Founder identity is mapped"
          : officialX
            ? "Official X can help verify founder identity"
            : "Needs official bio, team page, or project mention",
        detail: "Avoid random X results. Confirm the founder through an official project signal or linked bio.",
        status: hasKnownFounder ? "ready" : officialX ? "candidate" : "pending",
      },
      {
        label: "Claim receipt",
        value: claimReceipt ? claimReceipt.title : "Pending founder post, reply, quote, or official post",
        detail: claimReceipt
          ? "This automated receipt can be fetched by GenLayer for FACT, CAP, or UNCLEAR."
          : "GenLayer waits until there is a real source URL, not just a search page.",
        status: claimReceipt ? "ready" : "pending",
      },
    ],
  };
}

function withFounderScout(research, category) {
  return {
    ...research,
    founderScout: makeFounderScout(research, category),
  };
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

function scoutClaim(claim, category, projectId = "auto") {
  const project = resolveProject(claim, projectId);

  if (!claim.trim()) {
    return withFounderScout({
      mode: "claim needed",
      status: "Write a claim first, then the scout can look for official receipts.",
      judgeStandard: makeJudgeStandard(undefined, category),
      receipts: [],
      sourceUrls: [],
      genlayerSourceUrls: [],
      bestReceipt: null,
      genlayerReceipt: null,
      projectId: "auto",
      projectName: "",
    }, category);
  }

  if (!project) {
    return withFounderScout({
      mode: "needs live search",
      status:
        "Live search is not connected for this project yet. The next version will check official docs, blogs, social posts, exchanges, regulators, and credible news.",
      judgeStandard: makeJudgeStandard(undefined, category),
      receipts: [],
      sourceUrls: [],
      genlayerSourceUrls: [],
      bestReceipt: null,
      genlayerReceipt: null,
      projectId: "auto",
      projectName: "",
    }, category);
  }

  const receipts = rankReceipts(getProjectReceipts(project, claim, category), claim, category);

  const bestReceipt = receipts[0] || null;
  const genlayerReceipt = chooseGenLayerReceipt(receipts);

  return withFounderScout({
    mode: `${project.name} source scout`,
    status: makeScoutStatus(project, category, bestReceipt, genlayerReceipt),
    judgeStandard: makeJudgeStandard(project, category),
    receipts,
    sourceUrls: receipts.map((receipt) => receipt.url),
    genlayerSourceUrls: genlayerReceipt ? [getReceiptUrlForGenLayer(genlayerReceipt)] : [],
    bestReceipt,
    genlayerReceipt,
    projectId: project.id,
    projectName: project.name,
  }, category);
}

function cleanHtmlText(value) {
  return value
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

function resolveDuckDuckGoUrl(url) {
  const cleanUrl = url.replace(/&amp;/g, "&");

  try {
    const parsed = new URL(cleanUrl);
    const redirectedUrl = parsed.searchParams.get("uddg");
    return redirectedUrl || cleanUrl;
  } catch {
    return cleanUrl;
  }
}

function fetchText(url, timeoutMs = 5000) {
  return new Promise((resolve) => {
    const request = https.get(
      url,
      {
        headers: {
          "user-agent": "Mozilla/5.0 (compatible; CapOrFactSourceScout/1.0)",
          accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
        timeout: timeoutMs,
      },
      (response) => {
        let body = "";

        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          if (body.length < 350000) {
            body += chunk;
          }
        });
        response.on("end", () => resolve(body));
      },
    );

    request.on("timeout", () => {
      request.destroy();
      resolve("");
    });
    request.on("error", () => resolve(""));
  });
}

async function searchWeb(query, limit = 4) {
  const searchUrl = `https://duckduckgo.com/html/?${new URLSearchParams({ q: query }).toString()}`;
  const html = await fetchText(searchUrl);
  const results = [];
  const pattern = /<a[^>]+class="result__a"[^>]+href="([^"]+)"[^>]*>(.*?)<\/a>/gis;
  let match;

  while ((match = pattern.exec(html)) && results.length < limit) {
    const url = resolveDuckDuckGoUrl(match[1]);
    const title = cleanHtmlText(match[2]);

    if (url && title) {
      results.push({ title, url });
    }
  }

  return results;
}

function fetchJson(url, headers = {}, timeoutMs = 8000) {
  return new Promise((resolve, reject) => {
    const request = https.get(
      url,
      {
        headers: {
          accept: "application/json",
          "user-agent": "CapOrFactSourceScout/1.0",
          ...headers,
        },
        timeout: timeoutMs,
      },
      (response) => {
        let body = "";

        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          if (body.length < 800000) {
            body += chunk;
          }
        });
        response.on("end", () => {
          if (response.statusCode < 200 || response.statusCode >= 300) {
            const error = new Error(`Request failed with status ${response.statusCode}`);
            error.statusCode = response.statusCode;
            error.responseBody = body.slice(0, 1200);
            reject(error);
            return;
          }

          try {
            resolve(JSON.parse(body || "{}"));
          } catch (error) {
            reject(error);
          }
        });
      },
    );

    request.on("timeout", () => {
      request.destroy();
      reject(new Error("Request timed out"));
    });
    request.on("error", reject);
  });
}

function describeXApiError(error) {
  const statusCode = error && error.statusCode;

  if (statusCode === 401) {
    return "X crawler is waiting for a valid API token.";
  }

  if (statusCode === 403) {
    return "X crawler is waiting for X search API access or credits.";
  }

  if (statusCode === 429) {
    return "X crawler hit the current rate limit. Try again later.";
  }

  return `X crawler could not complete: ${error.message}`;
}

async function xApiGet(pathname, params = {}) {
  if (!X_BEARER_TOKEN) {
    return null;
  }

  const requestUrl = new URL(pathname, X_API_BASE_URL);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      requestUrl.searchParams.set(key, value);
    }
  });

  return fetchJson(requestUrl, {
    authorization: `Bearer ${X_BEARER_TOKEN}`,
  });
}

function extractXHandle(url) {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace(/^www\./, "").toLowerCase();

    if (hostname !== "x.com" && hostname !== "twitter.com") {
      return "";
    }

    const handle = parsed.pathname.split("/").filter(Boolean)[0] || "";
    const blockedHandles = new Set(["home", "i", "intent", "search", "share"]);

    if (!handle || blockedHandles.has(handle.toLowerCase())) {
      return "";
    }

    return handle;
  } catch {
    return "";
  }
}

function getKnownProjectByName(projectName) {
  const normalized = String(projectName || "").toLowerCase();

  return projectRegistry.find(
    (project) =>
      project.name.toLowerCase() === normalized ||
      project.id === normalized ||
      project.aliases.some((alias) => alias.toLowerCase() === normalized),
  );
}

function getOfficialXHandle(projectName) {
  const project = getKnownProjectByName(projectName);
  const xUrl = project ? officialXByProject[project.id] : "";

  return xUrl ? extractXHandle(xUrl) : "";
}

function claimKeywords(claim) {
  const stopWords = new Set([
    "has",
    "have",
    "did",
    "does",
    "the",
    "for",
    "and",
    "with",
    "that",
    "this",
    "from",
    "official",
    "founder",
    "cofounder",
    "co-founder",
  ]);

  return String(claim || "")
    .toLowerCase()
    .replace(/[^a-z0-9_ ]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length >= 4 && !stopWords.has(word))
    .slice(0, 8);
}

function isFounderLikeUser(user, projectName) {
  const haystack = `${user.name || ""} ${user.username || ""} ${user.description || ""}`.toLowerCase();
  const normalizedProject = String(projectName || "").toLowerCase();
  const founderSignal = /\b(founder|cofounder|co-founder|ceo|builder|creator)\b/.test(haystack);
  const projectSignal = normalizedProject && haystack.includes(normalizedProject);

  return founderSignal && projectSignal;
}

function compactIdentityText(text) {
  return String(text || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function isLikelyOfficialProjectUser(user, projectName) {
  const compactProject = compactIdentityText(projectName);
  const compactName = compactIdentityText(`${user.name || ""} ${user.username || ""}`);
  const description = String(user.description || "").toLowerCase();
  const hasProjectName = compactProject && (compactName.includes(compactProject) || description.includes(String(projectName || "").toLowerCase()));
  const officialSignal =
    Boolean(user.verified || user.verified_type) ||
    /\b(official|foundation|protocol|network|labs|mainnet|chain|ai|web3)\b/.test(description);

  return Boolean(hasProjectName && officialSignal);
}

function scoreXUserCandidate(user, projectName) {
  let score = 0;
  const haystack = `${user.name || ""} ${user.username || ""} ${user.description || ""}`.toLowerCase();
  const compactProject = compactIdentityText(projectName);
  const compactProfile = compactIdentityText(`${user.name || ""} ${user.username || ""}`);

  if (compactProject && compactProfile.includes(compactProject)) score += 36;
  if (projectName && haystack.includes(String(projectName).toLowerCase())) score += 34;
  if (/\b(founder|cofounder|co-founder|ceo|creator)\b/.test(haystack)) score += 46;
  if (/\b(official|foundation|protocol|network|labs)\b/.test(haystack)) score += 24;
  if (user.verified || user.verified_type) score += 10;

  return score;
}

async function searchXUserCandidates(projectName) {
  const queries = [
    `${projectName} founder`,
    `${projectName} cofounder`,
    `${projectName} co-founder`,
    `${projectName} CEO`,
    `${projectName} official`,
  ];
  const byUsername = new Map();

  for (const query of queries) {
    try {
      const payload = await xApiGet("/2/users/search", {
        query,
        max_results: "10",
        "user.fields": "description,entities,id,name,profile_image_url,public_metrics,url,username,verified,verified_type",
      });

      const users = payload && Array.isArray(payload.data) ? payload.data : [];

      users.forEach((user) => {
        const username = String(user.username || "").toLowerCase();

        if (!username) {
          return;
        }

        const score = scoreXUserCandidate(user, projectName);

        if (score < 58) {
          return;
        }

        const existing = byUsername.get(username);
        const candidate = {
          user,
          score,
          kind: isFounderLikeUser(user, projectName)
            ? "founder"
            : isLikelyOfficialProjectUser(user, projectName)
              ? "official"
              : "candidate",
          query,
        };

        if (!existing || existing.score < candidate.score) {
          byUsername.set(username, candidate);
        }
      });
    } catch {
      // User search is helpful but not required; tweet search can still run.
    }
  }

  return [...byUsername.values()].sort((a, b) => b.score - a.score).slice(0, 5);
}

function makeXPostUrl(username, tweetId) {
  return `https://x.com/${username}/status/${tweetId}`;
}

function makeXReceiptGatewayUrl(tweetId, publicBaseUrl = PUBLIC_BASE_URL) {
  const baseUrl = String(publicBaseUrl || "").replace(/\/$/, "");

  if (!baseUrl) {
    return "";
  }

  return `${baseUrl}/api/x-receipt/${encodeURIComponent(tweetId)}`;
}

async function fetchXPostReceipt(tweetId) {
  const payload = await xApiGet(`/2/tweets/${tweetId}`, {
    expansions: "author_id",
    "tweet.fields": "author_id,conversation_id,created_at,entities,public_metrics,referenced_tweets,text",
    "user.fields": "description,entities,name,public_metrics,url,username,verified,verified_type",
  });

  if (!payload || !payload.data) {
    return null;
  }

  const author = (payload.includes && payload.includes.users && payload.includes.users[0]) || null;
  const sourceUrl = author ? makeXPostUrl(author.username, payload.data.id) : `https://x.com/i/web/status/${payload.data.id}`;

  return {
    source_type: "x_post",
    source_url: sourceUrl,
    fetched_at: new Date().toISOString(),
    author: author
      ? {
          id: author.id,
          name: author.name,
          username: author.username,
          description: author.description || "",
          verified: Boolean(author.verified),
          verified_type: author.verified_type || "",
        }
      : null,
    post: {
      id: payload.data.id,
      text: payload.data.text || "",
      created_at: payload.data.created_at || "",
      conversation_id: payload.data.conversation_id || "",
      public_metrics: payload.data.public_metrics || {},
      referenced_tweets: payload.data.referenced_tweets || [],
    },
  };
}

async function scoutFounderXReceipts(claim, projectName, receipts, seenUrls, publicBaseUrl = PUBLIC_BASE_URL) {
  if (!X_BEARER_TOKEN) {
    return {
      enabled: false,
      status: "Automated X crawling is waiting for data-provider access.",
      candidates: [],
      receipts: [],
    };
  }

  const officialHandle = getOfficialXHandle(projectName);
  const keywords = claimKeywords(claim).filter((word) => word !== projectName.toLowerCase());
  const keywordQuery = keywords.length ? keywords.slice(0, 5).join(" OR ") : "hint OR airdrop OR snapshot OR tge";
  const foundCandidates = [];
  const foundReceipts = [];
  const profileCandidates = await searchXUserCandidates(projectName);
  const trustedHandles = new Map();

  profileCandidates.forEach((candidate) => {
    const username = String(candidate.user.username || "").toLowerCase();

    if (!username) {
      return;
    }

    const isTrusted = candidate.kind === "founder" || candidate.kind === "official";
    const profileUrl = `https://x.com/${candidate.user.username}`;

    foundCandidates.push({
      name: candidate.user.name,
      username: candidate.user.username,
      url: profileUrl,
      reason:
        candidate.kind === "founder"
          ? "X user search found a founder-like profile linked to the project."
          : candidate.kind === "official"
            ? "X user search found an official-looking project profile."
            : "X user search found a possible profile candidate, but it still needs verification.",
    });

    const profileReceipt = addDiscoveredReceipt(
      receipts,
      seenUrls,
      `${candidate.user.name} X profile`,
      profileUrl,
      candidate.kind === "founder" ? "founder_x" : "x",
      candidate.kind === "founder" ? 112 : 88,
      true,
    );

    if (profileReceipt) {
      profileReceipt.reason = foundCandidates[foundCandidates.length - 1].reason;
    }

    if (isTrusted) {
      trustedHandles.set(username, candidate.kind);
    }
  });

  const queries = [];

  if (officialHandle) {
    trustedHandles.set(officialHandle.toLowerCase(), "official");
  }

  trustedHandles.forEach((kind, username) => {
    queries.push(`from:${username} (${keywordQuery}) -is:retweet`);
  });

  queries.push(
    `"${projectName}" (founder OR cofounder OR "co-founder" OR CEO) (${keywordQuery}) -is:retweet`,
    `"${projectName}" (${keywordQuery}) -is:retweet`,
  );

  if (officialHandle && !queries.some((query) => query.startsWith(`from:${officialHandle.toLowerCase()}`))) {
    queries.unshift(`from:${officialHandle} (${keywordQuery}) -is:retweet`);
  }

  for (const query of queries) {
    let payload = null;

    try {
      payload = await xApiGet("/2/tweets/search/recent", {
        query,
        max_results: "10",
        expansions: "author_id",
        "tweet.fields": "author_id,conversation_id,created_at,entities,public_metrics,referenced_tweets,text",
        "user.fields": "description,entities,name,public_metrics,url,username,verified,verified_type",
      });
    } catch (error) {
      return {
        enabled: true,
        status: describeXApiError(error),
        candidates: foundCandidates,
        receipts: foundReceipts,
      };
    }

    const tweets = payload && Array.isArray(payload.data) ? payload.data : [];
    const users = new Map(
      ((payload && payload.includes && payload.includes.users) || []).map((user) => [user.id, user]),
    );

    for (const tweet of tweets) {
      const author = users.get(tweet.author_id);

      if (!author) {
        continue;
      }

      const isOfficial = officialHandle && author.username.toLowerCase() === officialHandle.toLowerCase();
      const isFounder = isFounderLikeUser(author, projectName);
      const trustedKind = trustedHandles.get(author.username.toLowerCase());
      const isTrustedProfile = trustedKind === "founder" || trustedKind === "official";
      const sourceUrl = makeXPostUrl(author.username, tweet.id);
      const gatewayUrl = makeXReceiptGatewayUrl(tweet.id, publicBaseUrl);

      if (isFounder || isOfficial || isTrustedProfile) {
        const receipt = addDiscoveredReceipt(
          receipts,
          seenUrls,
          `${author.name} X post`,
          sourceUrl,
          "founder_post",
          isFounder ? 132 : 118,
        );

        if (!receipt) {
          continue;
        }

        receipt.genlayerUrl = gatewayUrl || sourceUrl;
        receipt.reason = isFounder
          ? "Automated X crawl found a recent post by a founder-like account whose profile links the project."
          : trustedKind === "founder"
            ? "Automated X crawl found a recent post from a founder profile discovered by X user search."
            : "Automated X crawl found a recent official project X post related to the claim.";
        receipt.xAuthor = {
          name: author.name,
          username: author.username,
          verified: Boolean(author.verified),
          verifiedType: author.verified_type || "",
        };
        receipt.xPostId = tweet.id;
        foundReceipts.push(receipt);
      } else if (foundCandidates.length < 3) {
        foundCandidates.push({
          name: author.name,
          username: author.username,
          url: `https://x.com/${author.username}`,
          reason: "Mentioned in an X result, but founder identity is not verified from profile text.",
        });
      }
    }
  }

  return {
    enabled: true,
    status: foundReceipts.length
      ? `X crawler found ${foundReceipts.length} candidate receipt${foundReceipts.length === 1 ? "" : "s"}.`
      : foundCandidates.length
        ? `X crawler found ${foundCandidates.length} profile candidate${foundCandidates.length === 1 ? "" : "s"}, but no exact claim post yet.`
        : "X crawler ran, but did not find a verified founder or official post receipt yet.",
    candidates: foundCandidates,
    receipts: foundReceipts,
  };
}

function classifyDiscoveredUrl(url) {
  const lowerUrl = url.toLowerCase();

  if (lowerUrl.includes("x.com/") || lowerUrl.includes("twitter.com/")) return "x";
  if (lowerUrl.includes("cryptorank.io")) return "directory";
  if (lowerUrl.includes("github.com")) return "github";
  if (lowerUrl.includes("docs.") || lowerUrl.includes("/docs") || lowerUrl.includes("documentation")) return "docs";
  if (
    lowerUrl.includes("blog.") ||
    lowerUrl.includes("/blog") ||
    lowerUrl.includes("/news") ||
    lowerUrl.includes("mirror.xyz") ||
    lowerUrl.includes("medium.com")
  ) {
    return "blog";
  }

  return "official";
}

function classifyDiscoveredResult(title, url, query, category) {
  const discoveredType = classifyDiscoveredUrl(url);
  const haystack = `${title || ""} ${url || ""} ${query || ""}`.toLowerCase();

  if (
    category === "founder_statement" &&
    discoveredType === "x" &&
    /\b(founder|cofounder|co-founder|ceo|team|twitter|x account)\b/.test(haystack)
  ) {
    return "founder_x";
  }

  return discoveredType;
}

function addDiscoveredReceipt(receipts, seenUrls, title, url, sourceType, priority = 60, discoveryOnly = false) {
  const normalizedUrl = String(url || "").trim();
  const dedupeKey = normalizedUrl.replace(/\/$/, "").toLowerCase();

  if (!normalizedUrl || seenUrls.has(dedupeKey)) {
    return null;
  }

  seenUrls.add(dedupeKey);
  const receipt = {
    title,
    url: normalizedUrl,
    type: sourceType || classifyDiscoveredUrl(normalizedUrl),
    priority,
    discoveryOnly,
  };

  receipts.push(receipt);
  return receipt;
}

async function discoverProjectSources(claim, category, projectName, publicBaseUrl = PUBLIC_BASE_URL) {
  const cleanProjectName = String(projectName || "").trim();
  const receipts = [];
  const seenUrls = new Set();

  if (!cleanProjectName) {
    return withFounderScout({
      mode: "live discovery",
      status: "Name the project clearly so the scout can discover official sources.",
      judgeStandard: makeJudgeStandard(undefined, category),
      receipts: [],
      sourceUrls: [],
      genlayerSourceUrls: [],
      bestReceipt: null,
      genlayerReceipt: null,
      projectId: "discovery",
      projectName: "",
      needsLiveDiscovery: true,
    }, category);
  }

  if (category === "founder_statement") {
    const officialHandle = getOfficialXHandle(cleanProjectName);

    if (officialHandle) {
      addDiscoveredReceipt(
        receipts,
        seenUrls,
        `${cleanProjectName} official X`,
        `https://x.com/${officialHandle}`,
        "x",
        91,
      );
    }

    addDiscoveredReceipt(
      receipts,
      seenUrls,
      `Search founder X for ${cleanProjectName}`,
      `https://x.com/search?q=${encodeURIComponent(`${cleanProjectName} founder`)}`,
      "search",
      96,
      true,
    );
    addDiscoveredReceipt(
      receipts,
      seenUrls,
      `Search official X for ${cleanProjectName}`,
      `https://x.com/search?q=${encodeURIComponent(`${cleanProjectName} official`)}`,
      "search",
      90,
      true,
    );
    addDiscoveredReceipt(
      receipts,
      seenUrls,
      `CryptoRank identity check for ${cleanProjectName}`,
      `https://cryptorank.io/search?query=${encodeURIComponent(cleanProjectName)}`,
      "directory",
      30,
      true,
    );
  } else {
    addDiscoveredReceipt(
      receipts,
      seenUrls,
      `CryptoRank search for ${cleanProjectName}`,
      `https://cryptorank.io/search?query=${encodeURIComponent(cleanProjectName)}`,
      "directory",
      82,
      true,
    );
  }

  const searchPlan =
    category === "founder_statement"
      ? [
          [`${cleanProjectName} founder X account`, 92],
          [`${cleanProjectName} founder twitter`, 88],
          [`${cleanProjectName} official X crypto`, 84],
          [`${cleanProjectName} founder interview crypto`, 70],
          [`${cleanProjectName} official website crypto`, 56],
          [`${cleanProjectName} blog founder crypto`, 52],
          [`site:github.com ${cleanProjectName} crypto`, 40],
        ]
      : [
          [`${cleanProjectName} official website crypto`, 74],
          [`${cleanProjectName} official X crypto`, 76],
          [`${cleanProjectName} docs crypto`, 68],
          [`${cleanProjectName} blog news crypto`, 66],
          [`site:github.com ${cleanProjectName} crypto`, 62],
          [`site:cryptorank.io ${cleanProjectName}`, 80],
        ];

  for (const [query, priority] of searchPlan) {
    const results = await searchWeb(query, 3);

    results.forEach((result) => {
      addDiscoveredReceipt(
        receipts,
        seenUrls,
        result.title || `${cleanProjectName} source`,
        result.url,
        classifyDiscoveredResult(result.title, result.url, query, category),
        priority,
      );
    });
  }

  const xScout =
    category === "founder_statement"
      ? await scoutFounderXReceipts(claim, cleanProjectName, receipts, seenUrls, publicBaseUrl)
      : null;

  if (receipts.length === 1) {
    addDiscoveredReceipt(
      receipts,
      seenUrls,
      `Search official X for ${cleanProjectName}`,
      `https://x.com/search?q=${encodeURIComponent(`${cleanProjectName} official`)}`,
      "search",
      45,
      true,
    );
    if (category === "founder_statement") {
      addDiscoveredReceipt(
        receipts,
        seenUrls,
        `Search founder X for ${cleanProjectName}`,
        `https://x.com/search?q=${encodeURIComponent(`${cleanProjectName} founder`)}`,
        "search",
        48,
        true,
      );
    }
    addDiscoveredReceipt(
      receipts,
      seenUrls,
      `Search GitHub for ${cleanProjectName}`,
      `https://github.com/search?q=${encodeURIComponent(`${cleanProjectName} crypto`)}`,
      "search",
      40,
      true,
    );
  }

  const scoredReceipts = rankReceipts(receipts, claim, category);
  const bestReceipt = scoredReceipts[0] || null;
  const genlayerReceipt = chooseGenLayerReceipt(scoredReceipts);
  const status = genlayerReceipt
    ? `Discovered source candidates for ${cleanProjectName}. GenLayer will fetch ${genlayerReceipt.title}.`
    : category === "founder_statement"
      ? `Prepared X-first discovery routes for ${cleanProjectName}. Verify a founder or official X source before GenLayer judges.`
      : `Prepared discovery routes for ${cleanProjectName}. Verify an official source before GenLayer judges.`;

  return withFounderScout({
    mode: `${cleanProjectName} live discovery`,
    status,
    judgeStandard: makeJudgeStandard({ name: cleanProjectName }, category),
    receipts: scoredReceipts,
    sourceUrls: scoredReceipts.map((receipt) => receipt.url),
    genlayerSourceUrls: genlayerReceipt ? [getReceiptUrlForGenLayer(genlayerReceipt)] : [],
    bestReceipt,
    genlayerReceipt,
    projectId: "discovered",
    projectName: cleanProjectName,
    needsLiveDiscovery: true,
    xScout,
  }, category);
}

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  response.end(JSON.stringify(body, null, 2));
}

function getMimeType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const types = {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".svg": "image/svg+xml",
  };

  return types[extension] || "application/octet-stream";
}

async function readJsonBody(request) {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(chunk);
  }

  const rawBody = Buffer.concat(chunks).toString("utf-8");
  return rawBody ? JSON.parse(rawBody) : {};
}

async function serveStatic(requestUrl, response) {
  const pathname = requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname;
  const filePath = path.resolve(APP_DIR, `.${decodeURIComponent(pathname)}`);

  if (!filePath.startsWith(APP_DIR)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const file = await fs.readFile(filePath);
    response.writeHead(200, {
      "content-type": getMimeType(filePath),
      "cache-control": "no-store",
    });
    response.end(file);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
}

function getRequestBaseUrl(request) {
  const host = request.headers["x-forwarded-host"] || request.headers.host || "";
  const protocol = request.headers["x-forwarded-proto"] || "http";

  return host ? `${protocol}://${host}` : PUBLIC_BASE_URL;
}

const server = http.createServer(async (request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host || "localhost"}`);

  if (request.method === "GET" && requestUrl.pathname === "/api/health") {
    sendJson(response, 200, { ok: true, service: "cap-or-fact-scout" });
    return;
  }

  if (request.method === "GET" && requestUrl.pathname.startsWith("/api/x-receipt/")) {
    try {
      const tweetId = decodeURIComponent(requestUrl.pathname.replace("/api/x-receipt/", "")).trim();

      if (!tweetId) {
        sendJson(response, 400, { ok: false, error: "Missing X post id." });
        return;
      }

      if (!X_BEARER_TOKEN) {
        sendJson(response, 503, {
          ok: false,
          error: "X receipt gateway is not connected. Add X_BEARER_TOKEN on the server.",
        });
        return;
      }

      const receipt = await fetchXPostReceipt(tweetId);

      if (!receipt) {
        sendJson(response, 404, { ok: false, error: "X post receipt not found." });
        return;
      }

      sendJson(response, 200, { ok: true, receipt });
    } catch (error) {
      sendJson(response, 400, { ok: false, error: error.message });
    }
    return;
  }

  if (request.method === "POST" && requestUrl.pathname === "/api/discover") {
    try {
      const body = await readJsonBody(request);
      const claim = String(body.claim || "").trim();
      const category = String(body.category || "airdrop_rumor");
      const projectName = String(body.projectName || "").trim();
      const research = await discoverProjectSources(claim, category, projectName, getRequestBaseUrl(request));

      sendJson(response, 200, { ok: true, claim, category, projectName, research });
    } catch (error) {
      sendJson(response, 400, { ok: false, error: error.message });
    }
    return;
  }

  if (request.method === "POST" && requestUrl.pathname === "/api/scout") {
    try {
      const body = await readJsonBody(request);
      const claim = String(body.claim || "").trim();
      const category = String(body.category || "airdrop_rumor");
      const project = String(body.project || "auto");
      const research = scoutClaim(claim, category, project);

      sendJson(response, 200, { ok: true, claim, category, project, research });
    } catch (error) {
      sendJson(response, 400, { ok: false, error: error.message });
    }
    return;
  }

  if (request.method === "GET") {
    await serveStatic(requestUrl, response);
    return;
  }

  sendJson(response, 405, { ok: false, error: "Method not allowed" });
});

function startServer(port = PORT) {
  return server.listen(port, () => {
    console.log(`Cap or Fact running at http://localhost:${port}`);
  });
}

if (require.main === module) {
  startServer();
}

module.exports = {
  projectRegistry,
  discoverProjectSources,
  scoutClaim,
  server,
  startServer,
};
