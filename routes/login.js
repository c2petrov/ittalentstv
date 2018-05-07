const express = require('express');
const router = express.Router();
const sha1 = require('sha1');


//Login
router.post('/', function (req, res, next) {
    var usersCollection = req.db.get('users');
    var user = req.body;

    user.password = sha1(user.password);

    usersCollection.find({username: user.username, password: user.password}, {}, function (err, docs) {
        if (!err) {
            if (docs.length > 0) {
                //returns the user
                req.session.user = docs[0];
                res.status(200);
                res.json({
                    userId: docs[0]._id,
                    username: docs[0].username,
                    imageUrl: docs[0].imageUrl
                });

                //res.redirect('http://localhost/......');
                return;
            } else {
                res.status(401);
                res.json({
                    error: "Oops! Wrong username or password. Try again!"
                });

                //res.redirect('http://localhost/....../login.html');
                return;
            }
        } else {
            res.status(500);
            res.json({err: err});
        }
    });

});


module.exports = router;