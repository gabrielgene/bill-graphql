export default class BaseDAO {
  static _model = {};

  static create(args) {
    return this._model.create(args);
  }

  static find(args) {
    return this._model.find(args).exec();
  }

  static findOne(args) {
    return this._model.findOne(args).exec();
  }

  static findById(id) {
    return this._model.findOne({ _id: id }).exec();
  }

  static async update(id, args) {
    return this._model.update({ _id: id }, { $set: args });
  }

  static remove(args) {
    return this._model.find(args).remove().exec();
  }
}

