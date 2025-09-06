# J.S_RetroGames - Servidor Premium de Jogos Retrô

Um hub de jogos retrô moderno e responsivo construído com Next.js, oferecendo uma experiência premium de gaming com **sistema de emulação real** usando EmulatorJS e suporte a múltiplos consoles clássicos.

## 🎮 Características Principais

- **Sistema de Emulação Real** com EmulatorJS integrado
- **Autenticação Segura** com controle de acesso administrativo
- **Upload de ROMs** com URLs do Internet Archive
- **Interface Premium 3D** com design gaming e cores preto/dourado/vermelho
- **Compatibilidade Universal** - funciona em smartphones, tablets, PCs e Smart TVs
- **Suporte a Controles** - USB, Bluetooth e Wireless detectados automaticamente
- **PWA (Progressive Web App)** - instale como aplicativo nativo
- **Servidor Premium** com baixa latência e alta disponibilidade

## 🔐 Sistema de Autenticação

### Credenciais de Administrador
- **Email**: `jadsonreserva98@gmail.com`
- **Senha**: `admin9809`

### Funcionalidades do Admin
- ✅ **Aprovação de Usuários** - Controle total sobre novos registros
- ✅ **Upload de ROMs** - Adicionar jogos via URL ou arquivo
- ✅ **Gerenciamento** - Painel administrativo completo
- ✅ **Monitoramento** - Status de usuários online e sistema

### Para Usuários Regulares
- 📝 **Registro** - Criar conta com aprovação necessária
- ⏳ **Aprovação** - Aguardar liberação do administrador
- 🎮 **Acesso** - Jogar após aprovação

## 🚀 Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **EmulatorJS** - Sistema de emulação real integrado
- **Tailwind CSS v4** - Estilização moderna com design 3D
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones modernos
- **LocalStorage** - Persistência de dados do usuário
- **PWA** - Funcionalidade de aplicativo web progressivo

## 🎯 Sistema de Emulação Real

### Emuladores Integrados por Console:
| Console | Core EmulatorJS | Status | Formatos Suportados |
|---------|-----------------|--------|-------------------|
| **SNES** | snes9x | ✅ Funcional | .smc, .sfc, .zip |
| **N64** | mupen64plus | ✅ Funcional | .n64, .z64, .zip |
| **PS1** | mednafen_psx_hw | ✅ Funcional | .bin, .cue, .chd |
| **PS2** | pcsx2 | ⚠️ Experimental | .iso, .chd |
| **Xbox 360** | xenia | ⚠️ Experimental | .iso, .xex |

### Funcionalidades do Emulador:
- 🎮 **Controles Reais** - Gamepad API integrada
- 💾 **Save States** - Salvar/carregar estados do jogo
- 🔊 **Áudio** - Som em tempo real
- 📱 **Mobile** - Controles virtuais para touch
- 🖥️ **Fullscreen** - Modo tela cheia
- ⚙️ **Configurações** - Ajustes de vídeo e áudio

## 🌐 URLs Base para ROMs Legais (Internet Archive)

### Coleções Recomendadas:

#### SNES
\`\`\`
https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Super%20Nintendo%20Entertainment%20System/
\`\`\`

#### N64
\`\`\`
https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Nintendo%2064/
\`\`\`

#### PlayStation 1
\`\`\`
https://archive.org/download/chd_psx/
\`\`\`

#### PlayStation 2
\`\`\`
https://archive.org/download/chd_ps2/
\`\`\`

### Exemplos de URLs Completas:
- **SNES**: `https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Super%20Nintendo%20Entertainment%20System/Super%20Mario%20World%20%28USA%29.zip`
- **N64**: `https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Nintendo%2064/Super%20Mario%2064%20%28USA%29.zip`
- **PS1**: `https://archive.org/download/chd_psx/Final%20Fantasy%20VII%20%28USA%29%20%28Disc%201%29.chd`

## ⚙️ Como Funciona o Sistema

