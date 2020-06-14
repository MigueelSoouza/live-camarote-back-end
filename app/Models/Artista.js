"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const Env = use("Env");

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use("Hash");

class Artista extends Model {
  static boot() {
    super.boot();
  }

  generos() {
    return this.hasMany("App/Models/Genero");
  }
}

module.exports = Artista;
