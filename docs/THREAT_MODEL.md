# Avalon AI --- Threat Model

**Status:** Initial proposal. This document is a starting point for
adversarial review, not a completed security assessment.


## Licensing and supply-chain considerations

The repository uses Apache License 2.0 (see `LICENSE`). License and provenance review are part of supply-chain hygiene: inventory dependencies, pin versions, preserve required notices, and review transitive licenses before distribution. The license is not a security warranty or audit, and the Avalon AI name must not be used to imply official endorsement of forks.

## 1. Purpose and scope

This threat model describes the assets Avalon aims to protect, trust
boundaries, likely adversaries, in-scope risks, and required tests for
an initial prototype: one EVM-compatible test network and one protected
smart-contract wallet or vault.

Avalon can only enforce controls when a compatible wallet or application
integrates the policy before funds move. Analysis and simulation alone
do not protect an ordinary wallet.

## 2. Security objectives

The prototype should demonstrate these invariants:

1.  No transfer executes without valid owner authorization.
2.  A compromised Avalon analysis service cannot independently authorize
    a transfer.
3.  An AI score cannot override a deterministic `BLOCK` decision.
4.  A `HOLD` cannot persist beyond its configured maximum without an
    independent owner-authorized mechanism.
5.  Attestations bind to the exact transaction, chain, wallet, policy
    version, and freshness window.
6.  Forged, expired, replayed, or transaction-mismatched attestations
    are rejected.
7.  Recovery does not rely exclusively on the potentially compromised
    analysis service.
8.  Upgrade and emergency paths cannot silently bypass the same
    protections.
9.  Service outages follow explicit, documented policy.
10. Audit records support reproducibility without exposing private keys
    or seed phrases.

These are intended properties to prove through tests and review, not
claims that the current proposal already satisfies them.

## 3. Assets to protect

-   User funds and control over asset destinations
-   Owner authorization and signing paths
-   Wallet policy and configuration
-   Contract roles, permissions, and implementation integrity
-   Integrity and freshness of attestations
-   Integrity of simulation and chain-state references
-   Signing keys used by analysis or verifier services
-   Audit records, evidence references, and benchmark datasets
-   Availability of legitimate and urgent transactions
-   Governance integrity and safe protocol upgrades
-   User privacy and transaction-related metadata

## 4. Trust boundaries

Key boundaries exist between the owner and client, client and protected
wallet, wallet and policy engine, off-chain services and on-chain
enforcement, analysis and verification nodes, coordinator and operators,
and governance and deployed code.

Treat calldata, token names, contract metadata, RPC responses, model
outputs, incident reports, and other external content as untrusted
unless independently validated. A component should receive only the
permissions and data it needs.

## 5. Adversaries and capabilities

Potential adversaries include:

-   A malicious dApp or contract that requests dangerous approvals or
    calls
-   An attacker who compromises an application, autonomous agent, or
    analysis service
-   A party who obtains an analysis/verifier signing key
-   A malicious or faulty RPC provider or simulator
-   A verifier that lies, colludes, or returns inconsistent results
-   An attacker who replays old attestations or exploits encoding
    differences
-   A model adversary who crafts calldata, metadata, or text to
    manipulate AI interpretation
-   A governance participant who attempts capture or a dangerous upgrade
-   An attacker who exploits outages, latency, stale state, or recovery
    paths
-   A legitimate user or operator affected by a false positive or
    excessive delay

Assume an attacker may control one off-chain component. The design
target is that compromise of the analysis service alone must not enable
theft or an unrestricted permanent freeze. Do not assume every owner key
or every enforcement path remains uncompromised.

## 6. In-scope threats and proposed mitigations

  ---------------------------------------------------------------------------
  Threat                  Potential impact        Proposed controls / tests
  ----------------------- ----------------------- ---------------------------
  Unusually large or      Loss of funds           Owner-defined caps and rate
  repeated outflows                               limits; boundary and bypass
                                                  tests

  Malicious token         Excessive or persistent Approval-aware policy;
  approvals               token authority         decode and simulate
                                                  allowance changes

  Unexpected role or      Attacker gains control  Explicit role/upgrade
  implementation changes  or disables safeguards  policy; test unauthorized
                                                  and authorized changes

  Dangerous               Asset loss or           Destination/function
  contract/function       permission changes      allowlists, simulation,
  interaction                                     explicit invariants

  Known exploit pattern   Loss before user        Versioned deterministic
                          notices                 rules backed by
                                                  reproducible evidence

  Simulation indicates    Unsafe transaction      Policy maps verified
  invariant violation     executes                simulation evidence to a
                                                  defined outcome

  Autonomous agent        Unauthorized            Enforce limits at the
  exceeds intended limits operational behavior    protected wallet, not only
                                                  in agent prompts

  Forged attestation      Invalid risk result     Signature validation,
                          accepted                canonical encoding, scoped
                                                  signer keys

  Replayed or stale       Old approval applied to Nonces or transaction
  attestation             a new context           binding, expiry,
                                                  chain/wallet/policy binding

  Transaction mismatch    Evidence for one        Hash/canonical payload
                          payload used for        binding and negative tests
                          another                 

  Analysis key compromise Attacker fabricates     Narrow authority,
                          advisory results or     revocation/rotation,
                          holds                   bounded holds, independent
                                                  recovery

  Malicious AI input      Incorrect               Treat all external text as
                          interpretation or alert untrusted; deterministic
                                                  enforcement; adversarial
                                                  tests

  Data poisoning or       Degraded detection and  Provenance, versioning,
  mislabeled reports      misleading benchmark    deduplication, held-out
                                                  data, label review

  RPC or state mismatch   Incorrect simulation    Record block/state
                          result                  reference; compare sources
                                                  where feasible; expose
                                                  assumptions

  Verifier                Incorrect evidence      Independent
  collusion/common-mode   accepted                implementations/providers
  failure                                         where feasible; test
                                                  correlated failures

  Analysis outage or      Legitimate transactions Explicit per-class outage
  denial of service       delayed or blocked      policy; bounded timeouts
                                                  and recovery tests

  False-positive HOLD     Missed settlement,      Maximum duration, reason,
                          liquidation,            appeal deadline,
                          operational disruption  independent owner recovery

  Upgrade or governance   Safeguards weakened     Timelocks, scoped roles,
  capture                                         public proposals,
                                                  exit/recovery design,
                                                  upgrade tests
  ---------------------------------------------------------------------------

