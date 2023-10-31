import mongoose from "mongoose";

const formDataSchema = new mongoose.Schema({
  title: String,
  description: String,
  data: [],
});

const FormDataSchema = mongoose.model('FormData', formDataSchema);

export default FormDataSchema