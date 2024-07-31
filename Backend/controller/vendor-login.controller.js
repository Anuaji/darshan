const db = require("../index");
const vendors = db.vendors;
const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}
var emitter = new MyEmitter();

exports.findOne = (req, res) => {
	const id = req.params.id;

	vendors
		.findByid({ where: condition })
		.then((data) => {
			res.send(data);
			emitter.on("emitter", function() {
				emitter.emit(data);
			});
		})
		.catch((err) => { 
			res.status(500).send({
				message: "error retreving User with id=" + id
			});
		});
};
