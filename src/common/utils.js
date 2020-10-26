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
};
/* 
  RegExp.$1是RegExp的一个属性,指的是与正则表达式匹配的第一个 子匹配(以括号为标志)字符串，以此类推，RegExp.$2，RegExp.$3，..RegExp.$99总共可以有99个匹配

  其实RegExp这个对象会在我们调用了正则表达式的方法后, 自动将最近一次的结果保存在里面, 所以如果我们在使用正则表达式时, 有用到分组, 那么就可以直接在调用完以后直接使用RegExp.$xx来使用捕获到的分组内容, 如下:


  例子:

  var r= /^(\d{4})-(\d{1,2})-(\d{1,2})$/; //正则表达式 匹配出生日期(简单匹配)     

  r.exec('1985-10-15');

  s1=RegExp.$1;

  s2=RegExp.$2;

  s3=RegExp.$3;

  alert(s1+" "+s2+" "+s3)//结果为1985 10 15
*/
export function formatDate(date, fmt) {
  // 1.获取年份
  // 2019
  // y+ -> 1个或多个y
  // y* -> 0个或多个y
  // y? -> 0个或1个y
  // yy 19
  // yyyy 2019
  // yyy 019
  // y 9
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  // 2.获取
  // M+ -> 正则表达式中的一个规则
  // M
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));

    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};