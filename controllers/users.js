const User = require("../models/user");

module.exports.renderSignUpForm = (req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signUp = async(req,res)=>{
    try{
        let {username,email,password} = req.body;
    const newUser =  new User({username,email});
    const regUser =  await User.register(newUser,password);
    req.login(regUser,(err)=>{
        if(err){
          return  next(err);
        }
    req.flash("success","Welcome To WanderLust !");
    res.redirect("/listings");
    })
    console.log(regUser);
    }catch(error){
        req.flash("error",error.message);
        res.redirect("/listings");
    }
};

module.exports.renderLogInForm = (req,res)=>{
    res.render("users/login.ejs");
}
module.exports.logIn =  (req,res)=>{
    req.flash("success","Welcome back to Wonderlust ! You are logged in");
    let redirectUrl = res.locals.redirectUrl || "/listings" ;
    res.redirect(redirectUrl);
};

module.exports.logOut = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
          return  next(err);
        }else{
            req.flash("success","You have been logged out");
            res.redirect("/listings");
        }
    })
};