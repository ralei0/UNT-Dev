
module.exports = (req,res,next)=> {


    if(!req.session.isUserLoggedIn)
    {
        return res.redirect('/login');
    }
    
    next();
};
