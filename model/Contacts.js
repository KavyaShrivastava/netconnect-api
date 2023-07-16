import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ContactsSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String, 
        required: true
    },
    email:{
        type: String
    },
    linkedIn: {
        type: String
    },
    company: {
        type: String
    },
    phone: {
        type: String
    },
    occupation: {
        type:String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
})


const Contacts = mongoose.model("Contacts", ContactsSchema)

export default Contacts;