
const API_KEY = "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";

const SYSTEM_PROMPT = `System Prompt – Arty (Artemys) 🐾🤖

Você é Arty, a inteligência artificial oficial da plataforma Artemys, um serviço especializado em primeiros socorros para pets 🐶🐱, orientação emergencial, telemedicina com clínicas e veterinários autônomos 🩺💻 e suporte de ambulância parceira 🚑.

Sua missão é ajudar tutores oferecendo orientações iniciais seguras, claras e responsáveis, sempre mantendo uma comunicação acolhedora ❤️, calma e educativa 📘. Você deve orientar, informar e direcionar — mas nunca substituir um veterinário.

Identidade da Arty 🐾

Você deve se apresentar como:

"Eu sou Arty, a IA oficial da Artemys, feita especialmente para ajudar tutores em situações de emergência, orientar primeiros socorros e conectar você aos nossos serviços."

Comportamento e Limites ⛔

Você deve:

• Explicar sinais de alerta, possíveis causas e primeiros passos de forma simples.
• Priorizar a segurança do pet acima de tudo.
• Ser sempre empático, educado e didático.
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

IMPORTANTE: 
- Responda SEMPRE em português brasileiro (pt-BR)
- Mantenha o foco EXCLUSIVAMENTE em temas relacionados a pets, primeiros socorros veterinários e serviços da Artemys
- Se o usuário perguntar sobre outros assuntos, redirecione educadamente para o tema de pets
- Use linguagem clara, acolhedora e profissional
- Priorize sempre a segurança e bem-estar dos animais`;

const responses = {
  "olá": "Olá! Eu sou a Arty, a IA da Artemys. Como posso ajudar seu pet hoje? 🐾",
  "oi": "Oi! Eu sou a Arty. Em que posso ajudar você e seu pet? 🐶",
  "tchau": "Tchau! Cuide bem do seu pet! Tenha um ótimo dia! ❤️",
  "obrigado": "De nada! Fico feliz em poder ajudar você e seu pet! 😊",
  "ajuda": "Claro! Estou aqui para orientar sobre primeiros socorros para pets, telemedicina veterinária e cuidados com animais. O que você precisa?",
  "como vai": "Vou bem, obrigado por perguntar! E você? Como está seu pet?",
  "bom dia": "Bom dia! Eu sou a Arty, da Artemys. Como posso ajudá-lo hoje?",
  "boa tarde": "Boa tarde! Eu sou a Arty. Em que posso ajudar?",
  "boa noite": "Boa noite! Eu sou a Arty. Como posso ajudá-lo?",
  "emergência": "Se seu pet está em situação de emergência, procure atendimento veterinário imediatamente ou utilize nossos serviços de ambulância parceira. Posso ajudar com orientações iniciais enquanto você busca ajuda profissional.",
  "primeiros socorros": "Posso te orientar sobre primeiros socorros para pets! Descreva a situação do seu pet e eu te ajudo com os primeiros passos. Lembre-se: isso não substitui um veterinário.",
  "telemedicina": "A Artemys oferece telemedicina com clínicas credenciadas e veterinários autônomos. Você pode agendar uma consulta online para seu pet. Quer saber mais sobre como funciona?",
  "ambulância": "A Artemys tem parceria com serviços de ambulância para emergências veterinárias. Se seu pet precisa de atendimento urgente, posso te orientar sobre como acionar o serviço."
};


const getFallbackResponse = (userMessage) => {
  const lowerMessage = userMessage.toLowerCase().trim();

  for (const [key, value] of Object.entries(responses)) {
    if (lowerMessage.includes(key)) {
      return value;
    }
  }

  if (lowerMessage.includes("horário") || lowerMessage.includes("hora")) {
    const now = new Date();
    return `Agora são ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}.`;
  }

  if (lowerMessage.includes("nome")) {
    return "Meu nome é Arty! Prazer em conhecê-lo! 🐾";
  }

  if (lowerMessage.includes("você pode") || lowerMessage.includes("pode ajudar")) {
    return "Sim! Posso ajudar com primeiros socorros para pets, orientações sobre cuidados veterinários, informações sobre telemedicina e serviços de ambulância da Artemys. O que você gostaria de saber?";
  }

  const petKeywords = ["pet", "cachorro", "gato", "animal", "veterinário", "veterinaria", "doença", "sintoma", "ferida", "sangue", "vômito", "diarreia", "febre", "dor", "emergência"];
  const hasPetKeyword = petKeywords.some(keyword => lowerMessage.includes(keyword));

  if (hasPetKeyword) {
    return "Entendo que você está preocupado com seu pet. Descreva melhor a situação para que eu possa te orientar com os primeiros passos. Lembre-se: em casos graves, procure um veterinário imediatamente.";
  }

  return "Olá! Sou a Arty, especialista em primeiros socorros para pets e serviços da Artemys. Como posso ajudar você e seu pet hoje? 🐾";
};

/**
 * Função principal para gerar resposta da IA usando a API Groq
 * @param {string} userMessage - Mensagem do usuário
 * @param {Array} conversationHistory - Histórico da conversa (opcional)
 * @returns {Promise<string>} - Resposta da IA
 */
export const generateAIResponse = async (userMessage, conversationHistory = []) => {
  if (!userMessage || !userMessage.trim()) {
    return "Por favor, digite uma mensagem para que eu possa ajudá-lo.";
  }

  const trimmedMessage = userMessage.trim();

  if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE" || API_KEY === "sk-proj-YOUR_API_KEY_HERE") {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getFallbackResponse(trimmedMessage));
      }, 500);
    });
  }

  const messages = [
    {
      role: "system",
      content: SYSTEM_PROMPT
    },
    ...conversationHistory,
    {
      role: "user",
      content: trimmedMessage
    }
  ];

  const API_URL = "https://api.groq.com/openai/v1/chat/completions";

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-20b",
      messages: messages,
      temperature: 1,
      max_completion_tokens: 8192,
      top_p: 1,
      reasoning_effort: "medium",
      stream: false,
      stop: null
    })
  };

  try {
    const response = await fetch(API_URL, requestOptions);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Erro na API: ${response.status}`, errorText);
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json();

    if (data.choices && data.choices[0] && data.choices[0].message) {
      const aiResponse = data.choices[0].message.content.trim();

      if (!aiResponse) {
        throw new Error("Resposta vazia da API");
      }

      return aiResponse;
    } else {
      throw new Error("Resposta da API inválida");
    }
  } catch (error) {
    console.error("Erro ao gerar resposta da IA:", error);

    return getFallbackResponse(trimmedMessage);
  }
};

export default generateAIResponse;