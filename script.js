const header = document.getElementById("header");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
});

menuToggle?.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
  mobileMenu.setAttribute("aria-hidden", !open);
});

document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".desktop-nav a")];

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${entry.target.id}`
    ));
  });
}, { rootMargin: "-40% 0px -50% 0px", threshold: 0 });

sections.forEach(section => navObserver.observe(section));

const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", () => {
    modalImage.src = item.dataset.image;
    modalImage.alt = item.dataset.title || "UI design";
    modalTitle.textContent = item.dataset.title || "UI DESIGN";
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

document.querySelector(".modal-close")?.addEventListener("click", closeModal);
document.querySelector(".modal-backdrop")?.addEventListener("click", closeModal);
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeModal();
});

const copyButton = document.querySelector(".copy-discord");
const toast = document.getElementById("toast");

copyButton?.addEventListener("click", async () => {
  const value = copyButton.dataset.copy;
  try {
    await navigator.clipboard.writeText(value);
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1800);
  } catch {
    window.prompt("Copy my Discord:", value);
  }
});
