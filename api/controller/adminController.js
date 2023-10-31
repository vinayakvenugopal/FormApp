import FormDataSchema from "../models/formSchema.js";

const addFormSchema = async(req,res,next)=>{
    console.log(req.body);
    const formData = req.body;
    try {
      const newFormData =  await FormDataSchema.create(formData);
  
      res.status(200).json({ message: 'Form data saved successfully' });
    } catch (error) {
      console.error('Error saving form data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}

export{
    addFormSchema
}