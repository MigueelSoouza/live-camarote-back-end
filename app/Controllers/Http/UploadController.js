"use strict";

const Helpers = use("Helpers");

class UploadController {
  async store({ request }) {
    const foto = request.file("foto", {
      types: ["image"],
      size: "2mb",
    });

    const resposta = await foto.move(Helpers.tmpPath("uploads"), {
      name: `${new Date().getTime()}.${foto.subtype}`,
      overwrite: true,
    });

    if (!foto.moved()) {
      return foto.error();
    }

    return foto.fileName;
  }

  async show({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/${params.path}`));
  }
}

module.exports = UploadController;
