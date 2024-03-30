/* Função Logar */
document.getElementById("login-form").addEventListener("submit", event => {
  event.preventDefault(); // Impede que o formulário seja enviado por parametro URL
  const formData = new FormData(event.target);
  const loginData = {
    email: formData.get("login-email"),
    password: formData.get("login-password")
  };

  /* Resposta sessão */
  const usersSession = localStorage.getItem("users");
  const users = JSON.parse(usersSession);

  if (!users) {
    Swal.fire({
      position: "top-end",
      title: "Erro!",
      text: "Usuário não encontrado!.",
      icon: "error",
      confirmButtonText: "Voltar",
      timer: 1500
    });
    return;
  }
  const userAutentication = users.some(
    user => user.email && user.password === loginData.password
  );

  if (!userAutentication) {
    Swal.fire({
      position: "top-end",
      title: "Erro!",
      text: "Usuário não encontrado!.",
      icon: "error",
      confirmButtonText: "Voltar",
      timer: 1500
    });
    return;
  }

  window.location.href = "dashboard.html";
});

/* Função Cadastrar */
document.getElementById("register-form").addEventListener("submit", event => {
  event.preventDefault(); // Impede que o formulário seja por parametro URL

  const formData = new FormData(event.target);
  const userData = {
    name: formData.get("register-name"),
    email: formData.get("register-email"),
    password: formData.get("register-password")
  };

  const usersSession = localStorage.getItem("users") || "[]";
  const users = JSON.parse(usersSession);
  const usersSessionAlredyExist = users.some(
    user => user.email === userData.email
  );

  if (usersSessionAlredyExist) {
    Swal.fire({
      position: "top-end",
      title: "Error!",
      text: "Usuário já existe!.",
      icon: "error",
      confirmButtonText: "Voltar",
      timer: 1500
    });
    return;
  }

  Swal.fire({
    position: "top-end",
    title: "Sucesso!",
    text: "Usuário Cadastrado com sucesso!.",
    icon: "success",
    confirmButtonText: "Voltar",
    timer: 1500
  });
  /* Armazena o nome do usuário na sessão */
  localStorage.setItem("users", JSON.stringify([...users, userData]));
  const slider = document.getElementById("checked");
  slider.checked = false;
});
