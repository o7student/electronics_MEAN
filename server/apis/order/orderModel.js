var mongoose = require('mongoose');//schema
const Schema = mongoose.Schema;
var orderSchema = mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  order_status: { type: String, default: "Pending" },
  total_amount: { type: Number, default: 0 },
  is_coupoun_applied: { type: Boolean, default: false },
  coupon_discount: { type: Number, default: "" },
  coupon_id: {
    type: Schema.Types.ObjectId,
    ref: 'coupon'
  },
  order_detail: [
    {
      category_id: {
        type: Schema.Types.ObjectId,
        ref: 'category'
      },
      product_id: {
        type: Schema.Types.ObjectId,
        ref: 'product'
      },
      quantity: { type: Number, default: 1 },
      price_per_item: { type: Number, required: true },
    },
  ],
  review: [{
    rate: { type: Number },
    review: { type: String }
  }],
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  shipping_address: { type: String, default: '' },
  card_number: { type: String, default: '' },
  cvv: { type: String, default: '' },
  expiry_date: { type: String, default: '' },
  contact: { type: String, default: '' },
  created_at: { type: Date, default: Date.now }
});

// Export order Model
var order = module.exports = mongoose.model('order', orderSchema);
module.exports.get = function (callback, limit) {
  order.find(callback).limit(limit);
}
