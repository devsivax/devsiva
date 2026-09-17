(() => {
  "use strict";

  const projectData = {
    blog: {
      number: "01",
      title: "Database-Driven Blogging Platform",
      description: "Built a database-backed blogging system supporting full CRUD (Create, Read, Update, Delete) capabilities for blog posts and metadata management. Structured relational database schemas using SQL and developed Python backend logic to validate incoming payloads and interface with the SQL database engine.",
      tech: ["Python", "SQL"],
      features: [
        "Full CRUD capabilities for blog posts.",
        "Metadata management for blog content.",
        "Relational SQL schemas for post records, timestamps, and relational details.",
        "Python backend validation and SQL database interaction."
      ]
    },
    shop: {
      number: "02",
      title: "E-Commerce Web Application",
      description: "Developed a full-stack e-commerce web platform featuring user authentication, an interactive product catalog, and shopping cart management using HTML, CSS, JavaScript, PHP, and Firebase.",
      tech: ["HTML", "CSS", "JavaScript", "PHP", "Firebase"],
      features: [
        "Firebase Authentication for customer registration and session handling.",
        "Dynamic frontend interfaces for cart state and item total calculations.",
        "Interactive product catalog and shopping cart management.",
        "PHP backend interactions and persistence of product data and user transactions."
      ]
    },
    weather: {
      number: "03",
      title: "REST API Weather Application",
      description: "Engineered a weather application that retrieves real-time meteorological metrics across global locations using a third-party REST API, then parses structured JSON responses to display weather information.",
      tech: ["C#", ".NET", "JSON"],
      features: [
        "Retrieves weather information across global locations.",
        "Parses JSON API responses.",
        "Displays temperature, humidity, and atmospheric conditions.",
        "Handles invalid input and failed network calls with exception and error handling."
      ]
    },
    chat: {
      number: "04",
      title: "Multi-Threaded Chat Application",
      description: "Implemented a network chat application using Java TCP socket programming to enable real-time messaging between clients, with object-oriented programming concepts used to isolate client/server connection logic and manage message buffers.",
      tech: ["Java", "Socket Programming"],
      features: [
        "Real-time messaging between clients.",
        "Java TCP socket programming.",
        "Client/server connection logic.",
        "Object-oriented programming for application structure and message-buffer management."
      ]
    }
  };

  function initTheme() {
    const root = document.documentElement;
    const toggle = document.querySelector(".theme-toggle");
    const icon = document.querySelector(".theme-icon");
    const label = document.querySelector(".theme-label");
    const stored = localStorage.getItem("portfolio-theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored || (systemDark ? "dark" : "light");

    setTheme(initial, false);

    function setTheme(theme, persist = true) {
      root.dataset.theme = theme;
      if (persist) localStorage.setItem("portfolio-theme", theme);
      const isDark = theme === "dark";
      toggle?.setAttribute("aria-pressed", String(isDark));
      if (icon) icon.textContent = isDark ? "☾" : "☀";
      if (label) label.textContent = isDark ? "Dark" : "Light";
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", isDark ? "#0b0e14" : "#f6f7f4");
    }

    toggle?.addEventListener("click", () => {
      setTheme(root.dataset.theme === "dark" ? "light" : "dark");
    });
  }

  function initNavigation() {
    const header = document.querySelector(".site-header");
    const menu = document.querySelector(".nav-menu");
    const toggle = document.querySelector(".menu-toggle");
    const links = [...document.querySelectorAll(".nav-link")];
    const sections = [...document.querySelectorAll("main section[id]")];

    const closeMenu = () => {
      menu?.classList.remove("open");
      toggle?.setAttribute("aria-expanded", "false");
      toggle?.setAttribute("aria-label", "Open menu");
    };

    toggle?.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    links.forEach(link => link.addEventListener("click", closeMenu));

    window.addEventListener("scroll", () => {
      header?.classList.toggle("scrolled", window.scrollY > 20);
    }, { passive: true });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
        }
      });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

    sections.forEach(section => observer.observe(section));

    document.addEventListener("click", (event) => {
      if (menu?.classList.contains("open") && !menu.contains(event.target) && !toggle.contains(event.target)) closeMenu();
    });
  }

  function initScrollReveal() {
    const elements = document.querySelectorAll(".reveal");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach(el => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    elements.forEach(el => observer.observe(el));
  }

  function initProjectFilter() {
    const buttons = [...document.querySelectorAll(".filter-btn")];
    const cards = [...document.querySelectorAll(".project-card")];

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        const filter = button.dataset.filter;
        cards.forEach(card => {
          const visible = filter === "all" || card.dataset.tags.split(",").includes(filter);
          card.classList.toggle("is-hidden", !visible);
        });
      });
    });
  }

  function initProjectModal() {
    const backdrop = document.getElementById("projectModal");
    const modal = backdrop?.querySelector(".modal");
    const close = backdrop?.querySelector(".modal-close");
    const title = document.getElementById("modalTitle");
    const description = document.getElementById("modalDescription");
    const number = document.getElementById("modalNumber");
    const tech = document.getElementById("modalTech");
    const features = document.getElementById("modalFeatures");
    let lastFocused = null;

    const closeModal = () => {
      if (!backdrop || backdrop.hidden) return;
      backdrop.hidden = true;
      document.body.classList.remove("modal-open");
      lastFocused?.focus();
    };

    document.querySelectorAll(".project-detail-btn").forEach(button => {
      button.addEventListener("click", () => {
        const data = projectData[button.dataset.project];
        if (!data) return;
        lastFocused = button;
        number.textContent = data.number;
        title.textContent = data.title;
        description.textContent = data.description;
        tech.innerHTML = data.tech.map(item => `<span>${escapeHtml(item)}</span>`).join("");
        features.innerHTML = data.features.map(item => `<li>${escapeHtml(item)}</li>`).join("");
        backdrop.hidden = false;
        document.body.classList.add("modal-open");
        close?.focus();
      });
    });

    close?.addEventListener("click", closeModal);
    backdrop?.addEventListener("click", event => {
      if (event.target === backdrop) closeModal();
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && backdrop && !backdrop.hidden) closeModal();
    });
    modal?.addEventListener("keydown", event => {
      if (event.key !== "Tab") return;
      const focusable = modal.querySelectorAll('button, a, input, textarea, [tabindex]:not([tabindex="-1"])');
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
  }

  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
  }

  function initContactForm() {
    const form = document.getElementById("contactForm");
    const success = document.getElementById("formSuccess");
    if (!form) return;

    form.addEventListener("submit", event => {
      event.preventDefault();
      success.textContent = "";
      let valid = true;

      const values = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        subject: document.getElementById("subject").value.trim(),
        message: document.getElementById("message").value.trim()
      };

      const errors = {};
      if (!values.name) errors.name = "Please enter your name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Enter a valid email address.";
      if (!values.subject) errors.subject = "Please enter a subject.";
      if (values.message.length < 10) errors.message = "Message should be at least 10 characters.";

      Object.keys(values).forEach(key => {
        const field = document.getElementById(key);
        const error = document.querySelector(`[data-error-for="${key}"]`);
        field.setAttribute("aria-invalid", String(Boolean(errors[key])));
        if (error) error.textContent = errors[key] || "";
        if (errors[key]) valid = false;
      });

      if (!valid) return;

      const body = [
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        "",
        values.message
      ].join("\n");

      const mailto = `mailto:sivasankar7530@gmail.com?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`;
      success.textContent = "Opening your email client…";
      window.location.href = mailto;
    });
  }

  function initBackToTop() {
    const button = document.getElementById("backToTop");
    button?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    window.addEventListener("scroll", () => button?.classList.toggle("visible", window.scrollY > 650), { passive: true });
  }

  function initScrollProgress() {
    const progress = document.getElementById("scrollProgress");
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  function initRotatingTitle() {
    const target = document.getElementById("rotatingTitle");
    if (!target || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const titles = ["Full-Stack Developer", "Web Application Developer", "Software Developer"];
    let index = 0;
    setInterval(() => {
      index = (index + 1) % titles.length;
      target.animate([{ opacity: 1, transform: "translateY(0)" }, { opacity: 0, transform: "translateY(5px)" }], { duration: 220, fill: "forwards" }).finished.then(() => {
        target.textContent = titles[index];
        target.animate([{ opacity: 0, transform: "translateY(-5px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 260, fill: "forwards" });
      });
    }, 3000);
  }

  initTheme();
  initNavigation();
  initScrollReveal();
  initProjectFilter();
  initProjectModal();
  initContactForm();
  initBackToTop();
  initScrollProgress();
  initRotatingTitle();
})();
