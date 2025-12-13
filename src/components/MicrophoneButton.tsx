"use client";

export default function MicrophoneButton() {
  const requestMic = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        alert("Microphone access granted");
      })
      .catch((err) => {
        console.error(err);
        alert(err.name); // You will see NotAllowedError if broken
      });
  };

  return (
    <button
      onClick={requestMic}
      style={{ padding: "10px 20px", fontSize: 16 }}
    >
      Enable Microphone
    </button>
  );
}
