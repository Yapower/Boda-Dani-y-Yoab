const fechaEvento = new Date("January 24, 2027 17:00:00").getTime();

const contador = setInterval(function() {

  const ahora = new Date().getTime();
  const diferencia = fechaEvento - ahora;

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

  document.getElementById("dias").innerText = dias;
  document.getElementById("horas").innerText = horas;
  document.getElementById("minutos").innerText = minutos;
  document.getElementById("segundos").innerText = segundos;

  if (diferencia < 0) {
    clearInterval(contador);
    document.getElementById("contador").innerHTML = "¡El gran día ha llegado!";
  }

}, 1000);

document.getElementById("hora").addEventListener("click", function () {

const titulo = encodeURIComponent("Boda Daniela & Yoab");
const detalles = encodeURIComponent("Celebración de nuestra boda");
const ubicacion = encodeURIComponent("Guadalajara, Jalisco");

// formato: AAAAMMDDTHHMMSS
const inicio = "20261024T143000";
const fin = "20261024T220000";

const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${titulo}&details=${detalles}&location=${ubicacion}&dates=${inicio}/${fin}`;

window.open(url, "_blank");

});

document.getElementById("ubicacion").addEventListener("click", function () {

const mapa = "https://maps.google.com/?q=Guadalajara,Jalisco";

window.open(mapa, "_blank");

});

const modal = document.getElementById("modalConfirmacion");

document.getElementById("fotos").addEventListener("click", function(){

modal.style.display = "flex";

});

document.getElementById("cerrarModal").addEventListener("click", function(){

modal.style.display = "none";

});




let invitados = [];

fetch("buscar.php")
.then(res => res.json())
.then(data => {

invitados = data;

console.log("Invitados cargados:", invitados);

});

document.getElementById("buscarBtn").addEventListener("click", function(){

const texto = document.getElementById("buscarNombre").value.toLowerCase();

const encontrado = invitados.find(n =>
n.toLowerCase().includes(texto)
);

if(encontrado){

document.getElementById("resultado").innerHTML = `
<p>${encontrado}</p>
<button onclick="confirmar('${encontrado}')">Confirmar asistencia</button>
`;

}else{

document.getElementById("resultado").innerHTML =
"<p>Nombre no encontrado</p>";

}

});

function confirmar(nombre){

fetch("confirmar.php", {

method:"POST",

headers:{
"Content-Type":"application/x-www-form-urlencoded"
},

body:"nombre=" + encodeURIComponent(nombre)

}).then(()=>{

document.getElementById("resultado").innerHTML =
`<p>Gracias ${nombre}, tu asistencia ha sido confirmada ❤️</p>`;

});

}