/* Faz requisição e formata endereço de acordo com o CEP digitado */
async function formatGetAddressCep() {
  try {
    const cep = document.getElementById("cep").value.trim().replace("-", "");
    if (cep.length > 5) {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`); // Faz a requisição à API do Via CEP

      const data = await response.json(); // Converte a resposta para JSON
      if (data.erro) {
        Swal.fire({
          position: "top-end",
          title: "Erro!",
          text:
            "Cep não encontrado! gentileza enviar CEP valido para auto-completar o endereço.",
          icon: "error",
          confirmButtonText: "Voltar",
          timer: 1500
        });
        const cepSend = document.getElementById("cep");

        cepSend.focus();
        return;
      }
      const rua = document.getElementById("endereco");
      const bairro = document.getElementById("bairro");
      const cidade = document.getElementById("cidade");
      const numero = document.getElementById("numero");
      rua.value = data.logradouro;
      bairro.value = data.bairro;
      cidade.value = data.localidade;
      numero.focus();
    }
  } catch (error) {
    Swal.fire({
      position: "top-end",
      title: "Erro!",
      text: "Erro ao consultar CEP",
      icon: "error",
      confirmButtonText: "Voltar",
      timer: 1500
    });
    console.error(error);
  }
}

/* Mascara CEP */
function formatarCEP(input) {
  let valor = input.value.replace(/\D/g, ""); // Remove caracteres não numéricos

  if (valor.length > 5) {
    valor = valor.replace(/^(\d{5})(\d)/, "$1-$2"); // Adiciona o hífen após os primeiros 5 dígitos
  }

  input.value = valor; // Atualiza o valor do campo
}

/* Mascara CPF */
function formatarCPF(input) {
  let valor = input.value.replace(/\D/g, ""); // Remove caracteres não numéricos

  if (valor.length > 3 && valor.length <= 6) {
    valor = valor.replace(/^(\d{3})(\d{0,3})/, "$1.$2"); // Adiciona ponto após os primeiros 3 dígitos
  } else if (valor.length > 6 && valor.length <= 9) {
    valor = valor.replace(/^(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3"); // Adiciona ponto após os próximos 3 dígitos
  } else if (valor.length > 9 && valor.length <= 11) {
    valor = valor.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4"); // Adiciona hífen após os próximos 3 dígitos
  } else if (valor.length > 11) {
    valor = valor.slice(0, 11); // Limita o tamanho do CPF a 11 dígitos
  }

  input.value = valor; // Atualiza o valor do campo
}

/* Redireciona pro login */
function redirectToLogin() {
  window.location.href = "/";
}

/* Abre e fecha o navbar */
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
