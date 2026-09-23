# 🌍 K-LINK AI

## AI-Powered Workplace Communication Assistant

> Bridging cultures. Preventing misunderstandings. Building better global teams.

K-LINK AI is an AI-powered workplace communication platform designed to help professionals communicate more effectively across languages and cultures.

It analyzes workplace messages, identifies communication risks, detects cultural intent, provides professional rewrites, summarizes meetings, answers questions from company knowledge, and helps users practice workplace communication.

---

## 🚀 Project Overview

Modern workplaces often involve people from different countries, languages, and cultural backgrounds.

A message that sounds normal in one culture may sound too direct, unclear, or impolite in another.

K-LINK AI uses AI to analyze workplace communication and provide context-aware assistance.

---

## ✨ Key Features

### 💬 1. Workplace Miscommunication Predictor

Analyzes workplace messages across multiple communication dimensions:

- Language detection
- Translation
- Intent detection
- Emotion detection
- Tone analysis
- Professionalism analysis
- Communication risk score
- Professional rewriting
- Original-language professional rewrite
- AI explanation

### 🌏 2. Cultural Intent Detection

Analyzes how workplace communication may be interpreted across cultures.

Provides:

- Literal meaning
- Cultural meaning
- Workplace context
- Cultural intent
- Formality
- Respect level
- Misunderstanding risk
- Professional equivalent
- Cultural explanation

### 🎙️ 3. Meeting Intelligence

Processes meeting transcripts and generates:

- Meeting summary
- Key discussion points
- Decisions
- Action items
- Important information

Voice input is also supported.

### 📚 4. RAG Knowledge Assistant

Allows users to ask questions based on company or workplace documents.

The system retrieves relevant information from the knowledge base and generates an AI response.

### 🎯 5. Communication Simulator

Provides realistic workplace scenarios where users can practice their responses.

The AI evaluates:

- Professionalism
- Politeness
- Clarity
- Cultural sensitivity
- Overall communication quality

It also provides:

- What went well
- Areas to improve
- Feedback
- Professional version

### 🎤 6. Voice Input

Users can speak their workplace responses instead of typing them.

---

## 🛠️ Technology Stack

### Frontend

- React
- Vite
- JavaScript
- CSS

### Backend

- Python
- FastAPI
- Uvicorn

### AI

- Google Gemini API

### AI / NLP

- Multilingual analysis
- Prompt-based language understanding
- Cultural intent analysis
- Communication risk analysis
- Retrieval-Augmented Generation (RAG)

---

# 📸 Project Screenshots

## 🏠 Home

![K-LINK AI Home](D:\K-LINK-AI\screenshots\Home.png)

---

## 💬 Workplace Miscommunication Predictor

![Miscommunication Predictor](screenshots/miscommunication.png)

---

## 🌏 Cultural Intent Detection

![Cultural Intent Detection](screenshots/cultural-intent.png)

---

## 🎙️ Meeting Intelligence

![Meeting Intelligence](screenshots/meeting-intelligence.png)

---

## 📚 RAG Knowledge Assistant

![RAG Assistant](screenshots/rag-assistant.png)

---

## 🎯 Communication Simulator

![Communication Simulator](screenshots/communication-simulator.png)

---

# 🧠 System Architecture

```text
                    ┌──────────────────────┐
                    │      User Input      │
                    │ Text / Voice / Docs  │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React Frontend     │
                    │       + Vite         │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    FastAPI Backend   │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
       Communication     Cultural Intent       RAG
          Analysis          Analysis          Assistant
              │                │                │
              └────────────────┼────────────────┘
                               ▼
                    ┌──────────────────────┐
                    │     Gemini API       │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ AI-generated Result  │
                    └──────────────────────┘