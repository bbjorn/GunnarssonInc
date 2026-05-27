import { useEffect, useRef, useState } from "react";
import { TYPING_SPEED } from "../utils/constants";

export const useLoadingScreen = (loadingText = "Loading: ") => {
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(0);
    const hasLoadedOnce = useRef(false);


  useEffect(() => {
    if (loading) setTimeout(() => setLoaded(0), 0);
  }, [loading]);

  useEffect(() => {
    if (loaded >= 100) {
      setTimeout(() => setLoading(false));
      hasLoadedOnce.current = true;
      return;
    }

    setTimeout(() => {
      setLoaded((prev) => Math.min(prev + Math.ceil(Math.random() * 10), 100));
    }, TYPING_SPEED);
  }, [loaded]);

  // Render a loading bar with 20 segments
  const totalSegments = 20;
  const filledSegments = Math.round((loaded / 100) * totalSegments);
  const bar =
    "█".repeat(filledSegments) + "_".repeat(totalSegments - filledSegments);

  const loadingScreen = (
    <main>
      <p>{loadingText}</p>
      <pre>{bar}</pre>
      <p>{loaded}%</p>
    </main>
  );

  return { loadingScreen, loading, setLoading, hasLoadedOnce: hasLoadedOnce.current };
};
