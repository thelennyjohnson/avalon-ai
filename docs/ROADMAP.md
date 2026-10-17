# Avalon AI --- Roadmap

**Status:** Proposed milestones. Dates and durations are planning
estimates, not delivery commitments. Progress should be reported against
evidence and release gates, not only calendar time.

## Guiding rule

Start small, make the security boundary testable, and expand only when
the prototype demonstrates reliable enforcement, reproducible results,
acceptable false-positive rates, and independent review. No real-fund
deployment should occur simply because a phase or date has been reached.

## Phase 0 --- Repository and design alignment

**Goal:** Make the proposal easy to review and establish a shared
starting point.

### Starter tasks

-   [x] Add the Apache License 2.0 in `LICENSE`.
-   [ ] Add contribution guidelines and a code of conduct.
-   [ ] Create issue templates for bugs, design proposals, and security
    concerns.
-   [ ] Create an architecture decision record (ADR) template.
-   [ ] Choose one EVM-compatible test network.
-   [ ] Compare candidate wallet/vault architectures for policy
    enforcement and recovery.
-   [ ] Define the initial transaction classes and explicit non-goals.
-   [ ] Turn the ten security invariants in `THREAT_MODEL.md` into
    acceptance criteria.

### Exit gate

The initial scope, Apache 2.0 license, contribution process, wallet candidate, and
key design questions are documented and reviewable.

## Phase 1 --- Replayable security engine (planning estimate: weeks 1--4)

**Goal:** Establish a reproducible baseline before adding AI.

### Starter tasks

-   [ ] Define a versioned transaction fixture format.
-   [ ] Collect sanitized benign and malicious examples with provenance
    and labels.
-   [ ] Record what information was available before each transaction
    executed.
-   [ ] Implement owner-configurable limits and basic deterministic
    policy checks.
-   [ ] Define a decision API with `ALLOW`, `HOLD`, and `BLOCK` plus
    machine-readable reasons.
-   [ ] Add unit tests for spend limits, destinations, contract/function
    permissions, and role changes.
-   [ ] Publish benchmark methodology, known limitations, false
    positives, and missed cases.
-   [ ] Separate development/training samples from held-out evaluation
    data.

### Exit gate

Another developer can run the benchmark and reproduce the baseline
results. Results include attack-family breakdowns, false positives,
misses, latency, and cost where measurable.

## Phase 2 --- Enforceable wallet policy (planning estimate: weeks 4--8)

**Goal:** Demonstrate that policy is enforced at the protected wallet,
not only in an off-chain service.

### Starter tasks

-   [ ] Implement a minimal testnet wallet/vault integration with
    explicit policy hooks.
-   [ ] Enforce owner authorization and deterministic limits.
-   [ ] Specify the canonical transaction and attestation formats.
-   [ ] Bind attestations to chain, wallet, transaction, policy version,
    state reference, and freshness.
-   [ ] Test forged, stale, expired, replayed, and
    transaction-mismatched attestations.
-   [ ] Specify maximum HOLD duration and expiry behavior.
-   [ ] Test analysis outages, verifier disagreement, false-positive
    recovery, and urgent transactions.
-   [ ] Test key rotation/revocation and old-signature replay.
-   [ ] Review upgrade and emergency paths for policy bypasses.

### Exit gate

Tests demonstrate that compromising the analysis service alone cannot
authorize a transfer or permanently freeze the wallet. Recovery and
outage behavior are explicit and tested.

## Phase 3 --- Independent verifier and public demo (planning estimate: weeks 8--12)

**Goal:** Make core behavior independently reproducible.

### Starter tasks

-   [ ] Package a verifier so another person can operate it
    independently.
-   [ ] Document shared dependencies and the limits of verifier
    independence.
-   [ ] Build a testnet demo showing a normal transaction, a simulated
    malicious transaction, an enforced restriction, and an audit record.
-   [ ] Publish a reproducible demo script and environment setup.
-   [ ] Invite 3--10 independent developers or security reviewers to
    reproduce results and submit adversarial cases.
