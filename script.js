(() => {
  const boot = () => {
    const root = document.documentElement;
    const themeBtn = document.getElementById("theme-toggle");
    const navBtn = document.getElementById("nav-toggle");
    const navPanel = document.getElementById("nav-panel");
    const yearEl = document.getElementById("current-year");
    if (!themeBtn || !navBtn || !navPanel) return;

    const themeOf = () => {
      const stored = localStorage.getItem("theme");
      if (stored === "dark" || stored === "light") return stored;
      return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    };

    const syncThemeLabel = () => {
      themeBtn.setAttribute(
        "aria-label",
        themeOf() === "dark" ? "Switch to light theme" : "Switch to dark theme"
      );
    };

    themeBtn.addEventListener("click", () => {
      const next = themeOf() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      syncThemeLabel();
    });
    syncThemeLabel();

    const setNav = (open) => {
      navBtn.setAttribute("aria-expanded", String(open));
      navPanel.classList.toggle("is-open", open);
    };

    navBtn.addEventListener("click", () => {
      setNav(navBtn.getAttribute("aria-expanded") !== "true");
    });
    navPanel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setNav(false));
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setNav(false);
    });

    const links = [...document.querySelectorAll(".nav-links a[href^='#']")];
    const byId = Object.fromEntries(
      links.map((link) => [link.getAttribute("href").slice(1), link])
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((link) => link.classList.remove("is-active"));
          byId[entry.target.id]?.classList.add("is-active");
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    document.querySelectorAll("main section[id]").forEach((section) => {
      observer.observe(section);
    });

    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
