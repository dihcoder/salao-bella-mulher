> 📘 This README is also available in [English](./README.md).

# 💇‍♀️ Bella Mulher – Website Institucional

Um site institucional moderno e responsivo para o salão de beleza **Bella Mulher**, desenvolvido com **Angular**, **TypeScript** e **SCSS**, com foco em estética, usabilidade e identidade visual.  

> 🌐 Acesse a demonstração online em: [https://bella-mulher.netlify.app](https://bella-mulher.netlify.app)

<br/>

![Bella Mulher Preview](website-preview.png)

---

## ✨ Funcionalidades

- 🌟 Carrossel de imagens com efeito **parallax**
- 🧭 Cabeçalho com menu interativo e destaque de seção ativa
- ⏰ Horários de atendimento exibidos dinamicamente
- 💅 Exibição dos principais serviços com ícones e preços
- 💬 Seção de depoimento estilizada com imagem e citação
- 🎥 Vídeo institucional em modal flutuante
- 📬 Rodapé com links úteis, redes sociais e formulário de newsletter

---

## 🧠 Tech Stack

| Tecnologia     | Finalidade                     |
|----------------|-------------------------------|
| Angular        | Estrutura SPA (Standalone Components) |
| TypeScript     | Lógica e tipagem segura        |
| SCSS           | Estilização modular e responsiva |
| Embla Carousel | Carrossel animado com suporte a eventos |
| HTML5/CSS3     | Estrutura semântica e layout    |

---

## 🗂️ Estrutura do Projeto

```

src/
├── app/
│   ├── components/
│   │   ├── carousel/
│   │   ├── carousel/
│   │   ├── featured-services/
│   │   ├── footer/
│   │   ├── header/
│   │   ├── hero/
│   │   ├── opening-hours/
│   │   ├── testimonial-section/
│   │   └── video-highlight/
│   ├── services/
│   │   └── scroll.service.ts
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── index.html
├── main.ts
└── styles.scss

````

---

## 🧩 Componentes Implementados

### ✅ `HeaderComponent`
- Cabeçalho fixo com navegação fluida por seções da página.
- Destaque ativo para o item selecionado.
- Menu hamburguer funcional em mobile (`aria-expanded` e `.mobile-visible`).
- Ícones sociais com efeito `hover`.

### ✅ `HeroComponent`
- Título estilizado com `clamp()` e `font-family` clássica.
- Integra o `CarouselComponent` como fundo com efeito de profundidade.
- Botão de chamada para ação: **Agendar Agora!**

### ✅ `CarouselComponent`
- Usa **Embla Carousel** para slides automáticos com rolagem suave.
- Botões manuais prev/next.
- Efeito **parallax** baseado no scrollY do navegador.

### ✅ `OpeningHoursComponent`
- Layout em 3 colunas: introdução, imagem central e horários.
- Lista dinâmica de horários com `*ngFor` e destaque de dias fechados.
- Imagem com efeito `hover: scale(1.1)`.

### ✅ `FeaturedServicesComponent`
- Cards de serviço com ícones SVG, descrições e preços formatados (BRL).
- Grid flexível e responsivo com animações `hover`.

### ✅ `TestimonialSectionComponent`
- Depoimento com imagem lateral e citação em caixa sobreposta.
- Layout adaptável para mobile com media queries.
- Tipografia refinada e sombra para destaque.

### ✅ `VideoHighlightComponent`
- Banner de vídeo com botão de play.
- Modal com vídeo YouTube incorporado via `iframe`.
- Modal controlado com `ngIf`, `DomSanitizer` e eventos de clique.

### ✅ `FooterComponent`
- Três colunas: Sobre, Menu Rápido e Newsletter.
- Formulário com campo de email e botão de envio.
- Rodapé inferior com redes sociais e assinatura de direitos autorais.

---

## 🧮 Serviços Utilitários

### 🧩 `ScrollService`
- Serviço singleton (`providedIn: 'root'`) com método `throttle()` para limitar a frequência de chamadas — útil para efeitos como parallax e scroll tracking.

---

## 🛠️ Como Executar

### Pré-requisitos

- Node.js (v19+)
- Angular CLI (v19+ recomendado)

### Passos

```bash
# Clonar o repositório
git clone https://github.com/dihcoder/salao-bella-mulher.git

# Acessar a pasta do projeto
cd salao-bella-mulher

# Instalar dependências
npm install

# Rodar localmente
ng serve
````

Acesse `http://localhost:4200/` para ver o site em execução.

---

## 💡 Possíveis Melhorias Futuras

* Integração com formulário real de agendamento (via Firebase ou Supabase)
* SEO e metadados para compartilhamento
* Carregamento preguiçoso (lazy load) de imagens e vídeos
* Suporte a múltiplos idiomas (i18n)

---

## 👨‍💻 Autor

Desenvolvido com ❤️ por **Diego Silva**

> *Desenvolvedor web em formação, apaixonado por design e experiências digitais.*

[![LinkedIn](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square\&logo=linkedin)](https://linkedin.com/in/diego-md)
[![Portfolio](https://img.shields.io/badge/-Portfólio-black?style=flat-square\&logo=firefox-browser)](https://dihcoder.github.io/personal-website/)

---

## 📄 Licença

Este projeto é licenciado sob a **MIT License**. Consulte o arquivo `LICENSE` para mais detalhes.

