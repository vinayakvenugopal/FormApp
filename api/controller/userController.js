import FormDataSchema from "../models/formSchema.js";

const getFormSchema = async(req,res,next)=>{

    try {
    const id = req.query.id
    const formSchema =  await FormDataSchema.findOne({_id:id});
      res.status(200).json(formSchema);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
}

const getFormList = async(req,res,next)=>{

    try {
      const formList =  await FormDataSchema.find();
      res.status(200).json(formList);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
}



export{
    getFormSchema,
    getFormList
}