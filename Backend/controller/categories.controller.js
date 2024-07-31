const dbConfig = require("../database/config");

const create = async (req, res) => {
  try {
    let result;
    const listItems = [];
    let filename;
    let mv;
    let businessPhoto;

    // const vendor_id = req.body.vendorId;
    const companyName = req.body.companyName;
    const description = req.body.description;
    const categories = req.body.Categories;
    const subCategories = req.body.SubCategories;

    const emailId = req.body.emailId || "";
    const websiteLink = req.body.websiteLink || "";
    const regularPrice = req.body.regularPrice;
    const discountPrice = req.body.discountPrice;
    const country = req.body.country;
    const state = req.body.state;
    const district = req.body.district;
    const city = req.body.city;
    // const area = req.body.area;
    // const tags = req.body.tags;
    // const address = req.body.address;
    var array_temple_distance = req.body.templedistance;
    // const templeDistance = array_temple_distance.replace(/"/g, "'");

    // if(req.files === undefined){
    //   res.status(400).send("Please Upload a photo");
    // }
    // else if(req.files !== undefined){
    //   if(req.files['businessPhoto']){
    //    filename =  Date.now()+"-"+req.files['businessPhoto']['name'];
    //    mv = req.files['businessPhoto']['mv'];
    //    listItems.push('/public/categoriesImages/'+filename);
    //   mv('./public/categoriesImages/'+filename,err=>{
    //     if (err) res.status(500).send(err);

    //   })
    //   businessPhoto = listItems;
    //   }else if (req.body.businessPhoto){
    //     businessPhoto = req.body.businessPhoto;

    //   }else{
    //     businessPhoto = ''
    //   }
    // }else if(req.body.businessPhoto){
    //   businessPhoto =  req.body.businessPhoto;
    // } else {
    //   businessPhoto = '';
    // }

    const sql = `INSERT INTO categories (CompanyName,Description,Categories,
    EmailId,WebsiteLink,RegularPrice,DiscountPrice,Country,State,District,
    City,SubCategories) VALUES("${companyName}","${description}","${categories}","${emailId}",
      "${websiteLink}","${regularPrice}","${discountPrice}","${country}","${state}","${district}",
      "${city}","${subCategories}")`;
    console.log("sql", sql);
    dbConfig.query(sql, function (err, rows) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(rows);
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

const getTopVendorCategories = async (req, res) => {
  try {
    const sql = `SELECT categories.id,categories.vendor_id,categories.CompanyName,categories.Description,
   categories.Categories,categories.SubCategories,categories.EmailId,categories.WebsiteLink,
   categories.RegularPrice,categories.DiscountPrice,categories.Country,categories.State,
   categories.District,categories.City,categories.area,categories.Tags,categories.businessPhoto,
   categories.TempleDistance,vendors.post,city.city as cityname,subcategorylist.subCategoryName FROM categories LEFT JOIN vendors ON categories.vendor_id=vendors.vendor_id LEFT JOIN city ON city.id=categories.City
   LEFT JOIN subcategorylist ON subcategorylist.subCategoryId=categories.SubCategories WHERE vendors.post=1;`;
    dbConfig.query(sql, (err, rows) => {
      if (!err) res.status(200).send(rows);
      else {
        console.log("Error!:", err);
        res.status(500).send("failed to fetch top vendors list");
      }
    });
  } catch (err) {
    if (err) {
      res.status(500).send("failed to fetch top vendors list");
    }
  }
};

const selectAllCategoriesWithId = async vendorId => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `SELECT * FROM categories LEFT JOIN categorieslist ON categories.Categories=categorieslist.categoryId LEFT JOIN subcategorylist ON categories.SubCategories=subcategorylist.subCategoryId WHERE vendor_id="${vendorId}"`;
      dbConfig.query(sql, (err, result) => {
        if (err) {
          console.log("Error!", err);
          return reject({ status: 500, message: "Failed to get categories" });
        } else if (result.length != 0) {
          return resolve(result);
        }
      });
    } catch (e) {
      console.log("Error!", e);
      return reject(e);
    }
  });
};

const deleteCategory = async categoryId => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `DELETE FROM categories WHERE vendor_id="${categoryId}"`;
      dbConfig.query(sql, (err, result) => {
        if (err) {
          console.log("err!", err);
          return reject({ status: 404, message: "Not Found" });
        } else {
          return resolve(result);
        }
      });
    } catch (e) {
      return reject(e);
    }
  });
};

