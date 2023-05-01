const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profileSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,

    },
    lastName: {
        type: String,
        required: true,

    },
    age: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    // profile_picture: {
    //     type: Object,
    //     required: true,
    // },
    websiteLink: {
        type: String,
        required: true,
    },
    youtubeLink: {
        type: String,
        required: true,
    },
    addressLine1: {
        type: String,
        required: true,
    },

    addressLine2: {
        type: String,
        required: true,
    },

    city: {
        type: String,
        required: true,
    },

    state: {
        type: String,
        required: true,
    },


    country: {
        type: String,
        required: true,
    },

    pincode: {
        type: String,
        required: true,
    },

    bio: {
        type: String,
        required: true,
    },




    // name: {
    //     type: String,
    //     required: true,
    // },
    // email: {
    //     type: String,
    //     required: true,
    // },
    // password: {
    //     type: String,
    //     required: true,
    // },

    // time: {
    //     type: String,
    //     required: true,
    // }


});






module.exports = mongoose.model('Profile', profileSchema);