import { deepClone, isSameDeep, isSameShallow, shallowClone } from "../src/index";


const a = {
  str: '',
  num: 0,
  reg: /reg/,
  fun: function() {},
  date: new Date(),
  obj: {
    fuck: 'fuck'
  }
}


// deepClone()

const b = shallowClone(a);

// b.obj.fuck = 'shit'

console.debug(a, b)
console.log(isSameDeep(a, b))
