# Production Checklist

Use this before sharing Cap or Fact publicly.

## App Health

- Public URL opens without `?builder=true`.
- Builder payload is hidden in public mode.
- Logo and hero text render cleanly on desktop and mobile.
- Claim history buttons work: back, forward, reset.
- Case Feed stores only the last five scouted cases.
- Clear History removes the visible feed and local history.
- Copy Share Text returns clean public-facing copy.

## Render

Set these environment variables in Render:

```text
PUBLIC_BASE_URL=https://your-render-url.onrender.com
X_BEARER_TOKEN=<optional X API bearer token>
GOOGLE_SEARCH_API_KEY=<optional Google Custom Search API key>
GOOGLE_SEARCH_CX=<optional Google Programmable Search Engine id>
```

Use:

```text
Start command: node server.js
Health check path: /api/health
```

## Google Search Setup

If using Google Programmable Search:

- Configure it to search the entire web, not only selected sites.
- Keep SafeSearch off unless you specifically want filtered results.
- Store the search engine id as `GOOGLE_SEARCH_CX`.
- Store the API key as `GOOGLE_SEARCH_API_KEY`.

Google Search is used for source discovery. GenLayer should still judge from real receipts, not from a Google search page.

## Known Limitation

Founder statements are intentionally strict.

The app may discover project/founder candidates from Google or X, but GenLayer should only judge after there is a real receipt URL, such as:

- a founder X post or reply fetched through the receipt gateway.
- an official project X post.
- an official blog, docs, website, or team page that directly supports the claim.

If Founder Scout shows `STRICT CHECK`, it means the app did not find a verified founder profile plus exact post/reply receipt yet. This is not a fatal app error; it is the guardrail that prevents random X/search results from becoming proof.

## Best Demo

Use the Studio-tested case first:

```text
Claim: Citrea has announced a TGE for a native Citrea token.
Receipt: https://raw.githubusercontent.com/chainwayxyz/citrea/nightly/README.md
Result: CAP
Contract: 0x09845790DE3cF5C5F048C1a9a18B0317526A12f0
```

Then test normal non-founder categories:

- airdrop/TGE rumor.
- snapshot confirmation.
- token/tokenomics claim.
- exchange listing.
- funding/raise claim.
- security incident.
