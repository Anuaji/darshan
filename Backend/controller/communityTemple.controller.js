const jwt = require("jsonwebtoken");
const dbConfig = require(".././database/config");

exports.getCurrentTempleMeta = async (req, res) => {
  try {
    const token = req.cookies?.jwt;
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    dbConfig.query(
      `SELECT * FROM communitytemple where groupName="${decodedToken?.groupName}";`,
      (err, rows) => {
        if (err) {
          return res.status(500).json({ status: "Failed", message: err });
        }

        res.json({ status: "Success", result: rows });
      }
    );
  } catch (error) {
    res.status(500).json({ status: "Failed", message: error });
  }
};

exports.getTempleMetaByGroupName = async (req, res) => {
  try {
    const groupName = req.params.groupName;

    dbConfig.query(
      `SELECT * FROM communitytemple where groupName="${groupName}";`,
      (err, rows) => {
        if (err) {
          return res.status(500).json({ status: "Failed", message: err });
        }

        res.json({ status: "Success", result: rows });
      }
    );
  } catch (error) {
    res.status(500).json({ status: "Failed", message: error });
  }
};

exports.createCommunityTempleMeta = async (req, res) => {
  try {
    const token = req.cookies?.jwt;
    const { groupName } = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    // const groupName = req.body.groupName;
    console.log(groupName, "sdfg");
    const about_description = req.body?.about_description;
    const news_description = req.body?.news_description;
    let about_image = null;
    let news_image = null;

    if (req.files != undefined) {
      if (req.files.about_image != undefined) {
        const about_image_file = req.files.about_image;
        const path = "/public/community_temple_image/";
        const communityTemple_imageName = about_image_file.name;
        about_image = path + communityTemple_imageName;
        about_image_file.mv(
          "./public/community_temple_image/" + communityTemple_imageName,
          function (err) {
            if (err) {
              return res.status(500).json({ status: "Failed", message: err });
            }
          }
        );
      }

      if (req.files.news_image != undefined) {
        const news_image_file = req.files.news_image;
        const path = "/public/community_temple_image/";
        const communityTemple_imageName = news_image_file.name;
        news_image = path + communityTemple_imageName;
        news_image_file.mv(
          "./public/community_temple_image/" + communityTemple_imageName,
          function (err) {
            if (err) {
              return res.status(500).json({ status: "Failed", message: err });
            }
          }
        );
      }
    } else {
      return res
        .status(405)
        .json({ status: "Failed", message: "Upload image" });
    }

    dbConfig.query(
      `INSERT INTO communitytemple(groupName,about_description,about_image,news_description,news_image) values("${groupName}","${about_description}","${about_image}","${news_description}","${news_image}");`,
      (err, rows) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            if (err.sqlMessage.includes("groupName")) {
              return res.status(409).json({
                status: "Failed",
                message: "A Group can have only one temple",
              });
            }
          }

          return res.status(500).json({ status: "Failed", message: err });
        }

        res.json({ status: "Success", result: rows });
      }
    );
  } catch (error) {
    res.status(500).json({ status: "Failed", message: error });
  }
};

