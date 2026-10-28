const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  menuToggle.textContent = isOpen ? "×" : "☰";
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.textContent = "☰";
  });
});

const projectDetails = {
  skillsphere: {
    title: "SkillSphere",
    text: "A responsive student portfolio built with semantic HTML, custom CSS, and JavaScript. It includes mobile navigation, project detail dialogs, and a contact-form interaction. Next improvement: connect the contact form to a real form service.",
    tags: ["HTML", "CSS", "JavaScript", "Responsive"]
  },
  planner: {
    title: "Focus Planner",
    text: "A productivity concept for students to split assignments into clear, achievable tasks. A future version could include task completion, due dates, and local storage to keep tasks after refreshing.",
    tags: ["Product concept", "UX thinking", "Student life"]
  },
  campus: {
    title: "Campus Connect",
    text: "A campus-community concept for sharing events, workshops, and student opportunities. A future version could add event categories, registration links, and organizer contact details.",
    tags: ["Community", "Research", "Web concept"]
  }
};

const projectDialog = document.querySelector("#projectDialog");
document.querySelectorAll(".project-detail").forEach((button) => {
  button.addEventListener("click", () => {
    const project = projectDetails[button.dataset.project];
    document.querySelector("#dialogTitle").textContent = project.title;
    document.querySelector("#dialogText").textContent = project.text;
    const tagContainer = document.querySelector("#dialogTags");
    tagContainer.replaceChildren(...project.tags.map((tag) => {
      const span = document.createElement("span");
      span.textContent = tag;
      return span;
    }));
    projectDialog.showModal();
  });
});

document.querySelector("#closeDialog").addEventListener("click", () => projectDialog.close());
projectDialog.addEventListener("click", (event) => {
  if (event.target === projectDialog) projectDialog.close();
});

document.querySelector("#contactForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const message = document.querySelector("#message").value.trim();
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`Hi Bhakti,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`);
  document.querySelector("#formMessage").textContent =
    "Your email draft is ready. If your email app did not open, copy your message and send it manually.";
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
});
