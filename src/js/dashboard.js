/* Variaveis globais */
var userId = 0;
var nome = "";
var allUsers = localStorage.getItem("users");
var users = JSON.parse(allUsers);
var user = null;

function mostrarLoading() {
  const loading = document.getElementById("loading");
  loading.style.display = "block";
}

// Função para ocultar o elemento de carregamento
function ocultarLoading() {
  setTimeout(() => {
    const loading = document.getElementById("loading");
    loading.style.display = "none";
  }, 1000); // Atraso de 1 segundo (1000 milissegundos)
}
/* Loop usuários criando componentes na tela */
function renderAllUsers(usersToRender) {
  const userListDiv = document.getElementById("users-wrapper");
  mostrarLoading();
  /* Renderiza os usuários dinamiamente */
  usersToRender.forEach(user => {
    // Cria os elementos HTML para representar cada usuário
    const userContainer = document.createElement("div");
    userContainer.classList.add("user-container");
    userContainer.id = user.id;

    const userWrapper = document.createElement("div");
    userWrapper.classList.add("user-wrapper");

    const userTop = document.createElement("div");
    userTop.classList.add("user-wrapper_top");

    const userOptions = document.createElement("div");
    userOptions.classList.add("user-options");

    const logoImg = document.createElement("img");
    logoImg.src = user.photo || "/src/assets/img/user-default.png"; // URL da imagem do usuário
    logoImg.id = "photo-" + user.id;
    logoImg.alt = "Logo"; // Texto alternativo para a imagem

    /* Botões */
    const editButton = document.createElement("button");
    editButton.classList.add("purple");
    editButton.textContent = "EDITAR";
    editButton.addEventListener("click", function() {
      openModalRegisterEdit(user.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("red");
    deleteButton.addEventListener("click", function() {
      openModalDelete(user.id, user.nome);
    });
    deleteButton.textContent = "DELETAR";

    userOptions.appendChild(logoImg);
    userOptions.appendChild(editButton);
    userOptions.appendChild(deleteButton);

    const userInfos = document.createElement("div");
    userInfos.classList.add("user-infos");

    const nameDiv = document.createElement("div");
    nameDiv.classList.add("name");

    const nameHeading = document.createElement("h3");
    nameHeading.id = "nome-" + user.id;
    nameHeading.textContent = user.nome; // Nome do usuário

    nameDiv.appendChild(nameHeading);

    /* Informações basicas */

    /* Email */
    const emailDiv = document.createElement("div");
    emailDiv.classList.add("info-wrapper");
    const emailLabel = document.createElement("span");

    emailLabel.classList.add("info");
    emailLabel.textContent = "EMAIL:";

    const emailSpan = document.createElement("span");
    emailSpan.id = "email-" + user.id;
    emailSpan.textContent = user.email; // Email do usuário

    emailDiv.appendChild(emailLabel);
    emailDiv.appendChild(emailSpan);

    /* Email fim */

    /* Cpf  */
    const cpfDiv = document.createElement("div");
    cpfDiv.classList.add("info-wrapper");
    const cpfLabel = document.createElement("span");

    cpfLabel.classList.add("info");
    cpfLabel.textContent = "CPF:";

    const cpfSpan = document.createElement("span");
    cpfSpan.id = "cpf-" + user.id;
    cpfSpan.textContent = user.cpf; // cpf do usuário

    cpfDiv.appendChild(cpfLabel);
    cpfDiv.appendChild(cpfSpan);
    /* Cpf fim  */

    /* telefone  */
    const telefoneDiv = document.createElement("div");
    telefoneDiv.classList.add("info-wrapper");
    const telefoneLabel = document.createElement("span");

    telefoneLabel.classList.add("info");
    telefoneLabel.textContent = "TEL:";

    const telefoneSpan = document.createElement("span");
    telefoneSpan.id = "telefone-" + user.id;
    telefoneSpan.textContent = user.telefone; // telefone do usuário

    telefoneDiv.appendChild(telefoneLabel);
    telefoneDiv.appendChild(telefoneSpan);
    /* Cpf fim  */

    /* Ordem de renderização das informações */

    userInfos.appendChild(nameDiv);
    userInfos.appendChild(emailDiv);
    userInfos.appendChild(cpfDiv);
    userInfos.appendChild(telefoneDiv);
    userTop.appendChild(userOptions);
    userTop.appendChild(userInfos);

    /* Footer */
    const userFooter = document.createElement("div");
    userFooter.classList.add("user-footer");

    const moreInfoButton = document.createElement("button");
    moreInfoButton.addEventListener("click", function() {
      openModalRegisterEdit(user.id);
    });
    moreInfoButton.textContent = "MAIS INFORMAÇÕES";

    userFooter.appendChild(moreInfoButton);
    userWrapper.appendChild(userTop);
    userWrapper.appendChild(userFooter);
    userContainer.appendChild(userWrapper);
    userListDiv.appendChild(userContainer);
  });
  ocultarLoading();
}

/* Callback para renderizar usuário */
function attUsers(usersToRender) {
  renderAllUsers(usersToRender);
}

/* Função verificar "database" */
function getUsersFromLocalStorage() {
  const allUsers = localStorage.getItem("users");
  return allUsers ? JSON.parse(allUsers) : [];
}

// Função para renderizar os usuários na página
function renderUsersOnPage() {
  const usersFromStorage = getUsersFromLocalStorage();
  renderAllUsers(usersFromStorage);
}

document.addEventListener("DOMContentLoaded", function() {
  renderUsersOnPage();
});

/* Abre modal deleção */
function openModalDelete(id, userName) {
  userId = id;
  nome = userName;
  const modalDelete = document.getElementsByClassName("modal-delete_content");
  const modal = document.getElementsByClassName("modal");
  const spanName = document.getElementById("name");
  modal[0].style.zIndex = 2;
  modal[0].style.opacity = 1;
  modalDelete[0].style.opacity = 1;
  modalDelete[0].style.zIndex = 3;
  spanName.textContent = nome;
}

/* Fecha modal */
function closeModal() {
  const modalDelete = document.getElementsByClassName("modal-delete_content");
  const modalCrud = document.getElementsByClassName("modal-crud_content");
  const modal = document.getElementsByClassName("modal");
  modal[0].style.zIndex = -1;
  modal[0].style.opacity = 0;
  modalDelete[0].style.opacity = 0;
  modalDelete[0].style.zIndex = -1;
  modalCrud[0].style.opacity = 0;
  modalCrud[0].style.zIndex = -1;
  /* Limpa o formulario */
  document.getElementById("nome").value = "";
  document.getElementById("cpf").value = "";
  document.getElementById("email").value = "";
  document.getElementById("idade").value = "";
  document.getElementById("telefone").value = "";
  document.getElementById("cep").value = "";
  document.getElementById("endereco").value = "";
  document.getElementById("numero").value = "";
  document.getElementById("complemento").value = "";
  document.getElementById("cidade").value = "";
  document.getElementById("nascimento").value = "";
  document.getElementById("status").value = "on";
}

/* Confirmação de deleção */
function confirmDeleteUser() {
  const allNewUsers = users.filter(user => user.id !== userId);
  const allUserToSend = JSON.stringify(allNewUsers);
  localStorage.setItem("users", allUserToSend);
  users = allNewUsers;
  const userContainerId = document.getElementById(userId);
  userContainerId.remove();
  closeModal();
}

/* Abre modal formulario */
function openModalRegisterEdit(id) {
  userId = id;
  if (id) {
    /* Coloca os dados do usuário clicado */
    const userFiltered = users.find(user => user.id === id);
    document.getElementById("nome").value = userFiltered.nome;
    document.getElementById("cpf").value = userFiltered.cpf;
    document.getElementById("email").value = userFiltered.email;
    document.getElementById("idade").value = userFiltered.idade;
    document.getElementById("telefone").value = userFiltered.telefone;
    document.getElementById("nascimento").value = userFiltered.nascimento;
    document.getElementById("status").value = userFiltered.status;
    document.getElementById("cep").value = userFiltered.cep;
    document.getElementById("endereco").value = userFiltered.endereco.rua ?? '';
    document.getElementById("numero").value = userFiltered.endereco.numero ?? '';
    document.getElementById("complemento").value =
      userFiltered.endereco.complemento ?? '';
    document.getElementById("cidade").value = userFiltered.endereco.cidade ?? '';
  }
  const modalCrud = document.getElementsByClassName("modal-crud_content");
  const modal = document.getElementsByClassName("modal");
  modalCrud[0].style.opacity = 1;
  modalCrud[0].style.zIndex = 3;
  modal[0].style.zIndex = 2;
  modal[0].style.opacity = 1;
}

/* Submit formulario add/edit */
document.getElementById("crud-form").addEventListener("submit", event => {
  event.preventDefault(); // Impede que o formulário seja por parametro URL

  const formData = new FormData(event.target);
  /* Cria um bundle temporario pra foto */
  const file = formData.get("file");
  const imageUrl = URL.createObjectURL(file);

  const registerData = {
    status: formData.get("status") === null ? false : true,
    nascimento: formData.get("nascimento"),
    nome: formData.get("nome"),
    cpf: formData.get("cpf"),
    idade: formData.get("idade"),
    email: formData.get("email"),
    telefone: formData.get("telefone"),
    id: userId ? userId : Math.floor(Math.random() * 1001),
    cep: formData.get("cep"),
    photo: imageUrl,
    endereco: {
      rua: formData.get("rua"),
      numero: formData.get("numero"),
      cidade: formData.get("cidade"),
      bairro: formData.get("bairro"),
      complemento: formData.get("complemento")
    }
  };

  /* Editar */
  if (userId) {
    document.getElementById(`nome-${userId}`).textContent = registerData.nome;
    document.getElementById(`telefone-${userId}`).textContent =
      registerData.telefone;
    document.getElementById(`cpf-${userId}`).textContent = registerData.cpf;
    document.getElementById(`email-${userId}`).textContent = registerData.email;
    document.getElementById(`photo-${userId}`).src = registerData.photo;

    const filteredUser = users.map(user => {
      if (user["id"] === userId) {
        return { ...user, ...registerData };
      } else {
        return user;
      }
    });
    users = filteredUser;
    localStorage.setItem("users", JSON.stringify(filteredUser));
    userId = null;
    closeModal();
    return;
  }

  /* Adicionar novo */
  const newUsers = [...users, registerData];
  const newUser = [registerData];
  localStorage.setItem("users", JSON.stringify(newUsers));
  users = newUsers;
  attUsers(newUser);

  closeModal();
});

/* Filtra usuário de acordo com o que está na tela. */
document.getElementById("search-user").addEventListener("input", event => {
  const filtro = event.target.value.toLowerCase(); // Obtém o texto digitado pelo usuário e converte para minúsculas

  // Remove todos os cards atuais
  const userListDiv = document.getElementById("users-wrapper");
  userListDiv.innerHTML = "";

  // Filtra os usuários com base no texto digitado pelo usuário
  const usersFiltrados = users.filter(user => {
    return user.nome.toLowerCase().includes(filtro); // Verifica se o nome do usuário inclui o texto do filtro
  });

  // Renderiza apenas os cards filtrados
  renderAllUsers(usersFiltrados);
});
