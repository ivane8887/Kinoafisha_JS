document.addEventListener("DOMContentLoaded", () => {

  
  // ================= SLIDER =================
  const track = document.getElementById("sliderTrack");
  const dots = document.querySelectorAll(".dot");
  let index = 0;

  function updateSlider() {
    if (!track || dots.length === 0) return;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(d => d.classList.remove("active"));
    if (dots[index]) dots[index].classList.add("active");
  }

  if (track && dots.length > 0) {
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        index = i;
        updateSlider();
      });
    });
    updateSlider();
  }

  // ================= SWITCH BUTTONS =================
  const switchButtons = document.querySelectorAll(".switch-btn");
  if (switchButtons.length > 0) {
    switchButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        switchButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });
  }
// ===== LOGIN MODAL (open/close only) =====
const loginBtn = document.querySelector(".login"); // "შესვლა" ღილაკი
const loginModal = document.getElementById("loginModal");

if (loginBtn && loginModal) {
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    loginModal.style.display = "flex";
  });
}

// დახურვა X-ით
document.querySelectorAll("#loginModal .close-modal").forEach(btn => {
  btn.addEventListener("click", () => {
    loginModal.style.display = "none";
  });
});

// დახურვა ფონზე დაკლიკებით
window.addEventListener("click", (e) => {
  if (e.target === loginModal) {
    loginModal.style.display = "none";
  }
});

