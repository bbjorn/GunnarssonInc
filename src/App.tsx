import { useEffect, useState } from "react";
import { mjolnir } from "./components/AsciiArt";
import { InputLine } from "./components/InputLine";

import { useBootup } from "./hooks/useBootup";
import {
  STARTUP_DELAY,
  TYPING_SPEED,
  WRITE_LINE_DELAY,
} from "./utils/constants";
import Vala from "./components/programs/Vala";
import TeamTracker from "./components/programs/TeamTracker";
import MessagingApp from "./components/programs/MessagingApp";

const isLocalhost = 
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname === "192.168.0.171";


const hasLoadedOnce = window.sessionStorage.getItem("hasLoaded") === "true";
const bootupSpeedup = hasLoadedOnce ? 0.05 : 1

export type TProgram = "vala" | "teamtracker" | "messagingapp";

function App() {
  const { terminalText, terminalLoaded, writeNewLine } = useBootup(
    isLocalhost ? 0 : STARTUP_DELAY * bootupSpeedup,
    isLocalhost ? 0 : WRITE_LINE_DELAY * bootupSpeedup,
    isLocalhost ? 0 : TYPING_SPEED * bootupSpeedup,
  );
  const [activeProgram, setActiveProgram] = useState<TProgram | null>(null);

  useEffect(() => {
    if (terminalLoaded && !hasLoadedOnce) {
      window.sessionStorage.setItem("hasLoaded", "true");
    }
  }, [terminalLoaded]);

  if (activeProgram === "vala") {
    return <Vala onExit={() => setActiveProgram(null)} />;
  }

  if (activeProgram === "teamtracker") {
    return <TeamTracker onExit={() => setActiveProgram(null)} />;
  }

  if (activeProgram === "messagingapp") {
    return <MessagingApp onExit={() => setActiveProgram(null)} />;
  }

  return (
    <>
      <div className="terminal">
        <div className="asciiImg">
          <pre>{mjolnir}</pre>
        </div>
        {terminalText.map((line) =>
          typeof line === "string" ? (
            <p>{line === "" ? <br /> : line}</p>
          ) : (
            line
          ),
        )}
        {terminalLoaded ? (
          <InputLine write={writeNewLine} onRunProgram={setActiveProgram} />
        ) : null}
      </div>
      <div className="fadeToBlack" id="fadeToBlack"></div>
    </>
  );
}

export default App;
