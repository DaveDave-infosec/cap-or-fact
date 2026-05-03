const fs = require("node:fs/promises");
const https = require("node:https");
const http = require("node:http");
const path = require("node:path");
const { URL } = require("node:url");

const PORT = Number(process.env.PORT || 4173);
const APP_DIR = path.join(__dirname, "app");

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
    return {
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
    };
  }

  if (!project) {
    return {
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
    };
  }

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
    return;
  }

  seenUrls.add(dedupeKey);
  receipts.push({
    title,
    url: normalizedUrl,
    type: sourceType || classifyDiscoveredUrl(normalizedUrl),
    priority,
    discoveryOnly,
  });
}

async function discoverProjectSources(claim, category, projectName) {
  const cleanProjectName = String(projectName || "").trim();
  const receipts = [];
  const seenUrls = new Set();

  if (!cleanProjectName) {
    return {
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
    };
  }

  addDiscoveredReceipt(
    receipts,
    seenUrls,
    `CryptoRank search for ${cleanProjectName}`,
    `https://cryptorank.io/search?query=${encodeURIComponent(cleanProjectName)}`,
    "directory",
    82,
    true,
  );

  const searchPlan = [
    [`${cleanProjectName} official website crypto`, 74],
    [`${cleanProjectName} official X crypto`, 76],
    [`${cleanProjectName} docs crypto`, 68],
    [`${cleanProjectName} blog news crypto`, 66],
    [`site:github.com ${cleanProjectName} crypto`, 62],
    [`site:cryptorank.io ${cleanProjectName}`, 80],
  ];

  if (category === "founder_statement") {
    searchPlan.unshift(
      [`${cleanProjectName} founder X account`, 88],
      [`${cleanProjectName} founder twitter`, 84],
    );
  }

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
    : `Prepared discovery routes for ${cleanProjectName}. Verify an official source before GenLayer judges.`;

  return {
    mode: `${cleanProjectName} live discovery`,
    status,
    judgeStandard: makeJudgeStandard({ name: cleanProjectName }, category),
    receipts: scoredReceipts,
    sourceUrls: scoredReceipts.map((receipt) => receipt.url),
    genlayerSourceUrls: genlayerReceipt ? [genlayerReceipt.url] : [],
    bestReceipt,
    genlayerReceipt,
    projectId: "discovered",
    projectName: cleanProjectName,
    needsLiveDiscovery: true,
  };
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

const server = http.createServer(async (request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host || "localhost"}`);

  if (request.method === "GET" && requestUrl.pathname === "/api/health") {
    sendJson(response, 200, { ok: true, service: "cap-or-fact-scout" });
    return;
  }

  if (request.method === "POST" && requestUrl.pathname === "/api/discover") {
    try {
      const body = await readJsonBody(request);
      const claim = String(body.claim || "").trim();
      const category = String(body.category || "airdrop_rumor");
      const projectName = String(body.projectName || "").trim();
      const research = await discoverProjectSources(claim, category, projectName);

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
