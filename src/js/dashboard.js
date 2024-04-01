var id = 0;
var nome = "";
var allUsers = localStorage.getItem("users");
var users = JSON.parse(allUsers);

function renderAllUsers(usersToRender) {
  const userListDiv = document.getElementById("users-wrapper");
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
    logoImg.src = user.logoSrc || "/src/assets/icons/user.svg"; // URL da imagem do usuário
    logoImg.alt = "Logo"; // Texto alternativo para a imagem

    const editButton = document.createElement("button");
    editButton.classList.add("purple");
    editButton.textContent = "EDITAR";

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("red");
    deleteButton.addEventListener("click", function() {
      // Aqui você pode chamar a função que deseja disparar
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
    nameHeading.textContent = user.nome; // Nome do usuário

    nameDiv.appendChild(nameHeading);

    /* Informações basicas */

    const emailDiv = document.createElement("div");
    emailDiv.classList.add("info-wrapper");
    const emailLabel = document.createElement("span");

    emailLabel.classList.add("info");
    emailLabel.textContent = "EMAIL:";

    const emailSpan = document.createElement("span");
    emailSpan.textContent = user.email; // Email do usuário

    emailDiv.appendChild(emailLabel);
    emailDiv.appendChild(emailSpan);

    // Adicione as outras informações do usuário aqui
    // Exemplo: telefone, status, idade, CPF

    userInfos.appendChild(nameDiv);
    userInfos.appendChild(emailDiv);

    userTop.appendChild(userOptions);
    userTop.appendChild(userInfos);

    const userFooter = document.createElement("div");
    userFooter.classList.add("user-footer");

    const moreInfoButton = document.createElement("button");
    moreInfoButton.textContent = "MAIS INFORMAÇÕES";

    userFooter.appendChild(moreInfoButton);

    userWrapper.appendChild(userTop);
    userWrapper.appendChild(userFooter);

    userContainer.appendChild(userWrapper);

    userListDiv.appendChild(userContainer);
  });
}

function attUsers(usersToRender) {
  renderAllUsers(usersToRender);
}

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

function openModalDelete(userId, userName) {
  id = userId;
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

function closeModal() {
  const modalDelete = document.getElementsByClassName("modal-delete_content");
  const modalCrud = document.getElementsByClassName("modal-crud_content");
  const modal = document.getElementsByClassName("modal");
  modal[0].style.zIndex = -1;
  modalDelete[0].style.opacity = 0;
  modalDelete[0].style.zIndex = -1;
  modalCrud[0].style.opacity = 0;
  modalCrud[0].style.zIndex = -1;
}

function confirmDeleteUser() {
  const allNewUsers = users.filter(user => user.id !== id);
  const allUserToSend = JSON.stringify(allNewUsers);
  localStorage.setItem("users", allUserToSend);
  users = allNewUsers;
  const userContainerId = document.getElementById(id);
  userContainerId.remove();
  console.log(userContainerId);

  closeModal();
}

function openModalRegisterEdit() {
  id = null;
  const modalCrud = document.getElementsByClassName("modal-crud_content");
  const modal = document.getElementsByClassName("modal");
  modalCrud[0].style.opacity = 1;
  modalCrud[0].style.zIndex = 3;
  modal[0].style.zIndex = 2;
  modal[0].style.opacity = 1;
}

document.getElementById("crud-form").addEventListener("submit", event => {
  event.preventDefault(); // Impede que o formulário seja por parametro URL

  const formData = new FormData(event.target);
  const registerData = {
    status: formData.get("status") === null ? false : true,
    nascimento: formData.get("nascimento"),
    nome: formData.get("nome"),
    cpf: formData.get("cpf"),
    idade: formData.get("idade"),
    email: formData.get("email"),
    telefone: formData.get("telefone"),
    id: Math.floor(Math.random() * 1001),
    cep: formData.get("cep"),
    photo: formData.get("photo"),
    endereco: {
      rua: formData.get("rua"),
      numero: formData.get("numero"),
      cidade: formData.get("cidade"),
      bairro: formData.get("bairro"),
      complemento: formData.get("complemento")
    }
  };
  const newUsers = [...users, registerData];
  const newUser = [registerData];
  localStorage.setItem("users", JSON.stringify(newUsers));
  users = newUsers;
  attUsers(newUser);

  closeModal();
});
