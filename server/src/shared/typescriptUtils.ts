/**
 * Использование:
 *
 * ```typescript
 * type UserRole = 'User' | 'Moderator' | 'Admin'
 *
 * function canUserDeleteCourse(userRole: UserRole): boolean {
 *     if (userRole === 'User')
 *         return false
 *     if (userRole === 'Moderator')
 *         return true
 *     if (userRole === 'Admin')
 *         return true
 *
 *     // Если мы попали сюда, значит typescript не защитил нас от целостности типов. Например где-то сделали неправильный каст.
 *     // В userRole лежит значение, которое не подходит к типу UserRole.
 *     // Самое логичное в этом случае - бросить исключение, программа находится в некорректном состоянии.
 *
 *     // Это скомпилируется
 *     assertNever(userRole)
 * }
 * ```
 *
 * Если когда-нибудь в будущем мы добавим новый UserRole, например 'FSB', то typescript выдаст ошибку:
 *
 * ```typescript
 * type UserRole = 'User' | 'Moderator' | 'Admin' | 'FSB'
 *
 * function canUserDeleteCourse(userRole: UserRole): boolean {
 *     if (userRole === 'User')
 *         return false
 *     if (userRole === 'Moderator')
 *         return true
 *     if (userRole === 'Admin')
 *         return true
 *     // Это НЕ скомпилируется: TS2345: Argument of type "FSB" is not assignable to parameter of type never
 *     assertNever(userRole)
 * }
 * ```
 *
 * Так, при добавлении новых типов мы получим ошибки компиляции везде, где обработали не все возможные значения.
 */
export function assertNever(value: never): never {
    throw new Error(`Expected unreachable code, but received unexpected value: ${value}`)
}

export function assertType<T = never>(value: NoInfer<T>): T { return value }

export type Mutable<T> = {
    -readonly [K in keyof T]: T[K]
}
