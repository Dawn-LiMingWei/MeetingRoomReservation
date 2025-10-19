/**
 * API响应码枚举
 */
export const enum ApiCodeEnum {
  /**
   * 成功
   */
  SUCCESS = "00000",
  /**
   * 错误
   */
  ERROR = "B0001",

  /**
   * 用户密码错误
   */
  USER_PASSWORD_ERROR = "A0210",

  /**
   * 用户不存在
   */
  USER_NOT_EXIST = "A0212",
}
