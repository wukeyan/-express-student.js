var fs = require('fs')
//专门用来包装路由的
var express = require('express')
var Student = require('./student')

//创建一个路由容器
var router = express.Router()
router.get('/students', function (req, res) {
    //将json文件里的字符串转化为utf-8编码,就不用写toString方法了
    fs.readFile('db.json', 'utf8', function (err, data) {
        if (err) {
            return res.status(500).send('Server error')
        }
        var students = JSON.parse(data).students

        res.render('index.html', {
            fruits: [
                '苹果',
                '香蕉',
                '橘子'
            ],
            students: students  //文件中读到的数据一定是字符串，一定要手动转化为json格式的对象
        })
    })
})


//这里的路径/students/new就是index.html里的a标签的href的路径
router.get('/students/new', function (req, res) {  //实现在index.html中点击a链接实现跳转
    res.render('new.html')   //渲染出网页
})

router.post('/students/new', function (req, res) {  //在new.html中当表单收到post方法提交的时候
    // console.log(req.body) 
     //req.body会拿到[Object: null prototype] {
    //     name: '伍克艳',
    //     sex: '1',
    //     age: '11',
    //     hobbies: '没有兴趣了222'
    //   }
    Student.save(req.body, function (err) {
        if (err) {
            return res.status(500).send('Server error')
        }
        res.redirect('/students')
    })
})

router.get('/students/edit', function (req, res) {
    // 编辑页面要三步
    //1，在客户端列表页处理链接问题（需要有id参数）
    //2.获取要编辑的学生id
    // 3，渲染编辑页面(首先要线通过id找到学生的信息，再使用模板引擎渲染页面)
    // console.log(req.query.id)//获取index.html中a链接地址中的id
    Student.findById(parseInt(req.query.id), function (err, Newstudent) {  //调用student.js中的函数
        if (err) {
            return res.status(500).send('Server error')
        }
        // console.log(student)
        res.render('edit.html', {
            Newstudent: Newstudent
        })
    })
})

router.post('/students/edit', function (req, res) {
    //1,获取表单数据
    // req.body
    // 2,更新
    // Student.updateById()
    // 3.发送响应
    Student.updateById(req.body, function (err) {
        if (err) {
            return res.status(500).send('Server error')
        }
        res.redirect('/students')
    })
})

router.get('/students/delete', function (req, res) {
    //1，获取要删除的id
    // 2，根据id执行删除操作
    // 3，根据操作结果发送响应数据
    // console.log(req.query.id)  req.query.id获取地址栏的id
    Student.deleteById(req.query.id, function (err) {
        if (err) {
            return res.status(500).send('Server error')
        }
        res.redirect('/students')
    })
})
//导出单个函数router
module.exports = router

