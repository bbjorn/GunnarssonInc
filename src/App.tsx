import { useState } from "react";
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

const isLocalhost = window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1" || window.location.hostname === "192.168.0.171";

export type TProgram = "vala" | "teamtracker"

function App() {
  const { terminalText, terminalLoaded, writeNewLine } = useBootup(
    isLocalhost ? 0 : STARTUP_DELAY,
    isLocalhost ? 0 : WRITE_LINE_DELAY,
    isLocalhost ? 0 : TYPING_SPEED,
  );
  const [activeProgram, setActiveProgram] = useState<TProgram | null>(null);

  if (activeProgram === "vala") {
    return <Vala onExit={() => setActiveProgram(null)} />;
  }

  if(activeProgram === "teamtracker") {
    return <TeamTracker onExit={() => setActiveProgram(null)} />;
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
