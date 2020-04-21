const { Schema, model } = require('mongoose');

const WaitingListSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },    
    emailSent: {
        type: Boolean,
        default: false
    }        
}, {
    timestamps: true,
});

module.exports = model('WaitingList', WaitingListSchema);