const dbConfig = require("./database/config");
exports.siteMap = (req, res) => {
  console.log("here hited");
  const fs = require("fs"),
    convert = require("xml-js"),
    fetch = require("node-fetch"),
    moment = require("moment"),
    hostBlogBaseURL = "http://eaalayam.com",
    getBlogsListURL = "http://127.0.0.1:3000/siteMap/getAll",
    untrackedUrlsList = [],
    options = { compact: true, ignoreComment: true, spaces: 4 };
  /* 
    Method to Fetch dynamic List of URLs from Rest API/DB 
*/

  const fetchBlogsList = () => {
    fetch(getBlogsListURL)
      .then((res) => res.json())
      .then((dataJSON) => {
        if (dataJSON) {
          dataJSON.forEach((element) => {
            const modifiedURL = element.sitemap_url.replace(/ /g, "-");
            untrackedUrlsList.push(`${hostBlogBaseURL}${modifiedURL}`);
          });
          filterUniqueURLs();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* 
    Method to Filter/Unique already existing URLs and new urls we fetched from DB
*/
  const filterUniqueURLs = () => {
    fs.readFile("./sitemap.xml", (err, data) => {
      if (data) {
        const existingSitemapList = JSON.parse(convert.xml2json(data, options));
        let existingSitemapURLStringList = [];
        if (
          existingSitemapList.urlset &&
          existingSitemapList.urlset.url &&
          existingSitemapList.urlset.url.length
        ) {
          existingSitemapURLStringList = existingSitemapList.urlset.url.map(
            (ele) => ele.loc._text
          );
        }

        let newArray = [];
        untrackedUrlsList.forEach((ele) => {
          if (existingSitemapURLStringList.indexOf(ele) == -1) {
            newArray.push({
              loc: {
                _text: ele,
              },
              lastmod: {
                _text: moment(new Date()).format("YYYY-MM-DD"),
              },
              changefreq: {
                _text: "weekly",
              },
              priority: {
                _text: 0.8,
              },
            });
          }
        });
        if (newArray.length > 0) {
          for (var i = 0; i < newArray.length; i++) {
            existingSitemapList.urlset.url.push(newArray[i]);
          }
        }

        createSitemapFile(existingSitemapList);
      }
    });
  };

  /* 
    Method to convert JSON format data into XML format
*/
  const createSitemapFile = (list) => {
    const finalXML = convert.json2xml(list, options); // to convert json text to xml text
    saveNewSitemap(finalXML);
  };

  /* 
    Method to Update sitemap.xml file content
*/
  const saveNewSitemap = (xmltext) => {
    fs.writeFile("../src/sitemap.xml", xmltext, (err) => {
      if (err) {
        return console.log(err);
      }

      console.log("The file was saved!");
    });
  };

  fetchBlogsList();
  //   });
};
