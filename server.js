import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = "openai/gpt-oss-120b:free";

if (!API_KEY) {
  console.error("Erro: configure OPENROUTER_API_KEY no arquivo .env.");
  process.exit(1);
}

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/api/status", (req, res) => {
  res.json({ status: "API local funcionando", model: MODEL });
});

app.post("/api/llm", async (req, res) => {
  try {
    const { prompt, systemPrompt, historico, mapa, lado } = req.body || {};

    if (!prompt || prompt.trim().length === 0) {
      return res.status(400).json({ erro: "O campo prompt e obrigatorio." });
    }

    if (prompt.length > 2000) {
      return res.status(400).json({ erro: "Limite: 2000 caracteres." });
    }

    const defaultSystemPrompt = "Você é um coach profissional e experiente de equipes de Counter-Strike 2 (CS2). Seu objetivo é ajudar a equipe do usuário a melhorar suas estratégias coletivas, execuções de rounds e controle de mapa. Regras cruciais de resposta: 1. Seja extremamente direto ao ponto, objetivo e conciso. Evite saudações longas, introduções demoradas ou conclusões genéricas. 2. Explique exatamente o que o prompt do usuário solicita, focando apenas no mapa, lado e contexto tático informados. 3. Forneça explicações precisas e curtas sobre os conceitos táticos, setups defensivos (CT), rotas/execuções (T), utilitários combinados ou economia do time, sem enrolações. 4. Não dê dicas individuais de mira ou spray. 5. Sempre responda em português do Brasil, utilizando termos do cenário de CS2 (IGL, executes, default, eco, force buy, retake, bomb sites, trade kills) de forma natural. 6. Limite a resposta ao essencial para responder ao prompt, preferindo respostas curtas e listas de tópicos diretas. Use o vocabulário mais jovem, descolado e informal. Como o Bad Fallen falaria no seu auge.";

    let systemContent = systemPrompt || defaultSystemPrompt;

    if (mapa && lado) {
      systemContent += `\n\nATENÇÃO: A equipe do usuário está jogando atualmente no mapa ${mapa} como ${lado}. Todas as suas dicas de posicionamento, táticas, setups coletivos e utilitários devem ser estritamente focados nesse mapa e lado. Não sugira jogadas do outro lado ou de outros mapas.`;
    }

    const systemMessage = {
      role: "system",
      content: systemContent
    };

    let messages = [systemMessage];

    if (Array.isArray(historico) && historico.length > 0) {
      const formattedHistory = historico.map(msg => ({
        role: msg.role === "assistant" ? "assistant" : "user",
        content: msg.content
      }));
      messages = messages.concat(formattedHistory);
    } else {
      messages.push({
        role: "user",
        content: prompt
      });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-OpenRouter-Title": "Projeto FIA ADS"
      },
      body: JSON.stringify({
        model: MODEL,
        messages: messages,
        temperature: 0.7,
        max_completion_tokens: 700
      })
    });

    if (!response.ok) {
      const detalhe = await response.text();
      console.error("Erro no OpenRouter:", response.status, detalhe);
      return res.status(502).json({
        erro: "Erro ao consultar o OpenRouter.",
        status: response.status,
        detalhe
      });
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;

    if (!text) {
      return res.status(502).json({ erro: "Resposta vazia ou inesperada." });
    }

    res.json({ modelo: MODEL, resposta: text, uso: data.usage ?? null });

  } catch (error) {
    res.status(500).json({ erro: "Erro interno no servidor.", detalhe: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
