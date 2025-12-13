"use client";

import { useState, useRef } from "react";

export default function VoiceInput() {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState("");
  const recognitionRef = useRef<any>(null);

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript;
      setText((prev) => prev + " " + transcript);
    };

    recognition.onerror = (err: any) => {
      console.error("Speech recognition error:", err);
    };

    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  return (
    <div className="p-4 rounded-xl shadow-md border w-full max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-2">🎤 Voice to Text</h2>

      <textarea
        className="w-full p-3 border rounded-md"
        rows={4}
        value={text}
        readOnly
        placeholder="Your spoken words will appear here..."
      />

      <div className="flex gap-4 mt-4">
        {!isListening ? (
          <button
            onClick={startListening}
            className="px-4 py-2 bg-green-600 text-white rounded-md"
          >
            Start Speaking 🎙️
          </button>
        ) : (
          <button
            onClick={stopListening}
            className="px-4 py-2 bg-red-600 text-white rounded-md"
          >
            Stop Listening 🛑
          </button>
        )}
      </div>
    </div>
  );
}
