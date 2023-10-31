import { apiSlice } from "./apiSlice";
import { ADD_FORM_SCHEMA } from "../config/api";


export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        addFormSchema:builder.mutation({
            query:(data)=>({
               url:`${ADD_FORM_SCHEMA}` ,
               method:'POST',
               body:data
            })
        })
    
    })
})


export const {useAddFormSchemaMutation} = adminApiSlice