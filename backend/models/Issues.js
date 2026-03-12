const mongoose = require("mongoose");

const IssuesSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    areaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Area"
    },
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    imageUrl: String,
    status:{
        type: String,
        enum: [
            "Reported",
            "Under Review",
            "In Progress",
            "Resolved",
            "Rejected"
        ],
        default: "Reported"
    },
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    }

}, {timestamps: true});

const Issues  = mongoose.model("Issues", IssuesSchema);

module.exports = Issues;