// a[3].b -> a.3.b -> [a, 3, b]
/** lodash get方法 */

export type ObjectAndAarryType = Record<string, any>;

export function getType(o: any) {
  return Object.prototype.toString.call(o);
}

export function get(data: ObjectAndAarryType, path: string) {
  const paths = path
    .replace(/\[(\w+)\]/g, ".$1")
    .replace(/\["(\w+)"\]/g, ".$1")
    .replace(/\['(\w+)'\]/g, ".$1")
    .split(".");

  return paths.reduce((x, y) => x?.[y], data);
}


export function compare<T extends object, K extends T>(
  o1: T,
  o2: K,
  type: "shallow" | "deep"
): boolean {
  if (o1 === o2) return true;

  // 如果基本类型不相等或者不是引用类型，并且不是对象就不用执行了
  if (
    typeof o1 !== "object" ||
    o1 === null ||
    typeof o2 !== "object" ||
    o2 === null
  ) {
    return false;
  }

  const len1 = Object.keys(o1).length;
  const len2 = Object.keys(o2).length;

  if (len1 !== len2) return false;

  for (let key of Object.keys(o1)) {
    if (type === "shallow") {
      if (o1[key as keyof T] !== o2[key as keyof T]) return false;
    }

    if (type === "deep") {
      const result = compare(
        o1[key as keyof T] as any,
        o2[key as keyof T],
        "deep"
      );
      if (!result) return result;
    }
  }

  return true;
}


/** 对象浅比较，只比较第一层数据 */
export function isSameShallow<T extends object, K extends T>(o1: T, o2: K) {
  return compare(o1, o2, "shallow");
}

/** 对象深比较，比较所有层数据， 深比较主要的点在于，Object或Array实例的每一个属性，基本类型或者特殊构造器类型是否相同 */
export function isSameDeep<T extends object, K extends T>(o1: T, o2: K) {
  return compare(o1, o2, "deep");
}


const dataType = {
  object: "[object Object]",
  array: "[object Array]",
};
export function clone<T extends object>(o: T, type: "shallow" | "deep"): T {
  const objType = getType(o);
  if (objType === dataType.object) {
    const obj: any = {};
    Object.keys(o).forEach((k) => {
      obj[k] =
        type === "shallow"
          ? o[k as keyof T]
          : clone(o[k as keyof T] as any, "deep");
    });
    return obj;
  }

  if (objType === dataType.array) {
    return (o as any as Array<any>).map((item) =>
      type === "shallow" ? item : clone(item, "deep")
    ) as any;
  }

  return o;
}

/** 浅拷贝，只拷贝第一层数据 */
export function shallowClone<T extends object>(obj: T): T {
  return clone(obj, "shallow");
}

/** 深克隆，深克隆主要的点在于，复制Object或Array实例的每一个属性，基本类型和特殊构造器类型*/
export function deepClone<T extends object>(obj: T): T {
  return clone(obj, "deep");
}

export function isObject(value: unknown) {
  return value !== null && typeof value === "object";
}

/** 判断值，使用深比较 */
export function hasChanged(
  value: ObjectAndAarryType,
  oldValue: ObjectAndAarryType
) {
  return !isSameDeep(value, oldValue);
}

/** 单例模式 */
export function getSingle<T>(fn: () => T) {
  let res: T;

  return function (this: unknown, ...args: any) {
    return res || (res = fn.apply(this, args));
  };
}
