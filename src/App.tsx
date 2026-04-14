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

const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

export type TProgram = "vala";

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

  return (
    <>
      <div className="terminal">
        <pre>{mjolnir}</pre>
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
