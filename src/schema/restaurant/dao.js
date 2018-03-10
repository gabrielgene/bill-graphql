import mongoose from 'mongoose';
import BaseDAO from '~/src/schema/base/dao';

export default class RestaurantDAO extends BaseDAO {
  static _model = mongoose.model('Restaurant', new mongoose.Schema({
    slug: { index: true, type: String, unique: true },
    name: String,
  }));
}


