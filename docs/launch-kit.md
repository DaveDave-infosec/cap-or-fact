# Cap or Fact Launch Kit

Use this when posting the public builder update.

## One-Line Pitch

Cap or Fact is an onchain claim court for crypto rumors: ask a claim, scout official receipts, and let GenLayer return FACT, CAP, or UNCLEAR.

## Short Launch Post

I built Cap or Fact, a GenLayer-powered claim court for crypto rumors.

Ask a claim. The app hunts for official receipts. GenLayer can fetch the receipt, read it with an AI judge, and store a FACT/CAP/UNCLEAR verdict onchain.

Live demo:
https://cap-or-fact-genlayer.onrender.com/

Studio-tested proof:
0x09845790DE3cF5C5F048C1a9a18B0317526A12f0

## Main X Thread

1. Crypto moves on claims.

"Snapshot happened."
"Founder hinted."
"Tokenomics are live."
"Exchange listing confirmed."

Most of the time, people argue without receipts.

So I built Cap or Fact.

2. Cap or Fact is a GenLayer-powered claim court for crypto rumors.

Flow:

```text
claim -> official receipt -> GenLayer fetch -> AI judgment -> onchain verdict
```

The verdict is one of:

```text
FACT
CAP
UNCLEAR
```

3. The current MVP scouts receipts for claims like:

- airdrops and TGE rumors
- snapshots
- token/tokenomics claims
- exchange listings
- founder statements
- partnerships
- funding rounds
- security incidents
- revenue/TVL claims
- regulatory claims

4. First Studio-tested case:

```text
Citrea has announced a TGE for a native Citrea token.
```

The app selected an official Citrea README as the GenLayer-readable receipt.

5. GenLayer fetched the source, the AI judge read it, and the contract stored:

```text
CAP
```

Proof:

```text
0x09845790DE3cF5C5F048C1a9a18B0317526A12f0
```

6. The important bit:

The app is not the final judge.

The app scouts receipts and prepares the case. GenLayer is the receipt-fetching and judgment layer.

7. Founder claims are deliberately strict.

If the app cannot find a real founder post, reply, quote, or official source URL, it refuses to treat search results as proof.

That is annoying sometimes, but it is the right guardrail.

8. Live demo:

https://cap-or-fact-genlayer.onrender.com/

Repo:

https://github.com/DaveDave-infosec/cap-or-fact

9. Next phase:

- direct app-to-GenLayer flow
- multi-receipt cases
- public case links
- better X/Grok source discovery
- shareable verdict cards

Building in public from here.

## Builder DM Pitch

I built a GenLayer dapp called Cap or Fact: an onchain claim court for crypto rumors.

The MVP scouts official receipts, prepares a GenLayer case, and uses an Intelligent Contract to fetch the source and store a FACT/CAP/UNCLEAR verdict.

Live demo:
https://cap-or-fact-genlayer.onrender.com/

Studio-tested proof:
0x09845790DE3cF5C5F048C1a9a18B0317526A12f0

I am pushing it toward direct app-to-GenLayer calls and multi-receipt cases next.

## Demo Claims

Use these for a quick public walkthrough:

```text
Citrea has announced a TGE for a native Citrea token.
```

```text
Has Monad announced an official airdrop snapshot date?
```

```text
Has Arbitrum announced an official airdrop snapshot date?
```

```text
Has Botanix Labs founder hinted at a big week?
```

```text
Has Sentient announced an official airdrop snapshot date?
```

## Screenshot Captions

```text
Cap or Fact public app: ask a crypto claim and scout official receipts.
```

```text
Evidence Scout separates primary signals from GenLayer-readable receipts.
```

```text
GenLayer-verified Citrea proof: the contract fetched the receipt and stored CAP.
```

```text
Case Feed keeps recent claims visible without exposing builder payloads.
```

## What To Say If Someone Asks About Strict Founder Checks

Founder claims require an exact source, not just a search result.

Cap or Fact can discover likely founder profiles with Google, X, and Grok, but GenLayer only judges once there is a real receipt URL such as a founder post, reply, quote, or official project source.
