$(function () {

  getuserinfo()

  const layer = layui.layer
  $('#btnlogout').on('click', function (e) {
    layer.confirm('是否确定退出登录?', { icon: 3, title: '提示' }, function (index) {
      localStorage.removeItem('token')
      location.href = './login.html'
      layer.close(index);
    })
  })

  function getuserinfo() {
    $.ajax({
      type: 'get',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) return layui.layer.msg('获取用户信息失败！')
        renderAvatar(res.data)
      }
    })
  }

  function renderAvatar(user) {
    const { username, nickname, user_pic } = user
    const name = nickname || username
    $('.welcome').html(`欢迎&nbsp;&nbsp;${name}`)
    if (!user_pic) {
      $('.layui-nav-img').hide()
      const first = name[0].toUpperCase()
      $('.textAvatar').html(first).show()
    } else {
      $('.textAvatar').hide()
      $('.layui-nav-img').attr('src', user_pic).show()
    }
  }
})