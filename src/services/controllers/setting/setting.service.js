import axiosConfig, { axiosConfigPrivate } from "../../config/api";

const SettingsService = {
    getOneSetting: async (name, params ={}) => {
        const response = await axiosConfig.get(`/settings/${name}`, {
            params,
        });
        
        return response.data;
    },
    getOneStaticPage: async (page, params ={}) => {
        const response = await axiosConfigPrivate.get(`/statis-page/${page}`, {
            params,
        });
        
        return response.data;
    }
}

export default SettingsService;