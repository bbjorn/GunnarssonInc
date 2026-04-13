import { useEffect, useState } from "react";
import type { TTerminalLine } from "../utils/types";

export const bootSequence: string[][] = [
  ["GUNNARSSON INC. SECURE OS [Ver. 2064.03.13]"],
  ["(C) 2064 Gunnarsson Incorporated. All rights reserved."],
  [""],
  [
    "Memory test:      0 MB",
    "Memory test:    256 MB",
    "Memory test:    512 MB",
    "Memory test:    768 MB",
    "Memory test:   1024 MB",
    "Memory test:   1536 MB",
    "Memory test:   2048 MB [PASS]",
  ],
  [""],
  ["Detecting system hardware..."],
  ["  > Neural I/O Bridge v4............. [OK]"],
  ["  > ICE Coprocessor MkVII............ [OK]"],
  ["  > Quantum Entropy Module........... [OK]"],
  ["  > Corp Uplink Interface............ [OK]"],
  [""],
  ["> Loading MATRIX kernel..."],
  [
    "  [____________________] 0%",
    "  [████________________] 20%",
    "  [████████____________] 40%",
    "  [████████████________] 60%",
    "  [████████████████____] 80%",
    "  [████████████████████] 100%",
  ],
  [""],
  ["Starting security services..."],
  [
    "> Activating ICE security protocols... [...]",
    "> Activating ICE security protocols... [A...]",
    "> Activating ICE security protocols... [AC...]",
    "> Activating ICE security protocols... [ACT...]",
    "> Activating ICE security protocols... [ACTI...]",
    "> Activating ICE security protocols... [ACTIV...]",
    "> Activating ICE security protocols... [ACTIVE]",
  ],
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
  [""],
  ["// CORPORATE ACCESS TERMINAL //"],
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
];

export const useBootup = (
  startDelay: number,
  writeLineDelay: number,
  typingSpeed: number,
) => {
  const [terminalText, setTerminalText] = useState<TTerminalLine[]>([]);

  function writeNewLine(newLine: TTerminalLine) {
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
