import mongoose, { Schema } from 'mongoose';
import BaseDAO from '~/src/schema/base/dao';

export default class TableDAO extends BaseDAO {
  static _model = mongoose.model('Table', new mongoose.Schema({
    restaurantId: { index: true, type: Schema.Types.ObjectId, ref: 'Restaurant' },
    slug: { index: true, type: String, unique: true },
    name: String,
  }));
}


