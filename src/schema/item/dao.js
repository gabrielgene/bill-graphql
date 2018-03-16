import mongoose, { Schema } from 'mongoose';
import BaseDAO from '~/src/schema/base/dao';
import Image from '~/src/schema/image/schema';

export default class ItemDAO extends BaseDAO {
  static _model = mongoose.model('Item', new mongoose.Schema({
    restaurantId: { type: Schema.Types.ObjectId, index: true, ref: 'Restaurant' },
    categoryId: { type: Schema.Types.ObjectId, index: true, ref: 'Category' },
    name: String,
    description: String,
    price: Number,
    image: Image,
  }));
}

