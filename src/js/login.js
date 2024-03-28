/* Função Logar */
document
  .getElementById("login-form")
  .addEventListener("submit", async event => {
    event.preventDefault(); // Impede que o formulário seja enviado por parametro URL
    const formData = new FormData(event.target);
    const loginData = {
      email: formData.get("login-email"),
      password: formData.get("login-password")
    };

    try {
      /* Requisição pra tabela users */
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();

      /* Verifica se usuário e senha estão corretas */
      const userExists = users.find(
        user =>
          user.email === loginData.email && user.password === loginData.password
      );

      if (userExists) {
        window.location.href = "dashboard.html";
        return;
      }
      /* Popup personalizado */
      Swal.fire({
        position: "top-end",
        title: "Error!",
        text: "Usuário não encontrado. Por favor, verifique suas credenciais.",
        icon: "error",
        confirmButtonText: "Voltar",
        timer: 1500
      });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      Swal.fire({
        position: "top-end",
        title: "Error!",
        text: "Houve um erro no sistema! volte mais tarde.",
        icon: "error",
        confirmButtonText: "Voltar",
        timer: 1500
      });
    }
  });

/* Função Cadastrar */
document
  .getElementById("register-form")
  .addEventListener("submit", async event => {
    event.preventDefault(); // Impede que o formulário seja por parametro URL

    const formData = new FormData(event.target);
    const userData = {
      name: formData.get("register-name"),
      email: formData.get("register-email"),
      password: formData.get("register-password")
    };

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar usuário");
      }
      /* Armazena o nome do usuário na sessão */
      sessionStorage.setItem("name", userData.name);
      return (window.location.href = "dashboard.html");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      Swal.fire(
        "Erro!",
        "Ocorreu um erro ao cadastrar usuário. Por favor, tente novamente mais tarde.",
        "error"
      );
    }
  });
