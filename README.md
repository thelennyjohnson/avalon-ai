# Avalon AI

**Community-Governed Transaction Security Protocol**

> A proposed, open security layer for compatible blockchain wallets and
> applications. Avalon combines deterministic policy enforcement,
> transaction simulation, evidence-based threat analysis, and optional
> AI-assisted interpretation to help identify unsafe actions before
> execution.

**Status: Proposal / early-stage design. Not production-ready.**

Avalon is a testable architecture and product hypothesis---not a proven
security guarantee. The first milestone is intentionally narrow: one
EVM-compatible test network, one protected smart-contract wallet or
vault, a reproducible transaction-replay benchmark, and one
independently operated verifier.

## Why Avalon?

A valid blockchain signature proves that authorization requirements were
met; it does not necessarily prove that the transaction reflects the
owner's intent or is safe. A compromised signer, malicious approval,
deceptive interface, unsafe contract interaction, or misbehaving
autonomous agent can produce a transaction that is valid but harmful.

Avalon proposes a layered approach:

-   **Owner authorization remains necessary.** Avalon must not create
    owner authorization or originate a transfer on its own.
-   **Deterministic policy comes first.** Explicit, inspectable wallet
    rules enforce spending limits, approved destinations,
    contract/function permissions, and other owner-selected invariants.
-   **Simulation provides evidence, not certainty.** Results are tied to
    a state/block reference and document assumptions and limitations.
-   **AI is advisory.** AI may help interpret intent or surface
    suspicious patterns, but an AI score cannot override deterministic
    policy or authorize a transfer.
-   **Verification should be reproducible.** Independent nodes should
    check defined facts and policy compliance---not vote on whether an
    opaque model output feels correct.
-   **Restrictions must be bounded and recoverable.** Any configured
    HOLD has a maximum duration, a clear reason, and an independent
    recovery or appeal path.

## Proposed decision flow

1.  **Propose** a transaction and expose its intent and exact payload
    for inspection.
2.  **Authorize** through the protected wallet's normal owner/signature
    process.
3.  **Apply policy** such as spend caps, allowlists, and
    permission-change restrictions.
4.  **Simulate** the transaction against a recorded chain-state
    snapshot.
5.  **Analyze** using deterministic rules and optional AI-assisted
    interpretation.
6.  **Verify** selected checks independently.
7.  **Enforce** the wallet's configured outcome.
8.  **Record and recover** with an auditable decision record and
    documented recovery route.

### Outcomes

  -----------------------------------------------------------------------
  Outcome                             Meaning
  ----------------------------------- -----------------------------------
  `ALLOW`                             Owner authorization and
                                      deterministic requirements pass,
                                      and no configured hold condition
                                      applies.

  `HOLD`                              A preconfigured condition triggers
                                      a bounded delay or additional
                                      owner-approved review path.

  `BLOCK`                             An explicit hard policy is
                                      violated, or reproducible evidence
                                      meets a published block rule.
  -----------------------------------------------------------------------

These are proposed semantics; the implementation must define precise
behavior before any real-fund use.

## Current scope

The initial prototype should focus on one EVM-compatible test network
and one smart-contract wallet or vault, especially a wallet used by an
autonomous agent or treasury.

Potential initial capabilities:

-   Owner-defined spending limits and approved contract/function
    permissions
-   Detection of unexpected role or wallet-implementation changes
-   Transaction simulation and evidence summaries
-   Optional AI-assisted interpretation, evaluated against non-AI
    baselines
-   Wallet-enforced `ALLOW` / `HOLD` / `BLOCK` outcomes
-   Signed decision records and explicit recovery behavior
-   A reproducible replay benchmark and independently runnable verifier

## What Avalon does not claim

Avalon does **not** guarantee that transactions are safe, prevent every
exploit, secure every wallet, or eliminate key theft, social
engineering, coercion, unknown vulnerabilities, or cross-chain failures.
It only helps where a compatible wallet or application enforces the
relevant policy before funds move.

AI is not assumed to be better than conventional controls. The project
will compare:

-   **L0:** owner-configured limits, permissions, approved destinations,
    and timelocks
-   **L1:** L0 plus deterministic security rules
-   **L2:** L1 plus simulation and explicit invariants
-   **L3:** L2 plus AI-assisted analysis

AI should remain in the product only where measured results show
meaningful incremental value.

## Repository status

This repository is an invitation to review and develop the proposal.
Unless explicitly marked otherwise, features described in the
documentation are **proposed, not implemented**. Do not deposit real
assets or rely on this project to protect production funds.

## Documentation

-   [Technical Brief (PDF)](docs/TECHNICAL_BRIEF.pdf) --- project brief

-   [Vision](docs/VISION.md) --- mission, principles, scope, and success
    criteria
-   [Architecture](docs/ARCHITECTURE.md) --- proposed components, data flow,
    trust boundaries, and open design decisions
-   [Threat Model](docs/THREAT_MODEL.md) --- assets, adversaries, in-scope
    risks, mitigations, and residual risks
-   [Roadmap](docs/ROADMAP.md) --- staged milestones, starter tasks, and
    go/no-go gates

## How to contribute

Useful first contributions include:

1.  Review the threat model and identify missing attack paths.
2.  Propose the smallest viable protected-wallet integration.
3.  Define a canonical transaction/attestation schema.
4.  Add replayable benign and malicious transaction fixtures with clear
    provenance.
5.  Design tests for forged, stale, replayed, and transaction-mismatched
    attestations.
6.  Specify HOLD expiry, outages, false positives, and owner recovery.
7.  Build a baseline benchmark before introducing AI.

Please keep proposals concrete and testable. Security-sensitive changes
should include the invariant they protect, the failure mode they
address, and reproducible tests.

Before opening a pull request, read the relevant documentation and
describe: **what changed, why it matters, how it was tested, and what
remains uncertain.** Never include seed phrases, private keys,
production secrets, or sensitive user data in issues, fixtures, or logs.

## Proposed development principles

-   Minimize the trusted computing base.
-   Keep analysis, enforcement, verification, and governance separate.
-   Bind attestations to the exact transaction, chain, wallet, policy
    version, state reference, and freshness window.
-   Reject stale, forged, replayed, or mismatched attestations.
-   Define outage behavior explicitly rather than silently allowing
    everything or blocking everything.
-   Publish benchmark methods, false positives, missed cases,
    limitations, and security findings.
-   Do not launch a token as a prerequisite for the prototype.

## Security reporting

Do not publish exploit details that put users at risk before a
coordinated disclosure can be arranged. Until a dedicated security
policy and contact are published, use a private channel with the
maintainers if one is available; do not assume this repository has an
actively monitored response service. Do not include secrets or real user
transaction data in public reports.

## License

Avalon AI is licensed under the **Apache License 2.0**. See [`LICENSE`](LICENSE)
for the complete license text. The license permits use, modification, and
distribution subject to its terms, including preservation of applicable
notices and provision of a copy of the license.

The license does not grant permission to use the Avalon AI name or trademarks
as though a derivative project were an official release. Third-party
components may be subject to their own licenses; review and preserve their
notices where required.

The license is not a security certification, audit, or guarantee that the
protocol is suitable for production or for transactions involving real funds.
