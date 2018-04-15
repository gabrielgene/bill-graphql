import mongoose from 'mongoose';
import SlugGenerator from 'mongoose-slug-generator';

import config from '~/src/config';

mongoose.Promise = global.Promise;
mongoose.plugin(SlugGenerator);

export const connectDB = () => {
  mongoose.connect(config.MONGO_URL, err => (
    err ? console.error(`Mongo error: ${err}`) : console.warn('Mongo connected')
  ));
};