exports.updateCommunityTempleMeta = async (req, res) => {
  try {
    const id = req.params.id;
    const token = req.cookies?.jwt;
    const { groupName } = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    // const groupName = "suresh123group";
    const about_description = req.body?.about_description;
    const news_description = req.body?.news_description;
    // let about_image = null;
    // let news_image = null;

    // if (req.files != undefined) {
    //   if (req.files.about_image != undefined) {
    //     const about_image_file = req.files.about_image;
    //     const path = "/public/community_temple_image/";
    //     const communityTemple_imageName = about_image_file.name;
    //     about_image = path + communityTemple_imageName;
    //     about_image_file.mv(
    //       "./public/community_temple_image/" + communityTemple_imageName,
    //       function (err) {
    //         if (err) {
    //           return res.status(500).json({ status: "Failed", message: err });
    //         }
    //       }
    //     );
    //   }

    //   if (req.files.news_image != undefined) {
    //     const news_image_file = req.files.news_image;
    //     const path = "/public/community_temple_image/";
    //     const communityTemple_imageName = news_image_file.name;
    //     news_image = path + communityTemple_imageName;
    //     news_image_file.mv(
    //       "./public/community_temple_image/" + communityTemple_imageName,
    //       function (err) {
    //         if (err) {
    //           return res.status(500).json({ status: "Failed", message: err });
    //         }
    //       }
    //     );
    //   }
    // } else {
    //   return res
    //     .status(405)
    //     .json({ status: "Failed", message: "Upload image" });
    // }
    // ===========================

    if (req.files != undefined) {
      if (req.files.about_image != undefined) {
        var blogfile = req.files.about_image;
        var path = "/public/community_temple_image/";
        var communityTemple_imageName = blogfile.name;
        var about_image = path + communityTemple_imageName;
        blogfile.mv(
          "./public/community_temple_image/" + communityTemple_imageName,
          function (err) {
            if (err) {
              console.log(err);
            }
          }
        );
      } else {
        var about_image = "No image";
      }
    } else {
      var about_image = req.body.about_image;
      console.log("Please Upload About Image !!!");
    }

    if (req.files != undefined) {
      if (req.files.news_image != undefined) {
        var news_image_file = req.files.news_image;
        var path = "/public/community_temple_image/";
        var communityTemple_imageName = news_image_file.name;
        var news_image = path + communityTemple_imageName;
        news_image_file.mv(
          "./public/community_temple_image/" + communityTemple_imageName,
          function (err) {
            if (err) {
              console.log(err);
            }
          }
        );
      } else {
        var news_image = "No image";
      }
    } else {
      var news_image = req.body.news_image;
      console.log("Please Upload news Image !!!");
    }

    dbConfig.query(
      `UPDATE communityTemple set groupName="${groupName}",about_description="${about_description}",about_image="${about_image}",news_description="${news_description}",news_image="${news_image}" WHERE id="${id}";`,
      (err, rows) => {
        if (err) {
          return res.status(500).json({ status: "Failed", message: err });
        }

        res.json({ status: "Success", result: rows });
      }
    );
  } catch (error) {
    res.status(500).json({ status: "Failed", message: error });
  }
};

exports.deleteCommunityTempleMeta = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const templeMetaQuery = `DELETE FROM communitytemple where id=${id}`;
    const templeFunctionQuery = `DELETE FROM communitytemplefunctions where communityTempleId=${id}`;
    const templeInchargeQuery = `DELETE FROM communitytempleincharge where communityTempleId=${id}`;

    dbConfig.query(
      `${templeMetaQuery}; ${templeFunctionQuery}; ${templeInchargeQuery};`,
      (err, rows) => {
        if (err) {
          return res.status(500).json({ status: "Failed", message: err });
        }

        res.json({ status: "Success", result: rows });
      }
    );
  } catch (error) {
    res.status(500).json({ status: "Failed", message: error });
  }
};

exports.getCurrentTemplefunction = async (req, res) => {
  try {
    const token = req.cookies?.jwt;
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    dbConfig.query(
      `SELECT * FROM communitytemplefunctions where groupName="${decodedToken?.groupName}";`,
      (err, rows) => {
        if (err) {
          return res.status(500).json({ status: "Failed", message: err });
        }

        res.json({ status: "Success", result: rows });
      }
    );
  } catch (error) {
    res.status(500).json({ status: "Failed", message: error });
  }
};

exports.getTempleId = async (req, res) => {
  try {
    const { groupName } = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    dbConfig.query(
      `select id from where groupName=${groupName}`,
      (err, res) => {
        res.json({ status: "Success", result: res });
      }
    );
  } catch (error) {}
};

exports.getAllCommunityTempleFunction = (req, res) => {
  const communityTempleId = req.query.communityTempleId;
  try {
    const sqlQuery = `SELECT * FROM communitytemplefunctions ${
      communityTempleId ? `where communityTempleId="${communityTempleId}"` : ";"
    }`;

    console.log(sqlQuery);

    dbConfig.query(sqlQuery, (err, rows) => {
      if (err) {
        return res.status(500).json({ status: "Failed", message: err });
      }

      res.json({ status: "Success", result: rows });
    });
  } catch (error) {
    res.status(500).json({ status: "Failed", message: error });
  }
};

