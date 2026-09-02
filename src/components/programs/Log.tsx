import { useState } from "react";
import { useLoadingScreen } from "../../hooks/useLoadingScreen";
import { DRAKKAR_SMALL } from "../AsciiArt";
import { LOG_ENTERIES, type LogEntry } from "../../assets/logentries";

export const SHIP_NAME = "MLS Ormen Röde";

const getInLarpDate = () => {
  // Returns the date of the latest message in the logbook in the format YYYY-MM-DD

  const latestMessage = LOG_ENTERIES.reduce((latest, current) => {
    return new Date(current.timestamp) > new Date(latest.timestamp)
      ? current
      : latest;
  }, LOG_ENTERIES[0]);

  return latestMessage.timestamp.split(" ")[0]; // Return only the date part
};

export default function Log({ onExit }: { onExit: () => void }) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { loadingScreen, loading, setLoading, hasLoadedOnce } =
    useLoadingScreen();
  const selectedMessage =
    typeof selectedId === "number" ? LOG_ENTERIES.at(selectedId) : null;

  return (
    <div className="terminal">
      <div className="program-bg-img">
        <pre>{DRAKKAR_SMALL}</pre>
      </div>
      <div className="program messaging-app">
        <header className="program-header">
          <p>Logbook of {SHIP_NAME}</p>
          <p>{getInLarpDate()}</p>
        </header>
        {hasLoadedOnce ? (
          <div className="message-body">
            <div
              className="message-list"
              data-showing-message={selectedId !== null}
            >
              <ol>
                {LOG_ENTERIES.map((entry, i) => ({ ...entry, id: i })).map(
                  (msg) => (
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
                  ),
                )}
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
                  <Message
                    msg={{ ...selectedMessage, id: selectedId ?? 0 }}
                    setSelectedId={setSelectedId}
                    nbrOfEntries={LOG_ENTERIES.length}
                    setLoading={setLoading}
                  />
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
          </div>
        ) : (
          <div className="msg-placeholder">{loadingScreen}</div>
        )}
        <footer>
          <p>Version 950.10.03</p>
          <p>Clearance: NJORD</p>
        </footer>
      </div>
    </div>
  );
}

const Message = ({
  msg,
  setSelectedId,
  nbrOfEntries,
  setLoading,
}: {
  msg: LogEntry & { id: number };
  setSelectedId: (id: number | null) => void;
  nbrOfEntries: number;
  setLoading: (loading: boolean) => void;
}) => {
  return (
    <>
      <div className="msg-title">Captain's log {msg.timestamp}</div>
      <br />
      {msg.body.map((part, i) => (
        <p key={i} className="msg-body">
          {part}
        </p>
      ))}

      <br />
      <div className="msg-nav">
        {msg.id > 0 && (
          <button
            className="inlineBtn"
            onClick={() => {
              setSelectedId(msg.id - 1);
              setLoading(true);
            }}
            id="prevBtn"
          >
            [prev]
          </button>
        )}
        {msg.id < nbrOfEntries - 1 && (
          <button
            className="inlineBtn"
            onClick={() => {
              setSelectedId(msg.id + 1);
              setLoading(true);
            }}
            id="nextBtn"
          >
            [next]
          </button>
        )}
      </div>
    </>
  );
};
