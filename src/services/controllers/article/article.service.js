import axiosConfig from "../../config/api";

const ArticleService = {
    getAll: async (params) => {
        const response = await axiosConfig.get("/article", {
            params,
          });
          return response.data;
    },
    getOne: async (slug, params ={}) => {
        const response = await axiosConfig.get(`/article/${slug}`, {
            params,
          });
          return response.data;
    }
}

export default ArticleService;