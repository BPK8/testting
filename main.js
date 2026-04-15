const themeToggle = document.getElementById("theme-toggle");
const menuIcon = document.getElementById("menu-icon");
const mobileMenu = document.getElementById("mobile-menu");
const progressBar = document.getElementById("progress-bar");
const typingElement = document.getElementById("typing");
const navLinks = document.querySelectorAll(".nav-link");

const typingTexts = [
  "a Frontend Developer",
  "a UI/UX Designer",
  "building elegant websites"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typingElement) return;

  const currentText = typingTexts[textIndex];
  typingElement.textContent = currentText.substring(0, charIndex);

  if (!isDeleting) {
    charIndex++;
    if (charIndex > currentText.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1200);
      return;
    }
  } else {
    charIndex--;
    if (charIndex < 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % typingTexts.length;
      charIndex = 0;
    }
  }

  const speed = isDeleting ? 45 : 90;
  setTimeout(typeEffect, speed);
}

typeEffect();

function updateProgressBar() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }
}

window.addEventListener("scroll", updateProgressBar);
updateProgressBar();

function setTheme(isLight) {
  document.body.classList.toggle("light-mode", isLight);

  const icon = themeToggle?.querySelector("i");
  if (icon) {
    icon.className = isLight ? "ri-sun-line" : "ri-moon-line";
  }

  localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
}

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") {
  setTheme(true);
} else {
  setTheme(false);
}

themeToggle?.addEventListener("click", () => {
  const isLight = !document.body.classList.contains("light-mode");
  setTheme(isLight);
});

menuIcon?.addEventListener("click", () => {
  if (!mobileMenu) return;

  const isOpen = mobileMenu.classList.toggle("show");
  menuIcon.setAttribute("aria-expanded", isOpen ? "true" : "false");

  const icon = menuIcon.querySelector("i");
  if (icon) {
    icon.className = isOpen ? "ri-close-line" : "ri-menu-line";
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");

    if (window.innerWidth <= 768 && mobileMenu.classList.contains("show")) {
      mobileMenu.classList.remove("show");
      menuIcon.setAttribute("aria-expanded", "false");

      const icon = menuIcon.querySelector("i");
      if (icon) {
        icon.className = "ri-menu-line";
      }
    }
  });
});

window.addEventListener("click", (event) => {
  if (
    window.innerWidth <= 768 &&
    mobileMenu &&
    menuIcon &&
    !mobileMenu.contains(event.target) &&
    !menuIcon.contains(event.target)
  ) {
    mobileMenu.classList.remove("show");
    menuIcon.setAttribute("aria-expanded", "false");

    const icon = menuIcon.querySelector("i");
    if (icon) {
      icon.className = "ri-menu-line";
    }
  }
});

const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// skillis
const skillCards = document.querySelectorAll(".skill-card");

const revealSkillCards = () => {
  const triggerBottom = window.innerHeight * 0.88;

  skillCards.forEach((card, index) => {
    card.classList.add("reveal");

    const cardTop = card.getBoundingClientRect().top;

    if (cardTop < triggerBottom) {
      setTimeout(() => {
        card.classList.add("show");
      }, index * 120);
    }
  });
};

window.addEventListener("scroll", revealSkillCards);
window.addEventListener("load", revealSkillCards);

// project
const projectSpotlight = document.querySelector(".project-spotlight");
const projectTiles = document.querySelectorAll(".project-tile");

function revealPremiumProjects() {
  const triggerBottom = window.innerHeight * 0.88;

  if (projectSpotlight) {
    const spotlightTop = projectSpotlight.getBoundingClientRect().top;
    if (spotlightTop < triggerBottom) {
      projectSpotlight.classList.add("show");
    }
  }

  projectTiles.forEach((tile, index) => {
    const tileTop = tile.getBoundingClientRect().top;
    if (tileTop < triggerBottom) {
      setTimeout(() => {
        tile.classList.add("show");
      }, index * 70);
    }
  });
}

window.addEventListener("scroll", revealPremiumProjects);
window.addEventListener("load", revealPremiumProjects);

const previewImages = document.querySelectorAll(".preview-image");
const lightbox = document.getElementById("image-lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");

function openLightbox(src, alt) {
  if (!lightbox || !lightboxImage) return;

  lightboxImage.src = src;
  lightboxImage.alt = alt || "Project preview";
  lightbox.classList.add("show");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;

  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");

  setTimeout(() => {
    lightboxImage.src = "";
  }, 250);
}

previewImages.forEach((image) => {
  image.addEventListener("click", () => {
    openLightbox(image.src, image.alt);
  });
});

lightboxClose?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox?.classList.contains("show")) {
    closeLightbox();
  }
});

// contact
const philosophyCard = document.querySelector(".philosophy-card");
const contactInfoCard = document.querySelector(".contact-info-card");
const contactFormCard = document.querySelector(".contact-form-card");
const contactForm = document.getElementById("contact-form");
const formAlert = document.getElementById("form-alert");

function revealContactSection() {
  const triggerBottom = window.innerHeight * 0.88;

  if (philosophyCard) {
    const top = philosophyCard.getBoundingClientRect().top;
    if (top < triggerBottom) {
      philosophyCard.classList.add("show");
    }
  }

  if (contactInfoCard) {
    const top = contactInfoCard.getBoundingClientRect().top;
    if (top < triggerBottom) {
      contactInfoCard.classList.add("show");
    }
  }

  if (contactFormCard) {
    const top = contactFormCard.getBoundingClientRect().top;
    if (top < triggerBottom) {
      contactFormCard.classList.add("show");
    }
  }
}

window.addEventListener("scroll", revealContactSection);
window.addEventListener("load", revealContactSection);

if (contactForm && formAlert) {
  contactForm.addEventListener("submit", function () {
    setTimeout(() => {
      formAlert.classList.remove("hidden");
    }, 400);
  });
}