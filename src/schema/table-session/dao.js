import mongoose, { Schema } from 'mongoose';
import BaseDAO from '~/src/schema/base/dao';

export default class TableSessionDAO extends BaseDAO {
  static _model = mongoose.model('TableSession', new mongoose.Schema({
    password: String,
    numberOfPeople: Number,
    openedAt: Date,
    closedAt: Date,
    tableId: { index: true, type: Schema.Types.ObjectId, ref: 'Table' },
    restaurantId: { index: true, type: Schema.Types.ObjectId, ref: 'Restaurant' },
  }));
}

