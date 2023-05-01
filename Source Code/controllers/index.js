const Product = require('../models/Product');
const Order = require('../models/Order');

exports.getIndex = (req,res,next) => {
   
    Product.find()
    .then(products => {
            
            res.render('index',{
            product:products,
            pageTitle:'Index',
        });
    })
    .catch((err) =>{//console.log(err)
        req.flash('error_msg','Something wrong happend.');
        req.redirect('/home');
        });

}
