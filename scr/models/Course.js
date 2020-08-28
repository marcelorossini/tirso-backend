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
    cover: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },    
    price: {
        type: Number,
        required: true,
    },    
    order: {
        type: Number
    },        
    release: {
        type: Boolean,
        default: false
    },    
    inativ: {
        type: Boolean,
        default: false
    }    
}, {
    timestamps: true,
});

module.exports = model('Course', CourseSchema);