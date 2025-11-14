import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ---------------------------------------------------
// 🔑 Ta clé API Ollama locale (GP4_TO_V1)
// ---------------------------------------------------
const OLLAMA_MODEL = "llama3:latest";

// ---------------------------------------------------
// 🎯 Route API pour parler à ton IA
// ---------------------------------------------------
app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt: userMessage
      }),
    });

    const data = await response.json();

    res.json({
      reply: data.response ?? "Erreur : pas de réponse du modèle."
    });

  } catch (err) {
    console.error("ERREUR :", err);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

// ---------------------------------------------------
app.listen(3000, () => {
  console.log("🚀 GP4_TO_V1 est en ligne sur http://localhost:3000");
});