exports.createCommunityTempleFunction = async (req, res) => {
  try {
    // const communityTempleId = req.body?.communityTempleId;
    const name = req.body?.name;
    const date = req.body?.date;
    const time = req.body?.time;
    const place = req.body?.place;
    const token = req.cookies?.jwt;

    const { groupName } = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    let function_image = null;

    if (req.files != undefined) {
      if (req.files.function_image != undefined) {
        const about_image_file = req.files.function_image;
        const path = "/public/community_temple_image/";
        const communityTemple_imageName = about_image_file.name;
        function_image = path + communityTemple_imageName;
        about_image_file.mv(
          "./public/community_temple_image/" + communityTemple_imageName,
          function (err) {
            if (err) {
              return res.status(500).json({ status: "Failed", message: err });
            }
          }
        );
      }
    } else {
      return res
        .status(405)
        .json({ status: "Failed", message: "Upload image" });
    }

    dbConfig.query(
      `INSERT INTO communityTempleFunctions(name,image,date,time,place,groupName) values("${name}","${function_image}","${date}","${time}","${place}","${groupName}");`,
      (err, rows) => {
        if (err) {
          return res.status(500).json({ status: "Failed", message: err });
        }

        res.json({ status: "Success", result: rows });
      }
    );
  } catch (error) {
    res.status(500).json({ status: "Failed", message: error });
  }
};

exports.updateCommunityTempleFunction = async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body?.name;
    const date = req.body?.date;
    const time = req.body?.time;
    const place = req.body?.place;
    const token = req.cookies?.jwt;
    const functionImage = req.body?.function_image;
    const { groupName } = await jwt.verify(token, process.env.JWT_SECRET_KEY); // let functionImage = null;
    console.log("files", req.files);
    console.log("id", id);
    if (!id) {
      return res
        .status(401)
        .json({ status: "Failed", message: "Id is required" });
    }

    // if (req.files != undefined) {
    //   if (req.files.function_image != undefined) {
    //     const about_image_file = req.files.function_image;
    //     const path = "/public/community_temple_image/";
    //     const communityTemple_imageName = about_image_file.name;
    //     functionImage = path + communityTemple_imageName;
    //     about_image_file.mv(
    //       "./public/community_temple_image/" + communityTemple_imageName,
    //       function (err) {
    //         if (err) {
    //           return res.status(500).json({ status: "Failed", message: err });
    //         }
    //       }
    //     );
    //   }
    // } else {
    //   return res
    //     .status(405)
    //     .json({ status: "Failed", message: "Upload image" });
    // }
    // =================================
    if (functionImage) {
      function_image = functionImage;
    } else if (req.files != undefined) {
      if (req.files.function_image != undefined) {
        var blogfile = req.files.function_image;
        var path = "/public/community_temple_image/";
        var communityTemple_imageName = blogfile.name;
        var function_image = path + communityTemple_imageName;
        blogfile.mv(
          "./public/community_temple_image/" + communityTemple_imageName,
          function (err) {
            if (err) {
              console.log(err);
            }
          }
        );
      } else {
        var function_image = "No image";
      }
    } else {
      var function_image = req.body?.function_image;
      console.log("Please Upload About Image !!!");
    }

    console.log("Function image", function_image);
    console.log("Function image1", blogfile);
    console.log("Function image2", communityTemple_imageName);

    dbConfig.query(
      `UPDATE communityTempleFunctions
        set 
            name = "${name}",
            image = "${function_image}",
            date = "${date}",
            time = "${time}",
            place = "${place}",
            groupName= "${groupName}"
        WHERE id = ${id};`,
      (err, rows) => {
        if (err) {
          return res.status(500).json({ status: "Failed", message: err });
        }

        res.json({ status: "Success", result: rows });
      }
    );
  } catch (error) {
    res.status(500).json({ status: "Failed", message: error });
  }
};

exports.deleteCommunityTempleFunction = (req, res) => {
  try {
    const id = req.params.id;

    dbConfig.query(
      `DELETE FROM communityTempleFunctions where id="${id}";`,
      (err, rows) => {
        if (err) {
          return res.status(500).json({ status: "Failed", message: err });
        }

        res.json({ status: "Success", result: rows });
      }
    );
  } catch (error) {
    res.status(500).json({ status: "Failed", message: error });
  }
};

