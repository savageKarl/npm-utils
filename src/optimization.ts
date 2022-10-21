type Callback = (...args: any) => unknown;

/**
 * @description 防抖，防止抖动，将一段时间内的多次触发控制为一次触发
 * @param fn 回调函数
 * @param delay 延迟时间
 * @param immediate 是否立即调用
 */
export function debounce(fn: Callback, delay = 1500, immediate = true) {
  let timer: NodeJS.Timeout | null;

  return function (this: any, ...args: any) {
    if (timer) clearTimeout(timer);
    if (immediate) {
      if (!timer) fn.apply(this, args);
      timer = setTimeout(() => (timer = null), delay);
    } else {
      timer = setTimeout(() => fn.apply(this, args), delay);
    }
  };
}

type ThrottleType = "timer" | "timestamp";

/**
 * @description 节流，将一段时间内的多次触发控制为一定时间间隔内触发一次
 * @param fn 回调函数
 * @param delay 延迟时间
 * @param immediate 是否立即调用
 */
export function throttle(
  fn: Function,
  delay = 1500,
  type: ThrottleType = "timestamp"
) {
  if (type === "timestamp") {
    let prevTime = 0;

    return function (this: any, ...args: any) {
      const currentTime = Date.now();
      if (currentTime - prevTime > delay) {
        fn.apply(this, args);
        prevTime = currentTime;
      }
    };
  } else {
    let timer: NodeJS.Timeout | null;

    return function (this: any, ...args: any) {
      if (!timer) {
        timer = setTimeout(() => {
          fn.apply(this, args);
          timer = null;
        }, delay);
      }
    };
  }
}
