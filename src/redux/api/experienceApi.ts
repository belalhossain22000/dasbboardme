import { baseApi } from "./baseApi"

const experienceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

   
    // get all blog
    addExperience: build.mutation({
      query: (data) =>({
        url: `/experience/add-experience`,
        method: 'POST',
        body:data
      }),
     
    }),


  }),
})

export const { useAddExperienceMutation} = experienceApi