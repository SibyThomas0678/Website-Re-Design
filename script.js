const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("show");
        });
    });
}

const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        themeBtn.textContent =
            document.body.classList.contains("dark") ? "☀" : "☾";
    });
}

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll(".reveal").forEach(element => {
    revealObserver.observe(element);
});

const searchInput = document.getElementById("cardSearch");
const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".service-card");

let currentFilter = "all";

function updateCards() {
    const query = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const category = card.dataset.category;

        const matchesSearch = text.includes(query);
        const matchesFilter =
            currentFilter === "all" ||
            category === currentFilter;

        card.style.display =
            matchesSearch && matchesFilter ? "block" : "none";
    });
}

if (searchInput) {
    searchInput.addEventListener("input", updateCards);
}

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        updateCards();
    });
});

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");

function openModal(title) {
    if (!modal || !modalTitle) return;

    modalTitle.textContent = title;
    modal.classList.add("show");
}

function closeModal() {
    if (!modal) return;

    modal.classList.remove("show");
}

if (modal) {
    modal.addEventListener("click", event => {
        if (event.target === modal) {
            closeModal();
        }
    });
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeModal();
    }
});

const learnBtn = document.getElementById("learnBtn");

if (learnBtn) {
    learnBtn.addEventListener("click", () => {
        openModal("About Us");
    });
}

const contactForm = document.getElementById("contactForm");
const toast = document.getElementById("toast");

function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

if (contactForm) {
    contactForm.addEventListener("submit", event => {
        event.preventDefault();

        showToast("✓ Message sent successfully!");

        contactForm.reset();
    });
}

const counters = document.querySelectorAll(".counter");
let counterStarted = false;

function startCounters() {
    if (counterStarted) return;

    counterStarted = true;

    counters.forEach(counter => {
        const target = Number(counter.dataset.target);

        let current = 0;

        const increment = Math.max(
            1,
            Math.ceil(target / 40)
        );

        function tick() {
            current += increment;

            if (current >= target) {
                counter.textContent = target + "+";
                return;
            }

            counter.textContent = current;

            setTimeout(tick, 30);
        }

        tick();
    });
}

const statsSection = document.querySelector(".stats-section");

if (statsSection) {
    const statsObserver = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            startCounters();
            statsObserver.unobserve(statsSection);
        }
    }, {
        threshold: 0.4
    });

    statsObserver.observe(statsSection);
}

const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow) {
    document.addEventListener("mousemove", event => {
        cursorGlow.style.left = event.clientX + "px";
        cursorGlow.style.top = event.clientY + "px";
    });
}

const topBtn = document.getElementById("topBtn");

if (topBtn) {
    window.addEventListener("scroll", () => {
        topBtn.classList.toggle(
            "show",
            window.scrollY > 500
        );
    });

    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}