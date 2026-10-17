# Avalon AI --- Proposed Architecture

**Status:** Design proposal. Components and interfaces below are not
claims of an existing implementation.


## Licensing and dependency notices

The project is licensed under Apache License 2.0; see `../LICENSE`. Track each dependency, its version, license, source, and required notices before distributing builds. Do not assume every dependency is Apache-2.0-compatible without reviewing its actual terms. The project license does not grant trademark rights or imply security assurance.

## 1. Design goals

-   Enforce owner-defined policy at a protected wallet or vault.
-   Prevent an analysis service from independently authorizing
    transfers.
-   Make hard restrictions deterministic and inspectable.
-   Treat simulation and AI results as evidence with limitations.
-   Bind attestations to the exact transaction and policy context.
-   Support independent verification and reproducible testing.
-   Define bounded holds, expiry behavior, outages, and recovery.
-   Keep the trusted computing base as small as practical.

## 2. High-level components

### A. Transaction client / proposer

Constructs a transaction and presents the intended action and exact
payload for inspection. It may be a user interface, application,
treasury service, or autonomous agent. It is not trusted to describe its
own transaction honestly; the canonical payload must be independently
inspected.

### B. Protected wallet or vault

The enforcement boundary. It verifies normal owner authorization and
applies the policy that ultimately controls whether execution is
allowed. A compatible enforcement hook is required; an ordinary wallet
that does not integrate the policy cannot be assumed protected.

### C. Deterministic policy engine

Evaluates explicit rules such as:

-   Spend limits and rate limits
-   Approved destinations
-   Contract and function permissions
-   Token approval limits
-   Role or permission changes
-   Wallet implementation or upgrade changes
-   Timelocks and owner-selected invariants

Rules should be versioned, inspectable, testable, and independent of
model confidence scores.

### D. Transaction simulator

Estimates transaction effects against a specific chain-state snapshot.
The result should record the chain ID, block/state reference,
transaction payload, environment assumptions, expected asset flows,
permission changes, and known limitations.

Simulation is evidence, not proof. State may change before execution;
RPC data or the execution environment may be faulty or inconsistent.

### E. Analysis service

Runs deterministic security checks and optional AI-assisted
interpretation. The service may summarize intent, identify suspicious
patterns, attach evidence references, and recommend review. It must not
have a signing path that can authorize transfers or override wallet
policy.

AI output should identify model/version, relevant evidence, uncertainty,
and the time/context of analysis. Untrusted calldata, token metadata,
and contract text must not be treated as trusted instructions.

### F. Independent verifier node

A separately operated node reproduces selected checks where feasible,
validates signatures and policy versions, and compares
simulation/evidence. The prototype may use a coordinator to route
requests, but the coordinator must not be able to forge attestations or
bypass wallet enforcement.

Node count alone does not prove independence. Shared models, RPC
providers, infrastructure, keys, ownership, or datasets can create
common-mode failures.

### G. Decision and audit record

Produces a decision record suitable for reproduction and incident
review. Records should avoid seed phrases, private keys, and unnecessary
personal data. Any public logging must consider privacy and
chain-linkability.

### H. Governance and policy release process

May propose rule versions, protocol upgrades, operator requirements,
budgets, and appeal procedures. Governance must not be able to
confiscate funds, rewrite destinations, or impose an unrestricted
permanent freeze by vote.

## 3. Proposed transaction flow

1.  **Propose:** create the transaction and canonical payload.
2.  **Authorize:** protected wallet checks owner authorization,
    permissions, balances, and required signers.
3.  **Policy check:** deterministic rules evaluate the transaction.
4.  **Simulate:** estimate effects against a recorded chain-state
    reference.
5.  **Analyze:** run deterministic checks and optional AI
    interpretation.
6.  **Verify:** one or more verifier nodes reproduce selected checks.
7.  **Enforce:** the protected wallet evaluates the applicable policy
    and any valid, fresh, correctly bound evidence.
8.  **Record:** produce an auditable result and support recovery if the
    result is disputed or services fail.

The exact ordering, timeout behavior, and which checks must be
synchronous remain implementation decisions. No off-chain response
should be able to bypass on-chain or wallet-enforced policy.

## 4. Decision outcomes

  -----------------------------------------------------------------------
  Outcome                 Proposed meaning        Important constraint
  ----------------------- ----------------------- -----------------------
  `ALLOW`                 Authorization and       Never infer safety
                          deterministic           solely from a model
                          requirements pass; no   score.
                          configured hold         
                          applies.                

  `HOLD`                  A preconfigured         Must expire or follow a
                          condition requires a    defined outcome;
                          bounded delay or        recovery cannot depend
                          additional              solely on Avalon.
                          owner-approved review.  

  `BLOCK`                 An explicit hard policy A model score alone
                          is violated or          must not create an
                          reproducible evidence   unexplained permanent
                          meets a published block block.
                          rule.                   
  -----------------------------------------------------------------------

The wallet owner selects applicable policies. Each transaction class
needs explicit behavior for service outages, verifier disagreement,
urgent operations, and expired holds.

## 5. Attestation design requirements

A signed result should bind to at least:

-   Chain ID
-   Protected wallet or vault address
-   Transaction hash or canonical transaction payload
-   Policy version
-   Relevant state/block reference
-   Expiry or freshness window
-   Software and model version, where applicable
-   Evidence references and result type

