const mongoose = require("mongoose")

const remarkNoficationSchema = new mongoose.Schema({
    report: {
        type: mongoose.Types.ObjectId,
        ref: 'Report'
    },
    remark: {
        type: mongoose.Types.ObjectId,
        ref: 'Remark'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

module.exports = mongoose.model("Nofication", remarkNoficationSchema);