const updateCategory = async req => {
  return new Promise((resolve, reject) => {
    try {
      var comapanyName = req.body.companyName;
      var description = req.body.description;
      var emailId = req.body.emailId;
      var websiteLink = req.body.websiteLink;
      var regularPrice = req.body.regularPrice;
      var discountPrice = req.body.discountPrice;

      var sql = `UPDATE categories SET CompanyName="${comapanyName}",Description="${description}",EmailId="${emailId}",WebsiteLink="${websiteLink}",RegularPrice="${regularPrice}",DiscountPrice="${discountPrice}" WHERE id=${req.params.categoriesId}`;
      dbConfig.query(sql, (err, result) => {
        if (!err) {
          return resolve(result);
        } else {
          return reject(err);
        }
      });
    } catch (e) {
      return reject(e);
    }
  });
};
const selectAllCategoriesWithFilter = async req => {
  return new Promise((resolve, reject) => {
    try {
      var state = req.body.stateId;
      var district = req.body.districtId;
      var city = req.body.cityId;
      var subCategories = req.body.subCategoriesId;
      const sql = `SELECT
     categories.id as CategoriesId,categories.CompanyName as CompanyName, categories.Description as Description,categories.businessPhoto as businessPhoto,categorieslist.categoryName as categoryName,subcategorylist.subCategoryName as subcategoryName,states.state as state,districts.district as district,city.city as city FROM categories LEFT JOIN states on states.id=categories.State LEFT JOIN city ON city.id=categories.City
     LEFT JOIN districts on districts.id=categories.District LEFT JOIN subcategorylist ON subcategorylist.subCategoryId=categories.SubCategories
     LEFT JOIN categorieslist ON categorieslist.categoryId =categories.Categories WHERE categories.State ="${state}"and categories.District="${district}" and categories.City ="${city}" and categories.SubCategories="${subCategories}"`;

      dbConfig.query(sql, (err, result) => {
        if (!err) {
          return resolve(result);
        } else {
          return reject(err);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};

const selectAllCategoriesWithSpecifiedSubcategoryListId = async req => {
  return new Promise((resolve, reject) => {
    try {
      var subCategoryListId = req.params.subCategoryListId;
      const sql = `SELECT categories.id as CategoriesId,categories.CompanyName as CompanyName, categories.Description as Description,categories.businessPhoto as businessPhoto,categorieslist.categoryName as categoryName,
     subcategorylist.subCategoryName as subcategoryName,states.state as state,districts.district as district,city.city as city FROM categories LEFT JOIN states on states.id=categories.State
     LEFT JOIN city ON city.id=categories.City LEFT JOIN districts on districts.id=categories.District LEFT JOIN subcategorylist ON subcategorylist.subCategoryId=categories.SubCategories
      LEFT JOIN categorieslist ON categorieslist.categoryId =categories.Categories WHERE categories.SubCategories='${subCategoryListId}';`;

      dbConfig.query(sql, (err, result) => {
        if (!err) {
          return resolve(result);
        } else {
          return reject(err);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};

const getCategoriesDetails = async req => {
  return new Promise((resolve, reject) => {
    try {
      var postStatus = req.params.vendorpost;
      var categoryId = req.params.categoryid;
      const sql = `SELECT categories.id as vendorCategoryId,categories.vendor_id as VendorId,categories.CompanyName as CompanyName,categories.Description as Description,
    categorieslist.categoryName as VendorCategoryName ,subcategorylist.subCategoryName as VendorSubCategoryName,categories.EmailId as EmailId,categories.WebsiteLink as WebsiteLink,
    categories.RegularPrice as RegularPrice,categories.DiscountPrice as DiscountPrice,countries.country as CountryName,states.state as StateName,
   districts.district as DistrictName,city.city as CityName,area.area_name as AreaName,categories.Tags,categories.businessPhoto,
    categories.TempleDistance,vendors.vendor_name as VendorName ,vendors.phone_number as PhoneNumber FROM categories
    LEFT JOIN vendors ON categories.vendor_id=vendors.vendor_id
    LEFT JOIN subcategorylist ON subcategorylist.subCategoryId=categories.SubCategories
    LEFT JOIN categorieslist ON categories.Categories=categorieslist.categoryId
    LEFT JOIN countries ON categories.Country=countries.id
    LEFT JOIN states ON categories.State=states.id
    LEFT JOIN districts ON categories.District = districts.id
    LEFT JOIN city ON city.id=categories.City
    LEFT JOIN area ON categories.area=area.area_id
    WHERE vendors.post=('${postStatus}') and categories.id=('${categoryId}');`;

      dbConfig.query(sql, (err, result) => {
        if (!err) {
          return resolve(result);
        } else {
          return reject(err);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};

const getSingleCategories = async req => {
  return new Promise((resolve, reject) => {
    try {
      var category_Id = req.params.categoryId;
      const sql = `SELECT * FROM categories WHERE id = '${category_Id}'`;
      dbConfig.query(sql, (err, result) => {
        if (!err) {
          return resolve(result);
        } else {
          return reject(err);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};
const getSingleCategoryWithSearchFilter = async (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      var categoryId = req.params.categoryId;
      var stateId = req.params.stateId;
      var districtId = req.params.districtId;
      var cityId = req.params.cityId;
      var subcategoryListId = req.params.subcategoryListId;
      const sql = `SELECT categories.id as categoryId,categories.vendor_id as vendor_id,categories.CompanyName as CompanyName,categories.Description as Description,categories.EmailId as EmailId,categories.WebsiteLink as WebsiteLink,categories.RegularPrice
   as RegularPrice,categories.DiscountPrice as DiscountPrice,categories.address as address,categories.Tags as Tags,categories.businessPhoto as businessPhoto,categories.TempleDistance as TempleDistance,categories.Categories as Categories,categories.SubCategories as SubCategories,categories.Country as countryID,countries.country as countryName,subcategorylist.subCategoryName as subcategoryname,categories.State as stateID,states.state as stateName,categories.District as districtID,districts.district as districtName,categories.SubCategories as subcategoryId,categories.city as cityID,city.city as cityName,categories.area as areaID,area.area_name as areaName,vendors.vendor_name,vendors.phone_number FROM Categories LEFT JOIN countries ON categories.Country=countries.id LEFT JOIN states ON categories.State=states.id LEFT JOIN districts ON categories.District=districts.id LEFT JOIN city ON categories.City=city.id  LEFT JOIN area ON categories.area=area.area_id LEFT JOIN subcategorylist ON categories.SubCategories=subcategorylist.subCategoryId LEFT JOIN vendors ON categories.vendor_id=vendors.vendor_id WHERE categories.id='${categoryId}' and categories.State ='${stateId}' and categories.District='${districtId}' and categories.City ='${cityId}'and categories.SubCategories='${subcategoryListId}'`;
      dbConfig.query(sql, (err, result) => {
        if (!err) {
          return resolve(result);
        } else {
          return reject(err);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};
const getSubcategoriesBasedonVendorid = async (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      var vendor_id = req.params.vendorId;
      var subCategoriesId = req.params.subCategoriesId;
      const sql = `SELECT * FROM categories WHERE vendor_id="${vendor_id}" AND SubCategories="${subCategoriesId}"`;
      dbConfig.query(sql, (err, result) => {
        if (!err) {
          return resolve(result);
        } else {
          return reject(err);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};
const getCountSubcategories = async (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      var vendor_id = req.params.vendorId;
      const sql = `SELECT COUNT(*) as NoOfBusiness FROM categories WHERE vendor_id="${vendor_id}"`;
      dbConfig.query(sql, (err, result) => {
        if (!err) {
          return resolve(result);
        } else {
          return reject(err);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};
const getAllCategoriesData = async (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `SELECT * FROM categories`;
      dbConfig.query(sql, (err, result) => {
        if (!err) {
          return resolve(result);
        } else {
          return reject(err);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};
module.exports = {
  create,
  getCountSubcategories,
  getSingleCategoryWithSearchFilter,
  getTopVendorCategories,
  selectAllCategoriesWithId,
  deleteCategory,
  updateCategory,
  selectAllCategoriesWithFilter,
  getCategoriesDetails,
  getSingleCategories,
  selectAllCategoriesWithSpecifiedSubcategoryListId,
  getSubcategoriesBasedonVendorid,
  getAllCategoriesData,
};
