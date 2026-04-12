import { mjolnir } from "./components/AsciiArt";
import { InputLine } from "./components/InputLine";
import { useBootup } from "./hooks/useBootup";

function App() {
  const { terminalText, terminalLoaded, writeNewLine } = useBootup(1000);
  return (
    <div className="terminal">
      <pre>{mjolnir}</pre>
      {terminalText.map((line) => (
        <p>{line}</p>
      ))}
      {terminalLoaded ? <InputLine write={writeNewLine} /> : null}
    </div>
  );
}

export default App;
