function toggleNavbar() {
  const checkbox = document.getElementById("checkbox");
  const navbar = document.getElementById("navbar");
  if (checkbox.checked) {
    navbar.classList.add("hidden");
  } else {
    navbar.classList.remove("hidden");
  }
}

function redirectToLogin() {
  window.location.href = "/";
}
