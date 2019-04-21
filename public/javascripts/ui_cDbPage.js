import { UIBase } from "./uibase.js";

/**
 * 
 * @class
 * @classdesc 选择mysql数据库页面整体UI渲染功能类
 * @extends UIBase
 * @author 陈宇鸿 <785344575@qq.com>
 */
class UIcDbPage extends UIBase {
    /**
     * 是构造器啊
     * @constructor
     */
    constructor(uiManager) {
        super();
        this.uiManager = uiManager;
    }

    _bindEvent(element) {
        var connect_btn = element.getElementById("connect");
        var input_list = element.getElementsByTag('input');
        connect_btn.on('click', () => {
            //连接数据库
            $.post('/connectMysql', {
                host: input_list[0].value,
                user: user,
                password: password,
                database: database,
                port: port
            }, res => {
                if (res.error) {
                    //如果登录失败
                    alert(res.error);
                } else {
                    //登录成功
                    alert("连接成功！开始获取数据库结构");
                    //获取数据库结构
                    $.get('/getMysqlConstruction', res => {
                        if (res.error) {
                            //如果获取数据库结构失败
                            alert(res.error);
                        } else {
                            this.uiManager.db_data = res.db_data;
                            alert("获取数据库结构成功！开始数据迁移配置");
                            this.uiManager.changeBox(1);
                        }
                    })
                }
            });
        });
    }

    _rander() {
        return `
            <div>
                <div>title</div>
                <div>
                    数据库连接指令
                    <input>
                </div>
                <div>
                    密码
                    <input>
                </div>
                <div>
                    <button id="connect">确认连接</button>
                </div>
            </div>
        `;
    }
}