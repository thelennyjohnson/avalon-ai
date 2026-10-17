# Avalon AI --- Vision


## Open-source licensing

Avalon AI uses the Apache License 2.0 (see `../LICENSE`) to support broad adoption, commercial use, and contributions while providing an express patent license under the license terms. The license does not confer rights to use project trademarks as an endorsement, and it does not certify the security or production readiness of any implementation. Third-party dependencies may have separate license obligations.

## Mission

Avalon AI aims to make transaction-risk controls for compatible
blockchain wallets and applications more transparent, testable, and
independently verifiable.

It proposes a security layer combining deterministic policy enforcement,
transaction simulation, evidence-based threat analysis, and optional
AI-assisted interpretation. Its defining constraint is that no AI model,
analysis server, or community vote can independently authorize a
transfer or override the protected wallet's explicit policy.

## The problem

Blockchain authorization and transaction safety are different questions.
A transaction may satisfy signature and execution rules while still
violating the owner's intent. Examples include malicious approvals,
deceptive contract interactions, compromised signers, unexpected
permission changes, and autonomous agents acting beyond their intended
limits.

A detector that labels transactions "safe" cannot provide certainty.
Avalon instead proposes multiple layers with distinct responsibilities
and measurable limits.

## The core thesis

A layered pipeline can improve decisions while preserving enforceable
boundaries:

1.  **Deterministic controls** enforce known properties and
    owner-defined limits.
2.  **Simulation** estimates effects against a specific chain-state
    snapshot.
3.  **Independent verification** checks evidence, policy compliance, and
    selected simulation results.
4.  **AI-assisted analysis** may help interpret complex intent and
    suspicious patterns, but only if benchmarks demonstrate useful
    incremental value.

Conventional controls may catch many high-impact failures without AI.
Avalon will measure the value added by each layer instead of treating AI
as inherently superior.

## Principles

### 1. Owner authorization is fundamental

Avalon cannot create valid owner authorization or originate a transfer
on its own.

### 2. Restrict-only analysis

Analysis services may provide evidence, raise alerts, or request a
narrowly bounded HOLD where the owner has explicitly enabled that
behavior. They cannot turn a denied action into an allowed one.

### 3. Deterministic enforcement

Hard BLOCK decisions must follow explicit, inspectable policy or
reproducible evidence mapped to a published rule---not an unexplained
model score.

### 4. Bounded, recoverable holds

Every HOLD must have a maximum duration, a clear reason, a defined
expiry outcome, and an owner-controlled recovery or appeal route. Delays
can cause losses, so holds must account for urgency and transaction
class.

### 5. Separation of duties

Wallet authorization, policy enforcement, analysis, independent
verification, and governance should not collapse into a single key,
server, or operator.

### 6. Small trusted computing base

Keep on-chain enforcement minimal, limit privileged roles, and make
upgrade, emergency, and recovery paths explicit and testable.

### 7. Explicit failure behavior

Outages, stale attestations, conflicting verifier results, and urgent
transactions need documented policies. Neither "allow everything" nor
"block everything" is a universally safe default.

### 8. Evidence and accountability

Where privacy permits, publish policy and model versions, signed
decisions, evidence references, benchmark methods, governance changes,
and post-incident reviews.

### 9. Data minimization

Never request seed phrases or private keys. Treat calldata, token names,
contract metadata, and external content as untrusted inputs, including
potential prompt-injection material.

### 10. Honest claims

Avalon is designed to reduce selected risks. It cannot eliminate key
theft, malware, coercion, social engineering, unknown vulnerabilities,
or every cross-chain failure.

## Initial users and scope

The first use case is a single EVM-compatible smart-contract wallet or
vault used by an autonomous agent or treasury. The value proposition is
narrow and testable: constrain what an agent or treasury can do even if
its analysis or orchestration software behaves unexpectedly.

The first prototype should include:

-   Owner-defined spending caps and contract/function permissions
-   Detection of selected permission and implementation changes
-   Simulation against a recorded state reference
-   An evidence-backed decision API
-   Wallet-enforced outcomes
-   A signed audit trail and recovery behavior
-   One independently operated verifier
-   A reproducible replay benchmark

Broader support for bridges, DeFi, stablecoins, token launches, other
chains, or other wallet types should follow only after the initial
integration demonstrates reliable enforcement and acceptable
false-positive rates.

## How success will be measured

Avalon should publish a scorecard that includes:

-   Detection and miss rates by defined attack family
-   False-positive rate on benign transactions
-   Severity and count of unresolved security findings
-   Latency and cost per check
-   Behavior during RPC, node, model, and analysis-service outages
-   Percentage of decisions independently reproducible
-   Recovery time and success rate after false positives or key
    compromise
-   Incremental contribution of AI compared with L0--L2 baselines

Historical incident replay is a research benchmark, not proof that
losses would have been prevented. Any counterfactual claim must show the
information available before execution, the policy that would have
triggered, whether enforcement was possible, and remaining failure
modes.

## Governance and neutrality

Community participation should improve review, transparency, and
accountability---not grant governance the power to confiscate assets,
rewrite destinations, or impose a permanent global block by vote.

The baseline protocol should focus on transaction behavior,
cryptographic validity, known exploit evidence, and owner-selected
safety policies. It should not apply protocol-level restrictions based
solely on nationality, location, political affiliation, or wallet
identity. Third-party integrations may have separate obligations; their
policies should be visible and distinct.

## What is intentionally undecided

The proposal does not yet settle the wallet architecture, attestation
schema, verifier coordination, HOLD limits for each transaction class,
outage policy, Sybil resistance, benchmark thresholds, licensing, or
whether a token is needed. These are open design questions for
contributors.

A token is not a prerequisite for the prototype. Any future token or
staking mechanism would require a clearly defined need, sustainable
incentives, governance protections, and specialist legal review.

## Long-term direction

If the first prototype survives independent adversarial testing, Avalon
can expand incrementally to additional wallets and transaction classes.
Expansion should be driven by evidence, not by a promise of universal
protection.

The goal is not to claim perfect security. It is to make transaction
controls more transparent, bounded, testable, and independently
verifiable.
