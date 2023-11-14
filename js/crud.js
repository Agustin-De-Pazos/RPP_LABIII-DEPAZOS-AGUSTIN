//import { monstruos as people } from "../data/data.js";
import { actualizarTabla } from "./tabla.js";
import { Monstruo } from "./monstruo.js";
const tipoMonstruo = [
  "ESQUELETO",
  "ZOMBIE",
  "VAMPIRO",
  "FANTASMA",
  "BRUJA",
  "HOMBRE LOBO"
];
const tipoHabilidad = [
  "DULCE O TRUCO",
  "SUSTO",
  "INMOVILIZAR",
  "RASGAR",
  "ELECTRUCUTAR"
];
var selectHabilidad = document.getElementById("selectHabilidad");
// Agregar las opciones del array armas al select
tipoHabilidad.forEach(function (habilidad) {
  var option = document.createElement("option");
  option.value = habilidad;
  option.textContent = habilidad;
  selectHabilidad.appendChild(option);
});

// Obtener el valor seleccionado por el usuario
selectHabilidad.addEventListener("change", function () {
  $formulario.selectHabilidad.value = selectHabilidad.value;
});

var selectMonstruo = document.getElementById("selectMonstruo");
// Agregar las opciones del array armas al select
tipoMonstruo.forEach(function (monstruo) {
  var option = document.createElement("option");
  option.value = monstruo;
  option.textContent = monstruo;
  selectMonstruo.appendChild(option);
});


// Obtener el valor seleccionado por el usuario
selectMonstruo.addEventListener("change", function () {
  $formulario.selectMonstruo.value = selectMonstruo.value;
});

const $seccionTabla = document.getElementById("tabla");
const $btnCancelar = document.getElementById("btnCancelar");
const $btnEliminar = document.getElementById("btnEliminar");

const $formulario = document.forms[0];
//localStorage.setItem("monstruos", JSON.stringify(people));
const monstruos = JSON.parse(localStorage.getItem("monstruos")) || [];
if (monstruos.length) actualizarTabla($seccionTabla, monstruos);

window.addEventListener("click", (e) => {
  //const id = e.target.parentElement.dataset.id;
  if (e.target.matches("td")) {
    const id = e.target.parentElement.getAttribute("data-id");
    const selectmonstruos = monstruos.find((mon) => mon.id == id);
    console.log(selectmonstruos);
    cargarFormulario($formulario, selectmonstruos);
    MostrarBotones();
  } else if (e.target.matches("input[value='Eliminar Monstruo']")) {
    if ($formulario.txtId.value != "") {
      if(validarDatos())
      {
        const id = parseInt($formulario.txtId.value);
        handlerDelete(id);
        
      }
      else
      {
        mostrarModal("Modifico algun campo elija de nuevo el monstruo");
      }
      OcultarBotones();
    }
  }
});

$formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const { txtId, txtNombre, txtAlias, rdoDefensa, txtMiedo, selectMonstruo, selectHabilidad} =
    $formulario;
  if (validarDatos()) {
    if (txtId.value === "") {
      const newMonstruo = new Monstruo(
        Date.now(),
        txtNombre.value,
        txtAlias.value,
        rdoDefensa.value,
        parseFloat(txtMiedo.value),
        selectMonstruo.value,
        selectHabilidad.value
      );

      handlerCreate(newMonstruo);
    } else if(txtId.value != "") {

      const updateMonstruo = new Monstruo(
        txtId.value,
        txtNombre.value,
        txtAlias.value,
        rdoDefensa.value,
        parseFloat(txtMiedo.value),
        selectMonstruo.value,
        selectHabilidad.value
      );
      handlerUpdate(updateMonstruo);
      OcultarBotones();
    }
    else
    {
      mostrarModal("Elegir un monstruo para poder modificar");
    }
  }
  $formulario.reset();
  $formulario.txtId.value = "";
});


$btnCancelar.addEventListener("click", (e) => {
  $formulario.reset();
  $formulario.txtId.value = "";
  OcultarBotones();
});

function handlerCreate(nuevaMonstruo) {
  monstruos.push(nuevaMonstruo);
  //monstruos.sort((a, b) => b.nombre.localeCompare(a.nombre));
  acualizarStorage("monstruos", monstruos);
  mostrarSpinner(3000);
  actualizarTabla($seccionTabla, monstruos);
}
function handlerUpdate(editMonstruo) {
  let index = monstruos.findIndex((m) => m.id == editMonstruo.id);
  console.log(index);
  monstruos.splice(index, 1, editMonstruo);
  //monstruos.sort((a, b) => b.nombre.localeCompare(a.nombre));
  acualizarStorage("monstruos", monstruos);
  mostrarSpinner(3000);
  actualizarTabla($seccionTabla, monstruos);
  $formulario.txtId.value = "";
}
function handlerDelete(id) {
  let index = monstruos.findIndex((m) => m.id == id);
  monstruos.splice(index, 1);
  acualizarStorage("monstruos", monstruos);
  mostrarSpinner(3000);
  actualizarTabla($seccionTabla, monstruos);
  $formulario.reset();
  $formulario.txtId.value = "";
}

function acualizarStorage(clave, data) {
  localStorage.setItem(clave, JSON.stringify(data));
}

function cargarFormulario(formulario, data) {
  formulario.txtId.value = data.id;
  formulario.txtNombre.value = data.nombre;
  formulario.txtAlias.value = data.alias;
  formulario.rdoDefensa.value = data.defensa;
  formulario.txtMiedo.value = data.miedo;
  formulario.selectMonstruo.value = data.monstruo;
  formulario.selectHabilidad.value = data.habilidad;
}

function validarDatos() {
  let bool = true;
  const { txtNombre, txtAlias } = $formulario;

  if (txtNombre.value.trim() === "" || txtAlias.value.trim() === "") {
    mostrarModal("Por favor, complete todos los campos.");
    bool = false;
  }

  return bool;
}
setTimeout(() => {
  const divSpinner = document.getElementById("divSpinner");
  divSpinner.setAttribute("Hidden", true);
  if (monstruos.length > 0) {
    mostrarTabla();
  }

}, 5000);

function mostrarTabla() {
  $seccionTabla.removeAttribute("Hidden");

}

function mostrarSpinner(ms) {
  const divSpinner = document.getElementById("divSpinner");
  divSpinner.removeAttribute("Hidden");
  $seccionTabla.setAttribute("Hidden", true);
  setTimeout(() => {
    $seccionTabla.removeAttribute("Hidden");
    divSpinner.setAttribute("Hidden", true);
  }, ms);
}
function MostrarBotones() {
  $btnCancelar.style.display = "inline-block";
  $btnEliminar.style.display = "inline-block";
}

function OcultarBotones() {
  $btnCancelar.style.display = "none";
  $btnEliminar.style.display = "none";
}



function mostrarModal(mensaje) {
  const modal = document.getElementById("alerta");
  const modalMessage = document.getElementById("modalMessage");

  modalMessage.textContent = mensaje;
  modal.style.display = "block";
}



const cerrar = document.getElementById("cerrar");
cerrar.addEventListener("click", (e) => {
  const modal = document.getElementById("alerta");
  modal.style.display = "none";
});

OcultarBotones();