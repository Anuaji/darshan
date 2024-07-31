const dbConfig = require('../database/config');


 const createnewAdvertisment = async(req,res)=>{
    // return new Promise((resolve, reject) =>{
        try{

            const listItems = [];
            let filename;
            let move;
            let ad_img;
            let result;

            const trainerId = req.body.trainerId;
            const companyName = req.body.companyName;
            const websiteUrl = req.body.websiteUrl;

            
        if (req.files == undefined) {

            return res.status(400).send({ message: 'Please upload a file!' });
        } else if (req.files !== undefined) {
            console.log(req.files);
            if (req.files['image']) {
                filename = Date.now() + '-' + req.files['image']['name'];
                move = req.files['image']['mv'];

                listItems.push('/public/trainerAdvertismentImage/' + filename);

                move('./public/trainerAdvertismentImage/' + filename, (err) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                });
                ad_img = listItems;
            } 
           
             else {
                ad_img = '';
            }
        }
         else {
            ad_img = '';
        }



            const sql=`INSERT INTO traineradvertisment (trainerId,companyName,websiteUrl,advertisement_image)
   VALUES("${trainerId}","${companyName}","${websiteUrl}","${ad_img}")`; 
   result = dbConfig.query(sql, (err, rows) => {
    if (!err) {
        res.status(200).send(rows);
    } else {
        res.status(500).send(err);
    }
});
           
        }catch(e){
            res.status(500).send({
                message: `Could not upload the file: ${req.files.img.name}. ${err}`
            });

        }
    // }
    // )
 }


 const gettraineerAdvertisement = async(req)=>{
    return new Promise ((resolve,reject)=>{
      try{
     
       const sql = `SELECT * FROM traineradvertisment;`
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

 module.exports = {createnewAdvertisment,gettraineerAdvertisement} ;




