import { Personaje } from "./personaje.js";

export class Monstruo extends Personaje {
  constructor(id, nombre, alias, defensa, miedo, monstruo,habilidad) {
    super(id, nombre, alias, defensa, miedo);
    this.defensa = defensa;
    this.miedo = miedo;
    this.monstruo = monstruo;
    this.habilidad = habilidad;
  }
}
