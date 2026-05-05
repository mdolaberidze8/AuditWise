// ===== FOOTER ACCORDION (mobile) =====
document
  .querySelectorAll(".footer-col--accordion .footer-col-trigger")
  .forEach((btn) => {
    btn.addEventListener("click", () => {
      const col = btn.closest(".footer-col--accordion");
      const isOpen = col.classList.contains("open");
      // სხვა accordion-ები დახურე
      document.querySelectorAll(".footer-col--accordion").forEach((c) => {
        c.classList.remove("open");
        c.querySelector(".footer-col-trigger").setAttribute(
          "aria-expanded",
          "false",
        );
      });
      // ამჟამინდელი გახსენი (თუ დახურული იყო)
      if (!isOpen) {
        col.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

// ===== BURGER MENU =====
const burger = document.getElementById("burger");
const navMenu = document.querySelector("nav ul");

burger.addEventListener("click", () => {
  navMenu.classList.toggle("nav-open");
  burger.classList.toggle("burger-open");
  // body scroll lock
  document.body.style.overflow = navMenu.classList.contains("nav-open")
    ? "hidden"
    : "";
});

// nav link-ზე დაჭერისას მენიუ დაიხუროს
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("nav-open");
    burger.classList.remove("burger-open");
    document.body.style.overflow = "";
  });
});

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll(".stat-number, .stat-big");

const animateCounter = (el) => {
  const target = el.innerText;
  const suffix = target.replace(/[0-9]/g, "");
  const num = parseInt(target);
  let current = 0;
  const step = Math.ceil(num / 60);

  const timer = setInterval(() => {
    current += step;
    if (current >= num) {
      current = num;
      clearInterval(timer);
    }
    el.innerText = current + suffix;
  }, 30);
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

counters.forEach((counter) => observer.observe(counter));

// ===== POPUP =====
const popup = document.getElementById("phone-popup");
const popupClose = document.getElementById("popup-close");

const triggerBtns = document.querySelectorAll(".btn-cta, .btn-cta-dark");
triggerBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    popup.style.display = "flex";
  });
});

popupClose.addEventListener("click", () => {
  popup.style.display = "none";
});

popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    popup.style.display = "none";
  }
});

// ===== FAQ =====
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const q = item.querySelector(".faq-question");
  if (q) {
    q.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      faqItems.forEach((i) => i.classList.remove("active"));
      if (!isActive) item.classList.add("active");
    });
  }
});