## 7. Out of scope or only partially mitigated

-   Ordinary wallets without a compatible enforcement hook
-   An attacker who controls all required owner/signing paths and can
    bypass the guard
-   Private-key theft, malware, coercion, and social engineering
    upstream of the transaction interface
-   Unknown exploits that produce no detectable signal
-   Simulation mismatch due to state changes, faulty RPC data, or
    execution-environment differences
-   Cross-chain timing gaps and attacks completed before the guard can
    act
-   Sybil identities, bribery, governance capture, node collusion, and
    denial of service beyond tested assumptions
-   Every possible false positive or operational loss caused by delay
-   Unsafe third-party applications that do not correctly integrate the
    policy
-   Any guarantee that model output is correct, complete, or unbiased

Document these limitations in public claims and integration guides.

## 8. Abuse cases to test before any real-fund pilot

At minimum, build reproducible tests for:

1.  An analysis service compromised and attempting to authorize a
    transfer.
2.  A signed attestation copied to a different transaction.
3.  An attestation replayed after expiry or key rotation.
4.  A valid attestation issued under an old policy version.
5.  Incorrect chain ID, wallet address, state reference, or transaction
    payload.
6.  Malformed or ambiguously encoded payloads.
7.  An AI result recommending `ALLOW` when deterministic policy requires
    `BLOCK`.
8.  A `HOLD` that reaches expiry while the analysis service is offline.
9.  Conflicting verifier results and a coordinator outage.
10. A malicious token name or calldata string crafted to manipulate an
    AI model.
11. A role or wallet implementation change that bypasses expected
    controls.
12. A false positive affecting an urgent transaction.
13. Upgrade and recovery paths used by an attacker to bypass policy.
14. A simulator/RPC result that differs from the state used at
    execution.
15. Audit logging that accidentally captures a secret or unnecessary
    personal data.

Each test should state its assumptions, expected outcome, and the
security invariant it demonstrates. Where a test cannot be automated,
document the manual procedure and limitation.

## 9. Failure policy requirements

The implementation must specify:

-   Whether each transaction class may proceed during analysis outages
-   Whether a verifier disagreement can trigger a HOLD and under what
    owner-configured rule
-   How stale or mismatched attestations are rejected
-   Exact HOLD maximums and expiry outcomes
-   Who may invoke emergency paths and how those actions are logged
-   How owners recover from false positives without relying only on
    Avalon
-   How keys are revoked and rotated after compromise
-   How upgrades are delayed, tested, recovered from, or exited
-   What monitoring and incident-response procedures exist

"Fail safe" does not automatically mean "block everything." A prolonged
block can create real losses. Behavior must be explicit, proportionate,
and tested.

## 10. Privacy considerations

-   Never request or log seed phrases or private keys.
-   Minimize transaction metadata sent to off-chain services.
-   Document retention, access controls, and deletion practices for
    service-held data.
-   Separate public evidence needed for reproducibility from private
    user data.
-   Treat public-chain addresses and transaction histories as
    potentially linkable data.
-   Keep application-specific compliance policy visible and distinct
    from the baseline protocol policy.

## 11. Residual risk and release gates

Simulation is not proof of future execution safety. A passing benchmark
does not prove protection against unseen attacks. A collection of nodes
does not establish independence unless common-mode dependencies are
examined.

Before a controlled real-fund pilot, require:

-   Independent smart-contract/security review
-   Resolution of critical findings
-   Reproducible adversarial tests for the invariants above
-   Measured false-positive rates and acceptable latency for the
    intended use case
-   Documented outage, recovery, key-rotation, and incident-response
    procedures
-   Explicit owner acceptance of residual risks

Do not market Avalon as "prevents hacks," "guarantees safe
transactions," or "secures every wallet." Prefer precise statements tied
to a defined integration and published test evidence.

## 12. Open questions for reviewers

-   Which wallet integration minimizes privileged bypass risk?
-   Which checks must be on-chain, and which can remain advisory?
-   How are attestation encoding, signer independence, revocation, and
    replay prevention specified?
-   What hold durations are appropriate for each transaction class?
-   How should verifier disagreement be handled without governance
    becoming a security oracle?
-   What evidence demonstrates that operators are independent?
-   Which threat families and benchmark thresholds define the initial
    scope?
-   What independent evidence is required before mainnet deployment?
