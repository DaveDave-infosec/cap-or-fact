# Cap or Fact Demo Post

Use this when you are ready to post the first public build update.

## Short Post

I built Cap or Fact, a GenLayer-powered claim court for crypto rumors.

Drop a claim, let the app find an official receipt, and GenLayer judges it onchain: FACT, CAP, or UNCLEAR.

First Studio-tested case:

```text
Claim: Citrea has announced a TGE for a native Citrea token.
Receipt: Citrea official GitHub README.
Result: CAP.
Contract: 0x09845790DE3cF5C5F048C1a9a18B0317526A12f0
```

The contract fetched the receipt, the AI judge read it, and `get_result` returned a stored verdict.

## Main Thread

1. CT is full of "confirmed" claims with no receipts, so I built Cap or Fact on GenLayer.

2. The idea is simple:

```text
claim -> official receipt -> GenLayer fetch -> AI judgment -> onchain verdict
```

3. The verdict options are:

```text
FACT
CAP
UNCLEAR
```

4. First Studio-tested case:

```text
Citrea has announced a TGE for a native Citrea token.
```

5. Evidence Scout picked Citrea's official GitHub README as the strongest machine-readable receipt.

6. GenLayer fetched the receipt, the AI judge read it, and the contract returned:

```text
CAP
```

7. Proof address:

```text
0x09845790DE3cF5C5F048C1a9a18B0317526A12f0
```

8. The current MVP uses one official receipt per case. The next upgrade is multi-receipt packs and live source discovery, so users can ask about more projects without hunting links manually.

9. Why this is interesting to me:

Crypto already runs on claims. GenLayer makes it possible to turn those claims into source-backed cases instead of endless timeline arguments.

10. Built with a public app view and a builder view. Public users see the case, receipt status, and verdict. Builder mode shows the Studio payload and method flow.

## Screenshot Captions

Use these captions if you post images with the thread:

```text
1. Cap or Fact public app: write a claim and scout official receipts.
```

```text
2. Citrea case: GenLayer-verified CAP result from an official receipt.
```

```text
3. Case Feed: recent claims with their evidence and verdict status.
```

```text
4. GenLayer Studio: AI Simple V1 contract with fetch_receipt, judge_with_ai, and get_result.
```

## Builder DM Pitch

I built a GenLayer dapp concept called Cap or Fact: an onchain claim court for crypto rumors.

The MVP scouts official receipts, sends the best source to a GenLayer Intelligent Contract, fetches the source, and stores a FACT/CAP/UNCLEAR verdict.

The first Studio-tested proof is a Citrea TGE claim that returned CAP:

```text
0x09845790DE3cF5C5F048C1a9a18B0317526A12f0
```

I am expanding it toward live source discovery and multi-receipt cases.

## Demo Checklist Before Posting

- Public app URL opens without `?builder=true`.
- Builder payload is hidden in public mode.
- Citrea proof strip shows the deployed address.
- Project and Claim Type are separate fields.
- `Scout Claim` works across the curated starter registry.
- Case Feed keeps only the last five scouted claims.
- `Copy Share Text` produces a clean post.

## V2 Update Blurb

Next version: multi-receipt claim packs.

```text
claim -> several official receipts -> GenLayer fetches them -> AI returns one verdict
```

That will make Cap or Fact less dependent on one source and closer to a real claim court.
