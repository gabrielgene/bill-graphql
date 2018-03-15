import mongoose, { Schema } from 'mongoose';
import BaseDAO from '~/src/schema/base/dao';

export default class ItemDAO extends BaseDAO {
  static _model = mongoose.model('Item', new mongoose.Schema({
    restaurantId: { type: Schema.Types.ObjectId, index: true, ref: 'Restaurant' },
    name: String,
    description: String,
    price: Number,
  }));
}

