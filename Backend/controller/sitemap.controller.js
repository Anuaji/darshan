const dbConfig = require("../database/config");
const sitemap = require("../sitemap");
const express = require("express");
const router = express.Router();

//Create sitemap
exports.createSiteMap = (req, res) => {
  try {
    var sitemap_url = req.body.sitemap_url;
    var sql = `INSERT INTO sitemapurl(sitemap_url) VALUES("${sitemap_url}");`;
    dbConfig.query(sql, (err, rows) => {
      if (!err) {
        res.send(rows);
        sitemap.siteMap();
      } else console.log(err);
    });
  } catch (e) {
    throw e;
  }
};

//GET ALL sitemap
exports.getAllSite = (req, res) => {
  try {
    var sql = `SELECT * FROM sitemapurl`;
    dbConfig.query(sql, (err, rows) => {
      if (!err) res.send(rows);
      else console.log(err);
    });
  } catch (e) {
    throw e;
  }
};
