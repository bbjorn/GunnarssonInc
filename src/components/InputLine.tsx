import React, { useRef } from "react";
import { useCrash } from "../hooks/useCrash";

export const InputLine = ({ write }: { write: (newLine: string) => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { hasCrashed, crash } = useCrash(write);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();

      if (inputRef?.current?.value) {
        write("> " + inputRef.current.value);
        inputRef.current.value = "";
        crash();
      }
    }
  };
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
