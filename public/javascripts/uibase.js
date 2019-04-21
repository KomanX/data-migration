// base class
export class UIBase {

    constructor(props) {
        this.props = props;
        this.element = null;
        this._listeners = new Map();
    }


    _createElement(htmlstr) {
        const div = document.createElement("div"); // container   

        div.innerHTML = htmlstr;

        return div.firstElementChild;
    }

    _bindEvent(element) {
        throw new Error("must implements _bindEvent");
    }

    // return html string
    _render() {
        throw new Error("must implements _render");
    }


    render() {
        var htmlstr = this._render();
        var newElement = this._createElement(htmlstr);
        if (this.element) {
            // let parent = this.element.parentElement;
            // parent.appendChild(newElement);
            this.element.insertAdjacentElement('beforebegin', newElement);
            this.element.remove();
        }
        this.element = newElement;
        this._bindEvent(this.element);
        return newElement;
    }

    bind(selector, add_flag = false) {
        if (!this.element) {
            this.render();
        }
        if (add_flag) {
            document.querySelector(selector).appendChild(this.element);
        } else {
            document.querySelector(selector).innerHTML = "";
            document.querySelector(selector).appendChild(this.element);
        }
    }

    /**
    监听功能
    例:
    var ui = new SubUIBase();
    ui.on("select",function handle(){})
    @param event 字符串，事件名
    @param handle 事件处理函数
    */
    on(event, handle) {
        const handles = this._listeners.get(event);
        if (handles) {
            handles.push(handle);
        } else {
            this._listeners.set(event, [handle]);
        }
    }

    /**
    触发事件，一般组件内部调用。
    例子：
    //组件内部调用
    this.emit("select", 11, 22 );
    @param event 字符串，事件名
    */
    emit(...argv) {
        const event = argv.shift();
        const handles = this._listeners.get(event);
        if (handles) {
            for (let handle of handles) {
                handle(...argv);
            }
        }
    }

}