import request from "@/utils/request"

const BASE_API_URL ="/api/account";

const USER_API = {
    login(loginForm: LoginForm) {
        return request<any, string>({
            method: "POST",
            url:`${BASE_API_URL}/login`,
            data:loginForm,
        })
    }
}

export default USER_API;

/**
 * 登陆表单
 */
export interface LoginForm {
    username: string;
    password: string;
}
