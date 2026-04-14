import React, { useEffect, useRef } from "react";
import { reports } from "../assets/reports";
import { useCrash } from "../hooks/useCrash";
import { TYPING_SPEED, WRITE_LINE_DELAY } from "../utils/constants";
import type { TTerminalLine } from "../utils/types";

export const InputLine = ({
  write,
}: {
  write: (newLine: TTerminalLine) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const loadedRef = useRef(false);
  const { hasCrashed, crash } = useCrash(write);
  const historyRef = useRef<string[]>([""]);
  const historyIndexRef = useRef<number>(0);

  function writeToCommandLine(command: string) {
    if (!inputRef.current) return;
    inputRef.current.value = "";

    for (let i = 0; i < command.length; i++) {
      setTimeout(() => {
        if (!inputRef.current) return;
        inputRef.current.value = (inputRef.current.value ?? "") + command[i];
      }, i * TYPING_SPEED);
    }

    setTimeout(() => {
      if (inputRef.current) {
        const event = new KeyboardEvent("keydown", {
          key: "Enter",
          bubbles: true,
        });
        inputRef.current.dispatchEvent(event);
      }
    }, command.length * TYPING_SPEED);
  }

  const openReport = (inputText: string, reportIdx: number) => {
    [inputText, ...(reports.at(reportIdx)?.report ?? [])].forEach((line, idx) =>
      setTimeout(() => write(line), idx * WRITE_LINE_DELAY),
    );
    setTimeout(
      () =>
        write(
          <>
            To list all available reports type{" "}
            <button
              className="inlineBtn"
              onClick={() => writeToCommandLine("list reports")}
            >
              'list reports'
            </button>
          </>,
        ),
      ((reports.at(reportIdx)?.report ?? []).length + 1) * WRITE_LINE_DELAY,
    );
  };

  const doListReports = (inputText: string = "> list reports") => {
    setTimeout(() => write(inputText), 0);
    reports.forEach((report, idx) => {
      const offsetIdx = idx + 1;
      setTimeout(
        () =>
          write(
            <p>
              {offsetIdx + ". "}
              <button
                className="inlineBtn"
                onClick={() => writeToCommandLine("open report " + report.name)}
              >
                {report.name}
              </button>
            </p>,
          ),
        offsetIdx * WRITE_LINE_DELAY,
      );
    });
    setTimeout(
      () =>
        write(
          <>
            For more commands type{" "}
            <button
              className="inlineBtn"
              onClick={() => writeToCommandLine("help")}
            >
              'help'{" "}
            </button>
          </>,
        ),
      reports.length * WRITE_LINE_DELAY,
    );
  };

  const doHelpCommand = (inputText: string = "> help") => {
    const helpCommands = [
      inputText,
      "GUNNARSSON INC. SECURE OS [Ver. 2064.03.13]",
      "",
      "These are common commands used in various situations:",
      <>
        <button
          className="inlineBtn"
          onClick={() => writeToCommandLine("list reports")}
        >
          list reports
        </button>{" "}
        - Lists all available reports
      </>,
      "open report # or [name] - opens corresonding report",
    ];

    helpCommands.forEach((cmd, idx) =>
      setTimeout(() => write(cmd), idx * WRITE_LINE_DELAY),
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key === "ArrowUp" &&
      historyRef.current.length > 0 &&
      inputRef.current
    ) {
      historyIndexRef.current =
        (historyIndexRef.current - 1 + historyRef.current.length) %
        historyRef.current.length;

      inputRef.current.value =
        historyRef.current[historyIndexRef.current] ?? "";
      event.preventDefault();
      return;
    }
    if (
      event.key === "ArrowDown" &&
      historyRef.current.length > 0 &&
      inputRef.current
    ) {
      historyIndexRef.current =
        (historyIndexRef.current + 1) % historyRef.current.length;

      inputRef.current.value =
        historyRef.current[historyIndexRef.current] ?? "";
      event.preventDefault();
      return;
    }
    // On any other key, reset the index
    historyIndexRef.current = 0;

    if (event.key === "Enter") {
      event.preventDefault();
      if (!inputRef?.current?.value) return;

      const command = inputRef?.current?.value?.toLocaleLowerCase().trim();
      const newLine = "> " + inputRef.current.value;

      if (command.startsWith("open report ")) {
        const arg = command.replace("open report ", "").trim();
        let idx = parseInt(arg, 10) - 1;
        if (!isNaN(idx) && reports[idx]) {
          openReport(newLine, idx);
          historyRef.current.push(inputRef.current.value);
          inputRef.current.value = "";
          return;
        }
        // Try to match by name (case-insensitive)
        idx = reports.findIndex(
          (r) => r.name.toLowerCase() === arg.toLowerCase(),
        );
        if (idx !== -1) {
          openReport(newLine, idx);
          historyRef.current.push(inputRef.current.value);
          inputRef.current.value = "";
          return;
        }
      }

      switch (command) {
        case "help":
          doHelpCommand(newLine);
          break;

        case "list reports":
          doListReports(newLine);
          break;

        default:
          write(newLine);
          crash();
      }
      historyRef.current.push(inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (!loadedRef.current) {
      loadedRef.current = true;
      write(
        <p>
          Type{" "}
          <button
            className="inlineBtn"
            onClick={() => writeToCommandLine("help")}
          >
            'help'
          </button>{" "}
          for a list of available commands.
        </p>,
      );
    }
  }, [write]);

  return hasCrashed ? null : (
    <p className="inputLine">
      {"> "}
      <input
        autoFocus
        placeholder=" "
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
    </p>
  );
};
