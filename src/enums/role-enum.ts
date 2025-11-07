/**
 * 角色枚举
 */
export const RoleEnum = {
    /**
     * 管理员
     */
    ADMIN: "ADMIN",

    /**
     *  用户
     */
    USER: "USER",
} as const

export type RoleEnumType = (typeof RoleEnum)[keyof typeof RoleEnum]
