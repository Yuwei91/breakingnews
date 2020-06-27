$(function () {
  // 显示隐藏
  $('#link_reg').on('click', function () {
    $('.logbox').hide()
    $('.regbox').show()
  })
  $('#link_log').on('click', function () {
    $('.regbox').hide()
    $('.logbox').show()
  })
  // 表单验证
  const form = layui.form
  const layer = layui.layer
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    repwd: function (value) {
      let fpwd = $('#regform [name=password]').val()
      if (value !== fpwd) return '两次密码输入不一致';
    }
  })

  // 监听注册表单的提交事件
  $('#regform').on('submit', function (e) {
    e.preventDefault()
    const data = {
      username: $('#regform [name=username]').val(),
      password: $('#regform [name=password]').val()
    }
    $.post('/api/reguser', data, function (res) {
      console.log(res)
      if (res.status !== 0) return layer.msg(res.msg)
      layer.msg(res.msg)
      $('#regform [name=username]').val('')
      $('#regform [name=password]').val('')
      $('#regform [name=repassword]').val('')
      $('#link_log').click()
    })
  })

  // 监听登录框的提交事件
  $('#logform').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/api/login',
      data: $(this).serialize(),
      success: function (res) {
        // console.log(res)
        if (res.status !== 0) return layer.msg(res.msg)
        layer.msg(res.msg)
        localStorage.setItem('token', res.token)
        location.href = '/index.html'
      }
    })
  })

})