const MODEL_DATA: Record<
  string,
  {
    predictions: string[];
    likelihoods: number[];
    messages: string[];
  }
> = {
  takeover: {
    predictions: [
      "Saeder-Krupp subsidiary increases Gunnarsson stake",
      "No immediate takeover threats",
      "Rumors of acquisition talks in Zurich",
      "Aggressive share acquisition by Valkyrie Holdings",
      "Anonymous shell company increasing stake",
      "Boardroom dissent signals vulnerability",
      "Sudden spike in external audits",
      "Unusual trading volume in Gunnarsson stock",
      "Encrypted communications with MCT legal counsel detected",
      "Legal team flagged for increased activity",
      "Renraku legal team requests confidential meeting",
      "Unexplained surge in Renraku stock options",
      "Saeder-Krupp board member sighted in Oslo",
      "Rumors of hostile bid from Zurich-based syndicate",
      "MCT shell company files regulatory paperwork",
      "Valkyrie Holdings increases lobbying activity",
      "Anonymous tip flags Renraku interest",
      "Sudden resignation of key Gunnarsson executive",
      "Unusual legal filings in Tokyo district court",
      "Encrypted communications with Zurich brokers detected",
    ],
    likelihoods: [
      7, 14, 22, 3, 18, 27, 11, 9, 31, 5, 13, 17, 21, 8, 19, 25, 16, 12, 23, 6,
    ],
    messages: [
      "Activate Odin Protocols immediately.",
      "Maintain current defenses and monitor for changes.",
      "Monitor board communications closely for further signs.",
      "Increase surveillance on key stakeholders as a precaution.",
      "Consult with Erika advisors to assess risk.",
      "Prepare golden parachute packages for executives.",
      "Initiate counter-acquisition strategies without delay.",
      "Engage PR team for proactive damage control.",
      "Audit all outgoing communications for leaks.",
      "Schedule an emergency board meeting to address concerns.",
      "Request legal review of all Renraku communications.",
      "Increase monitoring of Zurich-based transactions.",
      "Engage Valkyrie Holdings for strategic partnership talks.",
      "Consult with MCT liaisons for risk assessment.",
      "Prepare confidential briefing for executive board.",
      "Initiate background checks on new investors.",
      "Escalate to Odin Protocols for advanced countermeasures.",
      "Schedule closed-door session with legal counsel.",
      "Issue internal memo regarding takeover rumors.",
      "Monitor Tokyo legal filings for related activity.",
    ],
  },
  volatility: {
    predictions: [
      "Volatility spike expected in Quantum Storage sector",
      "Market conditions stable",
      "Increased ICE activity detected",
      "Unexpected drop in Matrix Security index",
      "Rumors of market manipulation by Fenrir Group",
      "Algorithmic trading surge detected",
      "Sector rotation favoring biotech",
      "Currency fluctuations impacting supply chain",
      "Short interest at 12-month high",
      "Regulatory uncertainty increasing volatility",
      "Renraku proprietary trading algorithm detected in market",
      "Saeder-Krupp divests from biotech sector",
      "Unusual algorithmic activity triggers flash crash warning",
      "MCT subsidiary increases market presence",
      "Rumors of insider trading at Zurich exchange",
      "Unexpected spike in derivatives volume",
      "Fenrir Group accused of price fixing",
      "Valkyrie Holdings hedges against volatility",
      "Anonymous tip flags market manipulation",
      "Matrix Security index recovers after dip",
    ],
    likelihoods: [
      12, 33, 68, 21, 44, 55, 17, 29, 38, 60, 41, 36, 53, 47, 28, 62, 49, 34,
      57, 25,
    ],
    messages: [
      "Activate 'Berserk Mode' for asset defense.",
      "No action required at this time.",
      "Prepare contingency plans for market swings.",
      "Increase liquidity reserves to buffer volatility.",
      "Consult with Mimir Analytics for further insight.",
      "Monitor ICE logs for anomalies and report findings.",
      "Delay major investments until stability returns.",
      "Engage Valkyrie risk team for assessment.",
      "Issue a volatility warning to all stakeholders.",
      "Review all open positions for exposure.",
      "Request briefing from Renraku market analysts.",
      "Monitor Saeder-Krupp divestment activity.",
      "Consult with Zurich exchange for flash crash protocols.",
      "Increase oversight of MCT subsidiaries.",
      "Flag Zurich exchange for regulatory review.",
      "Engage Valkyrie Holdings for volatility hedging.",
      "Issue internal alert for price fixing rumors.",
      "Review derivatives exposure with finance team.",
      "Monitor Matrix Security index for recovery.",
      "Schedule emergency market review meeting.",
    ],
  },
  "ice breach": {
    predictions: [
      "ICE breach attempt detected from Fenrir Group",
      "No breach attempts in last 30 days",
      "Suspicious activity flagged in Zurich Orbital Grid",
      "Firewall anomaly detected in Node Yggdrasil-7",
      "Unusual outbound traffic from R&D subnet",
      "Failed login attempts from external IP",
      "Zero-day exploit attempt blocked",
      "Encrypted payload intercepted",
      "Phishing campaign targeting finance department",
      "ICE protocol update required",
      "Renraku ICE probe detected in Oslo node",
      "Saeder-Krupp malware signature identified",
      "Unusual exploit attempt blocked by firewall",
      "MCT phishing attempt flagged by security",
      "Unusual login from Tokyo subnet",
      "Encrypted traffic spike in R&D network",
      "Failed brute-force attack from external host",
      "ICE anomaly detected in Valkyrie Dataworks",
      "Suspicious file transfer to Zurich Orbital Grid",
      "Firewall rules updated to block new threat",
    ],
    likelihoods: [
      2.1, 0.7, 5.4, 1.3, 4.2, 3.7, 0.9, 2.8, 1.6, 6.6, 3.2, 2.4, 4.7, 1.8, 2.9,
      3.5, 1.2, 2.6, 3.9, 5.1,
    ],
    messages: [
      "Increase monitoring of external connections immediately.",
      "Continue standard protocols and remain vigilant.",
      "Run Valkyrie diagnostics on all critical systems.",
      "Alert IT security team to potential breach.",
      "Patch all vulnerable nodes as soon as possible.",
      "Initiate ICE lockdown to contain threat.",
      "Notify Zurich Orbital Grid of suspicious activity.",
      "Escalate to Odin Protocols for advanced defense.",
      "Conduct staff security training this week.",
      "Review recent access logs for anomalies.",
      "Request Renraku ICE probe analysis.",
      "Flag Saeder-Krupp malware for removal.",
      "Consult with Zurich security team for exploit mitigation.",
      "Increase monitoring of MCT phishing attempts.",
      "Alert Tokyo subnet for suspicious logins.",
      "Review encrypted traffic logs for anomalies.",
      "Block external brute-force attempts immediately.",
      "Engage Valkyrie Dataworks for ICE review.",
      "Audit file transfers to Zurich Orbital Grid.",
      "Update firewall rules for new threats.",
    ],
  },
  "supply chain": {
    predictions: [
      "All Yggdrasil nodes reporting green",
      "Fenrir Logistics reporting delays",
      "Minor disruption in Valkyrie Dataworks",
      "Supplier contract breach detected",
      "Unexpected customs hold in Rotterdam",
      "Shortage of quantum chips projected",
      "Weather disruption in North Sea corridor",
      "Sabotage attempt foiled at Oslo hub",
      "Increased insurance premiums flagged",
      "New supplier onboarding required",
      "Renraku shipment delayed at customs",
      "Saeder-Krupp supplier audit scheduled",
      "Unexpected logistics system outage reported",
      "MCT contract renegotiation underway",
      "Unexpected strike at Rotterdam port",
      "Valkyrie Dataworks reroutes critical shipment",
      "Anonymous tip flags supply chain risk",
      "Weather disruption in Tokyo corridor",
      "Insurance claim filed for lost cargo",
      "New supplier flagged for compliance review",
    ],
    likelihoods: [
      3, 12, 27, 8, 15, 21, 6, 18, 24, 9, 11, 14, 22, 17, 13, 19, 16, 20, 23, 7,
    ],
    messages: [
      "Schedule the next audit for 2064-05-01.",
      "Reroute shipments as needed to avoid delays.",
      "No immediate action required at this time.",
      "Contact Fenrir Logistics for a status update.",
      "Increase buffer inventory to mitigate shortages.",
      "Review supplier contracts for vulnerabilities.",
      "Engage Valkyrie Dataworks to assist with reroute.",
      "Issue a disruption alert to all clients.",
      "Schedule an emergency logistics meeting.",
      "Monitor weather advisories for potential impact.",
      "Request Renraku shipment status update.",
      "Prepare for Saeder-Krupp supplier audit.",
      "Contact Zurich logistics partner for system status.",
      "Engage MCT for contract renegotiation.",
      "Monitor Rotterdam port for strike activity.",
      "Coordinate with Valkyrie Dataworks for reroute.",
      "Flag anonymous tips for supply chain review.",
      "Monitor Tokyo corridor for weather disruptions.",
      "File insurance claim for lost cargo.",
      "Review compliance status of new suppliers.",
    ],
  },
  loyalty: {
    predictions: [
      "Employee loyalty at all-time high",
      "2 employees flagged for external contacts",
      "No anomalies detected in Valkyrie Protocols",
      "Anonymous whistleblower report received",
      "Spike in sick leave requests",
      "Unusual after-hours building access",
      "Staff survey: morale up 12%",
      "Rumors of unionization in R&D",
      "Key engineer received external job offer",
      "Increased social media activity detected",
      "Renraku recruiter contacted key engineer",
      "Saeder-Krupp HR flagged for poaching attempt",
      "External job offer intercepted in email scan",
      "MCT benefits package compared by staff",
      "Anonymous tip flags morale issue",
      "Spike in after-hours VPN usage",
      "Rumors of unionization in logistics team",
      "Staff survey: morale down 8%",
      "Key engineer declined external offer",
      "Increased internal chat activity detected",
    ],
    likelihoods: [
      93, 88, 97, 85, 91, 89, 95, 87, 92, 90, 86, 94, 96, 84, 83, 98, 88, 93,
      91, 89,
    ],
    messages: [
      "Offer a bonus to key staff to boost loyalty.",
      "Monitor flagged employees for further issues.",
      "Maintain current morale programs and incentives.",
      "Schedule one-on-one meetings with team leads.",
      "Increase internal communications to address concerns.",
      "Review whistleblower protections and update policies.",
      "Engage Valkyrie HR team for intervention.",
      "Issue a loyalty survey to all employees.",
      "Monitor external job postings for staff movement.",
      "Host a team-building event this quarter.",
      "Request Renraku recruiter activity report.",
      "Flag Saeder-Krupp HR for poaching review.",
      "Consult with Zurich HR consultant for job offer protocols.",
      "Review MCT benefits package for competitiveness.",
      "Address morale issues flagged by anonymous tip.",
      "Monitor after-hours VPN usage for anomalies.",
      "Engage logistics team to address unionization rumors.",
      "Issue follow-up staff survey on morale.",
      "Acknowledge engineer's decision to stay.",
      "Review internal chat logs for sentiment analysis.",
    ],
  },
  uplink: {
    predictions: [
      "Uplink stability Minor fluctuations detected in Zurich Orbital Grid",
      "All nodes green",
      "ICE protocols holding",
      "Packet loss detected in Oslo node",
      "Latency spike in Asia-Pacific region",
      "Quantum uplink handshake failed",
      "Scheduled maintenance in progress",
      "Unexpected bandwidth surge",
      "Node Odin-03 reporting intermittent errors",
      "Satellite relay realignment required",
      "Renraku uplink node reports instability",
      "Saeder-Krupp satellite relay offline",
      "Unexpected uplink handshake failure detected",
      "MCT bandwidth surge detected",
      "Unexpected maintenance in Tokyo uplink",
      "Valkyrie Holdings uplink audit scheduled",
      "Anonymous tip flags uplink risk",
      "Bandwidth allocation exceeded in Zurich node",
      "Node Odin-07 reports packet loss",
      "Satellite relay firmware update required",
    ],
    likelihoods: [
      99.98, 99.92, 99.87, 99.73, 99.81, 99.65, 99.9, 99.77, 99.84, 99.69,
      99.79, 99.68, 99.83, 99.74, 99.89, 99.91, 99.78, 99.86, 99.82, 99.88,
    ],
    messages: [
      "No action required at this time.",
      "Monitor for further fluctuations and report anomalies.",
      "Run Odin Protocols diagnostics on uplink systems.",
      "Contact Zurich Orbital Grid support for assistance.",
      "Increase bandwidth allocation to critical nodes.",
      "Delay non-critical data transfers until resolved.",
      "Notify IT operations of current status.",
      "Schedule an uplink audit for next week.",
      "Escalate to Valkyrie network team for review.",
      "Review satellite relay logs for errors.",
      "Request Renraku uplink node status report.",
      "Flag Saeder-Krupp satellite relay for review.",
      "Consult with Zurich network team for handshake protocols.",
      "Monitor MCT bandwidth surge for anomalies.",
      "Schedule maintenance for Tokyo uplink node.",
      "Engage Valkyrie Holdings for uplink audit.",
      "Flag anonymous tips for uplink review.",
      "Increase bandwidth allocation in Zurich node.",
      "Review Odin-07 packet loss logs.",
      "Update satellite relay firmware as required.",
    ],
  },
};