// submit-ზე უბრალოდ დახურვა (არანაირი შემოწმება)
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("ავტორიზაცია გავლილია");
    loginModal.style.display = "none";
    loginForm.reset();
  });
}

  // ================= REGISTER MODAL =================
  const registerBtn = document.querySelector(".reg");
  const registerModal = document.getElementById("registerModal");
  const closeRegisterBtn = document.getElementById("closeRegister");

  if (registerBtn && registerModal) {
    registerBtn.addEventListener("click", (e) => {
      e.preventDefault();
      registerModal.style.display = "flex";
    });
  }

  if (closeRegisterBtn && registerModal) {
    closeRegisterBtn.addEventListener("click", () => {
      registerModal.style.display = "none";
    });
  }

  // ================= PASSWORD STRENGTH =================
  const passwordInput = document.getElementById("password");
  const strengthText = document.getElementById("passwordStrength");

  function updatePasswordStrengthUI(value) {
    if (!strengthText) return;
    strengthText.textContent = "";
    strengthText.className = "";

    if (!value) return;

    // 1) მხოლოდ ინგლისური ასოები -> სუსტი
    if (/^[a-zA-Z]+$/.test(value)) {
      strengthText.textContent = "პაროლი სუსტია";
      strengthText.classList.add("weak");
    }
    // 2) ინგლისური ასოები + რიცხვები -> საშუალო
    else if (/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/.test(value)) {
      strengthText.textContent = "პაროლი საშუალოა";
      strengthText.classList.add("medium");
    }
    // 3) დიდი+პატარა + რიცხვები -> ძლიერი
    else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/.test(value)) {
      strengthText.textContent = "პაროლი ძლიერია";
      strengthText.classList.add("strong");
    } else {
      // სხვა შემთხვევა (სპეც სიმბოლოები, ან სხვა კომბინაცია)
      strengthText.textContent = "პაროლის ფორმატი არასტანდარტულია";
      strengthText.classList.add("medium");
    }
  }

  if (passwordInput) {
    passwordInput.addEventListener("input", () => {
      updatePasswordStrengthUI(passwordInput.value);
    });
  }

  // ================= FORM VALIDATION =================
  const registerForm = document.getElementById("registerForm");

  // Inputs
  const emailInput = document.getElementById("email");
  const usernameInput = document.getElementById("username");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const regDateInput = document.getElementById("regDate");
  const countryInput = document.getElementById("country");
  const cityInput = document.getElementById("city");
  const phoneInput = document.getElementById("phone");

  // Errors
  const emailError = document.getElementById("emailError");
  const usernameError = document.getElementById("usernameError");
  const passwordError = document.getElementById("passwordError");
  const confirmError = document.getElementById("confirmError");
  const dateError = document.getElementById("dateError");
  const countryError = document.getElementById("countryError");
  const cityError = document.getElementById("cityError");
  const phoneError = document.getElementById("phoneError");

  function clearErrors() {
    document.querySelectorAll(".error").forEach(el => (el.textContent = ""));
  }

  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let valid = true;

      const email = (emailInput?.value || "").trim();
      const username = (usernameInput?.value || "").trim();
      const password = (passwordInput?.value || "").trim();
      const confirm = (confirmPasswordInput?.value || "").trim();
      const date = (regDateInput?.value || "").trim(); // DD-MM-YYYY
      const country = (countryInput?.value || "").trim();
      const city = (cityInput?.value || "").trim();
      const phone = (phoneInput?.value || "").trim();

      clearErrors();

      // Email (შენი მოთხოვნის მიხედვით: აქვს @, მერე . და ბოლოს მინ 2 სიმბოლო)
      const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;
      if (!emailPattern.test(email)) {
        if (emailError) emailError.textContent = "არასწორი ელ. ფოსტა";
        valid = false;
      }

      // Username (დამატებითი ვალიდაცია: მინ. 3)
      if (username.length < 3) {
        if (usernameError) usernameError.textContent = "მინ. 3 სიმბოლო";
        valid = false;
      }

      // Password (დამატებითი ვალიდაცია: მინ. 6)
      if (password.length < 6) {
        if (passwordError) passwordError.textContent = "მინ. 6 სიმბოლო";
        valid = false;
      }

      // Confirm password
      if (password !== confirm) {
        if (confirmError) confirmError.textContent = "პაროლები არ ემთხვევა";
        valid = false;
      }

      // Date DD-MM-YYYY
      if (!/^\d{2}-\d{2}-\d{4}$/.test(date)) {
        if (dateError) dateError.textContent = "თარიღი: DD-MM-YYYY";
        valid = false;
      }

      // Country
      if (!country) {
        if (countryError) countryError.textContent = "შეიყვანეთ ქვეყანა";
        valid = false;
      }

      // City
      if (!city) {
        if (cityError) cityError.textContent = "შეიყვანეთ ქალაქი";
        valid = false;
      }

      // Phone (დამატებითი: მინ. 9 ციფრი)
      if (!/^[0-9]{9,}$/.test(phone)) {
        if (phoneError) phoneError.textContent = "არასწორი ნომერი";
        valid = false;
      }

      if (valid) {
        alert("რეგისტრაცია წარმატებით დასრულდა!");
        if (registerModal) registerModal.style.display = "none";
        this.reset();
        updatePasswordStrengthUI("");
      }
    });
  }

  // ================= TERMS + RATINGS MODALS =================
  const termsModal = document.getElementById("termsModal");
  const ratingsModal = document.getElementById("ratingsModal");

  document.querySelectorAll(".open-terms").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (termsModal) termsModal.style.display = "flex";
    });
  });

  document.querySelectorAll(".open-ratings").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (ratingsModal) ratingsModal.style.display = "flex";
    });
  });

  // ყველა modal-ის დახურვა ერთი ლოგიკით (×)
  document.querySelectorAll(".close-modal").forEach(btn => {
    btn.addEventListener("click", () => {
      const parentModal = btn.closest(".modal");
      if (parentModal) parentModal.style.display = "none";
    });
  });

  // modal-ზე (შავ ფონზე) დაკლიკებით დახურვა
  window.addEventListener("click", (e) => {
    if (e.target && e.target.classList && e.target.classList.contains("modal")) {
      e.target.style.display = "none";
    }
  });

  // ================= COOKIES =================
  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }

  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }
    return null;
  }

  // ================= LANGUAGE (JSON + COOKIE) =================
  let currentLang = "ka";
  let translations = {};
  const langBtn = document.querySelector(".lang-btn");

  function applyLanguage(lang) {
    if (!translations[lang]) return;

    // textContent თარგმნა
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    // (თუ ოდესმე დაგჭირდება placeholder-ები)
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if (translations[lang][key]) {
        el.placeholder = translations[lang][key];
      }
    });
  }

  function updateLangButtonLabel() {
    if (!langBtn) return;
    // როცა საიტი ქართულადაა -> ღილაკზე ENG
    // როცა ინგლისურადაა -> ღილაკზე KA
    langBtn.textContent = currentLang === "ka" ? "ENG" : "KA";
  }

  // ახალი თეგი (შეტყობინება)
  function showLangMessage(lang) {
    const oldMsg = document.querySelector(".lang-message");
    if (oldMsg) oldMsg.remove();

    const msg = document.createElement("div");
    msg.className = "lang-message";
    msg.textContent =
      lang === "ka"
        ? "ენა შეცვლილია ქართულზე 🇬🇪"
        : "Language switched to English 🇬🇧";

    document.body.appendChild(msg);

    setTimeout(() => {
      msg.remove();
    }, 3000);
  }

  // JSON ჯერ უნდა ჩაიტვირთოს, მერე cookie წავიკითხოთ, მერე applyLanguage
  fetch("lang.json")
    .then(res => res.json())
    .then(data => {
      translations = data;

      const savedLang = getCookie("siteLang");
      if (savedLang && translations[savedLang]) {
        currentLang = savedLang;
      }

      applyLanguage(currentLang);
      updateLangButtonLabel();
    })
    .catch(() => {
      // თუ lang.json ვერ ჩაიტვირთა, უბრალოდ არ გავთარგმნით
      updateLangButtonLabel();
    });

  if (langBtn) {
    langBtn.addEventListener("click", () => {
      currentLang = currentLang === "ka" ? "en" : "ka";
      applyLanguage(currentLang);
      updateLangButtonLabel();
      setCookie("siteLang", currentLang, 7);
      showLangMessage(currentLang);
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const switchContainer = document.querySelector(".switch-container");
  if (!switchContainer) return;

  // Panel-ს JS-ით ვქმნით
  const sessionsPanel = document.createElement("div");
  sessionsPanel.className = "sessions-panel";
  sessionsPanel.style.display = "none";

  const label = document.createElement("label");
  label.textContent = "აირჩიეთ კინო:";

  const select = document.createElement("select");
  const firstOpt = document.createElement("option");
  firstOpt.value = "";
  firstOpt.textContent = "-- აირჩიეთ --";
  select.appendChild(firstOpt);

  sessionsPanel.appendChild(label);
  sessionsPanel.appendChild(select);

  // ჩავსვათ ღილაკების ქვემოთ
  switchContainer.insertAdjacentElement("afterend", sessionsPanel);

  function collectMovieTitles() {
    // იღებს სათაურებს ამ ელემენტებიდან
    const titles = Array.from(document.querySelectorAll(".movie h4, .movie h5"))
      .map(el => (el.textContent || "").trim())
      .filter(Boolean);

    // დუბლიკატების მოცილება
    return [...new Set(titles)];
  }

  function fillSelect() {
    // ვტოვებთ მხოლოდ პირველ option-ს
    select.querySelectorAll("option:not(:first-child)").forEach(o => o.remove());

    const titles = collectMovieTitles();

    titles.forEach(t => {
      const opt = document.createElement("option");
      opt.value = t;
      opt.textContent = t;
      select.appendChild(opt);
    });
  }

  // ერთი listener ორივე ღილაკზე (event delegation)
  switchContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".switch-btn");
    if (!btn) return;

    // active კლასების მართვა
    document.querySelectorAll(".switch-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // რომელ tab-ზე დააჭირა?
    if (btn.dataset.tab === "sessions") {
      fillSelect();
      sessionsPanel.style.display = "flex";
    } else {
      sessionsPanel.style.display = "none";
    }
  });
});


// ===== CONTACT MODAL =====
const contactLink = document.querySelector('[data-i18n="contact"]');
const contactModal = document.getElementById("contactModal");
const contactForm = document.getElementById("contactForm");

if (contactLink && contactModal) {
  contactLink.addEventListener("click", (e) => {
    e.preventDefault();
    contactModal.style.display = "flex";
  });
}

if (contactForm && contactModal) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("შეტყობინება გაიგზავნა!");
    contactModal.style.display = "none";
    contactForm.reset();
  });
}
