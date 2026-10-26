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

    // Live repo facts from the GitHub API (unauthenticated, cached for an hour).
    // If the request fails or is rate limited, the static "On GitHub" text stays.
    const ago = (iso) => {
      const days = Math.floor((Date.now() - new Date(iso)) / 864e5);
      if (days < 1) return "today";
      if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
      if (days < 60) return `${Math.floor(days / 7)} week${days < 14 ? "" : "s"} ago`;
      if (days < 365) return `${Math.floor(days / 30)} months ago`;
      return `${Math.floor(days / 365)} year${days < 730 ? "" : "s"} ago`;
    };
    const fetchRepo = async (name) => {
      const key = `repo:${name}`;
      try {
        const hit = JSON.parse(sessionStorage.getItem(key) || "null");
        if (hit && Date.now() - hit.t < 36e5) return hit.v;
      } catch (e) {}
      const res = await fetch(`https://api.github.com/repos/${name}`, {
        headers: { Accept: "application/vnd.github+json" },
      });
      if (!res.ok) throw new Error(String(res.status));
      const d = await res.json();
      const v = { pushed: d.pushed_at, stars: d.stargazers_count, lang: d.language };
      try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), v })); } catch (e) {}
      return v;
    };
    document.querySelectorAll("[data-repo]").forEach((card) => {
      const meta = card.querySelector("[data-repo-meta]");
      if (!meta) return;
      fetchRepo(card.dataset.repo)
        .then((v) => {
          const parts = [`Updated ${ago(v.pushed)}`];
          if (v.lang) parts.push(v.lang);
          if (v.stars) parts.push(`${v.stars} star${v.stars === 1 ? "" : "s"}`);
          meta.innerHTML = `<span class="dot" aria-hidden="true"></span>${parts.join(" · ")}`;
        })
        .catch(() => {});
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
