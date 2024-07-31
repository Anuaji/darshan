const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

require("dotenv").config();

//Cros Origin
const cors = require("cors");
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  method: "GET,HEAD,PUT,PATCH,POST,DELETE",
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());

app.options("*", cors(corsOptions));

const bodyparser = require("body-parser");
const upload = require("express-fileupload");
app.use(upload());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//DB config
var mysqlConnection = require("./database/config");

// =================================for https===========================================
// var fs = require('fs');
// var express = require("express");
// var http = require('http');
// var https = require('https');

// var app = express();
// require("dotenv").config();

// var privateKey  = fs.readFileSync('./cert/site.key', 'utf8');
// var certificate = fs.readFileSync('./cert/site.crt', 'utf8');

// var credentials = {key: privateKey, cert: certificate};

// //Cros Origin
// const cors = require("cors");
// var corsOptions = {
// 	origin: process.env.FRONTEND_URL,
// 	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// 	method: "GET,HEAD,PUT,PATCH,POST,DELETE"
// };
// app.use(cors(corsOptions));

// app.options("*", cors(corsOptions));

// const bodyparser = require("body-parser");
// const upload = require("express-fileupload");
// app.use(upload());
// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({ extended: true }));

// //DB config
// var mysqlConnection = require("./database/config");
// ===============================================================================================

//Import Router URL
var constantname = require("./router/constantName.router");
var about = require("./router/aboutUs.router");
var Temple = require("./router/temple.router");
var Constants = require("./router/constant.router");
var Temple_Event = require("./router/templeevent.router");
var main_god = require("./router/main_god.router");
var businesstype = require("./router/businesstype.router");
var pariharams = require("./router/pariharms.router");
var speciality = require("./router/speciality.router");
var festival = require("./router/festival.router");
var training = require("./router/training.router");
var country = require("./router/country.router");
var state = require("./router/state.router");
var district = require("./router/district.router");
var city = require("./router/city.router");
var home = require("./router/home.router");
var event = require("./router/event.router");
var blog = require("./router/blogs.router");
var livestream = require("./router/livestream.router");
var kulatheaivam = require("./router/kulatheaivam.router");
var languages = require("./router/languages.router");
var UserRegister = require("./router/UserRegister.router");
var contactus = require("./router/contact.router");
var ticket = require("./router/ticket.router");
var users = require("./router/users.router");
var sitemap = require("./router/sitemap.router");
var area = require("./router/area.router");
var vendor = require("./router/vendor.router");
var specification = require("./router/specification.router");
var user = require("./router/vendor-login.routes");
var hoteldetails = require("./router/hoteldetails.router");
var searchdetails = require("./router/advancefilter.router");

var user_register = require("./router/user_register.router");

var vendor_business = require("./router/vendor_business.router");
var shops = require("./router/shops.router");

var categories = require("./router/categories.router");
var trainercategories = require("./router/trainer_categories.router");
var offer = require("./router/offer.router");

var advertisementRouter = require("./router/advertisement.router");
var categoriesListRouter = require("./router/categoriesList.router");
var subCategoriesListRouter = require("./router/subCategoriesList.router");

var iyerRouter = require("./router/iyer.router");
var astrologerRouter = require("./router/astrologersignup.router");
var trainerRouter = require("./router/trainer_register.router");
var iyerbookingRouter = require("./router/iyerbooking.router");
var selectinsidetemple = require("./router/insidetemple.route");
var selectoutsidetemple = require("./router/outsidetemple.router");
var selectfunctiontype = require("./router/functiontype.router");
var anemetiesRouter = require("./router/anemities.router");
var iyerlanguage = require("./router/iyerlanguage.router");
var iyerfunction = require("./router/functionname.router");
var blogeventcategory = require("./router/blogAndEventCategories.router");
var insideFunction = require("./router/functionInsideTheTempleOptionsList.rouer");
var functionOutsideTheTempleOptionsRouter = require("./router/functionOutsideTheTempleOptionsList.router");
var grouprouter = require("./router/grouptable.router");
var registerapproval = require("./router/registerApproval.router");
var templeEventFilter = require("./router/templeeventfilter.router");
var functionsRouter = require("./router/functions.router");
var trainerAdvertismentRouter = require("./router/trainerAdvertisment.router");
var traineroffer = require("./router/trainer-offer.router");
var trainercategoriesList = require("./router/trainercategoriesList.router");
const astrologerBookingRouter = require("./router/astrologerBooking.router");
const trainerCategoryRouter = require("./router/trainercategory.router");
const trainerSubcategoryListRouter = require("./router/trainerSubCategoryList.router");
const priestFunctionRouter = require("./router/priestFunction.router");
const eventTypeRouter = require("./router/eventType.router");
const bookingFieldsRouter = require("./router/bookingFields.router");
const communityRouter = require("./router/community.router");
const loginRouter = require("./router/login.router");
const trainerclasslist = require("./router/trainerclasslist.router");
const communityTempleRouter = require("./router/communityTemple.router");
const yatraBookingRouter = require("./router/yatra.router");
// const roomBookingRouter = require("./router/roomBooking.router");

const trainer_trainerlist = require("./router/trainer_trainerlist.router");
const guide_register = require("./router/guide_register.router");
// const communityParentRouter = require("./router/community-parent.router");
const forgotpassword = require("./router/forgotpassword.router");
//templeservice
const templeServiceVendor = require("./router/templeservice.router");
const trainerCourse = require("./router/trainercourse.router");
//end
const Pooja = require("./router/pooja.router");
const Inauspicious = require("./router/Inauspiciousevent");

