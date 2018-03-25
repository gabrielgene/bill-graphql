import mongoose, { Schema } from 'mongoose';
import BaseDAO from '~/src/schema/base/dao';

export default class CategoryDAO extends BaseDAO {
  static _model = mongoose.model('Category', new mongoose.Schema({
    name: String,
  }));
}


