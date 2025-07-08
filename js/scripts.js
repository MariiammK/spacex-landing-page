fetch('https://api.spacexdata.com/v5/launches')
    .then((response) => {
        if (!response.ok){
            throw response.status;
        } 
        return response.json();
    })

    .then((launches) => {

        console.log(launches);
        const fragment = document.createDocumentFragment(); // ფრაგმენტი

        let count = 0;

        launches.reverse().forEach((launch) => {
            if (count < 25) {                
                let div2 = document.createElement("div");
                div2.textContent = `Launch Name: ${launch.name} - Launch Date: ${launch.date_local} - Launch Rocket: ${launch.rocket} - Launch Success: ${launch.success}`;
                fragment.appendChild(div2);
                // yt.appendChild(div2);

                count++;
            }
        });
        document.getElementById("missions-container").appendChild(fragment);
    })

    // 404 error-is shemtxvevashi:
    .catch(function (error) {
        console.log(error);

        if (error === 404) {
            let pError = document.createElement("p");
            pError.textContent = "404 Error";
            document.getElementById("missions-container").appendChild(pError);
        }
    });





    // ანიმაცია

function animateCounter(el, target) {
  let current = 0;
  const step = Math.ceil(target / 120);
  const interval = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(interval);
    } else {
      el.textContent = current;
    }
  }, 70);
}

function resetCounter(el) {  //როცა ელემენტი გაქრება ეკრანიდან ციფრი ისევ 0 ხდება
  el.textContent = '0';
}

function checkVisibilityAndAnimate() {
  const counters = document.querySelectorAll(".number");

  counters.forEach((el, index) => {
    const rect = el.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    // ვაწვდით ფიქსირებულ რიცხვებს ინდექსის მიხედვით
    const targets = [11, 19, 16]; 
    const target = targets[index];

    if (isVisible && !el.classList.contains("animating")) {  // თუ ელემენტი ახალი გამოჩნდა ეკრანზე დაიწყება ანიმაცია
      el.classList.add("animating");
      animateCounter(el, target);
    }

    if (!isVisible && el.classList.contains("animating")) {  // თუ ელემენტი გაქრა ეკრანიდან, ვაბრუნებთ ისევ 0-ზე
      el.classList.remove("animating");
      resetCounter(el);
    }
  });
}

// როცა გვერდი ჩაიტვირთება ან როცა გადაისქროლება
window.addEventListener("scroll", checkVisibilityAndAnimate);
window.addEventListener("load", checkVisibilityAndAnimate);



// ბურგერის ფუნქციონალი:

// musahob
document.addEventListener("DOMContentLoaded", function () {
  const burgerBtn = document.getElementById("burgerBtn");
  const navMenu = document.querySelector(".nav-ul");

  burgerBtn.addEventListener("click", function () {
    navMenu.classList.toggle("show");
  });
});




// // FORM REGISTRATION

let formEl = document.getElementById("registration");

formEl.addEventListener("submit", function (e) {
  e.preventDefault();

  let errors = {};

  // Username
  let username = document.getElementById("usernamefield").value;
  if (username.trim() === "") {
    errors.username = "Username field cannot be empty";
  }

  // Email
  let email = document.getElementById("email").value.trim();
  if (email === "") {
    errors.email = "Email field cannot be empty";
  }

  // Passwords
  let password = document.getElementById("passwordfield").value;
  let password2 = document.getElementById("passwordfield2").value;

  if (password.trim() === "") {
    errors.password = "Password field cannot be empty";
  }

  // if (password2.trim() === "") {
  //   errors.password = "Password field cannot be empty";
  // }

  if (password !== password2) {
    errors.password2 = "Passwords do not match";
  }

  // Clear previous error messages
  this.querySelectorAll(".error-t, #error-email").forEach((element) => {
    element.textContent = "";
  });

  // Show errors
  for (let key in errors) {
    let errorElement = document.getElementById("error-" + key);
    if (errorElement) {
      errorElement.textContent = errors[key];
    }
  }

  // If no errors, reset form
  if (Object.keys(errors).length === 0) {
    alert("Form submitted successfully!");
    this.reset(); // გასუფთავება
  }
});



// მეილის ვალიდაცია
let emailInput = document.getElementById("email");

function emailValidation() {
  let emailValue = emailInput.value;
  let pError = document.getElementById("error-email");
  let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (pattern.test(emailValue)) {
    pError.innerText = "Your Email is Valid";
  } else {
    pError.innerText = "Your Email is Invalid";
  }

  if (emailValue === "") {
    pError.innerText = "";
  }
}

emailInput.addEventListener("keyup", emailValidation);



// პაროლის ჩვენება/დაფარვა:

const passwordInput = document.getElementById("passwordfield"); 
const passwordInput2 = document.getElementById("passwordfield2");
const showPasswordCheckbox = document.getElementById("showPasswordCheckbox");

showPasswordCheckbox.addEventListener("change", function () {
  if (showPasswordCheckbox.checked) {
    passwordInput.type = "text";
    passwordInput2.type = "text";
  } else {
    passwordInput.type = "password";
    passwordInput2.type = "password";
  }
});




// // COOKIES
(() => {
  const getCookie = (name) => {
    const value = " " + document.cookie;
    console.log("value", `==${value}==`);
    const parts = value.split(" " + name + "=");
    return parts.length < 2 ? undefined : parts.pop().split(";").shift();
  };

  const setCookie = function (name, value, expiryDays, domain, path, secure) {
    const exdate = new Date();
    exdate.setHours(
      exdate.getHours() +
        (typeof expiryDays !== "number" ? 365 : expiryDays) * 24
    );
    document.cookie =
      name +
      "=" +
      value +
      ";expires=" +
      exdate.toUTCString() +
      ";path=" +
      (path || "/") +
      (domain ? ";domain=" + domain : "") +
      (secure ? ";secure" : "") + 
      ";SameSite=Lax";  // ეს ჩავამატე, რადგან ბრაუზერში კონსოლში არ მიჩანდა ქუქისები.
  };

  const $cookiesBanner = document.querySelector(".cookies-eu-banner");
  const $cookiesBannerButton = $cookiesBanner.querySelector("button");
  const cookieName = "cookiesBanner";
  const hasCookie = getCookie(cookieName);

  if (!hasCookie) {
    $cookiesBanner.classList.remove("hidden");
  }

  $cookiesBannerButton.addEventListener("click", () => {
    setCookie(cookieName, "closed");
    $cookiesBanner.remove();
  });
})();
















