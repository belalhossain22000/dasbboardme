import { baseApi } from "./baseApi"

const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

   
    // get all blog
    addBlog: build.mutation({
      query: (data) =>({
        url: `/blog/add-blog`,
        method: 'POST',
        body:data
      }),
     
    }),


  }),
})

export const { useAddBlogMutation} = blogApi