# Configuração de Variáveis de Ambiente

## Groq API Key

Para usar o chatbot da Artemys, você precisa configurar a chave da API do Groq.

### Passos:

1. Crie um arquivo `.env` na raiz do projeto
2. Adicione a seguinte linha:

```
VITE_GROQ_API_KEY=sua_chave_aqui
```

**Nota:** Substitua `sua_chave_aqui` pela sua chave real da API do Groq.

3. Reinicie o servidor de desenvolvimento após criar o arquivo

### Importante:
- O arquivo `.env` já está no `.gitignore` e não será commitado
- Nunca compartilhe sua chave da API publicamente
- Se a chave for exposta, revogue-a imediatamente no console do Groq: https://console.groq.com/
- Obtenha sua chave em: https://console.groq.com/
