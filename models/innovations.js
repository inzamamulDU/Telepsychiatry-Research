const mongoose = require("mongoose");

const innovationsSchema = new mongoose.Schema({
    title: {
        type: String
    },
    BriefDesciption: {
        type: String
    },
    conflictOfInterest: {
        type: String
    },
    financialSupport: {
        type: String
    },
    Acknowlegement: {
        type: String
    },
    references: {
        type: String
    },
    authors: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("innovations", innovationsSchema);