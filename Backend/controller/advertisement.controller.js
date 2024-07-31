const dbConfig = require('../database/config');

const createAdvertisement = async (req, res) => {
    try {
        const listItems = [];
        let filename;
        let mv;
        let ad_img;
        let result;

        const vendorId = req.body.vendorId;
        const companyName = req.body.companyName;
        const websiteUrl = req.body.websiteUrl;

        if (req.files == undefined) {
            return res.status(400).send({ message: 'Please upload a file!' });
        } else if (req.files !== undefined) {
            if (req.files['image']) {
                filename = Date.now() + '-' + req.files['image']['name'];
                mv = req.files['image']['mv'];

                listItems.push('/public/advertisementImages/' + filename);

                mv('./public/advertisementImages/' + filename, (err) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                });
                ad_img = listItems;
            } else if (req.body.ad_img) {
                ad_img = req.body.ad_img;
            } else {
                ad_img = '';
            }
        } else if (req.body.ad_img) {
            ad_img = req.body.ad_img;
        } else {
            ad_img = '';
        }

        const sql = `INSERT INTO advertisement (vendorId,companyName,websiteUrl,advertisement_image)
  VALUES("${vendorId}","${companyName}","${websiteUrl}","${ad_img}")`;

        result = dbConfig.query(sql, (err, rows) => {
            if (!err) {
                res.status(200).send(rows);
            } else {
                res.status(500).send(err);
            }
        });
    } catch (err) {
        res.status(500).send({
            message: `Could not upload the file: ${req.files.img.name}. ${err}`
        });
    }
};

const getAdvertisement = async(req)=>{
    return new Promise ((resolve,reject)=>{
      try{
       var vendor_id = req.params.vendorId;
       const sql = `SELECT * FROM advertisement WHERE vendorId='${vendor_id}';`
       dbConfig.query(sql,(err,result)=>{
         if (!err) {
           return resolve(result);
         }
         else{
           return reject(err);
         }
       })
      }catch(err){
        return reject(err);
      }
    });
  }


module.exports = {createAdvertisement,getAdvertisement}
