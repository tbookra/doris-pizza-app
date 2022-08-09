"use strict";
var mongoose = require('mongoose');
var isWorking = new mongoose.Schema({
    doughChefs_is_working: {
        type: Boolean,
    },
    toppingChefs_is_working: {
        type: Boolean
    },
    baking: {
        type: Boolean
    },
    serving: {
        type: Boolean
    }
});
module.exports = mongoose.model('current_working', isWorking);
