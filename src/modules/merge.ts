import { dataTypes } from 'savage-data-types'

class Merge {
	private merge(
		target: object,
		type: 'shallow' | 'deep',
		...sources: object[]
	) {

		if (dataTypes.isArray(sources)) {
			while (sources.length > 0) {
				const source = sources.pop() as object
				if (!dataTypes.isObject(source)) return;				
				Reflect.ownKeys(source).forEach((k) => {
					if (type === 'shallow') target[k as keyof object] = source[k as keyof object]
					else {
						this.merge(target[k as keyof object] as object , 'deep', source[k as keyof object])
					}
				})
			}

			return target
		}

		return target
	}

	shallowMerge = (
		target: object,
		...sources: object[]
	) => {
		return this.merge(target, 'shallow', ...sources)
	}

	deepMerge = (target: object, ...sources: object[]) => {
		return this.merge(target, 'deep', ...sources)
	}
}

const { shallowMerge, deepMerge } = new Merge()

export { shallowMerge, deepMerge }
