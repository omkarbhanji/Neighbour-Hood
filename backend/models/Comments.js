const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    issueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Issues",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
    text: {
     type: String,
     required: true
    }
}, {timestamps: true})

const Comments = mongoose.model("Comments", commentSchema);

module.exports = Comments;