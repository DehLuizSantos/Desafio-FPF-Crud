const baseUrl = "http://localhost:3000/players"; // URL base da API

// Função para realizar uma requisição GET para obter todos os jogadors
async function getPlayers() {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error("Erro ao obter jogadors");
    }
    const data = await response.json();
    console.log("Jogadores:", data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Função para realizar uma requisição POST para adicionar um novo jogador
async function addPlayer(player) {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(player)
    });
    if (!response.ok) {
      throw new Error("Erro ao adicionar Jogador");
    }
    const data = await response.json();
    console.log("Novo jogador adicionado:", data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Função para realizar uma requisição PUT para atualizar um jogador existente
async function updatePlayer(id, updatedPlayerData) {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedPlayerData)
    });
    if (!response.ok) {
      throw new Error("Erro ao atualizar jogador");
    }
    const data = await response.json();
    console.log("Jogador atualizado:", data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Função para realizar uma requisição DELETE para excluir um jogador
async function deletePlayer(id) {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: "DELETE"
    });
    if (!response.ok) {
      throw new Error("Erro ao excluir jogador");
    }
    console.log("Jogador excluído com sucesso");
  } catch (error) {
    console.error(error);
  }
}

getPlayers();
