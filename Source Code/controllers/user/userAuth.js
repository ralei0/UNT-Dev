const bcrypt = require('bcryptjs');
const User = require('../../models/User');


exports.getLogin = (req, res, next) => {

    res.render('user/login', {
        pageTitle: 'Login',
    });

};

exports.getRegister = (req, res, next) => {
    res.render('user/register', {
        pageTitle: 'Register',
    });

};



exports.postRegister = (req, res, next) => {


    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;
    const time = new Date().toISOString().split('T')[0];

    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ msg: "Please fill all the fields." });
    }

    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 5) {
        errors.push({ msg: 'Passwords should be atleast 6 characters' });
    }

    if (errors.length > 0) {
        res.render('user/register', {
            pageTitle: 'Register',
            errors,
            name,
            email,
            password,
            password2

        });
    } else {
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    errors.push({ msg: 'User is already resisterd with this email.' });
                    res.render('user/register', {
                        pageTitle: 'Register',
                        errors,
                        name,
                        email,
                        password,
                        password2

                    });
                } else {
                    const cart = {};
                    const newUser = new User({ //instance of the user model
                        name,
                        email,
                        password,
                        cart,
                        time
                    });

                    //hasing password and saving user in database
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err)
                                throw err;

                            newUser.password = hash;

                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You are registered Successfully!');
                                    res.redirect('/login');
                                })
                                .catch((err) => { //console.log(err)
                                    req.flash('error_msg', 'Something wrong happend.');
                                    res.redirect('/home');
                                });
                        })
                    });
                }
            })
            .catch((err) => { //console.log(err)
                req.flash('error_msg', 'Something wrong happend.');
                res.redirect('/home');
            });
    }




};

exports.postLogin = async(req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                req.flash('error_msg', 'This is not registerd email Id.');
                return res.redirect('/login');
            }
            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isUserLoggedIn = true;
                        req.session.user = user;

                        return req.session.save(err => {
                            res.redirect('/home');
                        });
                    }
                    req.flash('error_msg', 'Wrong Password.');
                    res.redirect('/login');
                })
                .catch(err => {
                    //console.log(err);
                    req.flash('error_msg', 'Something wrong happened , please retry again.');
                    res.redirect('/login');
                });
        })
        .catch((err) => { //console.log(err)
            req.flash('error_msg', 'Something wrong happend.');
            res.redirect('/home');
        });

};


exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        //console.log(err);
        res.redirect('/');
    });
};