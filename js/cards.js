const monstruos = JSON.parse(localStorage.getItem("monstruos")) || [];
const $articulos = document.getElementById("articulos");

if (monstruos.length) {
  monstruos.forEach((monstruo) => {
    $articulos.insertAdjacentHTML(
      "beforeend",
      `<article>
                
            <p>
              <img id="iconoMascara"
              src="./assets/mascara.svg"
              alt="Icono Mascara"
              />
              Alias: ${monstruo.alias}
            </p>
            <p>
              Nombre: ${monstruo.nombre}</p>  
            <p>
              <img id="iconoDefensa"
              src="./assets/defensa.svg"
              alt="Icono Defensa"
              />
              Defensa: ${monstruo.defensa}
            </p>
           <p>
              <img id="imgMiedo"
              src="./assets/miedo.svg"
              alt="Icono Miedo"/>
              Miedo: ${monstruo.miedo}
           </p>
           <p>
              <img id="imgMonstruo"
              src="./assets/monstruo.svg"
              alt="Icono Miedo"
              />
              Monstruo: ${monstruo.monstruo}
            </p>
            <p>
              <img
              id="imgMonstruo"
              src="./assets/habilidad.svg"
              alt="Icono Miedo"/>
              Habilidad: ${monstruo.habilidad}
            </p>
        </article>`
    );
  });
}
