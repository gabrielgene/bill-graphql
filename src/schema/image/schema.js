import mongoose, { Schema } from 'mongoose';

const ImageSchema = new mongoose.Schema({
    src: String,
});

export default ImageSchema;
