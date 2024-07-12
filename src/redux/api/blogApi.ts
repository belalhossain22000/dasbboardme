import { baseApi } from "./baseApi"

const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

   
    // get all blog
    getAllBlog: build.query({
      query: () =>({
        url: `/blog/all-blogs`,
        method: 'GET',
      }),
     
    }),


  }),
})

export const { useGetAllBlogQuery} = blogApi