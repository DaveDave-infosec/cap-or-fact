# Cap or Fact

A GenLayer-powered claim court for crypto rumors and internet receipts.

Cap or Fact lets someone enter a claim, finds an official receipt, and prepares a GenLayer case that can return:

- `FACT` - the source supports the claim.
- `CAP` - the source contradicts the claim.
- `UNCLEAR` - the source is not strong enough to judge.

The first niche is crypto claims people argue about every day: airdrops, snapshots, token/TGE rumors, exchange listings, founder statements, partnerships, funding rounds, roadmap promises, grant deadlines, security incidents, protocol metrics, and regulatory claims.

## Why This Fits GenLayer

Crypto truth is often messy, public, and source-based.

Examples:

- "The team confirmed an airdrop snapshot."
- "The founder said there will be no token."
- "The tokenomics page is live."
- "The grant deadline has passed."
- "The exchange listed this token today."

Normal smart contracts are not built to read websites and reason over receipts. GenLayer is a good fit because an Intelligent Contract can fetch public source text, use AI judgment, and store the verdict onchain.

## Current Proof

The current Studio-tested contract is:

```text
contracts/cap_or_fact_ai_simple_v1.py
```

Deployed Studio proof:

```text
0x09845790DE3cF5C5F048C1a9a18B0317526A12f0
```

Tested claim:

```text
Citrea has announced a TGE for a native Citrea token.
```

Receipt:

```text
https://raw.githubusercontent.com/chainwayxyz/citrea/nightly/README.md
```

Studio result:

```text
verdict: CAP | summary: AI verdict: the fetched source contradicts the claim.
```

That proves the core loop works: set a case, fetch an official receipt, ask the AI judge, and read the stored verdict.

## How The Demo Works

1. A user writes a claim.
2. The app keeps Project and Claim Type separate.
3. Evidence Scout uses the selected project or auto-detects one from the claim.
4. Claim Quality checks whether the claim is judgeable.
5. Evidence Scout picks the strongest official signal from the registry or live discovery.
6. The app separates:
   - primary signal: the strongest public evidence, often official X.
   - GenLayer receipt: the cleaner source the contract should fetch.
7. The app prepares the GenLayer case.
8. In Studio, the builder runs:
   - `set_case`
   - `fetch_receipt`
   - `judge_with_ai`
   - `get_result`
9. The public UI shows the claim, receipt status, and verdict state without exposing raw builder payloads.

Public users see the polished app. Builder mode is only for testing:

```text
http://localhost:4173?builder=true
```

## Receipt Scout V1

The first scout uses a curated registry for:

- Base
- Polymarket
- OpenSea
- GenLayer
- Arc
- Sentient
- Citrea
- Monad
- MegaETH
- Berachain
- Initia
- Eclipse
- Succinct
- Movement
- Espresso
- Camp Network
- Story Protocol
- Hemi
- Botanix
- Somnia
- Rialo
- Seismic
- Fluent

The curated registry keeps known-project demos reliable while the live discovery layer handles unknown projects.

## Live Discovery V1

If a user types a project that is not in the registry, the app now:

1. extracts the likely project name from the claim.
2. shows production-safe discovery copy:

```text
Likely project: Noya. Verifying official sources before GenLayer can judge this claim.
```

3. starts with CryptoRank as the first discovery route.
4. then looks for official X, website, docs, blog/news, and GitHub candidates.
5. marks discovery-only routes separately from GenLayer-readable receipts.

CryptoRank is prioritized for early-stage and pre-token projects because CoinGecko and CoinMarketCap usually focus more on tokenized projects.

Founder-related claims trigger a stronger live discovery path. The scout searches the web for likely founder names, checks founder/team/X sources, then falls back to official project X, website, blog, docs, and GitHub. Known founder accounts can still be cached for faster demos, but the production path does not depend on manually registering every founder.

### Automated X Founder Scout

Founder claims use an X-first crawler when an X API bearer token is configured on the Node server.

The automated path is:

1. detect the likely project.
2. use Google Custom Search when configured to find likely founder names from web snippets.
3. use known official X handles when available.
4. search X profiles for founder names, cofounder, CEO, official, and project keywords.
5. search recent X posts from verified or project-linked founder/official candidates.
6. create a GenLayer-readable receipt gateway URL for the X post.
7. keep GenLayer waiting if only search routes are available.

Set these Render environment variables to enable the crawler:

```text
PUBLIC_BASE_URL=https://your-render-url
XAI_API_KEY=<optional xAI API key for Grok Scout>
XAI_MODEL=grok-4.20
X_BEARER_TOKEN=<your X API bearer token>
GOOGLE_SEARCH_API_KEY=<optional Google Custom Search API key>
GOOGLE_SEARCH_CX=<optional Google Programmable Search Engine id>
```

`X_API_BASE_URL` can be set if your X API provider uses a different compatible base URL. `XAI_API_BASE_URL` defaults to `https://api.x.ai/v1`.

