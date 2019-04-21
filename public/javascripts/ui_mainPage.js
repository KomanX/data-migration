import { UIBase } from "./uibase.js";

/**
 * 
 * @class
 * @classdesc 数据迁移配置页面整体UI渲染功能类
 * @extends UIBase
 * @author 陈宇鸿 <785344575@qq.com>
 */
class UImainPage extends UIBase {
    /**
     * 是构造器啊
     * @constructor
     */
    constructor(uiManager, result_data) {
        super();
        this.result_data = result_data;
        this.uiManager = uiManager;
    }

    _bindEvent(element) {
        //添加业务按钮点击事件
        const addWork_btn = element.getElementById('addWork');
        addWork_btn.on('click', () => {
            this.uiManager.changeBox(1, -1);
        });

        //编辑业务按钮点击事件
        const editWork_btn = element.getElementById('editWork');
        editWork_btn.on('click', () => {
            this.uiManager.changeBox(1, editWork_btn.getAttribute("index"));
        })
    }

    _render() {
        var msg = "";
        if (this.result_data) {
            //用户有添加业务
            //遍历业务信息
            this.result_data.forEach((element, i) => {
                msg += `
                    <div>
                        <div>
                            msg
                        </div>
                        <button index="${i}">编辑</button>
                    </div>
                `;
            });

        } else {
            //用户还未添加业务
            msg = `
                <div>请开始添加业务！</div>
            `;
        }
        return `
            <div>
                ${msg}
            </div>
        `;
    }
}