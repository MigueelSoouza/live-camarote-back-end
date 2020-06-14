"use strict";

const Artista = use("App/Models/Artista");
const Genero = use("App/Models/Genero");
const Helpers = use("Helpers");

class ArtistaController {
  async index() {
    // GET
    const artistas = await Artista.query().with("generos").fetch();
    return artistas;
  }

  async show({ params }) {
    // GET unique
    const artista = await Artista.find(params.id);
    const generos = await artista.generos().fetch();
    return { artista, generos };
  }

  async store({ request }) {
    // POST
    const { cpf, nome, apelido, cidade, estado, foto } = request.only([
      "cpf",
      "nome",
      "apelido",
      "cidade",
      "estado",
      "foto",
    ]);

    const { generos: generodata } = request.only(["generos"]);
    const artista = await Artista.create({
      cpf,
      nome,
      apelido,
      cidade,
      estado,
      foto,
    });
    const generos = await Genero.createMany(
      generodata.map((genero) => ({
        artista_id: artista.id,
        genero: genero,
      }))
    );

    return { artista, generos };
  }

  async update({ request, params }) {
    // PUT
    const artista = await Artista.find(params.id);

    const { cpf, nome, apelido, cidade, estado, foto } = request.only([
      "cpf",
      "nome",
      "apelido",
      "cidade",
      "estado",
      "foto",
    ]);

    artista.merge({ cpf, nome, apelido, cidade, estado, foto });
    await artista.save();

    await Genero.query().where("artista_id", artista.id).delete();

    const { generos: generodata } = request.only(["generos"]);

    const generos = await Genero.createMany(
      generodata.map((genero) => ({
        artista_id: artista.id,
        genero: genero,
      }))
    );

    return { artista, generos };
  }

  async destroy({ request, params }) {
    // DELETE
    const artista = await Artista.find(params.id);
    await Genero.query().where("artista_id", artista.id).delete();
    await artista.delete(artista);
  }
}

module.exports = ArtistaController;
