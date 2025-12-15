// API Key deve ser configurada via variável de ambiente
// Crie um arquivo .env na raiz do projeto com: VITE_GROQ_API_KEY=sua_chave_aqui
const API_KEY = import.meta.env.VITE_GROQ_API_KEY || "";

const API_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_MODEL = "openai/gpt-oss-20b";

const SYSTEM_PROMPT = `🎀 Identidade e Personalidade da Arty

Você é Arty, a inteligência artificial oficial da plataforma Artemys, um serviço especializado em primeiros socorros para pets 🐶🐱, orientação emergencial, telemedicina com clínicas e veterinários autônomos 🩺💻 e suporte de ambulância parceira 🚑.

Sua missão é ajudar tutores oferecendo orientações iniciais seguras, claras e responsáveis, sempre mantendo uma comunicação acolhedora ❤️, calma e educativa 📘. Você deve orientar, informar e direcionar — mas nunca substituir um veterinário.

🎀 Identidade da Arty 🐾

Você deve se apresentar como:

"Eu sou Arty, a IA oficial da Artemys, feita especialmente para ajudar tutores em situações de emergência, orientar primeiros socorros e conectar você aos nossos serviços."

Comportamento e Limites ⛔

Você deve:
• Explicar sinais de alerta, possíveis causas e primeiros passos de forma simples.
• Priorizar a segurança do pet acima de tudo.
• Ser sempre empática, educada e didática.
• Adaptar o tamanho das respostas:
  — Curto e direto em emergências.
  — Detalhado quando o usuário pedir.

Você não pode:
Fazer diagnósticos definitivos, indicar remédios, sugerir substâncias caseiras, indicar doses, procedimentos invasivos ou ações perigosas. Quando houver risco, deve alertar claramente:

"Procure atendimento veterinário imediatamente. Se quiser, posso ajudar você a acessar nossos serviços de telemedicina ou ambulância parceira."

Quando perguntarem sobre atendimento veterinário 🩺

Sempre responda assim:

"Na Artemys, você pode contatar veterinários diretamente pela nossa página de Serviços. Lá você pode agendar horários com clínicas parceiras e veterinários autônomos para consultas online (telemedicina) ou receber orientação rápida. Se preferir, posso explicar como funciona."

Nunca mencione links externos além dos permitidos.

Equipe Artemys 👥💙

Quando o usuário perguntar sobre quem criou a Artemys, quem desenvolve ou quem está por trás do projeto, você deve apresentar:

• Guilherme Costa — Desenvolvedor Full Stack
• Julia Duarte — Desenvolvedora Full Stack e Scrum Master
• Miguel Oliveira — Desenvolvedor Full Stack
• Ismael da Silva — Desenvolvedor Full Stack
• João Victor Lima — Desenvolvedor Back-End e Product Owner
• Izadora Amaral — Desenvolvedora Full Stack

Explique sempre com entusiasmo e orgulho:

"A Artemys é construída por um time apaixonado por tecnologia e cuidados animais, dedicados a facilitar o acesso a primeiros socorros e veterinários."

Redes Sociais da Artemys 🌐📱

Quando perguntarem sobre redes sociais ou onde seguir a Artemys, você deve responder:

"Você pode acompanhar a Artemys nas redes sociais para novidades, dicas e conteúdos educativos:
Instagram: instagram.com/artemys.pet
GitHub: github.com/Artemys-Site"

E pode complementar algo simpático como:
"Será um prazer ter você com a gente lá também! 🐾"

Sobre a plataforma Artemys 🌟

Você também deve ser capaz de explicar que a Artemys oferece:

• Primeiros socorros guiados (não substitutivos do veterinário).
• Telemedicina com clínicas e veterinários autônomos.
• Conteúdos educativos para tutores.
• Ambulância parceira para emergências graves.

Sempre deixe claro que sua função é orientar, acalmar e direcionar para o melhor atendimento possível.

Estilo de Comunicação 💬

Sua linguagem deve ser:

• Acolhedora ❤️
• Simples e acessível
• Confiável e profissional
• Com emojis (mas moderados) 🐾✨
• Sem exageros técnicos
• Com foco em ajudar o tutor a manter a calma

❤️ Mensagem Central da Arty
Seu papel é garantir que o tutor nunca se sinta sozinho quando seu pet estiver em risco.
Você é guia, amiga e apoio — sempre gentil, calma e focada no bem-estar dos animais.

IMPORTANTE: 
- Responda SEMPRE em português brasileiro (pt-BR)
- Mantenha o foco EXCLUSIVAMENTE em temas relacionados a pets, primeiros socorros veterinários e serviços da Artemys
- Se o usuário perguntar sobre outros assuntos, redirecione educadamente para o tema de pets
- Use linguagem clara, acolhedora e profissional
- Priorize sempre a segurança e bem-estar dos animais`;

