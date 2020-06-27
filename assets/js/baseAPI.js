// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (option) {
  // option.url = 'http://ajax.frontend.itheima.net' + option.url
  option.url = 'http://127.0.0.1:3010' + option.url
  // http://127.0.0.1:3010
})
