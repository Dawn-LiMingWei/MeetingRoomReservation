import axios, { type InternalAxiosRequestConfig, type AxiosResponse } from "axios";
import qs from "qs";

/**
 * 创建 HTTP 请求实例
 */
const httpRequest = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 50000,
    headers: { "Content-Type": "application/json;charset=utf-8" },
    paramsSerializer: (params) => qs.stringify(params),
});

/**
 * 请求拦截器 - 添加 Authorization 头
 */
/*httpRequest.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config;
    },
    (error) => {
        console.error("Request interceptor error:", error);
        return Promise.reject(error);
    }
);*/

/**
 * 响应拦截器 - 统一处理响应和错误
 */
httpRequest.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
        // 如果响应是二进制数据，则直接返回response对象（用于文件下载、Excel导出、图片显示等）
        // if (response.config.responseType === "blob" || response.config.responseType === "arraybuffer") {
        //     return response;
        // }

        const { code, data, msg } = response.data;

        // 请求成功
        if (code === ApiCodeEnum.SUCCESS) {
            return data;
        }

        // 业务错误
        const error = new Error(msg || "系统出错");
        // 添加code到error对象上，方便外部获取
        (error as any).code = code;
        return Promise.reject(error);
    },
    async (error) => {
        console.error("Response interceptor error:", error);

        const { config, response } = error;

        // 网络错误或服务器无响应
        if (!response) {
            ElMessage.error("网络连接失败，请检查网络设置");
            return Promise.reject(error);
        }

        const { code, msg } = response.data as ApiResponse;

        switch (code) {
            default:
                return Promise.reject(new Error(msg || "请求失败"));
        }
    }
);

export default httpRequest;
