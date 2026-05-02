import { useEffect, useEffectEvent, useState } from "react";
import { useLoadingScreen } from "../../hooks/useLoadingScreen";

export default function TeamTracker({ onExit }: { onExit: () => void }) {
  const [currentTime, setCurrentTime] = useState({ h: "00", m: "00", s: "00" });
  const { loadingScreen, loading, setLoading } = useLoadingScreen();
  const [location, setLocation] = useState(getRandomLocation());
  const [showReport, setShowReport] = useState<null | number>(null);

  const updateTime = useEffectEvent((time: Date) => {
    function formatTime(number: number) {
      return number < 10 ? "0" + number : "" + number;
    }

    const h = time.getHours();

    setCurrentTime({
      h: formatTime(h < 12 ? h + 12 : h),
      m: formatTime(time.getMinutes()),
      s: formatTime(time.getSeconds()),
    });
  });

  useEffect(() => {
    function updateApp() {
      setTimeout(() => {
        updateTime(new Date());
        updateApp();
        setLocation(getRandomLocation());
      }, 10 * 1000);
    }
    updateTime(new Date());
    updateApp();
  }, []);

  const openReport = (index: number) => {
    setShowReport(index);
    setLoading(true);
  };

  return (
    <div className="terminal">
      <div className="program tracker">
        <header className="program-header">
          <p>LIVE FEED </p>
          <p>2064-03-31</p>
          <p>
            {currentTime.h}:{currentTime.m}:{currentTime.s}
          </p>
        </header>

        {loading ? loadingScreen : null}
        {!loading && showReport !== null ? (
          <>
            <div className="incident">
              {INCIDENT_REPORTS.at(showReport)?.map((line) => (
                <p>{line}</p>
              ))}
            </div>
            <div className="incident_buttons">
              {showReport > 0 ? (
                <button
                  className="inlineBtn"
                  onClick={() =>
                    setShowReport((prev) => (prev ? prev - 1 : null))
                  }
                >
                  [prev]
                </button>
              ) : "[prev]"}
              <button className="inlineBtn" onClick={() => setShowReport(null)}>
                [close]
              </button>
              {showReport < INCIDENT_REPORTS.length - 1 ? (
                <button
                  className="inlineBtn"
                  onClick={() =>
                    setShowReport((prev) => (prev !== null ? prev + 1 : null))
                  }
                >
                  [next]
                </button>
              ) : "[next]"}
            </div>
          </>
        ) : null}

        {!loading && showReport === null ? (
          <>
            <div>
              <p>{">> TEAM STATUS:"}</p>
              <p> L. Berg | Sr. Asset Coord. | Seattle (Downtown) | [ACTIVE]</p>
              <p>
                I. Lindholm | Risk Mit. Spec. | Seattle (Nightlife Dist) |
                [ACTIVE]
              </p>
              <p>
                J. Nilsson | Phys. Cont. Off. | Seattle (Space Needle) |
                [ACTIVE]
              </p>
              <p>R. Gunnarsson | Dir. Cult. Syn. | {location} | [UNKNOWN]</p>
            </div>

            <div>
              <p>{">> SYSTEM NOTICES:"}</p>
              <p>
                - WARNING: Asset R. Gunnarsson's tracker is experiencing
                INTERFERENCE.
              </p>
              <p>
                - REMINDER: Report any unusual activity to E.
                Malmstein-Gunnarsson.
              </p>
            </div>

            <div className="incident_buttons">
              {INCIDENT_REPORTS.map((report, i) => (
                <button className="inlineBtn" onClick={() => openReport(i)}>
                  [{report.at(0)}]
                </button>
              ))}

              <button className="inlineBtn" onClick={onExit}>
                [Exit]
              </button>
            </div>
          </>
        ) : null}

        {loading || showReport === null ? <footer>
          <p>Version 10.66.925</p>
          <p>Clearance: HUGINN</p>
        </footer>: null}
      </div>
    </div>
  );
}

const SEATTLE_LOCATIONS = [
  "Downtown District",
  "Pike Place Market",
  "Space Needle",
  "Ares Macrotech HQ",
  "The Orpheum Theater",
  "Seattle Center",
  "Underground Metro Tunnels",
  "The Sprawl",
  "Bellevue Corporate Zone",
  "Everett Shipyards",
  "Tacoma Docks",
  "University District",
  "Capitol Hill",
  "The Renton Orbit",
  "Seattle Monorail",
];

