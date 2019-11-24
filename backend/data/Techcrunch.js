const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const Techcrunch = new Schema(
    {
        _id: Schema.Types.ObjectId,
        title: String,
        description: String,
        published: String,
        image: String,
        url: String,
        scrappedAt: Date,
    },
    { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Techcrunch", Techcrunch, "techcrunch");
