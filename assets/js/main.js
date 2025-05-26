/* ===================================================================
 * Main JS
 * ------------------------------------------------------------------- */

(function () {
  "use strict";

  /* Preloader
   * -------------------------------------------------- */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", function () {
      document.querySelector("body").classList.remove("ss-preload");
      document.querySelector("body").classList.add("ss-loaded");
      preloader.style.display = "none";
    });
  }

  /* Load About Content - Only on main page
   * -------------------------------------------------- */
  const loadAboutContent = async () => {
    // Only load aboutCoMPhy.md if we"re on the main page
    if (
      window.location.pathname === "/" ||
      window.location.pathname === "/index.html"
    ) {
      try {
        const response = await fetch("/aboutVatsal.md");
        const text = await response.text();
        const aboutContent = document.getElementById("about-content");
        if (aboutContent) {
          // Sanitize HTML output from marked.parse() with DOMPurify before inserting into DOM
          const parsedHtml = marked.parse(text);
          const sanitizedHtml = DOMPurify.sanitize(parsedHtml);
          aboutContent.innerHTML = sanitizedHtml;
        }
      } catch (error) {
        console.error("Error loading about content:", error);
      }
    }
  };

  /* Load News Content - Only on main page
   * -------------------------------------------------- */
  const loadNewsContent = async () => {
    // Only load News.md if we"re on the main page
    if (
      window.location.pathname === "/" ||
      window.location.pathname === "/index.html"
    ) {
      try {
        const response = await fetch("/News.md");
        const text = await response.text();
        const newsContent = document.getElementById("news-content");
        if (newsContent) {
          // Parse the markdown content and sanitize before inserting into DOM
          const parsedHtml = marked.parse(text);
          const sanitizedHtml = DOMPurify.sanitize(parsedHtml);
          newsContent.innerHTML = sanitizedHtml;

          // Fix line breaks in list items after parsing
          const listItemParagraphs = newsContent.querySelectorAll("li p");
          listItemParagraphs.forEach((paragraph) => {
            paragraph.style.display = "inline";
            paragraph.style.margin = "0";
          });
        }
        // Add History button after all news items if newsContent exists
        const historyBtn = document.createElement("a");
        historyBtn.href = "/history";
        historyBtn.className = "s-news__history-btn";
        historyBtn.innerHTML =
          '<i class="fa-solid fa-arrow-right" style="margin-right: 8px; font-size: 1.2em;"></i>Archive';
        historyBtn.setAttribute("role", "button");
        historyBtn.setAttribute("tabindex", "0");
        historyBtn.setAttribute("aria-label", "View archive of all news items");

        // Add keyboard event handler for accessibility
        historyBtn.addEventListener("keydown", function (event) {
          // Check for Enter (13) or Space (32) key
          if (
            event.key === "Enter" ||
            event.key === " " ||
            event.keyCode === 13 ||
            event.keyCode === 32
          ) {
            event.preventDefault();
            window.location.href = this.href;
          }
        });

        if (newsContent) {
          newsContent.appendChild(historyBtn);
        }
      } catch (error) {
        console.error("Error loading news content:", error);
      }
    }
  };

  // No need for a resize event handler as the CSS will handle everything

  // Load about content when page loads
  window.addEventListener("load", loadAboutContent);
  // Load news content when page loads
  window.addEventListener("load", loadNewsContent);

  /* Mobile Menu
   * -------------------------------------------------- */
  const menuToggle = document.querySelector(".s-header__menu-toggle");
  const nav = document.querySelector(".s-header__nav");
  const closeBtn = document.querySelector(".s-header__nav-close-btn");
  const menuLinks = document.querySelectorAll(".s-header__nav-list a");

  // Handle click outside
  document.addEventListener("click", function (e) {
    if (nav && nav.classList.contains("is-active")) {
      // Check if click is outside nav and not on menu toggle
      if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        nav.classList.remove("is-active");
      }
    }
  });

  if (menuToggle) {
    menuToggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation(); // Prevent document click from immediately closing
      nav.classList.add("is-active");
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", function (e) {
      e.preventDefault();
      nav.classList.remove("is-active");
    });
  }

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-active");
    });
  });

  /* Smooth Scrolling
   * -------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  /* Back to Top
   * -------------------------------------------------- */
  const goTop = document.querySelector(".ss-go-top");

  if (goTop) {
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 800) {
        goTop.classList.add("link-is-visible");
      } else {
        goTop.classList.remove("link-is-visible");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(
      '.member-image img[loading="lazy"]',
    );

    images.forEach((img) => {
      if (img.complete) {
        img.parentElement.classList.add("loaded");
      } else {
        img.addEventListener("load", function () {
          img.parentElement.classList.add("loaded");
        });
      }
    });

    // Email copy functionality
    const copyButtons = document.querySelectorAll(".copy-btn");
    copyButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const textToCopy = this.getAttribute("data-clipboard-text");
        const textarea = document.createElement("textarea");
        textarea.value = textToCopy;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);

        try {
          textarea.select();
          document.execCommand("copy");
          this.classList.add("copied");
          const icon = this.querySelector("i");
          icon.classList.remove("fa-copy");
          icon.classList.add("fa-check");

          setTimeout(() => {
            this.classList.remove("copied");
            icon.classList.remove("fa-check");
            icon.classList.add("fa-copy");
          }, 2000);
        } catch (err) {
          console.error("Copy failed:", err);
        } finally {
          document.body.removeChild(textarea);
        }
      });
    });

    // Add accessible names to all copy buttons on document load
    copyButtons.forEach((button) => {
      // Get the email text from data-text or data-clipboard-text attribute
      const emailText =
        button.getAttribute("data-text") ||
        button.getAttribute("data-clipboard-text");
      // Add aria-label if it doesn"t exist
      if (!button.hasAttribute("aria-label") && emailText) {
        button.setAttribute("aria-label", `Copy email address ${emailText}`);
      }
    });
  });

  /* Copy Email Functionality
   * -------------------------------------------------- */
  window.copyEmail = function (button) {
    const text =
      button.getAttribute("data-text") ||
      button.getAttribute("data-clipboard-text");
    navigator.clipboard
      .writeText(text)
      .then(() => {
        const icon = button.querySelector("i");
        button.classList.add("copied");
        icon.classList.remove("fa-copy");
        icon.classList.add("fa-check");

        setTimeout(() => {
          button.classList.remove("copied");
          icon.classList.remove("fa-check");
          icon.classList.add("fa-copy");
        }, 2000);
      })
      .catch((err) => {
        console.error("Copy failed:", err);
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand("copy");
          button.classList.add("copied");
          const icon = button.querySelector("i");
          icon.classList.remove("fa-copy");
          icon.classList.add("fa-check");

          setTimeout(() => {
            button.classList.remove("copied");
            icon.classList.remove("fa-check");
            icon.classList.add("fa-copy");
          }, 2000);
        } catch (err) {
          console.error("Fallback failed:", err);
        }
        document.body.removeChild(textarea);
      });
  };
})(document.documentElement);
