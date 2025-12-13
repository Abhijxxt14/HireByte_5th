"use client";

import { useState } from "react";

export default function MicPermission() {
  const [status, setStatus] = useState<"idle" | "granted" | "denied">("idle");

  const askPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setStatus("granted");
    } catch (err) {
      setStatus("denied");
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={askPermission}
        className="px-4 py-2 rounded-md bg-blue-600 text-white"
      >
        Enable Microphone
      </button>

      {status === "granted" && (
        <p className="text-green-600 mt-2">Microphone access granted ✔</p>
      )}

      {status === "denied" && (
        <p className="text-red-600 mt-2">Microphone access denied ❌</p>
      )}
    </div>
  );
}
