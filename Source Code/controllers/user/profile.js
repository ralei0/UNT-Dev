const bcrypt = require('bcryptjs');
const Profile = require('../../models/Profile');


exports.createProfile = (req, res, next) => {
    res.render('user/profile', {
        pageTitle: 'Profile',

    });
};

exports.createProfile2 = (req, res, next) => {
    const userId = req.body.userId;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const age = req.body.age;

    const gender = req.body.gender;
    //const profilePicture = req.body.profilePicture;
    const websiteLink = req.body.websiteLink;
    const youtubeLink = req.body.youtubeLink;
    const addressLine1 = req.body.addressLine1;
    const addressLine2 = req.body.addressLine2;
    const city = req.body.city;
    const state = req.body.state;
    const country = req.body.country;
    const pincode = req.body.pincode;
    const bio = req.body.bio;

    // const name = req.body.name;
    // const email = req.body.email;
    // const password = req.body.password;
    // const password2 = req.body.password2;
    // const time = new Date().toISOString().split('T')[0];

    const newProfile = new Profile({ //instance of the user model
        userId,
        firstName,
        lastName,
        age,
        gender,
        //profilePicture,
        websiteLink,
        youtubeLink,
        addressLine1,
        addressLine2,
        city,
        state,
        country,
        pincode,
        bio


        // name,
        // email,
        // password,
        // time
    });
    newProfile.save()
        .then(user => {
            req.flash('success_msg', 'Profile Saved Successfully!');
            res.redirect('/profile');
        })
        .catch((err) => { //console.log(err)
            req.flash('error_msg', 'Something wrong happend.');
            res.redirect('/home');
        });
}