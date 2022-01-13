const Database = require("./db");
const saveOrphanage = require("./saveOrphanage.js");

Database.then(async (db) => {
  // Insert data into table
  await saveOrphanage(db, {
    lat: "-3.740693",
    lng: "-38.545193",
    name: "Lar de Jeremias",
    about:
      "Assiste crianças e pre-adolescentes em condiciões desfavorecidas a receberem o mínimo de educação, carinho e lazer",
    whatsapp: "996667401",
    images: [
      "https://images.unsplash.com/photo-1590077428593-a55bb07c4665?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9",
      "https://images.unsplash.com/photo-1595295407820-3563d04518be?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9",
    ].toString(),
    instructions:
      "Sinta-se bem vindo a ajudar-nos transformar a vida dessas crianças de maneira impactante",
    opening_hours: "Horário de visitas das 06h às 14h",
    open_on_weekends: "1",
  });
  
  // Check data on table
  const selectedData = await db.all("SELECT * FROM orphanages");
  console.log(selectedData);

  // consulte data from orphanage with id
  // const orphanage = await db.all('SELECT * FROM orphanages WHERE id = "3"')
  // console.log(orphanage)

  // Delete data from table

  //console.log(await db.run("DELETE FROM orphanages WHERE id = '8'"));
  //console.log(await db.run("DELETE FROM orphanages WHERE id = '9'"));
  //console.log(await db.run("DELETE FROM orphanages WHERE id = '10'"));
  //console.log(await db.run("DELETE FROM orphanages WHERE id = '11'"));
});
