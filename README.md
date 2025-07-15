> 📘 Este README também está disponível em [Português 🇧🇷](./README.pt-br.md)

# 💇‍♀️ Bella Mulher – Institutional Website

A modern and responsive institutional website for the **Bella Mulher** beauty salon, built with **Angular**, **TypeScript**, and **SCSS**, focusing on aesthetics, usability, and strong brand identity.

> 🌐 Live demo available at: [https://bella-mulher.netlify.app](https://bella-mulher.netlify.app)

<br/>

![Bella Mulher Preview](website-preview.png)

---

## ✨ Features

- 🌟 Image carousel with **parallax** effect
- 🧭 Header with interactive navigation and active section highlighting
- ⏰ Dynamically rendered opening hours
- 💅 Highlighted services with icons and pricing
- 💬 Testimonial section with image and styled quote box
- 🎥 Institutional video in a floating modal
- 📬 Footer with useful links, social icons, and newsletter form

---

## 🧠 Tech Stack

| Technology     | Purpose                            |
|----------------|------------------------------------|
| Angular        | SPA framework (Standalone Components) |
| TypeScript     | Type-safe logic and development     |
| SCSS           | Modular and responsive styling      |
| Embla Carousel | Animated slider with event support  |
| HTML5/CSS3     | Semantic structure and layout       |

---

## 🗂️ Project Structure

```

src/
├── app/
│   ├── components/
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

## 🧩 Implemented Components

### ✅ `HeaderComponent`
- Sticky header with smooth navigation through page sections.
- Highlights the currently active menu item.
- Responsive hamburger menu with `aria-expanded` and `.mobile-visible`.
- Social icons with `hover` animation.

### ✅ `HeroComponent`
- Large stylized title using `clamp()` and a classic serif font.
- Integrates `CarouselComponent` as a dynamic background with depth effect.
- Call-to-action button: **Book Now!**

### ✅ `CarouselComponent`
- Uses **Embla Carousel** for auto-sliding and smooth transitions.
- Manual prev/next buttons for user control.
- **Parallax effect** based on the browser's `scrollY`.

### ✅ `OpeningHoursComponent`
- Three-column layout: intro text, central image, and dynamic schedule.
- Hours rendered with `*ngFor`, highlighting closed days.
- Central image includes `hover: scale(1.1)` animation.

### ✅ `FeaturedServicesComponent`
- Service cards with SVG icons, descriptions, and formatted BRL prices.
- Flexible and responsive grid with `hover` transitions.

### ✅ `TestimonialSectionComponent`
- Testimonial box over a client image with styled quotation and author.
- Responsive layout adapts for smaller screens with media queries.
- Elegant typography and subtle shadows for emphasis.

### ✅ `VideoHighlightComponent`
- Video banner with play button.
- Embedded YouTube video in modal (`iframe`).
- Controlled using `ngIf`, `DomSanitizer`, and click events.

### ✅ `FooterComponent`
- Three main columns: About, Quick Links, and Newsletter form.
- Email input and send button styled for clarity.
- Bottom section with copyright and social links.

---

## 🧮 Utility Services

### 🧩 `ScrollService`
- Singleton service (`providedIn: 'root'`) with `throttle()` method to limit execution rate — useful for effects like parallax or scroll tracking.

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v19+)
- Angular CLI (v19+ recommended)

### Steps

```bash
# Clone the repository
git clone https://github.com/dihcoder/salao-bella-mulher.git

# Enter the project folder
cd salao-bella-mulher

# Install dependencies
npm install

# Run locally
ng serve
````

Visit `http://localhost:4200/` to see the site in action.

---

## 💡 Possible Future Improvements

* Integration with a real booking form (Firebase or Supabase)
* SEO and social sharing metadata
* Lazy loading of images and videos
* Multi-language support (i18n)

---

## 👨‍💻 Author

Developed with ❤️ by **Diego Silva**

> *Aspiring web developer passionate about design and digital experiences.*

[![LinkedIn](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square\&logo=linkedin)](https://linkedin.com/in/diego-md)
[![Portfolio](https://img.shields.io/badge/-Portfolio-black?style=flat-square\&logo=firefox-browser)](https://dihcoder.github.io/personal-website/)

---

## 📄 License

This project is licensed under the **MIT License**. See the `LICENSE` file for more details.
