"use client";

import { useEffect, useState } from "react";
import { PinIcon } from "./icons";
import { CONTACT } from "@/lib/data";

type GeoCity =
  | { status: "fallback" }
  | { status: "live"; label: string };

const CACHE_KEY = "as-location-v1";

// Shared across all LiveLocation instances so detection runs at most once
// per page, even with multiple components mounted.
let detectionPromise: Promise<GeoCity> | null = null;

async function detectLocation(): Promise<GeoCity> {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) return { status: "live", label: cached };

    if (!("geolocation" in navigator) || !navigator.permissions) {
      return { status: "fallback" };
    }
    const perm = await navigator.permissions.query({ name: "geolocation" });
    // Never trigger the permission prompt on page load — only use an
    // already-granted permission; otherwise stay on the fallback.
    if (perm.state !== "granted") return { status: "fallback" };

    const position = await new Promise<GeolocationPosition>(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 6000,
          maximumAge: 10 * 60 * 1000,
        });
      }
    );

    const controller = new AbortController();
    const label = await reverseGeocode(
      position.coords.latitude,
      position.coords.longitude,
      controller.signal
    );
    sessionStorage.setItem(CACHE_KEY, label);
    return { status: "live", label };
  } catch {
    return { status: "fallback" };
  }
}

function reverseGeocode(lat: number, lon: number, signal: AbortSignal): Promise<string> {
  // Free, keyless city-level reverse geocoding (BigDataCloud client API).
  return fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
    { signal }
  ).then((res) => {
    if (!res.ok) throw new Error("geocode failed");
    return res.json().then((data) => {
      const city: string =
        data.city || data.locality || data.principalSubdivision || "";
      const country: string = data.countryName || "";
      const label = [city, country].filter(Boolean).join(", ");
      if (!label) throw new Error("no label");
      return label;
    });
  });
}

export function useLiveLocation() {
  const [geo, setGeo] = useState<GeoCity>({ status: "fallback" });

  useEffect(() => {
    let cancelled = false;
    detectionPromise = detectionPromise ?? detectLocation();
    detectionPromise.then((result) => {
      if (!cancelled) setGeo(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return geo;
}

/**
 * Inline label variant for use inside definition lists and sentences.
 * Renders "City, Country" when detected, otherwise the base location.
 */
export function LiveLocationLabel() {
  const geo = useLiveLocation();
  return <>{geo.status === "live" ? geo.label : CONTACT.location}</>;
}

/**
 * City-level location chip. Shows the detected city when geolocation is
 * already permitted; otherwise falls back to the base location. Renders
 * the fallback during SSR so the markup stays crawlable and stable.
 */
export function LiveLocation({ className = "" }: { className?: string }) {
  const geo = useLiveLocation();
  const label = geo.status === "live" ? geo.label : CONTACT.location;

  return (
    <span className={`inline-flex min-w-0 items-center gap-2 ${className}`}>
      <PinIcon className="h-[18px] w-[18px] shrink-0" />
      <span className="truncate">{label}</span>
      {geo.status === "live" ? (
        <span
          className="inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400"
          title="Detected from your browser (approximate, city-level)"
          aria-label="Live location detected at city level"
        />
      ) : null}
    </span>
  );
}
