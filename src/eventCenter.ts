import { deepClone } from "./functions";
import type { ObjectAndAarryType } from "./functions";

interface SubscribeType {
  [index: string]: Array<(...args: any) => unknown>;
}

const EventCenter = {
  subscribeList: {} as SubscribeType,
  // 储存已发布未订阅的消息
  pubAndNoSub: {} as SubscribeType,
  subscribe(name: string, fn: (...arg: any) => unknown) {
    if (this.pubAndNoSub[name]) {
      fn(this.pubAndNoSub[name]);
      Reflect.deleteProperty(this.pubAndNoSub, name);
    }
    this.subscribeList[name]?.push(fn) || (this.subscribeList[name] = [fn]);
  },
  publish(name: string, value: any) {
    const fns = this.subscribeList[name];
    if (!fns || fns.length === 0) {
      this.pubAndNoSub[name] = value;
    } else {
      fns.forEach((fn) => fn(value));
    }
  },
  remove(name: string, fn: () => unknown) {
    const fns = this.subscribeList[name];
    if (!fns || fns.length === 0) return;
    if (fn) {
      fns.forEach((_fn, index) => {
        if (_fn === fn) {
          this.subscribeList[name].splice(index, 1);
        }
      });
    } else {
      this.subscribeList[name] = [];
    }
  },
};

// 这里无法提示 EventCenter 里面的每一个属性，不知道怎么做，要学一学类型体操才能写
/** 给对象添加发布订阅的事件中心 */
export function installEventCenter(obj: ObjectAndAarryType) {
  const cloneObj = deepClone(EventCenter);
  for (let k in EventCenter) obj[k] = cloneObj[k];
  return obj;
}
