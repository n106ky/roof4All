require("dotenv").config();

const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let propertySchema = new Schema({
  propertyName: { type: String },
  address: { type: String },
  room_size_sqft: { type: Number },
  no_of_rooms: { type: Number },
  no_of_guest: { type: Number },
  host: { type: ObjectId, ref: "Host" },
  duration_start: { type: Date },
  duration_end: { type: Date },
  amenities: { type: String },
  policies: { type: String },
  img_url: { type: String },
});

let Property;

// function initialize() {
//   return new Promise(function (resolve, reject) {
//     // let db = mongoose.createConnection(process.env.MONGODB);
//     let db = mongoose.createConnection("mongodb+srv://r4a_admin:kxGoJtwA8WdlNF6v@roof4all.cwys7ka.mongodb.net/?retryWrites=true&w=majority&appName=roof4all");
//     db.on("error", (err) => {
//       reject(err);
//     });
//     db.once("open", () => {
//       User = db.model("users", userSchema);
//       resolve();
//       console.log(`Connection Successful: Connected to MongoDB.`);
//     });
//   });
// }
