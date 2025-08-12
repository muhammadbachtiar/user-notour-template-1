import axiosConfig from "../../config/api";

const CategoryService = {
    getAll: async (params) => {
        const response = await axiosConfig.get("/category-article", {
            params,
          });
          return response.data;
    }
}

export default CategoryService;