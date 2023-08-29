import { describe, expect, test } from '@jest/globals';
import {get, shallowCompare, deepCompare, shallowCopy, deepCopy,  eventCenter, getSingle, Iterator, each, shallowMerge, deepMerge, debounce, throttle } from 'savage-utils'


describe('functions', () => {
  test('get', () => {
    var object = { 'a': [{ 'b': { 'c': 3 } }] };
    expect(get(object, 'a[0].b.c')).toEqual(3);
    expect(get(object, 'a[0]')).toEqual({ 'b': { 'c': 3 } });
  });
  
  
  test('getSingle', () => {
    const fun = () => {return {}}
    const singleFun = getSingle(fun);

    const a = singleFun()
    const b = singleFun();

    expect(a).toEqual(b)
    
  })

})

test('compare', () => {
  const a = {
    foo: {
      bar: 'dog'
    }
  }

  const b = {
    ...a    
  }

  const c = {
    foo: {
      bar: 'dog'
    }
  }
  expect(shallowCompare(a, b)).toEqual(true)
  expect(shallowCompare(a, c)).toEqual(false)
  expect(deepCompare(a, b)).toEqual(true)
  expect(deepCompare(a, c)).toEqual(true)
})

test('copy', () => {
  const a = {
    foo: {
      bar: 'dog'
    }
  }

  const b = shallowCopy(a);
  b.foo.bar = 'cat'

  const c = deepCopy(a);
  c.foo.bar = 'no'

  expect(b).toEqual(a)
  expect(c).not.toEqual(a)
})

test('eventCenter', () => {
  let value = 0
  eventCenter.subscribe('change value', (v) =>{value = v})
  eventCenter.publish('change value', 5)

  expect(value).toEqual(5)
  eventCenter.remove('change value')
  eventCenter.publish('change value', 6)
  expect(value).toEqual(5)
})

describe('Iterator', () => {
  const a = {
    foo: 'foo1',
    bar: 'bar1',
    dog: 'dog2'
  }

  const b = ['foo', 'bar', 'dog']

  test('each', () => {


    const a2 = {
      foo1: {foo: a},
      bar1: {bar: a},
      dog2: {dog: a},
    }

    const a3 = {}



    const b2 = {
      foo: {0: b},
      bar: {1: b},
      dog: {2: b},
 
    }

    const b3 = {}

    each(a, (v,i,o) => {
      a3[v] = {[i]: o}
    })
  
    each(b, (v,i,o) => {
      b3[v] = {[i]: o}
    })
  
    expect(a3).toEqual(a2)
    expect(b3).toEqual(b2)
  })

  test('Iterator', () => {
    const ib = new Iterator(b)

    ib.next();

    expect(ib.length).toEqual(3)
    expect(ib.getCurrentItem()).toEqual('bar')
    ib.next();
    expect(ib.isDone()).toEqual(true)

  })
})

test('merge', () => {
  const a = {
    foo: {
      bar: 'dog'
    }
  }

  const b =  shallowMerge({}, a)
  a.foo.bar = 'cat'
  expect(b).toEqual(a)

  const c = deepMerge({}, a)
  c.foo.bar = 'no'
  expect(c).not.toEqual(a)

  console.log(a, c)
})

describe('optimization', () => {

  let value = 0;

  function add() {
    value++
  }
  
  test('debounce', () => {
    const add2 = debounce(add, 10);
    [1,1,1,1,1].map(() => {
      add()
      add2()
    })
    setTimeout(() => {
      expect(value).toEqual(6) 
    }, 10)
  })


  // test('throttle', () => {
  //   const add2 = throttle(add, 100)
  //   const t = setInterval(() => {
  //     console.log(value)
  //     add()
  //   }, 1);

  //   setTimeout(( )=> {
  //     clearInterval(t)
  //     expect(value).toEqual(16)
  //   }, 1000)
  // })
})