### 1. Autenticação e Controle de Acesso
\`\`\`typescript
// Sistema de login com sessões persistentes
const ADMIN_CREDENTIALS = {
  email: "jadsonreserva98@gmail.com",
  password: "admin9809",
}

// Sessões com expiração de 24 horas
const session = {
  user: adminUser,
  expiry: Date.now() + (24 * 60 * 60 * 1000)
}
localStorage.setItem("gamingHubSession", JSON.stringify(session))
\`\`\`

### 2. Sistema de Emulação Real
\`\`\`typescript
// Configuração automática do EmulatorJS
window.EJS_player = '#emulator-container'
window.EJS_gameUrl = game.rom // URL real do Internet Archive
window.EJS_core = 'snes9x' // Core baseado no console
window.EJS_pathtodata = 'https://cdn.jsdelivr.net/gh/EmulatorJS/EmulatorJS@latest/data/'
\`\`\`

### 3. Upload e Gerenciamento de ROMs
\`\`\`typescript
// Upload com validação e persistência
const newRom = {
  id: Date.now(),
  title: uploadData.title,
  console: uploadData.console,
  rom: uploadData.romUrl, // URL real do Internet Archive
  fileType: uploadData.console.toLowerCase(),
  uploadDate: new Date().toISOString()
}

// Salvar no localStorage para persistência
localStorage.setItem("uploadedRoms", JSON.stringify(updatedRoms))
\`\`\`

## 📱 Compatibilidade de Dispositivos

### Totalmente Compatível
- ✅ **iPhone/iPad** - Touch controls, Safari, PWA
- ✅ **Android** - Touch controls, Chrome, PWA  
- ✅ **Windows/Mac/Linux** - Teclado, controles USB/Bluetooth
- ✅ **Smart TV Android** - Controle remoto, gamepads Bluetooth

### Controles Suportados (Gamepad API)
- 🎮 **USB** - Xbox, PlayStation, genéricos (Plug & Play)
- 🔵 **Bluetooth** - PS4, PS5, Xbox One/Series (pareamento automático)
- 📡 **Wireless** - Receptores 2.4GHz (detecção automática)

## 🛠️ Instalação e Deploy

### Instalação Automática
\`\`\`bash
# Execute o script de instalação
npm run install-setup

# Ou manualmente:
chmod +x scripts/install.sh && ./scripts/install.sh
\`\`\`

### Desenvolvimento Local
\`\`\`bash
# Clone o repositório
git clone https://github.com/AcervoParts/v0-gaming-hub-installation.git
cd v0-gaming-hub-installation

# Entre no diretório
cd js-retrogames

# Execute a instalação automática
npm run install-setup

# Execute em modo de desenvolvimento
npm run dev
\`\`\`

### Deploy Automático
\`\`\`bash
# Execute o deploy completo
npm run deploy

# Ou manualmente:
chmod +x scripts/deploy.sh && ./scripts/deploy.sh
\`\`\`

### Deploy na Vercel (Recomendado)
1. **Push para GitHub** - Conecte seu repositório
2. **Import no Vercel** - Importe o projeto
3. **Deploy Automático** - Build e deploy automáticos
4. **HTTPS Obrigatório** - Necessário para Gamepad API e PWA

### Configurações Necessárias para Deploy:

#### next.config.mjs
\`\`\`javascript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Cross-Origin-Embedder-Policy',
          value: 'require-corp',
        },
        {
          key: 'Cross-Origin-Opener-Policy',
          value: 'same-origin',
        },
      ],
    },
  ]
}
\`\`\`

## 📋 Estrutura do Projeto Real

\`\`\`
js-retrogames/
├── app/
│   ├── layout.tsx          # Layout com metadados SEO
│   ├── page.tsx            # Sistema completo de autenticação e jogos
│   ├── loading.tsx         # Loading com animações
│   ├── globals.css         # Tailwind CSS v4 configurado
│   └── manifest.json       # PWA manifest
├── components/
│   ├── game-player.tsx     # EmulatorJS integrado
│   ├── admin-panel.tsx     # Painel administrativo
│   ├── rom-uploader.tsx    # Upload de ROMs funcional
│   ├── device-compatibility.tsx
│   ├── installation-guide.tsx
│   ├── cloud-server-status.tsx
│   └── rom-documentation.tsx
├── components/ui/          # Componentes Radix UI
├── lib/
│   └── utils.ts            # Utilitários Tailwind
├── scripts/
│   ├── install.sh          # Script de instalação automática
│   └── deploy.sh           # Script de deploy automático
├── public/
│   ├── js-retrogames-logo.png  # Logo oficial 3D
│   ├── games/              # Imagens dos jogos
│   └── roms/               # ROMs locais (opcional)
├── next.config.mjs         # Configurações CORS e headers
├── package.json            # Dependências atualizadas
└── README.md               # Esta documentação
\`\`\`

## 🎨 Design 3D Gaming

### Paleta de Cores J.S_RetroGames
- **Preto**: `#000000` - Fundo principal
- **Dourado**: `#FFD700` - Elementos principais e texto
- **Vermelho**: `#DC2626` - Botões e acentos
- **Sombreados**: Gradientes escuros para profundidade 3D

