import { UIcDbPage } from "./ui_cDbPage.js";
import { UImainPage } from "./ui_mainPage.js";
import { UIeWPage } from "./ui_eWPage.js";
import { UItransPage } from "./ui_transPage.js";

class UIManager {
    constructor(binddiv) {

        this.db_data = null; //mysql查询到的数据库结构相关数据
        this.result_data = null; //用户选择结果相关数据

        //所有UI对象
        var ui_cDbPage = new UIcDbPage(this);
        var ui_mainPage = new UImainPage(this, this.result_data);
        var ui_eWPage = new UIeWPage(this, this.result_data);
        var ui_transPage = new UItransPage(this);

        //this.box_list用来帮助实现内容的切换
        this.box_list = [ui_cDbPage, ui_mainPage, ui_eWPage, ui_transPage];

        //初始显示页面
        this.box_list[0].bind(binddiv);




    }


    /** 
     * 切换显示内容，
     * num -- 需要显示内容在box_list中的索引   
     * arg -- 给显示内容传入的数据在result_data中的索引 
     *        若不填则将所有result_data传入显示内容所在对象
     *        若传入arg为'-1',则不传入数据
     */
    changeBox(num, arg = false) {
        if (!arg) {
            this.box_list[num].result_data = this.result_data;
        } else {
            if (arg == -1) {
                this.box_list[num].result_data = null;
            } else {
                this.box_list[num].result_data = this.result_data[arg];
                this.box_list[num].result_data_index = arg;
            }
        }


        this.box_list[num].render();
        this.box_list[num].bind(boxdiv);


        //bind eWPage
        // this.box_list[2].data = this.result_data[1];
        // this.box_list[2].render();
        // this.box_list[2].bind(boxdiv);

        //bind mainPage
        // this.box_list[1].data = this.result_data;
        // this.box_list[1].render();
        // this.box_list[1].bind(boxdiv);

        //bind transPage
        // this.box_list[3].data = this.result_data;
        // this.box_list[3].bind(boxdiv);
    }

}