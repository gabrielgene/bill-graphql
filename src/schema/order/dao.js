import mongoose, { Schema } from 'mongoose';
import BaseDAO from '~/src/schema/base/dao';
import { OrderStatus } from '~/src/schema/enumerations';

export default class OrderDAO extends BaseDAO {
  static _model = mongoose.model('Order', new mongoose.Schema({
    tableSessionId: { index: true, type: Schema.Types.ObjectId, ref: 'TableSession' },
    restaurantId: { index: true, type: Schema.Types.ObjectId, ref: 'Restaurant' },
    itemId: { type: Schema.Types.ObjectId, ref: 'Item' },
    aditionals: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    status: { type: String, enum: OrderStatus, default: 'PENDING' },
    details: String,
  }));
}


