import { UIBase } from "./uibase.js";

/**
 * 
 * @class
 * @classdesc 添加table数据到编辑业务页面,
 * 使用到bootstrap的模态框，
 * 生成的element对象为模态框的<div class="modal-content">内容，
 * 需绑定在模态框的<div class="modal-dialog" role="document">下
 * @extends UIBase
 * @author 陈宇鸿 <785344575@qq.com>
 */
class UItableModal extends UIBase {
    /**
     * 是构造器啊
     * @constructor
     */
    constructor(table_data) {
        super();
        this.table_data = table_data; //选中的table对象

    }

    _bindEvent(element) {

        //提交按钮点击事件 -- 修改相应数据并关闭模态框
        const sumbit_btn = element.getElementById('submit_btn_modal');

        const cancel_btn = element.getElementById('submit_btn_modal');
        sumbit_btn.on('click', () => {
            var result_data = []; //存储已选择的列信息
            const checkbox_list = element.getElementsByName('checkbox_tableModal');
            checkbox_list.forEach(item => {
                if (item.checked) {
                    result_data.push(item.value);
                }
            });

            //修改数据
            this.table_data.col_list = result_data;

            //关闭模态框
            cancel_btn.click();
        });



    }

    _render() {
        var modal_body = "";

        this.table_data.col_list.forEach(item => {
            modal_body += `
                <label class="checkbox-inline">
                    <input type="checkbox" name="checkbox_tableModal" value="${item}">${item}
                </label>
            `;
        });




        return `
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">选择你想要添加的列名</h4>
                </div>
                <div class="modal-body">
                    ${modal_body}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">提交</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                </div>
            </div>
        `;
    }




}