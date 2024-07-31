const dbConfig = require('../database/config');
const bcrypt = require("bcryptjs");
require('dotenv').config();
const jwt = require("jsonwebtoken");
let astrologer = {};


astrologer.createRegister = async (req) => {
    return new Promise((resolve, reject) => {
        try {
            const name = req.body.name;
            const country = req.body.country;
            const state = req.body.state;
            const district = req.body.district;
            const city = req.body.city;
            const area = req.body.area;
            const address = req.body.address;
            const pincode = req.body.pincode;
            const phone = req.body.phone;
            const secondary_number = req.body.secondary_number;
            const whatsapp_number = req.body.whatsapp_number;
            const email = req.body.email;
            var password = req.body.password;
            const hash = bcrypt.hashSync(password, 10);
            password = hash;
            const sql = `INSERT INTO astrologer(AstrologerName,CountryId,StateId,DistrictId,CityId,AreaId,Address,Pincode,Phone,SecondaryNumber,WhatsappNumber,EmailId,Password)
            VALUES("${name}","${country}","${state}","${district}","${city}","${area}",
            "${address}","${pincode}","${phone}","${secondary_number}","${whatsapp_number}","${email}","${password}")`;

            const sql2 = `SELECT * FROM astrologer WHERE Phone="${phone}"`;
            dbConfig.query(sql2, (err, result) => {
                console.log(result.length != 0);
                if (err) {
                    return reject(err);
                }
                if (result.length == 0) {
                    dbConfig.query(sql, (err2, result2) => {
                        if (err2) {
                            return reject(err2);
                        }
                        else {
                            let token = jwt.sign({ phone: phone }, process.env.SECRET_KEY);
                            return resolve({ Message: 'astrologer created sucessfully', ID: result2.insertId, token: token });
                        }
                    });
                }
                else {
                    return reject({ status: 409, message: "Astrologer already exists" })
                }
            })

        }
        catch (e) {
            return reject(e)
        }
    })
}

astrologer.getSingleAstrologer = async (req) => {
    return new Promise((resolve, reject) => {
        try {
            var id = req.params.id;

            const sql = `SELECT astrologer.id as AstrologerID,astrologer.AstrologerName as AstrologerName,astrologer.CountryId as CountryID,countries.country as countryName,astrologer.StateId as StateID,states.state as StateName,astrologer.DistrictId as DistrictID,districts.district as DistrictName,
            astrologer.CityId as CityID,city.city as CityName,astrologer.AreaId as AreaID,area.area_name as AreaName,astrologer.Address as Address,
            astrologer.Pincode as PinCode,astrologer.Phone as Phone,astrologer.SecondaryNumber as SecondaryNumber,astrologer.WhatsappNumber as WhatsappNumber,astrologer.EmailId as EmailID,astrologer.Password as Password FROM astrologer LEFT JOIN countries ON astrologer.CountryId = countries.id LEFT JOIN states ON astrologer.StateId = states.id LEFT JOIN districts ON astrologer.DistrictId = districts.id LEFT JOIN city ON astrologer.CityId = city.id LEFT JOIN area ON astrologer.AreaId = area.area_id WHERE astrologer.id = ${id}`

            dbConfig.query(sql, (err, result) => {
                if (!err) {
                    return resolve(result);
                }
                else {
                    return reject(err);
                }
            });
        } catch (err) {
            return reject(err);
        }
    })
}
astrologer.login = async (req) => {
    return new Promise((resolve, reject) => {
        try {
            const phone = req.body.phone;
            var password = req.body.password;

            const sql = `SELECT * FROM astrologer WHERE Phone = "${phone}"`
            dbConfig.query(sql, (err, user) => {
                if (err) {
                    return reject({ status: 500, message: err });
                } else {
                    if (user.length == 0) {
                        return resolve({ status: 404, message: "Phone number doesn't exist" });
                    } else {
                        const hashedPassword = user[0].Password
                        if (bcrypt.compareSync(password, hashedPassword)) {
                            const token = jwt.sign({ Phone: user[0].Phone }, process.env.SECRET_KEY);
                            return resolve({ id: user[0].id , token: token, role: 'astrologer' });
                        } else {
                            return reject({ status: 404, message: "Password Incorrect" });
                        }

                    }
                }
            })
        } catch (e) {
            return reject(e);
        }
    })
}

astrologer.updateAstrologer = async (req) => {

    return new Promise((resolve, reject) => {
        try {
            var id = req.params.id;
            var astrologerName = req.body.astrologerName;

            const sql = `UPDATE astrologer SET AstrologerName = "${astrologerName}"  WHERE id = "${id}"`;

            dbConfig.query(sql, (err, result) => {
                if (!err) {

                    return resolve(result);
                }
                else {
                    return reject(err);
                }
            });
        } catch (e) {
            return reject(e);
        }
    })
};
astrologer.getallAstrologer = async (req) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT id,AstrologerName  FROM astrologer`;
            dbConfig.query(sql, (err, result) => {
                if (!err) {
                    return resolve(result);
                }
                else {
                    return reject(err);
                }
            })
        } catch (err) {
            return reject(err);
        }
    })
}
// astrologer.deleteAstrologer = async (req, res) => {
//     return new Promise((resolve, reject) => {
//         try {
//             var id = req.params.id;
//             const sql = `DELETE FROM astrologer WHERE id = "${id}"`;
//             dbConfig.query(sql, (err, result) => {
//                 if (!err) {
//                     return resolve(result);
//                 }
//                 else {
//                     return reject(err);
//                 }
//             })
//         } catch (err) {
//             return reject(err);
//         }
//     })
// }
module.exports = astrologer;