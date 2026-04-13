import { useState } from "react";
import { WRITE_LINE_DELAY } from "../utils/constants";

export const useCrash = (write: (newLine: string) => void) => {
  const [hasCrashed, setHasCrashed] = useState(false);

  const crash = () => {
    setHasCrashed(true);

    function writeCrashMsg(msgList: string[]) {
      const msg = msgList.at(0) ?? "";
      write(msgList.at(0) ?? "");

      if (msgList.length > 0) {
        setTimeout(() => writeCrashMsg(msgList.splice(1)), WRITE_LINE_DELAY);
      }

      if (msg === crashMessages.at(-1)) {
        document.querySelector("#fadeToBlack")?.classList.add("play");
      }
    }

    writeCrashMsg([...crashMessages]);
  };

  return { hasCrashed, crash };
};

const crashMessages = [
  ">>> SYSTEM FAILURE <<<",
  "",
  "!!! FATAL ERROR: 0xDEADCAFE",
  "!!! CORE MEMORY CORRUPTION DETECTED",
  "",
  "KERNEL PANIC: UNRECOVERABLE FAULT",
  "Location: C:\\CYBERNET\\core\\kernel32.sys",
  "",
  "!!! WARNING: Unauthorized access detected",
  "ICE PROTOCOLS: OVERRIDDEN",
  "Matrix uplink: SIGNAL LOST",
  "",
  ">>> STACK TRACE MALFORMED <<<",
  "  at ??? (0x????:0x????)",
  "  at ??? (0x????:0x????)",
  "",
  ">>> DATA INTEGRITY: COMPROMISED <<<",
  ">>> SYSTEM BREACH IN PROGRESS <<<",
  "",
  "!!! ERROR: Unable to restore system state",
  "!!! ERROR: Unable to restore system state",
  "!!! ERROR: Unable to restore system state",
  "",
  ">>> SYSTEM WILL SHUT DOWN IN...",
  "",
  "3...",
  "",
  "2...",
  "",
  "1...",
  ">>> END OF LINE <<<",
];