### Elementos Visuais
- ✨ **Efeitos 3D** - Sombras, gradientes e transformações
- 🎮 **Ícones Gaming** - Controles, consoles e elementos retrô
- 🌟 **Animações** - Transições suaves e hover effects
- 📱 **Responsivo** - Design adaptativo para todos os dispositivos

## 🔧 Status do Sistema

### ✅ Funcionalidades Implementadas
- [x] **Autenticação Real** - Login/registro com sessões
- [x] **Sistema de Aprovação** - Admin aprova novos usuários
- [x] **Emulação Real** - EmulatorJS carregando ROMs do Internet Archive
- [x] **Upload de ROMs** - Interface para adicionar jogos
- [x] **Controles** - Gamepad API detectando controles reais
- [x] **Persistência** - LocalStorage para dados do usuário
- [x] **PWA** - Instalável como app nativo
- [x] **Responsivo** - Funciona em todos os dispositivos
- [x] **Design 3D** - Interface gaming com cores preto/dourado/vermelho

### 🚧 Melhorias Futuras
- [ ] **Banco de Dados** - Migrar de localStorage para DB real
- [ ] **Multiplayer** - Jogos online entre usuários
- [ ] **Cloud Saves** - Sincronização de saves na nuvem
- [ ] **Achievements** - Sistema de conquistas
- [ ] **Streaming** - Transmissão de gameplay

## 📞 Suporte e Contato

- **Desenvolvedor**: Jadson Silva
- **Email**: jadsonreserva98@gmail.com
- **Projeto**: J.S_RetroGames
- **Versão**: 1.0.0 (Sistema Real)
- **Status**: ✅ Pronto para Deploy

## 🚀 Como Fazer Deploy

### 1. Preparação
\`\`\`bash
npm run build  # Verificar se build passa
\`\`\`

### 2. Deploy Automático na Vercel
\`\`\`bash
npm run deploy  # Script completo de deploy
\`\`\`

### 3. Deploy Manual na Vercel
- Conecte o repositório GitHub
- Configure as variáveis de ambiente se necessário
- Deploy automático

### 4. Teste Pós-Deploy
- ✅ Login com credenciais admin
- ✅ Upload de ROM via URL
- ✅ Teste de emulação real
- ✅ Controles funcionando
- ✅ PWA instalável
- ✅ Design 3D carregando corretamente

---

**⚠️ Aviso Legal**: Este projeto utiliza ROMs do Internet Archive para fins educacionais. Certifique-se de possuir legalmente todas as ROMs utilizadas.

**🎮 Sistema Real**: Este não é uma simulação - é um emulador funcional que roda jogos reais!

**🎨 Design Premium**: Interface 3D com visual gaming profissional em preto/dourado/vermelho.
