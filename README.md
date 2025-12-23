# 🎤 AI Voice Assistant with 3D Avatar

##  Project Overview
This project is a browser-based AI Voice Assistant with a basic 3D avatar.  
The application allows users to speak using their microphone, converts speech to text, generates an AI response using Google Gemini, speaks the response back using text-to-speech, and animates a 3D avatar during AI speech.

The goal of this project is to demonstrate understanding of browser-based AI applications, voice interaction, and simple 3D avatar integration.

---

##  Technologies Used
- **HTML, CSS, JavaScript**
- **Web Speech API**
  - Speech Recognition (Voice → Text)
  - Speech Synthesis (Text → Voice)
- **Google Gemini API (Free Tier)** – AI response generation
- **Three.js** – Basic 3D avatar rendering and interaction

---

##  Steps to Run the Project Locally
1. Clone or download this repository  
2. Open the project folder on your system  
3. Open `index.html` in **Google Chrome** or **Microsoft Edge**  
4. Allow microphone access when prompted  
5. Click **“Start Speaking”** and interact with the assistant  

⚠ No deployment is required. The project runs fully in the browser.

---

##  Gemini API Key Setup (Mandatory)
This project uses a **free Google Gemini API key**.

### Steps to add your API key:
1. Visit https://aistudio.google.com/  
2. Sign in with a Google account  
3. Create a free Gemini API key  
4. Open the file `script.js`  
5. Replace the placeholder below with your own API key:

const GEMINI_API_KEY = window.GEMINI_API_KEY;

##  Important Notes
- Do **NOT** hardcode your real API key when pushing code to GitHub  
- The placeholder is intentionally used for security reasons  
- API key should only be added locally for testing  



##  Browser Requirements
- Google Chrome (recommended)  
- Microsoft Edge  
- Microphone access must be enabled  

---

##  Known Limitations
- Uses simulated avatar lip-sync (not real facial animation)  
- Gemini API availability may vary on the free tier  
- Speech recognition accuracy depends on microphone quality and environment  
- Basic 3D avatar interaction (intentionally simple as per task scope)

## 🎥 Demo Video
https://drive.google.com/file/d/1YVrBMzndLRQpyxpVMa3hTt0hF9WQ5qeG/view?usp=drive_link

