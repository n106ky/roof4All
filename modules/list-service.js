require("dotenv").config();

const { connectToDatabase, mongoose } = require("./dbConnection");

let Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

let listSchema = new Schema({
  host: { type: ObjectId, ref: "Host" },
  propertyName: { type: String },
  address: { type: String },
  room_size_sqft: { type: Number },
  no_of_rooms: { type: Number },
  no_of_guest: { type: Number },
  price_space: { type: Number },
  duration_start: { type: Date },
  duration_end: { type: Date },
  amenities: { type: String },
  policies: { type: String },
  img_url: [{ type: String }],
});

let propertySchema = new Schema({
  host: { type: ObjectId, ref: "Host" },
  properties: [listSchema],
  status: { type: Boolean }, // active vs inactive
});

let List, Property;

async function initialize() {
  try {
    const db = await connectToDatabase("list-service");
    Property = db.model("Property", propertySchema);
    List = db.model("List", listSchema);
  } catch (error) {
    console.error("Service initialization failed", error);
    process.exit(1);
  }
}

function postProperty(userID, propData) {}

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
  getAllProperties,
};
