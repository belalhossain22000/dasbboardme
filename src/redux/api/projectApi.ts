import { baseApi } from "./baseApi"

const projectApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

   
    // get all blog
    addProject: build.mutation({
      query: (data) =>{
        console.log(data,"from redux")
        return({
        url: `/project/add-project`,
        method: 'POST',
        body:data
      })},
     
    }),


  }),
})

export const { useAddProjectMutation} = projectApi