exports.getAllCommunityTempleIncharge = (req, res) => {
  const communityTempleId = req.query.communityTempleId;

  try {
    const sqlQuery = `SELECT * FROM communityTempleIncharge ${
      communityTempleId ? `where communityTempleId="${communityTempleId}"` : ";"
    }`;

    dbConfig.query(sqlQuery, (err, rows) => {
      if (err) {
        return res.status(500).json({ status: "Failed", message: err });
      }

      res.json({ status: "Success", result: rows });
    });
  } catch (error) {
    res.status(500).json({ status: "Failed", message: error });
  }
};

exports.createCommunityTempleIncharge = async (req, res) => {
  try {
    // const communityTempleId = req.body?.communityTempleId;
    const name = req.body?.name;
    const description = req.body?.description;
    const role = req.body?.role;
    const phone_number = req.body?.phone_number;
    let functionImage = null;
    const token = req.cookies?.jwt;
    const { groupName } = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (req.files != undefined) {
      if (req.files.function_image != undefined) {
        const about_image_file = req.files.function_image;
        const path = "/public/community_temple_image/";
        const communityTemple_imageName = about_image_file.name;
        functionImage = path + communityTemple_imageName;
        about_image_file.mv(
          "./public/community_temple_image/" + communityTemple_imageName,
          function (err) {
            if (err) {
              return res.status(500).json({ status: "Failed", message: err });
            }
          }
        );
      }
    } else {
      return res
        .status(405)
        .json({ status: "Failed", message: "Upload image" });
    }

    dbConfig.query(
      `INSERT INTO communityTempleIncharge(name,image,description,role,phone_number,groupName) values("${name}","${functionImage}","${description}","${role}","${phone_number}","${groupName}");`,
      (err, rows) => {
        if (err) {
          return res.status(500).json({ status: "Failed", message: err });
        }

        res.json({ status: "Success", result: rows });
      }
    );
  } catch (error) {
    res.status(500).json({ status: "Failed", message: error });
  }
};
exports.getCurrentTempleincharge = async (req, res) => {
  try {
    const token = req.cookies?.jwt;
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    dbConfig.query(
      `SELECT * FROM communityTempleIncharge where groupName="${decodedToken?.groupName}";`,
      (err, rows) => {
        if (err) {
          return res.status(500).json({ status: "Failed", message: err });
        }

        res.json({ status: "Success", result: rows });
      }
    );
  } catch (error) {
    res.status(500).json({ status: "Failed", message: error });
  }
};
exports.updateCommunityTempleIncharge = (req, res) => {
  try {
    const id = req.params.id;
    const communityTempleId = req.body?.communityTempleId;
    const name = req.body?.name;
    const description = req.body?.description;
    const role = req.body?.role;
    const phone_number = req.body?.phone_number;
    let functionImage = null;

    if (req.files != undefined) {
      if (req.files.function_image != undefined) {
        const about_image_file = req.files.function_image;
        const path = "/public/community_temple_image/";
        const communityTemple_imageName = about_image_file.name;
        functionImage = path + communityTemple_imageName;
        about_image_file.mv(
          "./public/community_temple_image/" + communityTemple_imageName,
          function (err) {
            if (err) {
              return res.status(500).json({ status: "Failed", message: err });
            }
          }
        );
      }
    } else {
      return res
        .status(405)
        .json({ status: "Failed", message: "Upload image" });
    }

    dbConfig.query(
      `UPDATE communityTempleIncharge SET communityTempleId="${communityTempleId}", description="${description}", image="${functionImage}", name="${name}", phone_number="${phone_number}", role="${role}" WHERE id="${id}";`,
      (err, rows) => {
        if (err) {
          return res.status(500).json({ status: "Failed", message: err });
        }

        res.json({ status: "Success", result: rows });
      }
    );
  } catch (error) {
    res.status(500).json({ status: "Failed", message: error });
  }
};

exports.deleteCommunityTempleIncharge = (req, res) => {
  try {
    const id = req.params.id;

    dbConfig.query(
      `DELETE FROM communityTempleIncharge where id="${id}";`,
      (err, rows) => {
        if (err) {
          return res.status(500).json({ status: "Failed", message: err });
        }

        res.json({ status: "Success", result: rows });
      }
    );
  } catch (error) {
    res.status(500).json({ status: "Failed", message: error });
  }
};
