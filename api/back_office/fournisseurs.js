/**
 * Created by Kenza on 15/04/2016.
 */
var Fourni = require('../models/Fourni');

module.exports = function(router) {

    router
        .route('/fours')
        .get(function (req, res) {
            Fourni
                .find()
                .exec(function (error, fours) {
                    if (error) {
                        console.log('Error: ' + error);
                    } else {
                        res.json(fours);
                    }
                });
        });
}