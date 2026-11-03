const skills = [
  {
    name: "HTML5",
    level: 85,
  },
  {
    name: "CSS3 / SCSS",
    level: 80,
  },
  {
    name: "JavaScript",
    level: 70,
  },
  {
    name: "Responsive Design",
    level: 75,
  },
  {
    name: "Git / GitHub",
    level: 60,
  },
  {
    name: "ReactJS",
    level: 55,
  },
];

const skillList = document.getElementById("skill-list");

skillList.innerHTML = skills
  .map(
    (skill) => `
    <div class="skill-card">
        <h3>${skill.name}</h3>

        <div class="skill-bar">
            <div
                class="skill-progress"
                style="width: ${skill.level}%"
            ></div>
        </div>

        <p>${skill.level}%</p>
    </div>
`,
  )
  .join("");

async function loadProjects() {
  const projectList = document.getElementById("project-list");
  const errorMessage = document.getElementById("error-message");

  try {
    const response = await fetch("js/data.json");

    if (!response.ok) {
      throw new Error("Khong the doc file data.json");
    }

    const data = await response.json();

    displayProjects(data.projects);
  } catch (error) {
    console.error("Loi khi tai du lieu:", error);

    projectList.innerHTML = "";

    errorMessage.textContent =
      "Khong the tai du lieu du an. Vui long thu lai sau.";
  }
}

function displayProjects(projects) {
  const projectList = document.getElementById("project-list");

  projectList.innerHTML = projects
    .map(
      (project) => `
        <div class="project-card">
            <h3>${project.name}</h3>

            <p>${project.description}</p>

            <p class="project-tech">
                Cong nghe: ${project.technologies.join(", ")}
            </p>
        </div>
    `,
    )
    .join("");
}

loadProjects();

const themeButton = document.getElementById("theme-toggle");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  themeButton.textContent = "Chế độ sáng";
} else {
  themeButton.textContent = "Chế độ tối";
}

themeButton.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    themeButton.textContent = "Chế độ sáng";
  } else {
    localStorage.setItem("theme", "light");
    themeButton.textContent = "Chế độ tối";
  }
});

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (fullname === "" || email === "" || message === "") {
    formMessage.textContent = "Vui lòng nhập đầy đủ thông tin.";
    return;
  }

  formMessage.textContent = "Cảm ơn bạn! Thông tin liên hệ đã được ghi nhận.";

  contactForm.reset();
});
