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

async function initialize() {
  try {
    const db = await connectToDatabase("list-service");
    Property = db.model("Property", propertySchema);
  } catch (error) {
    console.error("Service initialization failed", error);
    process.exit(1);
  }
}

async function getAllProperties() {
  try {
    let properties = await Property.findAll({});
    return properties;
  } catch (err) {
    console.error("Error finding properties", err);
    return null;
  }
}

module.exports = {
  initialize,
  getAllProperties
};