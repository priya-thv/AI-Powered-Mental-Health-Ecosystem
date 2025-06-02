# 🌱 Luna & Solara – AI Mental Health Ecosystem

**Luna** is a calm, emotionally present AI-powered therapist chatbot, while **Solara** is a compassionate journaling companion designed to guide users in self-expression, reflection, and emotional healing through writing. Together, they form a supportive AI ecosystem built to foster self-awareness, resilience, and peace.

---

## ✨ Features

### 🌼 Luna – Virtual Therapist
- Emotionally adaptive responses (positive, neutral, negative tones)
- Reflective, grounding conversation style
- Practical healing exercises (breathing, journaling prompts, mindfulness)
- Personalized AI-generated music based on emotional state
- Persistent memory for emotional context
- Safe, secure, and non-judgmental interactions

### 🪷 Solara – Journaling Companion
- Emotion-specific journaling prompts
- Daily self-reflection check-ins
- Writing encouragement and feedback without judgment
- Beautiful, calming UI to inspire consistent journaling
- Stores and organizes entries securely in MongoDB Atlas
- Syncs with Lumi for an integrated therapeutic experience

---

## 🧰 Tech Stack

- **Frontend**: HTML, CSS, JavaScript  
- **Backend**: Node.js, Express  
- **Database**: MongoDB Atlas  
- **AI Engine**: OpenAI / Voiceflow AI Agent  
- **Authentication**: JWT  
- **Hosting**: Render

---

## 🛠️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/mental-health-ai-ecosystem.git
cd mental-health-ai-ecosystem

# Install backend dependencies
npm install

# Create environment variables
touch .env
# Add your secrets:
# OPENAI_API_KEY=your_key
# MONGODB_URI=your_uri
# JWT_SECRET=your_secret

# Start the server
npm start
