# 🕶️ Bad Fallen IA - O Coach Definitivo de CS2

Salve! Tá cansado de ficar preso no Prata ou no Ouro e quer mandar aquele setup de respeito na GC ou no Premier? O **Bad Fallen IA** foi moldado na mentalidade de um dos maiores IGLs da história do Counter-Strike. Ele vai te dar as melhores calls de posicionamento, táticas de bomb, gerenciamento de economia (eco/force buy), executes com utilitários e muito mais, com o estilo do Verdadeiro.

Este projeto consiste em uma API local (Node.js + Express) integrada à API do OpenRouter com um frontend interativo.

---

## 🛠️ Passo a Passo para Subir o Servidor

Siga os passos abaixo para colocar o bot para rodar na sua máquina local:

### 1. Pré-requisitos
Antes de tudo, você precisa ter o **Node.js** instalado na sua máquina. Se não tiver, baixe a versão LTS no site oficial.

### 2. Instalar as Dependências
Abra o terminal na pasta do projeto e rode o comando abaixo para baixar as dependências
```bash
npm install
```

### 3. Configurar a Key da API
Você precisa de uma chave de API do OpenRouter para que a IA funcione. 
1. Crie um arquivo chamado `.env` na raiz do projeto.
2. Adicione a sua chave no seguinte formato:
```env
OPENROUTER_API_KEY=sua_chave_aqui
PORT=3000
```

### 4. Executar o Chatbot
Para ligar o servidor, rode o seguinte comando no terminal:
```bash
npm start
```

Se tudo der certo, você verá a mensagem:
`Servidor rodando em http://localhost:3000`

### 5. Acessar a Interface
Abra o seu navegador e acesse:
**[http://localhost:3000](http://localhost:3000)**

Pronto! Agora você está no lobby e pronto para receber as calls.

---

## 🎯 Exemplos de Prompts para Teste

O Bad Fallen IA funciona melhor quando você especifica o **mapa** e o **lado (CT ou TR)** nas configurações da interface, ou passa o contexto direto no chat. Aqui estão alguns prompts clássicos para você testar as calls do coach:

*   **Setup de Defesa (CT):**
    > *"A gente tá tomando muito rush B na Mirage nos rounds armados. Como a gente monta um setup sólido com 2 players lá dentro e 1 dando suporte da liga/janela?"*

*   **Entrada de TR (Execute/Tática):**
    > *"Qual a call para fazer um execute perfeito no Bomb A da Inferno? O que a gente smoka e onde joga as flashs para isolar o bomb?"*

*   **Gerenciamento de Economia (Eco/Force):**
    > *"Perdemos o pistol de TR na Nuke e plantamos a C4. O que a gente compra no round 2 para dar um force buy de respeito e tentar quebrar a economia dos CTs?"*

*   **Clutch & Retake:**
    > *"Tô numa situação de retake 2v3 no Bomb B da Overpass de CT. Qual a melhor rota de abordagem e como usar a bang para limpar o cimento?"*

---

OBS: Está tudo no mesmo commit pois tinha subido o .env no repo privado sem perceber antes. Pra não resetar os commits criei um repositório novo limpo.

Bom dia, boa tarde e boa noite. E lembre-se: **confia no Verdadeiro!** 🕶️
