import pkg from './package.json'  assert { type: 'json' }

import {getRollupConfig} from 'savage-rollup-config'

export default getRollupConfig(pkg)
