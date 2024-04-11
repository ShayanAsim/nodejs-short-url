const mongoose = require("mongoose");

const urlScheme = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectUrl: {
        type: String,
        required: true,
    },
    visitHistory: [{
        timestamp: {
            type: Number,
            default: Date.now,
        }
    }],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    }
}, { timestamps: true });

const URL = mongoose.model('URL', urlScheme);

module.exports = URL;
