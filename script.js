document.addEventListener("DOMContentLoaded", () => {
  const loginSection = document.getElementById("login-section");
  const registrationSection = document.getElementById("registration-section");
  const registerBtn = document.getElementById("register-btn");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const participantsContainer = document.getElementById("participants");
  const addParticipantBtn = document.getElementById("add-participant");
  const totalPayment = document.getElementById("total-payment");

  let participantCount = 1;

  // Toggle between login and register forms
  registerBtn.addEventListener("click", () => {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  });

  // Handle login form submission
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    loginSection.style.display = "none";
    registrationSection.style.display = "block";
  });

  // Autofill gender and category based on IC number
  document.querySelectorAll(".ic-number").forEach((input) => {
    input.addEventListener("input", (e) => {
      const ic = e.target.value.replace(/\D/g, "");
      if (ic.length === 12) {
        const year = parseInt(ic.substring(0, 2));
        const currentYear = new Date().getFullYear() % 100;
        const age = currentYear >= year ? currentYear - year : 100 + currentYear - year;
        const genderDigit = parseInt(ic.charAt(11));
        const gender = genderDigit % 2 === 0 ? "Perempuan" : "Lelaki";

        const participantDiv = e.target.closest(".participant");
        participantDiv.querySelector(".gender").value = gender;

        const categorySelect = participantDiv.querySelector(".category");
        if (age >= 18) {
          categorySelect.value = gender === "Lelaki" ? "lelaki-terbuka" : "perempuan-terbuka";
        } else if (age >= 13) {
          categorySelect.value = gender === "Lelaki" ? "sekolah-menengah-lelaki" : "sekolah-menengah-perempuan";
        } else {
          categorySelect.value = "sekolah-rendah";
        }
        categorySelect.disabled = false;
      }
    });
  });

  // Add participant
  addParticipantBtn.addEventListener("click", () => {
    if (participantCount < 5) {
      participantCount++;
      const newParticipant = document.querySelector(".participant").cloneNode(true);
      newParticipant.querySelector("h3").textContent = `Peserta ${participantCount}`;
      participantsContainer.appendChild(newParticipant);
      updateTotalPayment();
    }
  });

  // Update total payment
  function updateTotalPayment() {
    totalPayment.textContent = participantCount * 60;
  }

  // Handle registration form submission
  document.getElementById("registration-form").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Pendaftaran Berjaya!");
  });
});