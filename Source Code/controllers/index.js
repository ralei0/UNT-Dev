const Product = require('../models/Product');


exports.getIndex = (req, res, next) => {

    Product.find()
        .then(products => {

            res.render('index', {
                product: products,
                pageTitle: 'Index',
            });
        })
        .catch((err) => { //console.log(err)
            req.flash('error_msg', 'Something wrong happend.');
            req.redirect('/home');
        });

}
