import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL_API: string = import.meta.env.VITE_API_BASE_URL || "";

interface LoginRequestData {
    email: string;
    password: string;
}

export interface sendData {
    id?: number | undefined;
    company_name: string;
    company_description: string;
    company_img?: string | File | null;
}
export const AdminLoginAPI = async (reqData: LoginRequestData) => {
    return await axios.post(`${BASE_URL_API}/login`, reqData);
};
// company Add
export const companyAddAPI = async (reqData: sendData, config?: AxiosRequestConfig<unknown>) => {
    return await axios.post(`${BASE_URL_API}/create/company`, reqData, config);
};
export const companyUpdateAPI = async (reqData: sendData, config?: AxiosRequestConfig<unknown>) => {
    return await axios.put(`${BASE_URL_API}/update/company`, reqData, config);
};
export const companyGetAPI = async (url: string,) => {
    return await axios.get(`${BASE_URL_API}/list/company${url}`);
};
export const companyGetByIDAPI = async (url: string, config?: AxiosRequestConfig<unknown>) => {
    return await axios.get(`${BASE_URL_API}/list/company${url}`, config);
};
export const homePageCreateApi = async (homeData: FormData, config?: AxiosRequestConfig<unknown>) => {
    return await axios.post(`${BASE_URL_API}/create/group/home`, homeData, config);
};
export const homePageGetByIDAPI = async (url: string) => {
    return await axios.get(`${BASE_URL_API}/list/group/home${url}`);
};
export const homePageUpdateApi = async (homeData: FormData, config?: AxiosRequestConfig<unknown>) => {
    return await axios.put(`${BASE_URL_API}/update/group/home`, homeData, config);
};
export const homePageBannerRemoveApi = async (id: number, config?: AxiosRequestConfig<unknown>) => {
    return await axios.delete(`${BASE_URL_API}/delete/banner/image`, {
        ...config,
        data: { id: id }
    });
};
// Category Create
export const companyCategoryAPI = async (reqData: { name: string; company_id: number; id?: number }, config?: AxiosRequestConfig<unknown>) => {
    if (reqData?.id !== null && reqData?.id)
        return await axios.put(`${BASE_URL_API}/update/category`, reqData, config);
    else
        return await axios.post(`${BASE_URL_API}/create/category`, reqData, config);
};
export const categoryGetAPI = async (url: string, config?: AxiosRequestConfig<unknown>) => {
    return await axios.get(`${BASE_URL_API}/list/category${url}`, config);
};
export const leaderCreateAPI = async (reqData: {
    id?: number | null;
    company_id?: number | null;
    name: string;
    title: string;
    desc: string;
    category_id: number | null;
    leader_image?: string | File | null | undefined;
}, config?: AxiosRequestConfig<unknown>) => {
    if (reqData?.id !== null && reqData?.id)

        return await axios.put(`${BASE_URL_API}/update/leader`, reqData, config);
    else
        return await axios.post(`${BASE_URL_API}/create/leader`, reqData, config);
};
export const leaderGetAPI = async (url: string, config?: AxiosRequestConfig<unknown>) => {
    return await axios.get(`${BASE_URL_API}/list/leader${url}`, config);
};
export const leaderHomeGetAPI = async (url: string,) => {
    return await axios.get(`${BASE_URL_API}/list/home/leader${url}`);
};
export const removeLeaderApi = async (id: number, config?: AxiosRequestConfig<unknown>) => {
    return await axios.delete(`${BASE_URL_API}/delete/leader`, {
        ...config,
        data: { id: id }
    });
};
//vision
export const visionCreateAPI = async (reqData: {
    id?: number | null;
    company_id?: number | null;
    vision: string;
    mission: string;
    value?: string;
}, config?: AxiosRequestConfig<unknown>) => {
    if (reqData?.id !== null && reqData?.id)

        return await axios.put(`${BASE_URL_API}/update/vision`, reqData, config);
    else
        return await axios.post(`${BASE_URL_API}/create/vision`, reqData, config);
};
export const visionGetAPI = async (url: string,) => {
    return await axios.get(`${BASE_URL_API}/list/vision${url}`);
};
// gallery API
export const galleryCreateApi = async (homeData: FormData, config?: AxiosRequestConfig<unknown>) => {
    return await axios.post(`${BASE_URL_API}/create/gallery`, homeData, config);
};
export const galleryGetAPI = async (url: string,) => {
    return await axios.get(`${BASE_URL_API}/list/gallery${url}`);
};
export const removeGalleryApi = async (id: number, config?: AxiosRequestConfig<unknown>) => {
    return await axios.delete(`${BASE_URL_API}/delete/gallery`, {
        ...config,
        data: { id: id }
    });
};
// contactus
export const contactUsApi = async (reqData: {
    id?: number | undefined;
    name: string;
    email: string;
    phone_number: string;
    desc: string;
    company_name: string;
},) => {
    return await axios.post(`${BASE_URL_API}/contact`, reqData);
};
// info api

export const createInfoApi = async (sendData: FormData, config?: AxiosRequestConfig<unknown>) => {
    return await axios.post(`${BASE_URL_API}/create/info`, sendData, config);
};
export const updateInfoApi = async (sendData: FormData, config?: AxiosRequestConfig<unknown>) => {
    return await axios.put(`${BASE_URL_API}/update/info`, sendData, config);
};
export const infoGetByIDAPI = async (url: string) => {
    return await axios.get(`${BASE_URL_API}/list/info${url}`);
};
export const leaderByIDAPI = async (url: string) => {
    return await axios.get(`${BASE_URL_API}/list/one/${url}`);
};

// we serve

export const weServeCreateAPI = async (reqData: {
    id?: number | null;
    company_id?: number | null;
    product_name: string;
    product_desc: string;
    product_image?: string | File | null | undefined;
}, config?: AxiosRequestConfig<unknown>) => {
    if (reqData?.id !== null && reqData?.id)
        return await axios.put(`${BASE_URL_API}/update/serve`, reqData, config);
    else
        return await axios.post(`${BASE_URL_API}/create/serve`, reqData, config);
};
export const productGetAPI = async (url: string) => {
    return await axios.get(`${BASE_URL_API}/list/serve${url}`);
};
export const removeProductApi = async (id: number, config?: AxiosRequestConfig<unknown>) => {
    return await axios.delete(`${BASE_URL_API}/delete/serve`, {
        ...config,
        data: { id: id }
    });
};