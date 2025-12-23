let speechDetected = false;

const GEMINI_API_KEY = window.GEMINI_API_KEY;

const startBtn = document.getElementById("startBtn");
const userText = document.getElementById("userText");
const aiText = document.getElementById("aiText");

/* =========================
    BUTTON CONTROL
========================= */
function disableButton(text = "⏳ Processing...") {
  startBtn.disabled = true;
  startBtn.innerText = text;
}

function enableButton() {
  startBtn.disabled = false;
  startBtn.innerText = "🎤 Start Speaking";
}

/* =========================
    SPEECH RECOGNITION
========================= */
startBtn.addEventListener("click", () => {
  disableButton("🎤 Listening...");

  if (!("webkitSpeechRecognition" in window)) {
    alert("Please use Chrome or Edge browser");
    enableButton();
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => {
    speechDetected = false;
  };

  recognition.onresult = async (event) => {
    speechDetected = true;
    const text = event.results[0][0].transcript;

    console.log("🗣️ User said:", text);
    userText.innerText = text;

    disableButton("🤖 Thinking...");
    const reply = await getGeminiResponse(text);

    aiText.innerText = reply;
    disableButton("🔊 AI Speaking...");
    speak(reply);
  };

  recognition.onerror = () => enableButton();
  recognition.onend = () => {
    if (!speechDetected) enableButton();
  };

  recognition.start();
});

/* =========================
    GEMINI AI (SAFE + FALLBACK)
========================= */
async function getGeminiResponse(prompt) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();
    console.log("Gemini response:", data);

    if (!response.ok || !data.candidates) {
      throw new Error("Gemini unavailable");
    }

    return data.candidates[0].content.parts[0].text;

  } catch (error) {
    console.warn("⚠️ Gemini fallback used:", error);

    // ✅ FALLBACK RESPONSE (IMPORTANT)
    return "Hello! I'm an AI voice assistant. I can understand your voice input and respond intelligently while interacting with a 3D avatar.";
  }
}

/* =========================
   🔊 TEXT TO SPEECH + AVATAR
========================= */
function speak(text) {
  if (!text) {
    enableButton();
    return;
  }

  window.speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";
  speech.rate = 1;
  speech.pitch = 1;

  speech.onstart = () => {
    if (window.startSpeaking) window.startSpeaking();
  };

  speech.onend = () => {
    if (window.stopSpeaking) window.stopSpeaking();
    enableButton();
  };

  speech.onerror = () => {
    if (window.stopSpeaking) window.stopSpeaking();
    enableButton();
  };

  window.speechSynthesis.speak(speech);
}