import { useEffect, useState } from "react";
import { TYPING_SPEED } from "../../utils/constants";

const MODELS = [
  {
    key: "takeover",
    label: "Corporate Hostile Takeover Risk",
  },
  {
    key: "volatility",
    label: "Market Volatility Index",
  },
  {
    key: "ice breach",
    label: "ICE Breach Probability",
  },
  {
    key: "supply chain",
    label: "Supply Chain Disruption Model",
  },
  {
    key: "loyalty",
    label: "Employee Loyalty Index",
  },
  {
    key: "uplink",
    label: "Quantum Uplink Stability",
  },
];

export default function Vala({ onExit }: { onExit: () => void }) {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(0);
  const [modelResult, setModelResult] = useState<null | {
    prediction: string;
    likelihood: number;
    message: string;
  }>(null);

  useEffect(() => {
    if (loading) setTimeout(() => setLoaded(0), 0);
  }, [loading]);

  useEffect(() => {
    if (loaded >= 100) {
      setTimeout(() => setLoading(false));
      return;
    }

    setTimeout(() => {
      setLoaded((prev) => Math.min(prev + Math.ceil(Math.random() * 10), 100));
    }, TYPING_SPEED);
  }, [loaded]);

  useEffect(() => {
    if (!selectedModel) return;

    const prediction =
      MODEL_DATA[selectedModel].predictions.at(
        Math.floor(
          Math.random() * MODEL_DATA[selectedModel].predictions.length,
        ),
      ) ?? "";

    const likelihood =
      MODEL_DATA[selectedModel].likelihoods.at(
        Math.floor(
          Math.random() * MODEL_DATA[selectedModel].likelihoods.length,
        ),
      ) ?? 0;

    const message =
      MODEL_DATA[selectedModel].messages.at(
        Math.floor(Math.random() * MODEL_DATA[selectedModel].messages.length),
      ) ?? "";

    setTimeout(() => setModelResult({ prediction, likelihood, message }));
  }, [selectedModel]);

  // Render a loading bar with 20 segments
  const totalSegments = 20;
  const filledSegments = Math.round((loaded / 100) * totalSegments);
  const bar =
    "█".repeat(filledSegments) + "_".repeat(totalSegments - filledSegments);

  const loadingScreen = (
    <main>
      <p>Loading:</p>
      <pre>{bar}</pre>
      <p>{loaded}%</p>
    </main>
  );

  const mainMenu = (
    <main>
      <h1>VALA: Visionary Aesir Logistics Augur </h1>

      <p>Select prediction model:</p>
      <ol>
        {MODELS.map((model) => (
          <li key={model.key}>
            <button
              className="inlineBtn"
              onClick={() => {
                setSelectedModel(model.key);
                setLoading(true);
              }}
            >
              {model.label}
            </button>
          </li>
        ))}
      </ol>

      <button className="inlineBtn" onClick={onExit}>
        Exit
      </button>
    </main>
  );

  const model = (
    <main>
      <h1>{MODELS.find((model) => model.key === selectedModel)?.label}</h1>
      {modelResult && (
        <>
          <p className="vala-output">
            {modelResult.prediction}, has a likelihood of{" "}
            {modelResult.likelihood}% of happening. <br />
            <br />
            {modelResult.message}
          </p>
        </>
      )}
      <button className="inlineBtn" onClick={() => setSelectedModel(null)}>
        Go back
      </button>
    </main>
  );

  return (
    <div className="terminal">
      <div className="program vala">
        <header className="program-header">
          <p>Gunnarsson Inc.</p>
          <p>© 2064/02/27</p>
        </header>
        {loading ? loadingScreen : null}
        {!loading && selectedModel ? model : null}
        {!loading && !selectedModel ? mainMenu : null}
        <footer>
          <p>Version 7.93.68</p>
          <p>Clearance: VALKYRIE</p>
        </footer>
      </div>
    </div>
  );
}
