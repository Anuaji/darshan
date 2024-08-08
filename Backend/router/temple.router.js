const express = require("express");
const router = express.Router();
const dbConfig = require("../database/config");

// Require the controllers WHICH WE DID NOT CREATE YET!!
const temple_controller = require("../controller/temple.controller");
const { default: templeCreate } = require("../controller/TempleCreate");

//Url for home page
router.get("/getTemple", temple_controller.TempleNameID);
router.get("/getAll/:role", temple_controller.TempleAllList);
router.get(
  "/getAllName/:country_id/:state_id/:district_id/:city_id",
  temple_controller.TempleGetAllName
);
router.get(
  "/getAllbasedCity/:city_id",
  temple_controller.TempleGetAllBasedCity
);
router.get("/gettAddress/:id", temple_controller.TempleGetAddress);
router.get("/getOne/:id", temple_controller.TempleGetOne);
router.post("/create", temple_controller.TempleCreate);
router.put("/update/:id", temple_controller.updateTemple);
router.get("/getAllRelatedTemple", temple_controller.RelatedTempleAll);

router.get("/getAllInActive", temple_controller.getInActive);
router.delete("/delete/:id", temple_controller.TempleDelete);
router.delete("/imagesDelete/:id", temple_controller.TempleImagesDelete);
router.delete("/imagesByDelete/:id", temple_controller.TempleImagesByDelete);
router.get("/imagesGetAll", temple_controller.TempleImagesget);
router.get("/imagesgetOne/:id", temple_controller.TempleImagesgetOne);
router.get("/templeGet/:id", temple_controller.templeGet);
router.put("/updateActive/:id", temple_controller.updateActive);
router.get(
  "/getTempleBasedOnUserId/:id",
  temple_controller.getTempleBasedOnUserID
);
router.get(
  "/getTempleBasedOnUserId/inactive/:id",
  temple_controller.getTempleBasedOnUserINactive
);
// router.get("/getOnlyApprovedTemple", temple_controller.onlyApprovedTemple);
// router.get("/relatedtemple/:groupid", temple_controller.RelatedTemple);
// router.put("updatedTemple",temple_controller.updateTemple);

router.get("/getTempleCountforUser/:id", async (req, res) => {
  try {
    let result = await temple_controller.templeStatusCount(req);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.put("/updateStatus/:id", async (req, res) => {
  try {
    let result = await temple_controller.updateStatus(req);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.put("/updateTemple/:id", async (req, res) => {
  try {
    let result = await temple_controller.updateTemple(req);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get(
  "/templeGetAllByUser/:user_id/:status?",
  temple_controller.TempleGetAllByUser
);

// router.put('/templeGetOneByUser/:id', async (req,res)=>{
//     try{
//         let result = await temple_controller.TempleGetOneByUser(req);
//         res.send(result)
//         }catch(err){
//         console.log(err);
//         res.status(500).send(err);
//     }
// });

router.get("/getonlyfamoustemple", temple_controller.getOnlyFamousTemple);
router.get("/getAdditionalById/:id", (req, res) => {
  try {
    const id = req.params?.id;

    if (!id) {
      return res.json({ status: "Failed", error: "No ID provided" });
    }

    // Query 1: Fetch pariharams data
    const query1 = `SELECT temple.temple_name, pariharams.pariharam_name, pariharams.pariharam_id 
                    FROM temple
                    JOIN pariharams ON find_in_set(pariharams.pariharam_id, temple.pariharam) 
                    WHERE temple.id = ${id}`;

    // Query 2: Fetch main_god data
    const query2 = `SELECT temple.temple_name, main_god.god_name, main_god.main_god_id 
                    FROM temple
                    JOIN main_god ON find_in_set(main_god.main_god_id, temple.othergod_id) 
                    WHERE temple.id = ${id}`;

    // Query 3: Fetch festival data
    const query3 = `SELECT temple.temple_name, festival.festival_name, festival.festival_id 
                    FROM temple
                    JOIN festival ON find_in_set(festival.festival_id, temple.festival_ids) 
                    WHERE temple.id = ${id}`;

    // Query 4: Fetch starTemple and tourist_id data
    const query4 = `SELECT starTemple, tourist_id, videoFile, youtubeUrl
                    FROM temple 
                    WHERE id = ${id}`;
    // Execute all queries in parallel
    Promise.all([
      executeQuery(query1),
      executeQuery(query2),
      executeQuery(query3),
      executeQuery(query4),
    ])
      .then(
        ([
          pariharamsResult,
          mainGodsResult,
          festivalResult,
          additionalDataResult,
        ]) => {
          res.json({
            status: "Success",
            result: {
              pariharam: pariharamsResult,
              otherGods: mainGodsResult,
              festival: festivalResult,
              additionalData: additionalDataResult,
            },
          });
        }
      )
      .catch((err) => {
        res.json({ status: "Failed", error: err.message });
      });
  } catch (error) {
    res.json({ status: "Failed", error: error.message });
  }
});

// Helper function to execute SQL queries
function executeQuery(query) {
  return new Promise((resolve, reject) => {
    dbConfig.query(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

router.put("/showfamoustemple/:id", async (req, res) => {
  let isActive = req.body?.showTemple;

  let id = req.params.id;

  let sql = `UPDATE temple SET showTemple = '${isActive}' where id  = '${id}' `;

  dbConfig.query(sql, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(result);
    }
  });
});

//Router export
module.exports = router;
