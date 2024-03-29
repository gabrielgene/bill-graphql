import mongoose, { Schema } from 'mongoose';
import BaseDAO from '~/src/schema/base/dao';
import Image from '~/src/schema/image/schema';

export default class RestaurantDAO extends BaseDAO {
  static _model = mongoose.model('Restaurant', new mongoose.Schema({
    slug: { index: true, type: String, unique: true, slug: 'name' },
    categoryId: { index: true, type: Schema.ObjectId, ref: 'RestaurantCategory' },
    name: String,
    description: String,
    flyer: Image,
    address: String,
    workingHours: [[[Number]]],
    googleMapsUrl: String,
    iFoodUrl: String,
  }));

  static search(term) {
    const name = { $regex: new RegExp(term.trim().replace(/(\s+)/g, '[\\s\\S]*\\b'), 'i') };
    return this.find({ name });
  }

  static findByCategory(categoryId) {
    return this.find({ categoryId });
  }
}
