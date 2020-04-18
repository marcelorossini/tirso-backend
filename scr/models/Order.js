const { Schema, model } = require('mongoose');

const OrderSchema = new Schema({
    user: String,
    course: String,
    collection_id: String,
    collection_status: String,
    external_reference: String,
    payment_type: String,
    merchant_order_id: String,
    preference_id: String,
    site_id: String,
    processing_mode: String,
    merchant_account_id: String
}, {
    timestamps: true,
});

module.exports = model('Order', OrderSchema);