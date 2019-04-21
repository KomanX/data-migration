import { UIBase } from "./uibase.js";
import { UItableModal } from "./ui_tableModal";

/**
 * 
 * @class
 * @classdesc 编辑业务页面整体UI渲染功能类
 * @extends UIBase
 * @author 陈宇鸿 <785344575@qq.com>
 */
class UIeWPage extends UIBase {
    /**
     * 是构造器啊
     * @constructor
     */
    constructor(uiManager) {
        super();
        this.data = null;
        this.uiManager = uiManager;
        this.result_data_index = 0; //当前业务编辑页面的result_data在总的result_data中的索引
        if (result_data) {
            this.flag = 1; //修改已有业务
        } else {
            this.flag = 0; //新建业务
        }
    }

    _bindEvent(element) {
        //确认按钮点击事件 -- 提交修改数据并返回mainPage
        const submit_btn = element.getElementById('submit_btn_eWP');
        submit_btn.on('click', () => {
            if (this.flag == 0) {
                //新建业务提交
                this.uiManager.result_data.push(this.result_data);
            } else if (this.flag == 1) {
                //修改指定业务内容
                this.uiManager.result_data[this.result_data_index] = this.result_data;
            }

            //修改完数据返回mainPage
            this.uiManager.changeBOx(1);
        });

        //取消按钮点击事件 -- 直接返回mainPage
        const cancel_btn = element.getElementById('cancel_btn_eWP');
        cancel_btn.on('click', () => {
            this.uiManager.changeBOx(1);
        });

        //选择数据表按钮点击事件 -- 打开选择数据表页面
        const openTable_btn_List = element.getElementsByClass('openTable_btn');
        openTable_btn_List.forEach(item => {
            item.on('click', () => {
                var table = this.data.msg.table_list[item.attr(table_name)];
                var ui_tableModal = new UItableModal(table);
                ui_tableModal.bind("#tableModal");
            });
        });
    }

    _render() {
        //标题内容
        var title_content = `
            <h1>编辑业务 -- ${this.data.wname}</h1>
        `;

        //业务信息内容
        var workmsg_content = "";
        workmsg_content += `
            ${this.data.msg.description}<span>编辑简介</span>
        `;
        for (var item in this.data.msg.table_list) {
            var col_list_content = "";
            this.data.msg.table_list[item].forEach(i => {
                col_list_content += `
                    <h4>${i}</h4>
                `;
            });
            workmsg_content += `
                <h3>数据表 -- ${item}</h3>
                ${col_list_content}
            `;
        };

        //数据表内容
        var table_content = "";
        for (var item in this.data.msg.table_list) {
            table_content += `
                <button class="openTable_btn" table_name="${item}" type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#tableModal">
                    ${item}
                </button>
            `;
        };





        return `
            <div>
                <div class="title_eWP">
                    ${title_content}
                </div>
                <div class="workmsg_content_eWP">
                    ${workmsg_content}
                </div>
                <div class="table_content_eWP">
                    ${table_content}
                </div>
                <div class="btngroup_eWP">
                    <button id="submit_btn_eWP">提交</button>
                    <button id="cancel_btn_eWP">取消</button>
                </div>
                <div id="tableModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                    <div class="modal-dialog" role="document">
                    </div>
                </div>
            </div>
        `;
    }
}