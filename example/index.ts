import { deepMerge, shallowMerge } from 'savage-utils'

const a = {
	test: {
		foo: 'bar',
		dog: 'cat'
	}
}

const b = {
	test: {
		foo: 'layllll'
	}
}

console.log(deepMerge(a, b))

console.log(shallowMerge(a, b))
