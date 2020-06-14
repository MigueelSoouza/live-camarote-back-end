"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ArtistaSchema extends Schema {
  up() {
    this.create("generos", (table) => {
      table.increments();
      table
        .integer("artista_id", 11)
        .unsigned()
        .references("id")
        .inTable("artistas");
      table.string("genero", 255).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("generos");
  }
}

module.exports = ArtistaSchema;
