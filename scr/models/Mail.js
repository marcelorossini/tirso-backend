const { Schema, model } = require('mongoose');

const MailSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    html: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

module.exports = model('Mail', MailSchema);