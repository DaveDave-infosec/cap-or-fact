# Testing Cap or Fact In GenLayer Studio

This is the plain-English Studio test path for the version that already worked.

## What You Are Testing

You are checking whether the contract can:

1. receive a claim
2. receive an auto-found receipt link
3. open that link
4. store the fetched receipt text
5. save `FACT`, `CAP`, or `UNCLEAR`

## The Two Things You Need

**Contract file**

`contracts/cap_or_fact_ai_simple_v1.py`

This is the current Studio-tested AI contract.

The multi-receipt versions are saved for later, but Studio is currently rejecting their schema shape. Use the simple one-receipt AI contract as the official demo path.

**Known deployed test address**

```text
0x09845790DE3cF5C5F048C1a9a18B0317526A12f0
```

**Contract case**

Open the local app and click `Copy Contract Case`.

That gives the starting values for the contract:

- claim
- claim type
- source URL

## Step By Step

1. Open [GenLayer Studio](https://studio.genlayer.com/).
2. In Studio, open the contracts area.
3. Create a new contract or use `Add From File`.
4. Upload or paste `contracts/cap_or_fact_ai_simple_v1.py`.
5. Open the contract in Studio.
6. There should be no constructor inputs.
7. Click `Deploy`.
8. After deployment, find `Write Methods`.
9. Open `set_case`.
10. Paste the claim, claim type, and source URL.
11. Run `set_case`.
12. Open `fetch_receipt`.
13. Run `fetch_receipt`.
14. Open `judge_with_ai`.
15. Run `judge_with_ai`.
16. After it finishes, go to `Read Methods`.
17. Run `get_result`.

## Citrea Test Values

For `set_case`, use:

**claim**

```text
Citrea has announced a TGE for a native Citrea token.
```

**claim type**
This is the claim type field in the app.

```text
airdrop_rumor
```

**source_url**

Paste this one official URL:

```text
https://raw.githubusercontent.com/chainwayxyz/citrea/nightly/README.md
```

Keep this field as one URL only for now. Do not paste multiple links in the current Studio-tested version.

## What A Good Result Looks Like

For the current Citrea demo, we expect something close to:

```text
verdict: CAP | summary: AI verdict: the fetched source contradicts the claim.
```

That means GenLayer fetched the official receipt, the AI judge read it, and the contract stored the result.

## What If It Fails?

If deployment fails before you see any inputs, refresh Studio and re-open the contract. This version has no constructor inputs, which avoids the most common schema issue.

If `judge_with_ai` fails, the issue is probably web access, validator setup, or the prompt/AI call.

If the verdict is weird, that is useful too. It tells us we need to improve the prompt or source selection.

## Fallback Web Test

If `fetch_receipt` does not appear in Studio, upload:

`contracts/fetch_citrea_receipt.py`

Then deploy it and run:

1. `fetch_citrea_docs`
2. `show_content`

This tiny contract only tests whether Studio can fetch the Citrea docs page.

## Cap Or Fact Web V1

After the fallback web test works, upload:

`contracts/cap_or_fact_web_v1.py`

Deploy it, then run:

1. `set_case`
2. `fetch_receipt`
3. `judge`
4. `get_case`

Use these values for `set_case`:

**claim**

```text
Citrea has announced a TGE for a native Citrea token.
```

**claim type**

```text
airdrop_rumor
```

**source_url**

```text
https://raw.githubusercontent.com/chainwayxyz/citrea/nightly/README.md
```

This version uses a simple keyword judge. It is not the final AI judge yet.

## Cap Or Fact AI Simple V1

After Web V1 returns the expected `CAP` verdict, upload:

`contracts/cap_or_fact_ai_simple_v1.py`

Deploy it, then run:

1. `set_case`
2. `fetch_receipt`
3. `judge_with_ai`
4. `get_result`

Use the same values:

**claim**

```text
Citrea has announced a TGE for a native Citrea token.
```

**claim type**

```text
airdrop_rumor
```

**source_url**

```text
https://raw.githubusercontent.com/chainwayxyz/citrea/nightly/README.md
```

This version lets the AI judge read the fetched receipt instead of using simple keyword rules.

The richer JSON-output AI version is saved as `contracts/cap_or_fact_ai_v1.py`, but Studio may reject its schema while we are still testing. Use the simple one-word verdict version first.

If Studio does not show `get_result`, keep Web V1 as the fallback Studio demo and use AI Simple V1 as the next implementation target.

## Planned: Multi-Receipt V2

These contracts are experimental:

- `contracts/cap_or_fact_multi_step_v2.py`
- `contracts/cap_or_fact_multi_simple_v2.py`
- `contracts/cap_or_fact_multi_v2.py`

Studio currently rejects their schema shape, so do not use them as the main demo path yet.

The product plan is still right:

```text
claim -> several official receipts -> GenLayer fetches them -> AI returns one verdict
```

For now, the official proof is one receipt end to end.
