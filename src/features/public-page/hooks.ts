import { useEffect, useRef } from "react";
import { registerPageView, registerLinkClick } from "@core/api/stats";

export function usePageViewTracking(username: string) {
  const tracked = useRef(false);
  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    void registerPageView(username);
  }, [username]);
}

export function trackLinkClick(linkId: string) {
  void registerLinkClick(linkId);
}