The final schema must define canonical encoding, signature domain
separation, signer/key rotation, revocation, replay protection, and
behavior when fields are missing or inconsistent. These details are open
work and must not be assumed solved by this document.

The verifier and wallet should reject forged, expired, replayed, or
transaction-mismatched attestations. Attestation acceptance must not
itself grant authority to move funds.

## 6. Trust boundaries

  -----------------------------------------------------------------------
  Component               May do                  Must not do
  ----------------------- ----------------------- -----------------------
  Owner / required        Authorize according to  Be silently replaced by
  signers                 wallet rules            an analysis service

  Protected wallet        Enforce authorization   Trust an unbounded,
                          and explicit policy     unauthenticated
                                                  off-chain claim

  Deterministic policy    Evaluate inspectable    Treat AI confidence as
  engine                  rules                   a policy override

  Simulator               Report estimated        Claim certainty about
                          effects and assumptions future execution

  AI analysis             Explain, flag,          Authorize transfers or
                          recommend configured    override hard policy
                          review                  

  Verifier                Reproduce defined       Become a privileged
                          checks and validate     transfer signer by
                          evidence                default

  Coordinator             Route requests and      Forge attestations or
                          results                 bypass enforcement

  Governance              Propose and approve     Confiscate funds or
                          bounded protocol        create a permanent
                          changes                 global freeze
  -----------------------------------------------------------------------

## 7. Failure and recovery behavior

The implementation must specify and test:

-   **Analysis unavailable:** follow explicit wallet policy for that
    transaction class.
-   **Verifier disagreement:** apply a published deterministic rule; use
    HOLD only where an owner-configured bounded review path exists.
-   **Stale/mismatched attestation:** reject and request fresh evidence.
-   **False positive:** provide a reason, audit trail, deadline, and
    owner recovery/appeal route.
-   **Compromised analysis key:** rotate/revoke through an independently
    protected process and test replay of old signatures.
-   **Upgrade failure:** test timelocks, rollback/recovery where safe,
    and an exit path for users who reject an upgrade.
-   **Urgent transaction:** document whether an independent signer or
    owner-controlled bypass is permitted and how it is protected.
-   **Hold expiry:** define the exact result; do not leave a transaction
    held indefinitely by accident.

A delay can itself cause loss, including liquidation, missed settlement,
or payroll disruption. Hold policy must be proportional to transaction
value, risk, and urgency.

## 8. Benchmark architecture

Compare the incremental contribution of each layer:

  -----------------------------------------------------------------------
  Level                   Components              Question
  ----------------------- ----------------------- -----------------------
  L0                      Owner limits,           What do conventional
                          permissions,            controls catch?
                          allowlists, timelocks   

  L1                      L0 + deterministic      What do explicit
                          security rules          security rules add?

  L2                      L1 + simulation and     What does pre-execution
                          invariants              evidence add?

  L3                      L2 + AI-assisted        Does AI add measurable
                          analysis                value?
  -----------------------------------------------------------------------

Report detection rate, false-positive rate, false negatives and
severity, latency, cost, and reproducibility by attack family. Use
held-out evaluation data, document data provenance and uncertainty, and
prevent benchmark leakage. Record only information available before
execution for each sample.

## 9. Suggested repository modules

A future implementation could separate code into modules like these.
Names are illustrative, not a required framework:

``` text
/
├── README.md
├── VISION.md
├── ARCHITECTURE.md
├── THREAT_MODEL.md
├── ROADMAP.md
├── docs/
│   ├── decisions/          # Architecture decision records
│   ├── specs/              # Versioned interface and policy specifications
│   └── benchmarks/         # Methodology, datasets, results, limitations
├── contracts/              # Protected wallet/vault and policy enforcement
├── engine/                 # Deterministic policy evaluation
├── simulator/              # Simulation adapters and state references
├── analysis/               # Evidence pipeline and optional AI adapter
├── verifier/               # Independently runnable verification service
├── schemas/                # Canonical payloads and attestations
├── fixtures/               # Sanitized, versioned replay fixtures
├── tests/                  # Unit, integration, invariant, and adversarial tests
└── examples/               # Testnet demo and integration examples
```

Do not create empty layers merely to imitate this layout. Start with the
smallest working vertical slice and split modules when their boundaries
are justified.

## 10. Open architecture decisions

1.  Which smart-contract wallet or vault can enforce policy without
    creating a privileged bypass?
2.  Which rules must be enforced on-chain versus advisory off-chain?
3.  What canonical transaction representation and attestation format
    will be used?
4.  How are policy versions, state references, expiry, revocation, and
    key rotation represented?
5.  What are the maximum HOLD durations and expiry outcomes for each
    transaction class?
6.  What happens when analysis or verifier services are unavailable?
7.  How will the prototype test common-mode dependencies and node
    collusion?
8.  Which simulator and RPC assumptions can be independently reproduced?
9.  What privacy and retention rules apply to audit records and replay
    datasets?
10. Which benchmark thresholds are required before a testnet demo or
    controlled pilot?

## 11. Non-goals for the first prototype

-   Universal support for all chains and wallets
-   A token or staking economy
-   An unrestricted global kill switch
-   Governance-based confiscation or destination rewriting
-   Claims of guaranteed safety or prevention of all exploits
-   Mainnet asset protection before independent review and explicit risk
    acceptance
