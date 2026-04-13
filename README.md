# 🚀 LocalConnect

LocalConnect é uma plataforma que conecta consumidores a comércios locais, facilitando a descoberta de produtos e serviços próximos com base em geolocalização.

A proposta é fortalecer o comércio de bairro, criando uma experiência semelhante a grandes marketplaces — porém focada no contexto local.

---

## 📌 Visão Geral

O projeto tem como objetivo:

- Aproximar consumidores de lojistas da região
- Permitir busca de produtos próximos em tempo real
- Exibir lojas em mapa com base na localização do usuário
- Criar uma vitrine digital acessível para pequenos comércios

---

## 🧠 Conceito

Diferente de marketplaces tradicionais, o LocalConnect foca em:

- 📍 **Geolocalização real**
- 🏪 **Comércio local (bairro/região)**
- ⚡ **Descoberta rápida de produtos**
- 🤝 **Incentivo à economia local**

---

## 🏗️ Arquitetura (alto nível)

O sistema é dividido em:

### Frontend
- Interface moderna inspirada em apps como marketplaces e mapas
- Exibição de produtos, lojas e localização

### Backend
- API responsável por:
  - Gestão de usuários
  - Cadastro de lojas
  - Produtos
  - Geolocalização

### Banco de Dados
- Estrutura relacional para:
  - Usuários
  - Lojas
  - Produtos
  - Endereços

---

## ⚙️ Tecnologias

Principais tecnologias utilizadas:

- **Frontend**
  - React / Next.js
  - Tailwind CSS

- **Backend**
  - Node.js
  - Fastify

- **Banco de Dados**
  - MySQL

- **Outros**
  - APIs de mapa (Google Maps ou similar)
  - Geolocalização

---

## 📦 Funcionalidades

- [ ] Cadastro de usuários
- [ ] Cadastro de lojistas
- [ ] Criação de lojas
- [ ] Cadastro de produtos
- [ ] Busca por produtos próximos
- [ ] Visualização em mapa
- [ ] Sistema de localização do usuário

---

## 🚀 Como rodar o projeto

### Pré-requisitos

- Node.js instalado
- MySQL rodando
- Gerenciador de pacotes (npm ou yarn)

### Clone o projeto

```bash
git clone https://github.com/lucazgbrl/LocalConnect.git
cd LocalConnect
