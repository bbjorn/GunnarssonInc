import { useState } from "react";
import { useLoadingScreen } from "../../hooks/useLoadingScreen";
import { DRAKKAR_SMALL } from "../AsciiArt";

interface LogEntry {
  body: string[];
  timestamp: string;
}

export const SHIP_NAME = "MLS Ormen Röde";

const getInLarpDate = () => {
  // Returns the date of the latest message in the logbook in the format YYYY-MM-DD   

    const latestMessage = LOG_ENTERIES.reduce((latest, current) => { 
        return new Date(current.timestamp) > new Date(latest.timestamp) ? current : latest;
    }, LOG_ENTERIES[0]);

    return latestMessage.timestamp.split(" ")[0]; // Return only the date part
}   


export default function Log({ onExit }: { onExit: () => void }) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { loadingScreen, loading, setLoading, hasLoadedOnce } = useLoadingScreen();
  const selectedMessage = typeof selectedId === "number" ? LOG_ENTERIES.at(selectedId) : null;



  return (
    <div className="terminal">
      <div className="program-bg-img"><pre>{DRAKKAR_SMALL}</pre></div>
      <div className="program messaging-app">
        <header className="program-header">
          <p>Logbook of {SHIP_NAME}</p>
          <p>{getInLarpDate()}</p>
        </header>
        {hasLoadedOnce ?
        <div className="message-body">
          <div className="message-list" data-showing-message={selectedId !== null}>
            <ol>
              {LOG_ENTERIES.map((entry, i) =>({...entry, id: i })).map((msg) => (
                <li
                  key={msg.id}
                  className={selectedId === msg.id ? "selected" : ""}
                >
                  <button
                    className="inlineBtn"
                    onClick={() => {
                      setLoading(true);
                      setSelectedId(msg.id);
                    }}
                  >
                    [{msg.timestamp}]
                  </button>
                </li>
              ))}
            </ol>
            <button className="inlineBtn messageExitBtn" onClick={onExit}>
              [Exit]
            </button>
          </div>
          <div className="message-content">
            {loading ? (
              <div className="msg-placeholder">{loadingScreen}</div>
            ) : null}
            {selectedMessage && !loading ? (
              <>
                <Message msg={{...selectedMessage, id:selectedId ?? 0}} setSelectedId={setSelectedId} nbrOfEntries={LOG_ENTERIES.length} />
                <button
                  className="inlineBtn messageExitBtn"
                  onClick={() => setSelectedId(null)}
                  id="backBtn"
                >
                  [Back]
                </button>
              </>
            ) : null}
            {!loading && !selectedMessage ? (
              <div className="msg-placeholder">Select a log to read</div>
            ) : null}
          </div>
        </div> : <div className="msg-placeholder">{loadingScreen}</div>}
        <footer>
          <p>Version 950.10.03</p>
          <p>Clearance: NJORD</p>
        </footer>
      </div>
    </div>
  );
}

const Message = ({ msg, setSelectedId, nbrOfEntries }: { msg: LogEntry & { id: number }, setSelectedId: (id: number | null) => void, nbrOfEntries: number }) => {
  return (
    <>
      <div className="msg-title">Captain's log {msg.timestamp}</div>
      <br />
      {
        msg.body.map((part, i) => (
          <p key={i} className="msg-body">
            {part}
          </p>
        )
    )}
 
 <br />
 <div className="msg-nav">
    {msg.id>0 && ( <button
                  className="inlineBtn"
                  onClick={() => setSelectedId(msg.id - 1)}
                  id="prevBtn"
                >
                  [prev]
                </button>
   )}
   {msg.id < nbrOfEntries - 1 && (
     <button
       className="inlineBtn"
       onClick={() => setSelectedId(msg.id + 1)}
       id="nextBtn"
     >
       [next]
     </button>
   )} 
  </div>
 </>
  );
};

const LOG_ENTERIES: LogEntry[] = [
  {
 
    timestamp: "2064-04-15 17:46",
    body: [
      "Left the port of Gothenburg at 14:00.",
      "The ship is currently off the coast of Denmark, heading towards Hamburg.",
      "Weather conditions are smooth, and adventure is in the air.",
    ],
  },
  {
    timestamp: "2064-04-16 09:30",
    body: [
      "Arrived in Hamburg at 08:45.",
      "Ship is now undergoing maintenance and refueling.",
      "Crew has been told to go raid the local beer halls and enjoy the city.",
    ],
  },
  {

    timestamp: "2064-04-17 02:23",
    body: [
     "Went to the opera.",
     "Saw a performance of Wagner about rings.",
     "Too little fighting and too much singing for my taste.",
     "But it had vikings and valkyries, so it was still fun.",
    ],
  },
  {

    timestamp: "2064-04-21 12:15",
    body: [
      "Spent the last few days in Hamburg,",
      "resupplying and preparing for the next voyage.", 
      "Lots of beer and soywurst have been loaded into the ship's storage.",
      "Departed from Hamburg at 11:00.",
      "Heading towards the North Sea, with a planned stop in Europort.",
    ],
  }, 
  {
    timestamp: "2064-04-22 14:22",
    body: [
      "Arrived in Europort at half past one.",
      "Ship is now undergoing maintenance and refueling.",
      "Crew is on standby for the next leg of the journey.",
    ],
  }, {
    timestamp: "2064-04-23 13:03",
    body: [
      "Spent a few days in UNL.",
      "Took a trip to the Hague to explore the city and its rich history.",
      "Someone told me that there used to be Vikings part of the Netherlands.",
      "In an area called Friesland, there are still some Viking settlements.",
      "Departed from Europort at 12:30.",
      "Heading west towards France.",
    ],
  },
  {
    timestamp: "2064-04-29 15:45",
    body: [
      "Took a detour to Friesland to explore the Viking settlements.",
      "Locals were confused by our presence, but we were welcomed nonetheless.",
      "I learned that the Friesian vikings used to ride mammoths,",
      "except on Sundays, when they rode mastodons.",
      "No vikings settlements remain in the area.",
      "As they all have been chased off by a mad professor.",
      "Now they have gone to Hollywood.",
      "Will have to stop there on my journey.",
      ]
  }
];
