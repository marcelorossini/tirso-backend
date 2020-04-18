const { Schema, model } = require('mongoose');

const CourseSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },    
    video: String,
    cover: String,
    url: String,
    price: Number,
    release: Boolean,    
}, {
    timestamps: true,
});

module.exports = model('Course', CourseSchema);