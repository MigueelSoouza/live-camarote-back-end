"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ArtistaSchema extends Schema {
  up() {
    this.create("artistas", (table) => {
      table.increments();
      table.string("cpf", 255).notNullable();
      table.string("nome", 255).notNullable();
      table.string("apelido", 255).notNullable();
      table.string("cidade", 255).notNullable();
      table.string("estado", 255).notNullable();
      table.string("foto", 255).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("artistas");
  }
}

module.exports = ArtistaSchema;
