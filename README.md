# Sistema de Agendamento (Scheduling System)

Sistema de agendamento moderno desenvolvido com as últimas tecnologias do ecossistema React.

Este projeto é um **Desafio Técnico** para o desenvolvimento de um **Sistema de Agendamentos**, onde usuários podem marcar horários para serviços específicos.  

O objetivo é mostrar habilidades em:   
✅ **NestJS** para construção da API ([backend](https://github.com/michelereginabora/sistema-de-agendamentos-backend))  
✅ **React/Next.js** para a interface do usuário (frontend)
✅ **Modelagem de banco de dados** com **PostgreSQL**
✅ **Implementação de regras de negócio** para garantir um fluxo seguro e eficiente

O sistema visa ser robusto, escalável e seguir boas práticas de desenvolvimento. 🚀

## 🚀 Stack Tecnológica do Front-End

- **TypeScript** (v5) - Superset JavaScript com tipagem estática
- **Next.js** (v15) - Framework React com SSR/SSG
- **React** (v19) - Biblioteca para construção de interfaces
- **TailwindCSS** - Framework CSS utility-first
- **Axios** - Cliente HTTP para requisições à API

## 📁 Estrutura do Projeto

```
├── public/
│   └── images/            # Imagens estáticas
├── src/
│   ├── app/              # Páginas e rotas Next.js
│   │   ├── layout.tsx    # Layout principal
│   │   └── page.tsx      # Página inicial
│   ├── boot/             # Configurações de inicialização
│   │   └── axios.ts      # Configuração Axios e interceptors
│   ├── components/       # Componentes React reutilizáveis
│   ├── hooks/           # Custom hooks React
│   ├── services/        # Serviços e integrações API
│   ├── types/           # Definições de tipos TypeScript
│   └── views/           # Componentes de página
└── package.json         # Dependências e scripts
```

## 🛠️ Requisitos

- Node.js 18.x ou superior
- NPM

## 🚀 Começando

1. **Clone o repositório:**
```bash
git clone https://github.com/michelereginabora/sistema-de-agendamentos-frontend
cd sistema-de-agendamentos-frontend
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente com a url para o backend:**

Edite o arquivo `.env.local` com suas configurações

4. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

O aplicativo estará disponível em [http://localhost:3000](http://localhost:3000)


## 🔒 Autenticação

O sistema utiliza autenticação JWT.

## 📱 Features Principais

- ✅ Agendamento de horários
- ✅ Disponibilidade de Serviços
- ✅ Atualizações dinâmicas
- ✅ Integração com calendário