const WORLD_WIDE_LOCATIONS = [
  "Tokyo",
  "Neo-Tokyo",
  "Berlin",
  "London",
  "Paris",
  "Dubai",
  "Hong Kong",
  "Singapore",
  "Moscow",
  "Bogota",
  "Lagos",
  "Sydney",
  "Zurich",
  "Tenochtitlan",
  "Amazonian Rainforest",
  "Denver",
  "Cheyenne Mountain",
  "Tir Tairngire",
  "Tir na nOg",
  "Saeder-Krupp HQ",
  "MCT HQ",
];

const WILD_CARD_LOCATIONS = [
  "The Moon (Lunar Colony)",
  "Area 51 (Desert)",
  "The North Pole",
  "The Bermuda Triangle",
  "Atlantis",
  "International Space Station",
  "Seattle (Trinity Taskbar)",
  "The Astral Plane",
  "A Pizza Delivery Drone",
  "Bug City",
  "Seattle (Redmond Barrens)",
  "Seattle (Renraku Arcology)",
];

function getRandomLocation() {
  const rand = Math.random();
  if (rand < 0.6) {
    // 60% chance: Seattle
    return `Seattle (${SEATTLE_LOCATIONS[Math.floor(Math.random() * SEATTLE_LOCATIONS.length)]})`;
  } else if (rand < 0.95) {
    // 35% chance: Worldwide
    return WORLD_WIDE_LOCATIONS[
      Math.floor(Math.random() * WORLD_WIDE_LOCATIONS.length)
    ];
  } else {
    // 5% chance: Wildcard
    return WILD_CARD_LOCATIONS[
      Math.floor(Math.random() * WILD_CARD_LOCATIONS.length)
    ];
  }
}

const INCIDENT_REPORTS = [
  [
    "INCIDENT REPORT #2064-03-31A",
    "Subject: Unauthorized Cultural Demonstration",
    "Reported By: J. Nilsson",
    "Asset: R. Gunnarsson",
    <>
      Summary:
      <br />
      Asset used corporate card at 09:13 to purchase "Viking-themed office
      supplies" from a street vendor near Pike Place Market. Items included: 1
      cybernetic drinking horn (¥3,200), 1 "authentic" fur cape (¥5,800), and 12
      "rune-engraved stress balls" (¥1,200). Vendor described Asset as "very
      enthusiastic but bad at math."
    </>,
    <>
      Resolution:
      <br /> Asset reminded that "rune-engraved stress balls" are not an
      approved expense. Asset responded: "They're for team morale."
    </>,
  ],
  [
    "INCIDENT REPORT #2064-03-31B",
    "Subject: Corporate Card Misuse",
    "Reported By: L. Berg",
    "Asset: R. Gunnarsson",
    <>
      Summary:
      <br />
      Asset was observed at 10:47 conducting an unsanctioned "Viking heritage
      demonstration" in the Seattle Center food court. Involved a cybernetic
      axe, a mead horn, and a PowerPoint presentation titled "Why Berserkers
      Make Better Middle Managers." Crowd of approximately 47 onlookers formed
      before security intervened.
    </>,
    <>
      Resolution:
      <br />
      Asset was escorted out. Seattle Center management has requested Gunnarsson
      Inc "reimburse them for the broken table." Budget approved: ¥8,500.
    </>,
  ],
  [
    "INCIDENT REPORT #2064-03-31C",
    "Subject: Suspicious Matrix Activity",
    "Reported By: I. Lindholm",
    "Asset: R. Gunnarsson",
    <>
      Summary:
      <br />
      Asset was detected at 11:16 in the downtown district, in close proximity
      to a known decker node. Matrix logs show Asset's comlink briefly connected
      to an unauthorized device. Signal was lost immediately afterward. Asset's
      tracker has been offline since 11:23.
    </>,
    <>
      Resolution:
      <br />
      Ongoing. IT has flagged Asset's comlink for inspection. I. Lindholm has
      requested a full audit of Asset's recent Matrix activity. Asset has not
      responded to requests for comment.
    </>,
  ],
  [
    "INCIDENT REPORT #2064-03-31D",
    "Subject: Asset Location Unknown",
    "Reported By: I. Lindholm",
    "Asset: R. Gunnarsson",
    <>
      Summary:
      <br />
      Asset was last seen at Seattle Space Needle at 11:59. Attempted to
      negotiate with a street vendor using a cybernetic axe. Vendor now believes
      Gunnarsson Inc is sponsoring a Viking festival. Asset subsequently
      disappeared into the crowd. Local surveillance teams have failed to
      relocate Asset.
    </>,
    <>
      Resolution:
      <br />
      Ongoing. I. Lindholm has expanded search radius to include downtown
      nightlife districts.
    </>,
  ],
];
