const mongoose = require('mongoose');

const innovationSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    pageType: String,
    tags: [String],
    objective: String,
    content: String,
    time: {
        type: String,
        default: Date.now
    }
});

const innovationModel = mongoose.model('InnovationsModel', innovationSchema);
module.exports = innovationModel;