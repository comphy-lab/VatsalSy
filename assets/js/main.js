/* ===================================================================
 * Main JS
 * ------------------------------------------------------------------- */

(function () {
  "use strict";

  // Store global references for cleanup
  let blueSkyObserver = null;

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
          // Check if DOMPurify is loaded before using it
          if (typeof DOMPurify !== 'undefined') {
            const sanitizedHtml = DOMPurify.sanitize(parsedHtml);
            aboutContent.innerHTML = sanitizedHtml;
          } else {
            // Fallback: insert without sanitization if DOMPurify failed to load
            console.warn('DOMPurify not loaded, inserting content without sanitization');
            aboutContent.innerHTML = parsedHtml;
          }
        }
      } catch (error) {
        console.error("Error loading about content:", error);
      }
    }
  };


  /* Handle Bluesky embed error
   * -------------------------------------------------- */
  window.handleBskyEmbedError = function() {
    const bskyEmbed = document.querySelector('bsky-embed');
    const bskyError = document.getElementById('bsky-error');
    
    if (bskyEmbed && bskyError) {
      bskyEmbed.style.display = 'none';
      bskyError.style.display = 'block';
    }
  };

  /* Match Bluesky embed height to About section
   * -------------------------------------------------- */
  const matchBlueSkyHeight = () => {
    const aboutLeft = document.querySelector('.s-about__left');
    const aboutSocial = document.querySelector('.s-about__social');
    const bskyEmbed = document.querySelector('bsky-embed');
    const bskyError = document.getElementById('bsky-error');
    const bskyContainer = document.getElementById('bluesky-embed-container');
    
    if (aboutLeft && aboutSocial && (bskyEmbed || bskyError)) {
      // Check window width for responsive behavior
      const windowWidth = window.innerWidth;
      const isMobile = windowWidth < 768;
      const isStacked = windowWidth <= 1400; // When layout switches to column
      
      if (isMobile) {
        // On mobile, use fixed height
        aboutSocial.style.height = '500px';
        bskyEmbed.style.maxHeight = 'calc(100% - 60px)';
      } else if (isStacked) {
        // When stacked but not mobile, don't set height - let CSS handle it
        aboutSocial.style.height = 'auto';
        aboutSocial.style.minHeight = '400px';
        bskyEmbed.style.maxHeight = '600px';
      } else {
        // On desktop with side-by-side layout, match the about content height
        const aboutHeight = aboutLeft.offsetHeight;
        
        // Set the social container to match
        aboutSocial.style.height = aboutHeight + 'px';
        
        // Calculate available height for bsky-embed (subtract header height)
        const header = aboutSocial.querySelector('.s-about__social-header');
        const headerHeight = header ? header.offsetHeight : 0;
        const availableHeight = aboutHeight - headerHeight - 20; // 20px for padding
        
        // Set max-height on bsky-embed for scrolling
        bskyEmbed.style.maxHeight = availableHeight + 'px';
      }
      
      // Always ensure overflow is set
      bskyEmbed.style.overflow = 'auto';
    }
  };

  // Run height matching after content loads and on resize
  const setupHeightMatching = () => {
    // Wait for bsky-embed to load
    const waitForBskyEmbed = () => {
      const bskyEmbed = document.querySelector('bsky-embed');
      if (bskyEmbed && bskyEmbed.shadowRoot) {
        // Component is loaded, apply height matching
        matchBlueSkyHeight();
        
        // Also run after a delay to ensure content is rendered
        setTimeout(matchBlueSkyHeight, 500);
        setTimeout(matchBlueSkyHeight, 1000);
      } else {
        // Try again in 100ms
        setTimeout(waitForBskyEmbed, 100);
      }
    };
    
    waitForBskyEmbed();
    
    // Match on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(matchBlueSkyHeight, 250);
    });
    
    // Watch for content changes
    blueSkyObserver = new MutationObserver(() => {
      setTimeout(matchBlueSkyHeight, 100);
    });
    
    const aboutContent = document.getElementById('about-content');
    if (aboutContent) {
      blueSkyObserver.observe(aboutContent, { childList: true, subtree: true });
    }
  };

  // Load about content when page loads
  window.addEventListener("load", () => {
    loadAboutContent();
    setupHeightMatching();
  });

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
  const setupSmoothScrolling = () => {
    // Handle all smooth scroll links
    document.querySelectorAll('a.smoothscroll, a[href^="#"], a[href^="/#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        
        // Handle links with /#section format
        if (href.startsWith('/#')) {
          e.preventDefault();
          const targetId = href.substring(2); // Remove /#
          const target = document.getElementById(targetId);
          
          if (target) {
            // Calculate offset for header
            const headerHeight = document.querySelector('.s-header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
            
            // Smooth scroll with custom duration
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
            
            // Update URL without jumping
            history.pushState(null, null, href);
          }
        } 
        // Handle regular #section links
        else if (href.startsWith('#') && href !== '#' && href !== '#0') {
          e.preventDefault();
          const target = document.querySelector(href);
          
          if (target) {
            const headerHeight = document.querySelector('.s-header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  };
  
  // Initialize smooth scrolling
  setupSmoothScrolling();

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

  // Cleanup function for when page unloads
  window.addEventListener('beforeunload', function() {
    // Disconnect MutationObserver to prevent memory leak
    if (blueSkyObserver) {
      blueSkyObserver.disconnect();
      blueSkyObserver = null;
    }
  });

})(document.documentElement);
