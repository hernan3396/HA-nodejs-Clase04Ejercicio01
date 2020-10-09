const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/clase05-ejercicio01", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, default: "algo" },
  comments: Array,
  likes: Number,
});

const Article = mongoose.model("Article", articleSchema);

mongoose.connection.on("error", (err) => console.log(err));

mongoose.connection.once("open", async () => {
  console.log("conexion con la base de datos establecida :)");

  const article = new Article({
    title: "Titulo",
    author: "Autor",
    comments: ["pepe1", "pepe2"],
  });

  //   article.save((err, newArticle) => {
  //     if (err) {
  //       return console.log(err);
  //     } else {
  //       console.log(newArticle);

  //       mongoose.connection.close();
  //     }
  //   });
  // lo de arriba se puede escribir como lo de abajo
  //   article
  //     .save()
  //     .then((newArticle) => console.log(newArticle))
  //     .catch((err) => console.log(err));

  try {
    const newArticle = await article.save();
    console.log(newArticle);
  } catch (error) {
    console.log(err);
  }
});