If `GOOGLE_SEARCH_API_KEY` or `GOOGLE_SEARCH_CX` is missing, the app falls back to its basic web search route. If `X_BEARER_TOKEN` is missing, the app falls back to safe X discovery routes and clearly marks them as candidates instead of evidence.

If `XAI_API_KEY` is configured, Grok Scout runs first for founder/X-heavy claims. Grok searches X for exact posts, replies, quotes, founder handles, and official handles. The app still treats Grok as a receipt hunter, not the judge: GenLayer only judges after the app has a real fetchable receipt URL.

Important: Google Programmable Search should be configured to search the entire web. If it is restricted to a short list of sites, founder discovery will look weaker than normal Google Search.

Founder statements are intentionally strict. Google and X can discover candidates, but GenLayer only judges after the app has a real receipt URL, such as a founder post/reply gateway URL or an official project source. A `STRICT CHECK` state means the app avoided treating a search page or unverified profile as proof.

Project selection is separate from Claim Type. That means a user can choose:

```text
Project: MegaETH
Claim Type: Token / tokenomics
Claim: MegaETH has announced a TGE for a native token.
```

The Studio-tested contract still receives the same three values:

```text
claim, claim type, GenLayer-readable receipt URL
```

The project field helps the app choose better receipts before the case reaches GenLayer.

Production receipts can include official docs, official blogs, GitHub READMEs, exchange pages, regulator pages, and official X posts when they are available through a reliable URL or API.

## Source Ranking

Cap or Fact now ranks receipts by claim type instead of treating every claim like a docs lookup.

- Airdrop/TGE and snapshot claims favor official X/blog announcement sources first.
- Tokenomics claims favor token pages, docs, and GitHub READMEs.
- Exchange claims favor exchange pages, official X, and announcement blogs.
- Founder statements favor the founder's own X account first, then official X and announcement pages.
- Partnership and funding claims favor official X/blog posts and named partner/investor sources.
- Roadmap and grant claims favor official docs, blog posts, and program pages.
- Security claims favor status pages, official X, and postmortems.
- Revenue/TVL claims favor dashboards, analytics pages, and primary data.
- Regulatory claims favor regulator/court/government pages first.

If an official X source is not registered or is hard for GenLayer to fetch directly, the scout chooses the strongest fetchable official receipt, usually a blog, website, docs page, status page, or dashboard.

## Claim Quality

Before scouting, the app checks whether the claim is concrete enough to judge.

Examples:

```text
Monad airdrop?
```

This is too vague.

```text
Has Monad announced an official airdrop snapshot date?
```

This is judgeable.

The checker looks for a project, a concrete event, and wording like `announced`, `confirmed`, `published`, `listed`, `raised`, `completed`, or `denied`.

## Run Locally

If Node is available:

```text
npm start
```

If `npm` is not available on Windows, use the bundled Python runtime:

```text
& "C:\Users\daved\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe" server.py
```

Then open:

```text
http://localhost:4173
```

Public app:

```text
http://localhost:4173
```

Builder app:

```text
http://localhost:4173?builder=true
```

## Deploy

The simplest production deploy is Render.

1. Push this repo to GitHub.
2. Go to Render and create a new Web Service from the repo.
3. Use:

```text
Build command: leave empty
Start command: node server.js
Health check: /api/health
```

The included `render.yaml` has the same settings for blueprint-style deploys.

After deploy:

```text
Public app: https://your-render-url
Builder mode: https://your-render-url?builder=true
```

## Files

- `app/index.html` - app shell.
- `app/styles.css` - visual design.
- `app/app.js` - frontend behavior.
- `server.js` - Node scout server.
- `server.py` - Python scout server.
- `contracts/cap_or_fact_ai_simple_v1.py` - current Studio-tested AI contract.
- `contracts/cap_or_fact_multi_step_v2.py` - planned multi-receipt upgrade.
- `docs/genlayer-studio-test.md` - plain-English Studio walkthrough.
- `docs/beginner-guide.md` - concept guide.
- `docs/demo-post.md` - launch post/thread copy.
- `docs/production-checklist.md` - final deployment and sharing checklist.
- `examples/sample_claims.json` - sample cases.

## Demo Script

Best first demo:

```text
Citrea has announced a TGE for a native Citrea token.
```

Expected public result:

```text
CAP
```

Why it works well:

- The claim is easy for crypto people to understand.
- The receipt is official and machine-readable.
- The result is already Studio-tested.
- The deployed proof address can be shown publicly.

## Roadmap

Version 1:

- curated receipt scout
- claim quality checker
- primary signal vs GenLayer receipt split
- one official receipt per GenLayer case
- public app + builder mode
- Studio-tested Citrea proof

Version 2:

- stronger live source discovery
- multi-receipt receipt packs
- direct frontend-to-GenLayer flow
- public case links

Version 3:

- social feed
- share cards
- Farcaster/X-friendly flow
- receipt reputation and case history

## Short Pitch

Cap or Fact is an onchain claim court for crypto rumors. Drop a claim, let the app find official receipts, and GenLayer judges whether it is FACT, CAP, or UNCLEAR.
