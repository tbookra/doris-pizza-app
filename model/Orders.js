const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
  bulk_order_id: {
    type: String,
    required: true,
  },
  toppings: [String],
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  finished_at: Date,
  status: String,
  completed: {
    type: Boolean,
    default: false,
  },
  procces_started_at: {
    type: Date,
    // default: ()=> Date.now()
  },
  completed_at: {
    type: Date,
  },
  bulk_completed: {
    type: Date,
  },
  reported: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('orders_list', ordersSchema);
