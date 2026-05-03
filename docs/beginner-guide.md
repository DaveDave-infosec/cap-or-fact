# Cap or Fact Beginner Guide

Cap or Fact is an onchain claim checker.

Someone posts a claim. The app finds official receipts. The contract checks those links. Then GenLayer judges it:

- `FACT` - the sources support the claim.
- `CAP` - the sources contradict the claim.
- `UNCLEAR` - the sources are not strong enough either way.

## Why This Is Easier To Understand

You already know the social behavior:

> "This project confirmed an airdrop."

> "This founder said there will be no token."

> "This exchange listed the token today."

People argue about claims like this every day. Cap or Fact turns that argument into a GenLayer case with receipts.

## What GenLayer Adds

A normal smart contract is bad at messy internet truth.

GenLayer helps because it can:

1. Read public web pages.
2. Use an LLM to reason over the source material.
3. Make validators compare the key result.
4. Save the verdict onchain.

The fun version is simple:

> Put internet claims on trial.

## The Important Fields

**Claim**  
The thing being judged.

Good:

> The project officially confirmed an airdrop snapshot date.

Weak:

> Is this project bullish?

**Category**  
Now called **Claim Type** in the app. This is the type of claim, like airdrop rumor, snapshot confirmation, token info, listing, founder statement, partnership claim, funding raise, roadmap check, grant deadline, security incident, revenue/TVL claim, or regulatory claim.

**Project**
The project the claim is about. The app can auto-detect this from the claim, or the user can pick a project directly.

Example:

```text
Project: MegaETH
Claim Type: Token / tokenomics
Claim: MegaETH has announced a TGE for a native token.
```

**Judge standard**  
The rule for deciding the claim.

Good:

> Return FACT only if an official project account, official blog, or official docs page confirms a snapshot date.

Weak:

> Decide if it sounds true.

**Receipts**  
The links the app finds and sends to the contract.

## Receipt Scout V1

The first scout is simple and curated. It recognizes known crypto projects and attaches their official docs, blogs, token pages, or announcement pages.

Current starter projects:

- Base
- Polymarket
- OpenSea
- GenLayer
- Arc
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

This is not the final version. The next version should use live search so users can ask about any project without manually hunting for links.

Best receipts:

- official project blogs
- official docs
- exchange announcement pages
- regulator pages
- founder posts or interviews
- GitHub releases
- grant or hackathon pages

Weak sources:

- random reposts
- screenshots without links
- influencer summaries
- rumor threads

## Good First Demo Claims

Use claims that are easy to explain and not legally risky.

Strong demo ideas:

- Did a project officially confirm an airdrop snapshot?
- Did a project confirm a snapshot date or eligibility list?
- Did a team announce a real partnership?
- Did a project officially raise funding?
- Did a protocol confirm a security incident?
- Did official data support a revenue or TVL claim?
- Did an exchange officially list a token today?
- Did a protocol miss a roadmap deadline?
- Did a team announce a grant deadline?
- Did a founder actually say a quote people are repeating?

## How To Pitch It

Short pitch:

> Cap or Fact is a GenLayer-powered claim court for crypto rumors, announcements, and internet receipts.

Builder pitch:

> I built an Intelligent Contract that checks app-discovered public sources and returns FACT, CAP, or UNCLEAR for disputed internet claims. The first use case is crypto rumors: airdrops, listings, roadmap deadlines, founder statements, and grant announcements.

Social post:

> I got tired of CT rumors, so I built Cap or Fact on GenLayer. Drop a claim, let the app hunt receipts, and let an Intelligent Contract judge it: FACT, CAP, or UNCLEAR.

## Version Roadmap

Version 1:

- local claim drafting app
- Studio-tested GenLayer Python contract
- one official receipt per claim
- deployed proof address: `0x09845790DE3cF5C5F048C1a9a18B0317526A12f0`
- local receipt-scout backend for starter projects

Version 2:

- connect the frontend to GenLayerJS
- deploy real cases
- save public case links

Version 3:

- social feed
- user-submitted claims
- share cards
- leaderboard for best receipt hunters

Version 4:

- Farcaster frame or mini-app
- X-friendly screenshots
- grant/hackathon submission