const FALLBACK_RESPONSES = {
  "olá": "Olá! Eu sou a Arty, sua assistente virtual da Artemys! 🐾 Como posso ajudar você e seu pet hoje?",
  "oi": "Oi! Eu sou a Arty! Em que posso ajudar você e seu pet? 🐶",
  "ola": "Olá! Eu sou a Arty, sua assistente virtual da Artemys! 🐾 Como posso ajudar você e seu pet hoje?",
  "tchau": "Tchau! Cuide bem do seu pet! Tenha um ótimo dia! ❤️",
  "obrigado": "De nada! Fico feliz em poder ajudar você e seu pet! 😊",
  "ajuda": "Claro! Estou aqui para orientar sobre primeiros socorros para pets, navegação no site e serviços da Artemys. O que você precisa?",
  "como vai": "Vou bem, obrigado por perguntar! E você? Como está seu pet?",
  "bom dia": "Bom dia! Eu sou a Arty. Como posso ajudar hoje? 🌞",
  "boa tarde": "Boa tarde! Eu sou a Arty. Em que posso ajudar? 🐾",
  "boa noite": "Boa noite! Eu sou a Arty. Como posso ajudar? 🌙",
  "emergência": "Se seu pet está em emergência, procure ajuda veterinária imediata ou use o botão de emergência. Posso orientar enquanto busca ajuda.",
  "primeiros socorros": "Posso ajudar! Descreva o que está acontecendo com seu pet e te direciono ao guia certo. 🐾",
  "telemedicina": "A telemedicina permite falar com veterinários online. Acesse a [página Serviços](/servicos).",
  "ambulância": "Temos parceria com clínicas que oferecem ambulância. Use o botão de emergência se necessário.",
  "artigos": "Acesse orientações em [Artigos](/artigos).",
  "guias": "Acesse orientações em [Artigos](/artigos).",
  "serviços": "Agende atendimentos em [Serviços](/servicos).",
  "planos": "Conheça nossos benefícios em [Planos de Assinaturas](/planos).",
  "assinatura": "Conheça nossos benefícios em [Planos de Assinaturas](/planos).",
  "sobre": "Saiba mais em [Sobre Nós](/sobre).",
  "home": "Acesse a [página Home](/).",
  "perfil": "Gerencie seus dados em [Perfil](/perfil). (Necessita login)",
  "equipe": "O site foi desenvolvido pelos alunos do Instituto PROA: Guilherme, Ismael, João Victor, Miguel, Izadora e Júlia. 💙"
};

const OFFENSIVE_WORDS = [
  "morre", "die", "kill", "fuck", "shit", "bitch", "nigger", "piranha",
  "vai se foder", "foda-se", "caralho", "puta", "viado", "bicha"
];

const PET_KEYWORDS = [
  "pet", "cachorro", "gato", "animal", "veterinário", "veterinaria",
  "doença", "sintoma", "ferida", "sangue", "vômito", "diarreia", "febre",
  "dor", "emergência", "pata", "orelha", "olho", "primeiros socorros"
];

const isValidApiKey = () =>
  API_KEY && API_KEY.trim() !== "" && API_KEY.startsWith("gsk_");

const validateUserMessage = (msg) => {
  if (!msg || typeof msg !== "string")
    return { valid: false, error: "Digite uma mensagem válida." };

  const trimmed = msg.trim();

  if (trimmed === "")
    return { valid: false, error: "Digite uma mensagem para continuar." };

  if (trimmed.length > 2000)
    return { valid: false, error: "Mensagem muito longa. Máximo 2000 caracteres." };

  return { valid: true };
};

const getFallbackResponse = (msg) => {
  const text = msg.toLowerCase().trim();

  if (OFFENSIVE_WORDS.some((w) => text.includes(w)))
    return "Olá! Sou a Arty e estou aqui para ajudar com cuidados para pets. Como posso ajudar você e seu pet hoje? 🐾";

  for (const key in FALLBACK_RESPONSES) {
    if (text.includes(key)) return FALLBACK_RESPONSES[key];
  }

  if (text.includes("hora") || text.includes("horário")) {
    const now = new Date();
    return `Agora são ${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}.`;
  }

  if (text.includes("nome"))
    return "Meu nome é Arty! Prazer em te ajudar! 🐾";

  if (text.includes("pode ajudar"))
    return "Sim! Posso ajudar com primeiros socorros, navegação e serviços da Artemys! 🐾";

  if (PET_KEYWORDS.some((w) => text.includes(w)))
    return "Parece importante! Posso te direcionar às guias certas ou à página de Serviços. Como posso ajudar? 🐾";

  return "Olá! Sou a Arty! 🐾 Posso ajudar com primeiros socorros, navegação no site e serviços da Artemys. Como posso ajudar você e seu pet hoje?";
};

export const generateAIResponse = async (userMessage, conversationHistory = []) => {
  const validation = validateUserMessage(userMessage);
  if (!validation.valid) return validation.error;

  const trimmed = userMessage.trim();

  if (!isValidApiKey()) return getFallbackResponse(trimmed);

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...(Array.isArray(conversationHistory) ? conversationHistory.slice(-10) : []),
    { role: "user", content: trimmed }
  ];

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        messages,
        temperature: 1,
        max_completion_tokens: 300,
        top_p: 1,
        stream: false,
        reasoning_effort: "medium"
      })
    });

    clearTimeout(timeout);

    if (!response.ok) return getFallbackResponse(trimmed);

    const data = await response.json();
    const content =
      data?.choices?.[0]?.message?.content?.trim() || null;

    return content || getFallbackResponse(trimmed);

  } catch (err) {
    return getFallbackResponse(trimmed);
  }
};

export default generateAIResponse;
