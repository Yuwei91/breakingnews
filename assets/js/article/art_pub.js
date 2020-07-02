$(function () {

  const layer = layui.layer
  const form = layui.form

  let ARTSTATE = '已发布'

  // 初始化下拉菜单文章类别数据
  initArtCate()
  initEditor()

  // 1. 初始化图片裁剪器
  var $image = $('#image')

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }

  // 3. 初始化裁剪区域
  $image.cropper(options)

  // 为选择封面按钮模拟点击上传文件
  $('#chooseImg').on('click', function () {
    $('#file').click()
  })

  // 上传文件监听
  $('#file').on('change', function (e) {
    const files = e.target.files
    if (files.length === 0) {
      return
    }
    const newImgURL = URL.createObjectURL(files[0])
    $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径
      .cropper(options)        // 重新初始化裁剪区域
  })

  // 点击 存为草稿 按钮时,修改 ARTSTATE 的值
  $('#savebtn').on('click', function (e) {
    ARTSTATE = '草稿'
  })

  // 为表单注册submit事件
  $('#pubform').submit(function (e) {
    e.preventDefault()
    // titlt + cata_id + content
    let fd = new FormData($('#pubform')[0])
    fd.append('state', ARTSTATE)
    $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 400,
        height: 280
      })
      .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        fd.append('cover_img', blob)
        pubArticle(fd)
      })
  })

  function initArtCate() {
    $.ajax({
      type: 'get',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return
        }
        // console.log(res)
        layer.msg(res.message)
        const htmlstr = template('tpl-artcate', res)
        $('[name="cate_id"]').html(htmlstr)
        form.render()
      }
    })
  }

  function pubArticle(fd) {
    $.ajax({
      type: 'post',
      url: '/my/article/add',
      data: fd,
      contentType: false,
      processData: false,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg(res.message)
        location.href = '/my01/breakingnews/article/art_list.html'
      }
    })
  }

})