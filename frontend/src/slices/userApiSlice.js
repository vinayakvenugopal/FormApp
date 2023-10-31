import { apiSlice } from "./apiSlice";
import { GET_FORM_SCHEMA ,GET_FORM_LIST} from "../config/api";



export const userApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getFormSchema:builder.query({
            query:(params)=>({
               url:`${GET_FORM_SCHEMA}?id=${params.id}`,
               method:'GET',
            })
        }),
        getFormList:builder.query({
            query:(data)=>({
               url:`${GET_FORM_LIST}`,
               method:'GET',
            })
        })
    
    })
})


export const {useGetFormSchemaQuery,useGetFormListQuery} = userApiSlice