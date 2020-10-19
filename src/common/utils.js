// 防抖函数
export function debounce(func, delay) {
  let timer = null;

  return function (...args) {
    //闭包不会销毁timer
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}