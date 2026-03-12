const mongoose = require("mongoose");

const votesSchema = new mongoose.Schema({
userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
},
issueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Issues"
},
voteType: {
    type: String,
    enum: ["upvote", "downvote"]
}
}, {timestamps: true});

votesSchema.index({userId: 1, issueId: 1}, {unique: true});

const Votes = mongoose.model("Votes", votesSchema);

module.exports = Votes;
