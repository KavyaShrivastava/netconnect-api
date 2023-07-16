import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String, 
        required: true
    },
    contacts: [{
        type: mongoose.Schema.ObjectId,
        ref: "Contacts"
    }],
    reminders: [{
        type: mongoose.Schema.ObjectId,
        ref: "Reminders"
    }],
    isAdmin: [{
        type: Boolean, 
        default: false,
    }]

}, {
    timestamps: true,
});

//compile the schema to model

const User = mongoose.model("User", UserSchema)

export default User;