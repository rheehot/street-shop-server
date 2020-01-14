const mongoose = require('mongoose');

const TagsSchema = new mongoose.Schema({
	tag : String,
	icon : String,
});

global.Tags = global.Tags || mongoose.model('Tags', TagsSchema);
const Tags = mongoose.model('Tags', TagsSchema);

module.exports = Tags;