import { baseApi } from "./baseApi"

const skillApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

   
    // get all blog
    addSkill: build.mutation({
      query: (data) =>{
       
        return({
        url: `/skill/add-skill`,
        method: 'POST',
        body:data
      })},
     
    }),


  }),
})

export const { useAddSkillMutation} = skillApi