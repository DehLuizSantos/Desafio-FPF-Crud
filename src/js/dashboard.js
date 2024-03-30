var id = 0;
var nome = "";
var allUsers = localStorage.getItem("users");
var users = JSON.parse(allUsers);

function toggleNavbar() {
  const checkbox = document.getElementById("checkbox");
  const navbar = document.getElementById("navbar");
  const content = document.querySelector(".content");
  if (!checkbox.checked) {
    navbar.classList.add("hidden");
    content.classList.add("open");
  } else {
    navbar.classList.remove("hidden");
    content.classList.remove("open");
  }
}

function redirectToLogin() {
  window.location.href = "/";
}

function renderAllUsers(usersToRender) {
  const userListDiv = document.getElementById("users-wrapper");

  /* Renderiza os usuários dinamiamente */
  usersToRender.forEach(user => {
    // Cria os elementos HTML para representar cada usuário
    const userContainer = document.createElement("div");
    userContainer.classList.add("user-container");

    const userWrapper = document.createElement("div");
    userWrapper.classList.add("user-wrapper");

    const userTop = document.createElement("div");
    userTop.classList.add("user-wrapper_top");

    const userOptions = document.createElement("div");
    userOptions.classList.add("user-options");

    const logoImg = document.createElement("img");
    logoImg.src = user.logoSrc || "/src/assets/img/logo-fpf.png"; // URL da imagem do usuário
    logoImg.alt = "Logo"; // Texto alternativo para a imagem

    const editButton = document.createElement("button");
    editButton.classList.add("purple");
    editButton.textContent = "EDITAR";

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("red");
    deleteButton.addEventListener("click", function() {
      // Aqui você pode chamar a função que deseja disparar
      openModalDelete(user.id, user.name);
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
    nameHeading.textContent = user.name; // Nome do usuário

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

function openModalDelete(userId, userName) {
  id = userId;
  nome = userName;
  const modalDelete = document.getElementById("modal-delete");
  const spanName = document.getElementById("name");
  spanName.textContent = nome;
  modalDelete.style.opacity = 1;
  modalDelete.style.zIndex = 3;
}

function closeModalDelete() {
  const modalDelete = document.getElementById("modal-delete");
  console.log("aqui");
  modalDelete.style.opacity = 0;
  modalDelete.style.zIndex = -1;
}

function attUsers(usersToRender) {
  document.addEventListener("DOMContentLoaded", function() {
    console.log("aqui");
    renderAllUsers(usersToRender); // Chama a função renderAllUsers() quando o DOM estiver pronto
  });
}

function confirmDeleteUser() {
  const allNewUsers = users.filter(user => user.id !== id);
  const allUserToSend = JSON.stringify(allNewUsers);
  localStorage.setItem("users", allUserToSend);
  attUsers(allNewUsers);
  window.location = "/dashboard.html";
  closeModalDelete();
}

attUsers(users);
