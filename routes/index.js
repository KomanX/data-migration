var express = require('express');

var mysql = require('mysql');

var router = express.Router();

var mysqlconnect = undefined;
var db_data = undefined;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Mysql到Mongodb数据迁移程序', db_data: db_data });
});

/* 连接mysql */
router.post('/connectMysql', function(req, res, next) {
    const {
        host, //主机地址
        user, //用户名
        password, //密码
        database, //数据库名
        port //端口号
    } = req.body;

    //定义mysql连接
    mysqlconnect = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database,
        port: port
    });

    //连接mysql，若成功连接返回空对象，若失败返回错误信息
    mysqlconnect.connect((err) => {
        if (err) {
            res.send({
                error: err.message
            });
        } else {
            res.send({});
        }
    });
})

/* 获取已连接的mysql数据库结构 */
router.get('/getMysqlConstruction', async function(req, res, next) {
    db_data = {};
    try {
        //获取所有table列表信息
        var table_list = await mysqlconnect.query('show tables;');
        table_list.forEach(element => {
            //往db_data中添加表信息
            db_data[element] = {
                col_list: []
            };

            //获取指定table中列信息
            var column_list = await mysqlconnect.query(`SHOW FULL COLUMNS FROM ${element};`);
            //获取列成功，往相应的表中添加列信息
            column_list.forEach(item => {
                db_data[element].col_list[item] = {
                    type: item.Type, //数据类型
                    f_flag: null
                };
            })

            //获取指定表的外键表信息
            var result = await mysqlconnect.query(`
            select
              COLUMN_NAME, REFERENCED_TABLE_NAME
            from 
              INFORMATION_SCHEMA.KEY_COLUMN_USAGE
            where 
              TABLE_NAME = ${element} AND REFERENCED_TABLE_NAME is not null;`);
            //获取外键表信息成功，往相应的列中添加外键信息
            result.forEach(item => {
                db_data[element].col_list[item.COLUMN_NAME].f_flag = {
                    rTName: item.REFERENCED_TABLE_NAME //外键表的表名
                };
            })
        });

        //所有操作都成功完成，向前端返回空对象
        res.send({});

    } catch (e) {
        //发生错误，初始化db_data，向前端返回错误信息
        db_data = undefined;
        res.send({
            error: err.message
        });
    }



})

module.exports = router;