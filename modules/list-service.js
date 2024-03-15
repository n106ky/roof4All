require("dotenv").config();
const moment = require("moment");

// Import the User model
const authData = require("./auth-service");

const { connectToDatabase, mongoose } = require("./dbConnection");

let Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// keep it simple for now, do not need to verify listing at this stage.
let propertySchema = new Schema({
  host: { type: ObjectId, ref: "Host" }, // host - user is one-to-one relationship.
  user: { type: ObjectId, ref: "User" }, // host = user, provide different way to search. Easier to code.
  tenant: { type: ObjectId, red: "User" },
  propertyName: { type: String },
  address: {
    addressline1: {type: String},
    addressline2: {type: String},
    city: {type: String},
    zipCode: {type: String},
  },
  duration_start: { type: Date },
  duration_end: { type: Date },
  listing_price: {
    no_of_rooms: { type: Number },
    price_space: { type: Number },
  },
  amenities: {
    individual_space_size: { type: Number },
    no_bathrooms: { type: Number },
    no_parking: { type: Number },
    pet_allowed: { type: Boolean },
  },
  policies: { type: String },
  img_url: [{ type: String }],
  list_date: { type: Date, default: Date.now },
  interest: { type: String },
  status: { type: Boolean }, // active vs inactive
  current_guest_no: { type: Number },
  current_room_avaliable: { type: Number },
});

let rentSchema = new Schema({
  host: { type: ObjectId, ref: "Host" },
  host_user: { type: ObjectId, ref: "User" },
  tenant: { type: ObjectId, red: "User" },
  guests: [{ type: ObjectId, red: "User" }], // will be assigned when employee assigned guest
  propertyName: { type: String },
  address: { type: String },
  no_of_rooms: { type: Number },
  individual_space_size: { type: Number },
  price_space: { type: Number },
  rent_date: { type: Date, default: Date.now },
  rent_due: { type: Date},
  space_rented: { type: Number },
  allocated: { type: Number },
  status: { type: Boolean }, // active vs inactive
});

let Property, Rent;

async function initialize() {
  try {
    const db = await connectToDatabase("list-service");
    Property = db.model("Property", propertySchema);
    Rent = db.model("Rent", rentSchema);
    // List = db.model("List", listSchema);
  } catch (error) {
    console.error("Service initialization failed", error);
    process.exit(1);
  }
}

async function postProperty(userID, propData) {
  try {
    // get data from req.body, push to db - list
    console.log("postProperty RECEIVED: \n", propData);
    const newList = new Property({
      propertyName: propData.propertyName,
      address: propData.address,
      room_size_sqft: propData.room_size_sqft,
      duration_start: propData.duration_start,
      duration_end: propData.duration_end,
      listing_price: {
        no_of_rooms: propData.listing_price.no_of_rooms,
        price_space: propData.listing_price.price_space,
      },
      amenities: {
        individual_space_size: propData.amenities.individual_space_size,
        no_bathrooms: propData.amenities.no_bathrooms,
        no_parking: propData.amenities.no_parking,
        pet_allowed: propData.amenities.allowed,
      },
      policies: propData.policies,
      img_url: propData.img_url,
      interest: propData.interest,
      current_guest_no: propData.listing_price.no_of_rooms,
      current_room_avaliable: propData.listing_price.no_of_rooms,
    });
    // console.log("New list: \n", newList);
    propData.status == "on"
      ? (newList.status = true)
      : (newList.status = false);

    await newList.save();

    // list -> properties.
    let user = await authData.getUser(userID);
    let host = await authData.getHost(user.typeID);
    // console.log("host found: \n", host, "\nnewList.id: \n", newList._id);
    host.property.push(newList._id);
    await host.save();

    newList.host = host._id;
    newList.user = user._id;
    await newList.save();

    return host;
  } catch (err) {
    console.log(`(postProperty) Error in creating new list: ${err}`);
    return null;
  }
}

async function getHostProperties(userID) {
  try {
    const user = await authData.getUser(userID);
    const host = await authData.getHost(user.typeID);
    if (host.property.length == 0) {
      return null;
    } else {
      const properties = host.property; // array of propertyID
      const propDetails = await Promise.all(
        properties.map(async (p) => {
          return getPropertyDetails(p); // returns a promise
        })
      );
      propDetails.forEach((p) => {
        // console.log(p._id, typeof(p._id));
        p.shortened_id = p._id.toString().substr(0, 7);
        p.transformed_listDate = moment(p.list_date).format(
          "MMM D, YYYY hh:mm A"
        );
      });
      return propDetails;
    }
  } catch (err) {
    console.log(`(getHostProperties) Error in getting host properties: ${err}`);
    return null;
  }
}

async function getPropertyDetails(propertyID) {
  try {
    let properties = await Property.findOne({ _id: propertyID });
    return properties;
  } catch (err) {
    console.error("(getPropertyDetails) Error finding property's details", err);
    return null;
  }
}

async function getAllProperties() {
  try {
    let properties = await Property.find({});
    return properties;
  } catch (err) {
    console.error("(getAllProperties) Error finding all properties", err);
    return null;
  }
}

async function rentSpace(propID, tenantID) {
  console.log(
    "received propID: \n",
    propID,
    "\nreceived tenantID: \n",
    tenantID
  );
  try {
    let tenant = await authData.getUser(tenantID);
    if (!tenant.rentedSpaces) {
      tenant.rentedSpaces = [propID];
    } else {
      tenant.rentedSpaces.push(propID);
    }
    await tenant.save();
    let prop = await Property.findOne({ _id: propID });
    const newRent = new Rent({
      host: prop.host,
      host_user: prop.user,
      tenant: tenantID,
      propertyName: prop.propertyName,
      address: prop.address,
      rent_due: prop.duration_end,
      price_space: prop.listing_price.price_space,
      individual_space_size: prop.individual_space_size,
      status: true,
    });
    await newRent.save();
  } catch (err) {
    console.error("(rentSpace) Error finding renting spaces", err);
    return null;
  }
}

async function getRentalsByTenant(tenantID) {
  try {
    let rentals = await Rent.find({ tenant: tenantID });
    return rentals;
  } catch (err) {
    console.error("(getRentalsByTenant) Error finding all retnals", err);
    return null;
  }
}

module.exports = {
  initialize,
  postProperty,
  getAllProperties,
  getHostProperties,
  getPropertyDetails,
  rentSpace,
  getRentalsByTenant,
};
