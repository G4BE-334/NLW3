const Database = require("./database/db");
const saveOrphanage = require("./database/saveOrphanage");

module.exports = {
  index(request, response) {
    return response.render("index");
  },

  async orphanage(request, response) {
    const id = request.query.id;

    try {
      const db = await Database;
      const results = await db.all(
        `SELECT * FROM orphanages WHERE id = "${id}"`
      );
      const orphanage = results[0];

      orphanage.images = orphanage.images.split(","); // the split property takes string and turn it into an array with the arguments separated by commas
      orphanage.firstImage = orphanage.images[0];

      if (orphanage.open_on_weekends == "0") {
        orphanage.open_on_weekends = false;
      } else {
        orphanage.open_on_weekends = true;
      }
      return response.render("orphanage", { orphanage });
    } catch (error) {
      console.log(error);
      return response.send("Erro no banco de dados");
    }
  },

  async orphanages(request, response) {
    try {
      const db = await Database;
      const orphanages = await db.all("SELECT * FROM orphanages");
      // import orphanage from database
      return response.render("orphanages", { orphanages });
    } catch (error) {
      console.log(error);
      return res.send("Erro no banco de dados");
    }
  },

  createOrphanage(request, response) {
    return response.render("create-orphanage");
  },

  async saveOrphanage(request, response) {
    const fields = request.body;

    // Verify if all fields are filled
    if (Object.values(fields).includes("")) {
      return response.send("Todos os campos devem ser preenchidos!");
    }

    try {
      // Save orphanage information
      const db = await Database;
      await saveOrphanage(db, {
        lat: fields.lat,
        lng: fields.lng,
        name: fields.name,
        about: fields.about,
        whatsapp: fields.whatsapp,
        images: fields.images.toString(),
        instructions: fields.instructions,
        opening_hours: fields.opening_hours,
        open_on_weekends: fields.open_on_weekends,
      });

      // Redirections
      return response.redirect("/orphanages");
    } catch (error) {
      console.log(error);
      return response.send("Erro no banco de dados");
    }
  },

  donate (request, response) {
    return response.render("donate");
  },
};
