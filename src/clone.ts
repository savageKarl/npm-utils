const dataType = {
  object: "[object Object]",
  array: "[object Array]",
};

export function getType(o: any) {
  return Object.prototype.toString.call(o);
}

export class Copy {
  private clone<T extends object>(o: T, type: "shallow" | "deep"): T {
    const objType = getType(o);
    if (objType === dataType.object) {
      const obj: any = {};
      Object.keys(o).forEach((k) => {
        obj[k] =
          type === "shallow"
            ? o[k as keyof T]
            : this.clone(o[k as keyof T] as any, "deep");
      });
      return obj;
    }
  
    if (objType === dataType.array) {
      return (o as any as Array<any>).map((item) =>
        type === "shallow" ? item : this.clone(item, "deep")
      ) as any;
    }
  
    return o;
  }

  shallowClone<T extends object>(obj: T): T {
    return this.clone(obj, "shallow");
  }

  deepClone<T extends object>(obj: T): T {
    return this.clone(obj, "deep");
  }
  
}

// export function clone<T extends object>(o: T, type: "shallow" | "deep"): T {
//   const objType = getType(o);
//   if (objType === dataType.object) {
//     const obj: any = {};
//     Object.keys(o).forEach((k) => {
//       obj[k] =
//         type === "shallow"
//           ? o[k as keyof T]
//           : clone(o[k as keyof T] as any, "deep");
//     });
//     return obj;
//   }

//   if (objType === dataType.array) {
//     return (o as any as Array<any>).map((item) =>
//       type === "shallow" ? item : clone(item, "deep")
//     ) as any;
//   }

//   return o;
// }

// /** 浅拷贝，只拷贝第一层数据 */
// export function shallowClone<T extends object>(obj: T): T {
//   return clone(obj, "shallow");
// }

// /** 深克隆，深克隆主要的点在于，复制Object或Array实例的每一个属性，基本类型和特殊构造器类型*/
// export function deepClone<T extends object>(obj: T): T {
//   return clone(obj, "deep");
// }
