import { useEffect, useState } from "react";

export const bootSequence: string[][] = [
  ["GUNNARSSON INC. [Ver. 2064.03.13]"],
  ["(C) 2064 Gunnarsson Incorporated. All rights reserved."],
  [""],
  [
    "C:\\CYBERNET> _",
    "C:\\CYBERNET> c",
    "C:\\CYBERNET> co",
    "C:\\CYBERNET> corp",
    "C:\\CYBERNET> corpnet",
    "C:\\CYBERNET> corpnet.",
    "C:\\CYBERNET> corpnet.e",
    "C:\\CYBERNET> corpnet.ex",
    "C:\\CYBERNET> corpnet.exe",
  ],
  ["// CORPORATE ACCESS TERMINAL //"],
  ["Initializing secure Matrix uplink..."],
  [
    "> Connecting to Zurich Orbital Grid... [·..]",
    "> Connecting to Zurich Orbital Grid... [.·.]",
    "> Connecting to Zurich Orbital Grid... [..·]",
    "> Connecting to Zurich Orbital Grid... [.·.]",
    "> Connecting to Zurich Orbital Grid... [·..]",
    "> Connecting to Zurich Orbital Grid... [.·.]",
    "> Connecting to Zurich Orbital Grid... [..·]",
    "> Connecting to Zurich Orbital Grid... [OK]",
  ],
  [
    "> Verifying executive credentials... [...]",
    "> Verifying executive credentials... [A...]",
    "> Verifying executive credentials... [AU...]",
    "> Verifying executive credentials... [AUT...]",
    "> Verifying executive credentials... [AUTH...]",
    "> Verifying executive credentials... [AUTHO...]",
    "> Verifying executive credentials... [AUTHOR...]",
    "> Verifying executive credentials... [AUTHORI...]",
    "> Verifying executive credentials... [AUTHORIZ...]",
    "> Verifying executive credentials... [AUTHORIZE...]",
    "> Verifying executive credentials... [AUTHORIZED]",
  ],
  [
    "> Activating ICE security protocols... [...]",
    "> Activating ICE security protocols... [A...]",
    "> Activating ICE security protocols... [AC...]",
    "> Activating ICE security protocols... [ACT...]",
    "> Activating ICE security protocols... [ACTI...]",
    "> Activating ICE security protocols... [ACTIV...]",
    "> Activating ICE security protocols... [ACTIVE]",
  ],
  ["> Loading corporate dashboard modules..."],
  [
    "  [________________________________________] 0%",
    "  [█_______________________________________] 2%",
    "  [██______________________________________] 5%",
    "  [███_____________________________________] 7%",
    "  [████____________________________________] 10%",
    "  [█████___________________________________] 12%",
    "  [██████__________________________________] 15%",
    "  [███████_________________________________] 17%",
    "  [████████________________________________] 20%",
    "  [█████████_______________________________] 22%",
    "  [██████████______________________________] 25%",
    "  [███████████_____________________________] 27%",
    "  [████████████____________________________] 30%",
    "  [█████████████___________________________] 32%",
    "  [██████████████__________________________] 35%",
    "  [███████████████_________________________] 37%",
    "  [████████████████________________________] 40%",
    "  [█████████████████_______________________] 42%",
    "  [██████████████████______________________] 45%",
    "  [███████████████████_____________________] 47%",
    "  [████████████████████____________________] 50%",
    "  [█████████████████████___________________] 52%",
    "  [██████████████████████__________________] 55%",
    "  [███████████████████████_________________] 57%",
    "  [████████████████████████________________] 60%",
    "  [█████████████████████████_______________] 62%",
    "  [██████████████████████████______________] 65%",
    "  [███████████████████████████_____________] 67%",
    "  [████████████████████████████____________] 70%",
    "  [█████████████████████████████___________] 72%",
    "  [██████████████████████████████__________] 75%",
    "  [███████████████████████████████_________] 77%",
    "  [████████████████████████████████________] 80%",
    "  [█████████████████████████████████_______] 82%",
    "  [██████████████████████████████████______] 85%",
    "  [███████████████████████████████████_____] 87%",
    "  [████████████████████████████████████____] 90%",
    "  [█████████████████████████████████████___] 92%",
    "  [██████████████████████████████████████__] 95%",
    "  [███████████████████████████████████████_] 97%",
    "  [████████████████████████████████████████] 100%",
  ],
  ["Welcome to the Gunnarsson Incorporated Executive Portal."],
  ["// ANNOUNCEMENTS //"],
  ["> Quarterly earnings report available."],
  ["> All employees must update their biometrics by 2064-04-04."],
  ["> Remember: Data is the lifeblood of progress."],
  ["Type 'help' for a list of available commands."],
];

export const useBootup = (
  startDelay = 0,
  writeLineDelay = 600,
  typingSpeed = 120,
) => {
  const [terminalText, setTerminalText] = useState<string[]>([]);

  function writeNewLine(newLine: string) {
    setTerminalText((prev) => [...prev, newLine]);
  }

  useEffect(() => {
    let isCancelled = false;
    setTimeout(() => setTerminalText([]), 0);

    async function readNextRow(rowIdx = 0) {
      if (isCancelled || rowIdx > bootSequence.length - 1) return;

      async function readNextStep(stepIdx = 0) {
        if (isCancelled) return;

        setTerminalText((prev) => [
          ...(stepIdx ? (prev?.length ? prev.slice(0, -1) : []) : prev),
          bootSequence[rowIdx][stepIdx],
        ]);

        if (stepIdx < bootSequence[rowIdx].length - 1) {
          setTimeout(() => readNextStep(stepIdx + 1), typingSpeed);
        } else {
          setTimeout(() => readNextRow(rowIdx + 1), writeLineDelay);
        }
      }
      readNextStep();
    }

    setTimeout(() => readNextRow(), startDelay);

    return () => {
      isCancelled = true;
    };
  }, [startDelay, typingSpeed, writeLineDelay]);

  return {
    terminalText,
    terminalLoaded: terminalText.length >= bootSequence.length,
    writeNewLine,
  };
};
