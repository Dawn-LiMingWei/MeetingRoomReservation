import { defineStore } from 'pinia'
import { store } from "@/store"
import USER_API, {type LoginForm, type UserInfo} from "@/api/login/login-api";
import {ApiCodeEnum} from "@/enums/code-enum";
import { useRouter } from "vue-router";


export const userStore = defineStore("user", () => {

    const router = useRouter();
    const userInfo = ref<UserInfo>();

    // actions
    const login = async (loginForm: LoginForm) => {
        try {
            userInfo.value = await USER_API.login(loginForm);
            ElMessage.success("登陆成功");

            await router.push({
                name: 'Dashboard',
            })

        } catch (error: any) {
            if (error.code === ApiCodeEnum.USER_PASSWORD_ERROR){
                ElMessage.warning("密码错误");
            }
            else if (error.code === ApiCodeEnum.USER_NOT_EXIST){
                ElMessage.error("用户不存在");
            }
            else {
                ElMessage.error("服务器出错");
                console.error("服务器出错:"+error);
            }
        }
    }

    return {
        login,

        userInfo,
    }
});

/**
 * 在组件外部使用UserStore的钩子函数
 */
export function useUserStore() {
    return userStore(store);
}


