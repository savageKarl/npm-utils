export type ObjectAndAarryType = Record<string, any>

// a[3].b -> a.3.b -> [a, 3, b]
/** lodash get方法 */
export function get(data: ObjectAndAarryType, path: string) {
	const paths = path
		.replace(/\[(\w+)\]/g, '.$1')
		.replace(/\["(\w+)"\]/g, '.$1')
		.replace(/\['(\w+)'\]/g, '.$1')
		.split('.')

	return paths.reduce((x, y) => x?.[y], data)
}

/** 单例模式 */
export function getSingle<T>(fn: () => T) {
	let res: T

	return function (this: unknown, ...args: any) {
		return res || (res = fn.apply(this, args))
	}
}
