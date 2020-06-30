$(function () {
    const form = layui.form
    const layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samepwd: function (value) {
            const oldpwd = $('[name="oldPwd"]').val()
            if (value === oldpwd) {
                return '新密码不能一致'
            }
        },
        repwd: function (value) {
            const newpwd = $('[name="newPwd"]').val()
            if (value !== newpwd) {
                return '确认密码必须一致'
            }
        }
    })

    // 给表单注册submit事件
    $('#pwdform').on('submit', function (e) {
        e.preventDefault()
        const inputvals = form.val('pwdform')
        // 自己的接口不接受repwd的值,用delete删除
        delete inputvals.rePwd
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: inputvals,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新密码失败')
                }
                layer.msg('更新密码成功')
                $('[type="reset"]').click()
            }
        })
    })

})