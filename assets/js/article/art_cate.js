$(function () {
  const form = layui.form
  const layer = layui.layer

  initArtcate()

  function initArtcate() {
    $.ajax({
      type: 'get',
      url: '/my/article/cates',
      success: function (res) {
        const htmlstr = template('tpl-getcate', res)
        $('tbody').html(htmlstr)
      }
    })
  }

  // 点击 添加类别 弹出 添加框
  let addId = null
  $('#addbtn').on('click', function () {
    addId = layer.open({
      type: 1,
      title: '添加文章分类',
      area: ['500px', '250px'],
      content: $('#dialog-add').html()
    })
  })

  // 点击 确认添加 按钮,触发表单submit事件,发送数据
  // 表单是动态渲染的,需要注册委托事件
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    // console.log($(this).serialize())
    $.ajax({
      method: 'post',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.msg)
        }
        layer.msg(res.msg)
        initArtcate()
        layer.close(addId)
      }
    })
  })

  // 点击 编辑 弹出框, 根据id获取文章分类数据
  let editId = null
  $('tbody').on('click', '.btn-edit', function () {
    editId = layer.open({
      type: 1,
      title: '修改文章分类',
      area: ['500px', '250px'],
      content: $('#dialog-edit').html()
    })

    const id = $(this).data('id')
    $.ajax({
      type: 'get',
      url: `/my/article/cates/${id}`,
      success: function (res) {
        form.val('form-edit', res.data)
      }
    })
  })

  // 点击确认修改, 执行表单submit事件,根据id更新文章分类数据
  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新文章分类数据失败')
        }
        layer.msg('更新文章分类数据成功')
        initArtcate()
        layer.close(editId)
      }
    })
  })

  // 给删除注册点击事件, 根据id删除数据
  $('tbody').on('click', '.btn-del', function () {
    const id = $(this).data('id')
    layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        type: 'get',
        url: `/my/article/deletecate/${id}`,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg('删除文章分类数据失败')
          }
          layer.msg('删除文章分类数据成功')
          layer.close(index)
          initArtcate()
        }
      })
    })
  })

})
