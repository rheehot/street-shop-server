const mongoose = require('mongoose');

const ShopsSchema = new mongoose.Schema({
    shopName: String,
    shopOwner: String,
    shopTags: Array,
    openDays: Array,
    openTime: Date,
    closeTime: Date,
    location: {longitude: String,latitude:String},
    ownerComment: String,
    likeScore: Number,
    now: { 
        active :Boolean, 
        real_location : {
            longitude : String, 
            latitude : String
        },
        real_start_time:Date,
        set_close_time: Date,
    }
});

global.Shops = global.Shops || mongoose.model('shops', ShopsSchema);
const Shops = mongoose.model('shops', ShopsSchema);

module.exports = Shops;