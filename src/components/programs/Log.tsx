import { useState } from "react";
import { useLoadingScreen } from "../../hooks/useLoadingScreen";
import { DRAKKAR_SMALL } from "../AsciiArt";

interface LogEntry {
  id: number;
  body: string | string[];
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
  const selectedMessage = LOG_ENTERIES.find((msg) => msg.id === selectedId);



  return (
    <div className="terminal">
        <div className="program-bg-img"> <pre>{DRAKKAR_SMALL}</pre></div>
      <div className="program messaging-app">
        <header className="program-header">
          <p>Logbook of {SHIP_NAME}</p>
          <p>{getInLarpDate()}</p>
        </header>
        {hasLoadedOnce ?
        <div className="message-body">
          <div className="message-list" data-showing-message={selectedId !== null}>
            <ol>
              {LOG_ENTERIES.map((msg) => (
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
                <Message msg={selectedMessage} />
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

const Message = ({ msg }: { msg: LogEntry }) => {
  return (
    <>
      <div className="msg-title">Captain's log {msg.timestamp}</div>
      <br />
      {Array.isArray(msg.body) ? (
        msg.body.map((part, i) => (
          <p key={i} className="msg-body">
            {part}
          </p>
        ))
      ) : (
        <p className="msg-body">{msg.body}</p>
      )}
    </>
  );
};

const LOG_ENTERIES: LogEntry[] = [
  {
    id: 1,
    timestamp: "2064-04-15 17:46",
    body: [
      "Left the port of Gothenburg at 14:00.",
      "The ship is currently off the coast of Denmark, heading towards Hamburg.",
      "Weather conditions are smooth, and adventure is in the air.",
    ],
  },
  
];
