$(function () {
  // 表单验证
  const form = layui.form
  const layer = layui.layer

  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度只能在1~6个字符之间'
      }
    }
  })
// 初始化表单数据
  inituserinfo()

  function inituserinfo() {
    $.ajax({
      type: 'get',
      url: '/my/userinfo',
      success: function (res) {
        // console.log(res)
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败！')
        }
        // 成功则调用form.val('form1', data)未表单快速赋值
        form.val('formuser', res.data)
      }
    })
  }

  //重置表单数据
  $('#btnlogout').on('click', function (e) {
    e.preventDefault()
    inituserinfo()
  })

  // 监听表单提交事件
  $('.layui-form').submit(function (e) {
    e.preventDefault()
    const inputdata = form.val('formuser')
    delete inputdata.username
    // console.log(inputdata)
    // const fdata = $(this).serialize()
    // console.log(fdata)
    $.ajax({
      type: 'post',
      url: '/my/userinfo',
      data: inputdata,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新用户信息失败！') 
        } 
        layer.msg('更新用户信息成功！')
        // console.log(window.parent)
        window.parent.getuserinfo()
      }
    })
  })

})
// 自己的接口: 不接受多余的username属性
// 第一种解决方法:
//  1. input[name=username]标签加disabled属性, 表单序列化取值时娶不到对应值
//  2. jquery表单序列化取值发送

// 第二种方法:
// 1. disabled 或者 readyonly 都可以;
// 2. layui内置form.val()方法获取表单信息后,通过delete去除username属性的值

// 小结:
// 1. console.log($(this).serialize()) 表单序列化打印结果如下:
//   id=10&username=yuwei91&nickname=%E4%BD%99%E5%91%B31&email=yw%40qq.com
//   所以不能使用delete删除(delete用于删除对象属性),只使用disabled忽略取值配合实现
// 2. layui内置form.val()方法获取表单信息打印结果是一个对象
//   所以配合delete删除对应属性取值实现功能




// $(function() {
//   var form = layui.form
//   var layer = layui.layer

//   form.verify({
//     nickname: function(value) {
//       if (value.length > 6) {
//         return '昵称长度必须在 1 ~ 6 个字符之间！'
//       }
//     }
//   })

//   initUserInfo()

  // 初始化用户的基本信息
  // function initUserInfo() {
  //   $.ajax({
  //     method: 'GET',
  //     url: '/my/userinfo',
  //     success: function(res) {
  //       if (res.status !== 0) {
  //         return layer.msg('获取用户信息失败！')
  //       }
  //       // console.log(res)
  //       // 调用 form.val() 快速为表单赋值
  //       form.val('formUserInfo', res.data)
  //     }
  //   })
  // }

  // // 重置表单的数据
  // $('#btnReset').on('click', function(e) {
  //   // 阻止表单的默认重置行为
  //   e.preventDefault()
  //   initUserInfo()
  // })

  // 监听表单的提交事件
//   $('.layui-form').on('submit', function(e) {
//     // 阻止表单的默认提交行为
//     e.preventDefault()
//     // 发起 ajax 数据请求
//     $.ajax({
//       method: 'POST',
//       url: '/my/userinfo',
//       data: $(this).serialize(),
//       success: function(res) {
//         if (res.status !== 0) {
//           return layer.msg('更新用户信息失败！')
//         }
//         layer.msg('更新用户信息成功！')
//         // 调用父页面中的方法，重新渲染用户的头像和用户的信息
//         window.parent.getUserInfo()
//       }
//     })
//   })
// })
