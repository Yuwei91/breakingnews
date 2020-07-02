$(function () {

  const layer = layui.layer
  const form = layui.form
  var laypage = layui.laypage

  template.defaults.imports.dataFormat = function (date) {
    const dt = new Date(date)
    const y = dt.getFullYear()
    const m = addZero(dt.getMonth() + 1)
    const d = addZero(dt.getDate())

    const hh = addZero(dt.getHours())
    const mm = addZero(dt.getMinutes())
    const ss = addZero(dt.getSeconds())

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
  }

  function addZero(n) {
    return n > 9 ? n : '0' + n
  }

  const q = {
    pagenum : 1,
    pagesize : 2,
    cate_id : '',
    state : ''
  }

  // 初始化文章列表
  initArtList()

  //  初始化文章类别
  initCate()

  function initArtList() {
    $.ajax({
      type: 'get',
      url: '/my/article/list',
      data: q,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        // console.log(res)
        const htmlstr = template('tpl-list', res)
        $('tbody').html(htmlstr)
        // form.render()
      }
    })
  }

  function initCate() {
    $.ajax({
      post: 'get',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        const htmlstr = template('tpl-cate', res)
        $('[name="cate_id"]').html(htmlstr)
        form.render()
      }
    })
  }

  $('#searchform').submit(function (e) {
    e.preventDefault()
    const cate_id = $('[name="cate_id"]').val()
    const state = $('[name="state"]').val()
    q.cate_id = cate_id
    q.state = state
    initArtList()
  })

})