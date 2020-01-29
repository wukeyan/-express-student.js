var fs = require('fs')
var DBpath = './db.json'
//查询所有的学生
exports.find = function (callback) {
    fs.readFile(DBpath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        callback(null, JSON.parse(data).students)   //读文件读到的内容转化成json对象返回出去
    })
}
//添加保存学生
exports.save = function (Newstudent, callback) {
    fs.readFile(DBpath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        Newstudent.id = students[students.length - 1].id + 1  
        students.push(Newstudent)

        var fileData = JSON.stringify({
            students: students
        })
        fs.writeFile(DBpath, fileData, function (err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}
//更新学生信息
exports.updateById = function (studented, callback) {
    fs.readFile(DBpath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        //把students转化为js对象
        var students = JSON.parse(data).students

        studented.id = parseInt(studented.id)

        //要改谁就要把谁找出来
        var stu = students.find(function (item) {
            return item.id === parseInt(studented.id)
        })
        for (var key in studented) {
            stu[key] = studented[key]
        }
        //把对象转成字符串
        var fileData = JSON.stringify({
            students: students
        })
        //写入bd.json
        fs.writeFile(DBpath, fileData, function (err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}  //因为它们要操作文件，所以都是异步的，都得使用回调函数

exports.findById = function (id, callback) {
    fs.readFile(DBpath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        var ret = students.find(function (item) {
            return item.id === parseInt(id)
        })
        callback(null, ret)
    })
}

exports.deleteById = function (id, callback) {
    fs.readFile(DBpath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        //  ES6的findIndex方法专门用来根据条件找下标
        var deleteId = students.findIndex(function (item) {  //这找到的是这个id所在的一个对象
            return item.id = parseInt(id)
        })
        students.splice(deleteId, 1)
        //把对象转成字符串
        var fileData = JSON.stringify({
            students: students
        })
        students.id = parseInt(students.id)
        //写如bd.json
        fs.writeFile(DBpath, fileData, function (err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}
