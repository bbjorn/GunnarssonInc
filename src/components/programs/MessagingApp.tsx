import { useState } from "react";
import { useLoadingScreen } from "../../hooks/useLoadingScreen";
import { ARCHIEVED_MESSAGES, CURRENT_MESSAGES, type TMessage } from "../../assets/messages";

export default function MessagingApp({ onExit }: { onExit: () => void }) {
  const [showArchieved, setShowArchieved] = useState(false);
  const [messageList, setMessageList] = useState(showArchieved ? ARCHIEVED_MESSAGES : CURRENT_MESSAGES)
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { loadingScreen, loading, setLoading, hasLoadedOnce, resetHasLoadedOnce } = useLoadingScreen();
  const selectedMessage = messageList.find((msg) => msg.id === selectedId);

  const onToggleArchive = (showArchive: boolean) => {
    setSelectedId(null);
    setShowArchieved(showArchive);
    setMessageList(showArchive ? ARCHIEVED_MESSAGES : CURRENT_MESSAGES);
    resetHasLoadedOnce();
  }


  return (
    <div className="terminal">
      <div className="program messaging-app">
        <header className="program-header">
          <p>Gunnarsson Message Center™</p>
          <p>{showArchieved ? "ARCHIVED 2064-03-31" : "2064-11-02"}</p>
        </header>
        {hasLoadedOnce ?
        <div className="message-body">
          <div className="message-list" data-showing-message={selectedId !== null}>
          <ol>
              {messageList.map((msg) => (
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
                    [{msg.title}]
                  </button>
                </li>    
              ))}
            </ol>
            <button className="inlineBtn messageExitBtn" onClick={() => onToggleArchive(!showArchieved)}>
              [Show {showArchieved ? "current" : "archived"} messages]
            </button>
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
              <div className="msg-placeholder">{messageList.length > 0 ? "Select a message to read" : "No new messages"}</div>
            ) : null}
          </div>
        </div> : <div className="msg-placeholder">{loadingScreen}</div>}
        <footer>
          <p>Version 8.66.101</p>
          <p>Clearance: HEATHEN</p>
        </footer>
      </div>
    </div>
  );
}

const Message = ({ msg }: { msg: TMessage }) => {
  return (
    <>
      <div className="msg-title">{msg.title}</div>
      <div className="msg-sender">From: {msg.sender}</div>
      <div className="msg-timestamp">{msg.timestamp}</div>
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

      {msg.inReplyTo ? (
        <>
          <br />
          ---------------------------
          <br />
          <Message msg={msg.inReplyTo} />
        </>
      ) : null}
    </>
  );
};

