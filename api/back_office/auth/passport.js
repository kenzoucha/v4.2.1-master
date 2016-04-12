var LocalStrategy = require('passport-local').Strategy;
var User         = require(appRoot + '/api/models/User');

module.exports = function(passport){
    passport.serializeUser(function(user, done){
        return done(null, user.id);
    });
    passport.deserializeUser(function(id, done){
        return User.findById(id, function(err, user){
            return done(null, user);
        });
    });
    passport.use('local-signup-back', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, username, password, done) {
        process.nextTick(function(){
            User.findOne({'username' : username}, function(err, user){
                if(err) return done(err);
                if(user){
                    return done(null,user);
                }else{
                    var newUser = new User();
                    newUser.username = username;
                    newUser.password = newUser.generateHash(password);
                    newUser.role = req.body.role;

                    newUser.save(function(err,user){
                        if(err){
                            throw err;
                        }
                        return done(null, false);
                    });
                }
            });
        });
    }));
    passport.use('local-login-back', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
        session: false
    }, function (req, username, password, done) {
        console.log(req.body);
        User.findOne({$and : [{'username': username}, {'role': 'admin'}]}, function(err, user){
            if(err)
                return done(err);
            if(!user)
                return done(null, false);
            if(!user.validPassword(password)){
                return done(null, false);
            }
            return done(null, user);
        });
    }));
};

