import { defineMock } from "../index";
// import { Random } from 'mockjs'

export default defineMock([
    {
      url: "user/login",
      method: ["POST"],
      body: ({ body }) => {
        const { username, password } = body
        // 简单验证
        if (username === 'admin' && password === 'admin') {
          return {
            code: '00000',
            data: {
              username: '会议室管理员',
              role: "ADMIN",
            },
            msg: '登录成功'
          }
        }

        if (username === 'user' && password === '123456') {
          return {
            code: '00000',
            data: {
              username: '普通用户',
              role: "USER",
            },
            msg: '登录成功'
          }
        }

        // 登录失败
        return {
          code: 'A0210',
          data: null,
          msg: '用户名或密码错误'
        }
      },
    },
]);
