import mongoose, { Schema } from 'mongoose';
import BaseDAO from '~/src/schema/base/dao';

export default class ItemCategoryDAO extends BaseDAO {
  static _model = mongoose.model('ItemCategory', new mongoose.Schema({
    restaurantId: { index: true, type: Schema.Types.ObjectId, ref: 'Restaurant' },
    name: String,
  }));
}
