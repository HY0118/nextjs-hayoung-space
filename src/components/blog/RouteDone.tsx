"use client";

import { useEffect } from "react";
import { useRouteStore } from "@/store/routeStore";

export default function RouteDone() {
  const stop = useRouteStore((s) => s.stop);
  useEffect(() => {
    stop();
  }, [stop]);
  return null;
}


