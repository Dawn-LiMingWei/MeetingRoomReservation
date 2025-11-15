import request from "@/utils/request"
import type {RoleEnumType} from "@/enums/role-enum.ts";

const BASE_API_URL ="/user";

const USER_API = {
    login(loginForm: LoginForm) {
        return request<any, UserInfo>({
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

export interface UserInfo {
    username: string;
    role: RoleEnumType;
}
