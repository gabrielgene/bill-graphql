import mongoose, { Schema } from 'mongoose';
import BaseDAO from '~/src/schema/base/dao';

export default class RestaurantDAO extends BaseDAO {
  static _model = mongoose.model('Restaurant', new mongoose.Schema({
    slug: { index: true, type: String, unique: true },
    categories: [{ index: true, type: Schema.ObjectId, ref: 'Category' }],
    name: String,
    flyerUrl: String,
  }));

  static search(term) {
    const name = { $regex: new RegExp(term.trim().replace(/(\s+)/g, '[\\s\\S]*\\b'), 'i') };
    return this.find({ name });
  }

  static findByCategory(categoryId) {
    return this.find({ categories: categoryId });
  }
}


