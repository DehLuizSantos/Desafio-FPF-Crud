const nome = sessionStorage.getItem("name");

Swal.fire({
  position: "top-end",
  icon: "success",
  title: `Seja bem vindo! ${nome}`,
  showConfirmButton: false,
  timer: 1500,
  width: 300,
  padding: "3em"
});
