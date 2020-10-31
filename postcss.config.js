module.exports = {
  plugins:{
      autoprefixer:{},
      "postcss-px-to-viewport":{
        /* 具体可以查看浏览器f12的移动端的完美视口 */
          viewportWidth:375,//视窗的宽度，对应的是我们设计稿的宽度(现在很多都是750高清屏-retina 1点2像素)
          viewportHeight:667,//视窗的高度，对应的是我们设计稿的高度(375:667为iphone6的屏幕比例-完美视口大小)
          unitPrecision:5,//制定‘px’转换为视窗单位的小数位数（很多时候无法整除）
          viewportUnit:'vw',//指定需要转换成的视窗单位，建议使用vw
          selectorBlackList:['ignore','tab-bar','tab-bar-item'],//指定不需要转换的类，
          minPixelValue:1,//小于或等于‘1px’不转换为视窗单位
          mediaQuery:false,//允许在媒体查询中转换为‘px’
          /* exclude: [/TabBar/] */  //指定不要转换的文件(文件名必须用正则表达式表示)
      },

  }
}