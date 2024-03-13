require("dotenv").config();

// Import the User model
const authData = require('./auth-service');

const { connectToDatabase, mongoose } = require("./dbConnection");

let Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// keep it simple for now, do not need to verify listing at this stage.
let propertySchema = new Schema({ 
  host: { type: ObjectId, ref: "Host" },
  propertyName: { type: String },
  address: { type: String },
  room_size_sqft: { type: Number },
  no_of_rooms: { type: Number },
  no_of_guest: { type: Number },
  price: { type: Number },
  price_space: { type: Number },
  duration_start: { type: Date },
  duration_end: { type: Date },
  amenities: { type: String },
  policies: { type: String },
  img_url: [{ type: String }],
  status: { type: Boolean }, // active vs inactive
});

let Property;
// let List;

async function initialize() {
  try {
    const db = await connectToDatabase("list-service");
    Property = db.model("Property", propertySchema);
    // List = db.model("List", listSchema);
  } catch (error) {
    console.error("Service initialization failed", error);
    process.exit(1);
  }
}

async function postProperty(userID, propData) {
  try {
    // get data from req.body, push to db - list
    const newList = new Property({
      propertyName: propData.propertyName,
      address: propData.address,
      room_size_sqft: propData.room_size_sqft,
      no_of_rooms: propData.no_of_rooms,
      no_of_guest: propData.no_of_guest,
      price: propData.price,
      duration_start: propData.duration_start,
      duration_end: propData.duration_end,
      amenities: propData.amenities,
      policies: propData.policies,
      img_url: propData.img_url,
    });
    // console.log("New list: \n", newList);
    newList.price_space = +(propData.price / propData.no_of_rooms).toFixed(2);
    propData.status == 'on'? newList.status = true: newList.status = false;
    await newList.save();

    // list -> properties.
    let user = await authData.getUser(userID);
    let host = await authData.getHost(user.roleID);
    // console.log("host found: \n", host, "\nnewList.id: \n", newList._id);
    host.property.push(newList._id);
    await host.save();

  } catch (err) {
    console.log(`(postProperty) Error in creating new list: ${err}`);
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
  getAllProperties,
  postProperty,
};
