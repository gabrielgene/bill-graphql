import mongoose, { Schema } from 'mongoose';
import BaseDAO from '~/src/schema/base/dao';

export default class RestaurantCategoryDAO extends BaseDAO {
  static _model = mongoose.model('RestaurantCategory', new mongoose.Schema({
    name: { type: String, unique: true },
  }));
}
