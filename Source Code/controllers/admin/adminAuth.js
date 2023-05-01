const bcrypt = require('bcryptjs');
const Admin = require('../../models/Admin');



exports.getLogin =(req,res,next)=> {
        
      
        res.render('admin/login',{
        pageTitle:'Login',
    });

}; 

exports.getRegister =(req,res,next)=> {
  res.render('admin/register',{
    pageTitle:'Register',
});
  
}; 
exports.postRegister =(req,res,next)=> {
  const email=req.body.email;
  const password=req.body.password;
 
  let errors =[];
  if( !email || !password)
  {
      errors.push({msg:"Please fill all the fields."});
  }

  if(password.length<5)
  {
      errors.push({msg:'Passwords should be atleast 6 characters'});
  }

  if(errors.length>0)
  {
      res.render('admin/register',{
          pageTitle:'Register',
          errors,
          email,
          password,
          

      });
  }
  else
  {            
      Admin.findOne({username:email})
      .then(user=>{
          if(user)
          {
            
                  errors.push({msg:'Admin is already resisterd with this email.'});
                  res.render('admin/register',{
                  pageTitle:'Register',
                  errors,
                  email,
                  password,
              });
          }
          else
          {
              const newAdmin= new Admin({   //instance of the user model
                  username:email,
                  password:password
              });
              
              //hasing password and saving user in database
              bcrypt.genSalt(10,(err,salt)=>{
                  bcrypt.hash(newAdmin.password,salt,(err,hash)=> {
                      if(err)
                      throw err;

                      newAdmin.password=hash;
                      
                      newAdmin.save()
                      .then(user => {
                        
                          req.flash('success_msg','You are registered Successfully!');
                          res.redirect('/admin/login');
                      })
                      .catch((err) =>{//console.log(err)
                        req.flash('error_msg','Something wrong happend.');
                        res.redirect('/admin/home');
                        });
                  })
              });
          }
      })
      .catch((err) =>{//console.log(err)
        req.flash('error_msg','Something wrong happend.');
        res.redirect('/admin/home');
        });
  }

  
  
  
}; 





exports.postLogin = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    // console.log(req.session.isLoggedIn);
     Admin.findOne({ username: username })
      .then(user => {
        if (!user) {
          req.flash('error_msg','You are not a admin.');
          return res.redirect('/admin/login');
        }
        bcrypt
          .compare(password, user.password)
          .then(doMatch => {
            if (doMatch) {
              req.session.isAdminLoggedIn = true;
              req.session.user = user;
              
              return req.session.save(err => {
                //console.log(err);
                res.redirect('/admin/home');
              });
            }
            req.flash('error_msg','Wrong Password.');
            res.redirect('/admin/login');
          })
          .catch(err => {
            //console.log(err);
            req.flash('error_msg','Something wrong happened , please retry again.');
            res.redirect('/admin/login');
          });
      })
      .catch((err) =>{//console.log(err)
        req.flash('error_msg','Something wrong happend.');
        res.redirect('/admin/home');
        });
   
  

  };
 

  exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
      //console.log(err);
      res.redirect('/');
    });
  };

  