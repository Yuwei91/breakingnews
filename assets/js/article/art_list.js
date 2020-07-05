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
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state: ''
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
        // 渲染分页
        initpage(res.total)
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

  function initpage(total) {
    laypage.render({
      elem: 'pagebox',
      count: total,
      limit: q.pagesize,
      curr: q.pagenum,
      limits: [2, 3, 5, 10],
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
      jump: function (obj, first) {
        // console.log(obj) obj包含当前分页所有信息
        q.pagesize = obj.limit
        q.pagenum = obj.curr
        if (!first) {
          initArtList()
        }
      }
    })
  }

  // 给删除按钮绑定点击事件
  $('tbody').on('click', '.btnDel', function () {
    const len = $('.btnDel').length
    const Id = $(this).data('id')
    layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
      //do something
      $.ajax({
        type: 'get',
        url: '/my/article/delete/' + Id,
        success: function (res) {
          // console.log(res)
          if (res.status !== 0) {
            return layer.msg(res.msg)
          }
          layer.msg(res.msg)
          if (len === 1) {
            q.pagenum = q.pagenum === 1 ? 1 : (q.pagenum - 1)
          }
          initArtList()
        }
      })
      layer.close(index);
    })
  })

  // 给编辑按钮注册点击事件
  $('tbody').on('click', '.btnEdit', function () {
    const artId = $(this).data('id') 
    localStorage.setItem('artId', artId)
    location.href = './art_pub.html'
  })

})