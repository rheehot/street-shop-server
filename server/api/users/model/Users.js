const mongoose = require('mongoose');

//테스트중
const StorySchema = new mongoose.Schema({
    name: String,
    title: String,
    contents: String
});

global.Story = global.Story || mongoose.model('books', StorySchema);
const Story = mongoose.model('books', StorySchema);

module.exports = Story;
