function showDetails(tourName) {
    const details = document.getElementById(tourName);
    if (details.style.display === "none") {
        details.style.display = "block";
    } else {
        details.style.display = "none";
    }
}

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Thank you for contacting us! We will get back to you shortly.');
});

/*======sticky navbar======*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;   
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    /*======sticky navbar======*/
    let header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /*===== remove menu icon navbar when click navbar link (scroll) =====*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};


const form = document.querySelector('form');
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

function sendEmail() {
  const bodyMessage = `Full Name: ${fullName.value}<br> Email: ${email.value}<br> Phone Number: ${phone.value}<br> Message: ${message.value}</br></br></br>`;
  Email.send({
    SecureToken: "28319123-7783-4622-8649-ba4adaf7384b",
    To: 'thandiwenyama2@gmail.com',
    From: "thandiwenyama2@gmail.com",
    Subject: subject.value,
    Body: bodyMessage
  }).then(
    message => {
      if (message === "OK") {
        Swal.fire({
          title: "Success!",
          text: "Message sent successfully!",
          icon: "success"
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to send the message.",
          icon: "error"
        });
      }
    }
  );
}

function checkInputs() {
  const items = document.querySelectorAll(".item");
  let allValid = true;

  for (const item of items) {
    if (item.value === "") {
      item.classList.add("error");
      item.parentElement.classList.add("error");
      allValid = false;
    }

    if (items[1].value != "") {
      checkEmail();
    }
    items[1].addEventListener("keyup", () => {
      checkEmail();
    });

    item.addEventListener("keyup", () => {
      if (item.value !== "") {
        item.classList.remove("error");
        item.parentElement.classList.remove("error");
      } else {
        item.classList.add("error");
        item.parentElement.classList.add("error");
      }
    });
  }

  return allValid;
}

function checkEmail() {
  const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
  const errorTxtEmail = document.querySelector(".error-txt.email");


  if (!email.value.match(emailRegex)) {
    email.classList.add("error");
    email.parentElement.classList.add("error");
    if (email.value != "") {
      errorTxtEmail.innerText = "Enter a valid email address";
    }
    else {
      errorTxtEmail.innerText = "Email Address can't be blank";
    }
  }
  else {
    email.classList.remove("error");
    email.parentElement.classList.remove("error");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (checkInputs()) {
    sendEmail();
  } else {
    Swal.fire({
      title: "Error!",
      text: "Please fill in all the required fields.",
      icon: "error"
    });
  }

  if (!fullName.classList.contains("error") && !email.classList.contains("error") && !phone.classList.contains("error") && !subject.classList.contains("error") && !message.classList.contains("error")) {
    sendEmail();

    form.reset();
    return false;
  }
});