const guidelist = require("./router/guidelist.router");
const guide_guidelist = require("./router/guide_guidelist.router");
const yatraBookingRouters = require("./router/YatraBooking.router");
const AddNewTemple = require("./router/AddNewTempleRouter");


const hotelBookingRouters = require("./router/HotelBooking.router");
const subGroupRouters = require("./router/subGroupRouter");
const DilapidateTempleRouters = require("./router/DilapateTemple.router");

app.get("/logout", (req, res) => {
  res
    .cookie("jwt", "", { maxAge: 1, httpOnly: true })
    .json({ status: "logout" });
});

//Import routes
app.use("/course", trainerCourse);
app.use("/about", about);
app.use("/constantname", constantname);
app.use("/temple", Temple);
app.use("/Constants", Constants);
app.use("/Temple_Event", Temple_Event);
app.use("/main_god", main_god);
app.use("/businesstype", businesstype);
app.use("/pariharams", pariharams);
app.use("/speciality", speciality);
app.use("/festival", festival);
app.use("/training", training);
app.use("/trainerclasslist", trainerclasslist);
app.use("/trainer_trainerlist", trainer_trainerlist);
app.use("/pooja", Pooja);
app.use("/inauspicious", Inauspicious);
app.use("/guidelist", guidelist);
app.use("/guide_guidelist", guide_guidelist);
app.use("/country", country);
app.use("/state", state);
app.use("/district", district);
app.use("/city", city);
app.use("/home", home);
app.use("/event", event);
app.use("/blog", blog);
app.use("/livestream", livestream);
app.use("/kulatheaivam", kulatheaivam);
app.use("/languages", languages);
app.use("/contactus", contactus);
app.use("/ticket", ticket);
app.use("/users", users);
app.use("/siteMap", sitemap);
app.use("/area", area);
app.use("/specification", specification);
app.use("/vendor", vendor);
app.use("/user", user);
app.use("/hoteldetails", hoteldetails);
app.use("/searchdetails", searchdetails);
app.use("/user_register", user_register);
app.use("/userRegister", UserRegister);
app.use("/vendor_business", vendor_business);
app.use("/shops", shops);
app.use("/categories", categories);
app.use("/trainerCategories", trainercategories);
app.use("/offer", offer);
app.use("/advertisement", advertisementRouter);
app.use("/categoriesList", categoriesListRouter);
app.use("/subCategoriesList", subCategoriesListRouter);
app.use("/iyer", iyerRouter);
app.use("/astrologer", astrologerRouter);
app.use("/trainer", trainerRouter);
app.use("/iyerbooking", iyerbookingRouter);
app.use("/yatrabook", yatraBookingRouters);
app.use("/roombook", hotelBookingRouters);
app.use("/subGrroup", subGroupRouters);
app.use("/dilapidated", DilapidateTempleRouters);
app.use("/insidetemple", selectinsidetemple);
app.use("/outsidetemple", selectoutsidetemple);
app.use("/selectfunctiontype", selectfunctiontype);
app.use("/amemities", anemetiesRouter);
app.use("/iyerlanguage", iyerlanguage);
app.use("/iyerfunction", iyerfunction);
app.use("/blogeventcategory", blogeventcategory);
app.use("/insidefunction", insideFunction);
app.use("/functionOutsideTemple", functionOutsideTheTempleOptionsRouter);
app.use("/grouptable", grouprouter);
app.use("/approval", registerapproval);
app.use("/TempleDetailsPage", categories);
app.use("/templeevent", templeEventFilter);
app.use("/functions", functionsRouter);
app.use("/trainerAdvertisment", trainerAdvertismentRouter);
app.use("/traineroffer", traineroffer);
app.use("/astrologerBooking", astrologerBookingRouter);
app.use("/trainercategory", trainerCategoryRouter);
app.use("/trainercategoriesList", trainercategoriesList);
app.use("/astrologerBooking", astrologerBookingRouter);
app.use("/trainerSubCategoryList", trainerSubcategoryListRouter);
app.use("/priestFunction", priestFunctionRouter);
app.use("/eventType", eventTypeRouter);
app.use("/booking", bookingFieldsRouter);
app.use("/community", communityRouter);
app.use("/login", loginRouter);
app.use("/communityTemple", communityTempleRouter);
app.use("/yatraBooking", yatraBookingRouter);
app.use("/AddNewTemple",AddNewTemple );

// app.use("/roomBooking", roomBookingRouter);

// app.use("/communityParent", communityParentRouter);
app.use("/password", forgotpassword);
app.use("/guideregister", guide_register);
//templeservices
app.use("/vendor", templeServiceVendor);

// Make Images "Uploads" Folder Publicly Available
app.use("/public", express.static("public"));
const port = process.env.PORT;

const notification = () => {
  const public_key =
    "BPrHMpoZeIplKBoIpR96PsNf5su7xs9W5RKfzBYGvazIeHmrfeuOgVdVx8MZLUIOX7EPgkY16Tcceom4eA0v8Bw";
  const private_key = "ET6R36dK1TtzKZvdiI5zvM2jMGb-umfTtj4a5E-PEco";
};

app.listen(port, () => console.log(`Listening on port ${port}..`));
