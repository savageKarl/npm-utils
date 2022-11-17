import { deepCompare, shallowCopy } from "../src/index";


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



const b = shallowCopy(a);

// b.obj.fuck = 'shit'

console.debug(a, b)
console.log(deepCompare(a, b))