-   [ ] Track findings publicly where responsible disclosure permits.
-   [ ] Compare L0, L1, and L2; add L3 only as an experiment with clear
    ablation results.

### Exit gate

External reviewers can reproduce the core results, and no unresolved
critical issue remains within the prototype's defined scope.

## Phase 4 --- Controlled pilot readiness (after week 12; evidence-dependent)

**Goal:** Decide whether the design is suitable for a tightly scoped
pilot.

### Starter tasks

-   [ ] Complete an independent contract and security review.
-   [ ] Resolve critical findings and document accepted residual risks.
-   [ ] Publish an incident-response and vulnerability-disclosure
    policy.
-   [ ] Validate latency, availability, false-positive handling, and
    operating cost.
-   [ ] Test monitoring, recovery, signer rotation, and upgrade
    procedures.
-   [ ] Document integration requirements and unsupported
    configurations.
-   [ ] Obtain explicit pilot-partner approval and risk acceptance.

### Exit gate

No mainnet assets until critical findings are resolved, the controls
have been independently reviewed, and owners explicitly accept the
remaining risks.

## Later research --- only after evidence supports expansion

Possible future work:

-   Additional compatible wallets and vaults
-   More transaction classes and protocol integrations
-   Cross-chain and bridge-related controls
-   Better simulation and state-consistency checks
-   Privacy-preserving audit and evidence sharing
-   Independent verifier coordination and operator diversity
-   AI-assisted interpretation if it shows measurable incremental value
-   Governance and incentive design if genuine coordination needs emerge

A token is not a prerequisite. Do not add token or staking complexity
without demonstrated need, sustainable incentives, anti-capture
protections, and specialist legal review.

## Suggested GitHub issues for contributors

Create these as individual issues, with clear acceptance criteria:

1.  **\[Docs\] Choose and document the initial EVM test network** ---
    compare tooling, reproducibility, and deployment constraints.
2.  **\[Security\] Convert invariants into test cases** --- map each
    invariant in `THREAT_MODEL.md` to a positive and negative test.
3.  **\[Spec\] Propose canonical transaction binding** --- define which
    fields must be covered by the transaction digest and why.
4.  **\[Spec\] Draft attestation schema** --- include chain, wallet,
    payload, policy version, state reference, expiry, signer identity,
    and evidence references.
5.  **\[Research\] Define replay dataset format** --- include
    provenance, pre-execution information boundary, labels, and
    uncertainty.
6.  **\[Benchmark\] Implement L0 baseline** --- spending caps,
    permissions, approved destinations, and timelocks.
7.  **\[Security\] Test replay and expiry behavior** --- prove stale and
    mismatched attestations are rejected.
8.  **\[Design\] Specify HOLD expiry and recovery** --- define maximum
    duration, expiry result, owner recovery, and urgent-transaction
    behavior.
9.  **\[Architecture\] Compare wallet enforcement options** --- identify
    privileged roles, upgrade risks, and bypass paths.
10. **\[Research\] Measure AI's incremental value** --- compare L3
    against L0--L2 on held-out samples without overstating
    counterfactual prevention.
11. **\[DevEx\] Create a reproducible local test setup** --- document
    prerequisites and one-command test execution where feasible.
12. **\[Security\] Review logging and privacy** --- ensure fixtures and
    logs contain no secrets or unnecessary personal data.

## How to report progress

For every milestone, publish:

-   What works and how to reproduce it
-   Tests and benchmark version
-   False positives and missed cases
-   Latency and infrastructure cost, where measured
-   Known limitations and unresolved findings
-   Decisions made and alternatives rejected

Do not mark a phase complete based only on code merged. The exit gate
requires evidence.

## Status labels

Suggested labels: `good first issue`, `help wanted`, `security`,
`specification`, `architecture`, `benchmark`, `testnet`, `research`,
`documentation`, `blocked`, and `needs decision`.
