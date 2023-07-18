import asyncHandler from "express-async-handler";
import Contacts from "../model/Contacts.js"
import User from "../model/User.js";

export const createNewContactCtrl = asyncHandler(async(req, res)=> {
    const {firstName, lastName, email, company, linkedIn, phone, occupation} = req?.body;
    const user = await User.findById(req?.userAuthId);


    const contact = await Contacts.create({
        user: user?._id,
        firstName,
        lastName,
        email: email?? "",
        company: company??"",
        linkedIn: linkedIn??"",
        phone: phone??"",
        occupation: occupation??""
    })
    user.contacts.push(contact?._id);
    await user.save();

    res.status(201).json({
        status: 'success',
        message: 'Contact created successfully',
        contact
    })
})

export const getAllContactsCtrl = asyncHandler(async(req, res)=>{
    const contacts = await Contacts.find({user: req?.userAuthId}).populate("user");
    res.json({
        success: true,
        message: "All contacts",
        contacts,
      })
})



export const getSingleContactCtrl = asyncHandler(async (req, res) => {
    //get the id from params
    const id = req.params.id;
    const contact = await Contacts.findById(id).populate("user");
    //send response
    res.status(200).json({
      success: true,
      message: "Single contact",
      contact,
    })
})

export const updateContactCtrl = asyncHandler(async(req, res)=> {
    const {firstName, lastName, email, company, linkedIn, phone, occupation} = req?.body; 
    const contact = await Contacts.findByIdAndUpdate(
        req.params.id,
        {
            firstName, lastName, email, company, linkedIn, phone, occupation

        },
        {
            new: true,
            runValidators: true
        },
    )
    if (!contact) {
        return res.status(404).json({
          status: "error",
          message: "Contact not found",
        });
    }
    res.json({
        status: "success",
        message: "contact updated successfully",
        contact
      });
})

export const deleteContactCtrl = asyncHandler(async (req, res) => {
    const id = req?.params?.id;
    const contact = await Contacts.findById(id)

    if(!contact){
        throw new Error("Contact not found")
    }

    await Contacts.findByIdAndDelete(id)
    
    await User.findOneAndUpdate(
        { _id: contact.user.toString() },
        { $pull: { contacts: id } }
    )   

    const updatedUser = await User.findById(contact.user).populate("contacts");

    res.json({
        status: "success",
        message: "Contact deleted successfully",
        updatedUser
    });
});
      

