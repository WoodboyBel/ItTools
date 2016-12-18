/**
 * Created by Pieter-Jan on 13-12-2016.
 */
"use strict";
var Article=(function () {
  function Article(ean, name, price) {
    this.ean = ean;
    this.name = name;
    this.price = price;
  }

  return Article;
}());
exports.Article = Article
