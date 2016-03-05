/**
 * Created by szc on 15/11/20.
 * Updataed by szc on 16/2/12
 */
var J_object = JJ = Object.create(null);  //建立全局对象缓冲区
var jsBox = Object.create(null);   //全局的jsBox对象
//监听滚动滚动条
window.onscroll = function () {
//htmlHeight是网页的总高度
    jsBox.htmlHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
//clientHeight是网页在浏览器中的可视高度，
    jsBox.clientHeight = document.body.clientHeight || document.documentElement.clientHeight;
//scrollTop是浏览器滚动条的top位置，
    jsBox.scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
}

jsBox.write = function (value) {
    document.write(value);
}


jsBox.isArray=function(o) {
    return Object.prototype.toString.apply(o) === "[object Array]";
}
jsBox.isFunction=function(o) {
    return Object.prototype.toString.apply(o) === "[object Function]";
}


var $_GET = J_GET = (function () {
    var url = window.document.location.href.toString();
    var u = url.split("?");
    if (typeof(u[1]) == "string") {
        u = u[1].split("&");
        var get = {};
        for (var i in u) {
            var j = u[i].split("=");
            get[j[0]] = j[1];
        }
        return get;
    } else {
        return {};
    }
})();


function setCookie(c_name,value,expiredays)
{
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +escape(value)+
        ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}


/**获取相应的cookic
 * @param c_name  要获取cookic的键值
 * @return     相应的cookic值
 */

function getCookie(c_name)
{
    if (document.cookie.length>0)
    {
        c_start=document.cookie.indexOf(c_name + "=")
        if (c_start!=-1)
        {
            c_start=c_start + c_name.length+1
            c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length
            return unescape(document.cookie.substring(c_start,c_end))
        }
    }
    return "";
}


function hasclass(ele, cls) {    //判断元素是否有这个css类
    return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}


/**为对象增加相应的事件
 * @param ele  dom的指针
 * @param ev    dom的事件
 * @param fn    函数的名字
 */
function AddEvent(ele, ev, fn) {
    try {
        if (!ele)
            throw "element is null";
        else {
            if (ele.attachEvent != null) {
                ele.attachEvent('on' + ev, fn);
            }
            else {
                ele.addEventListener(ev, fn, false);
            }
        }
    }
    catch (err) {
        alert(err);
    }
}



/**为对象移除相应的事件
 * 不支持IE8以及更早的浏览器
 * @param ele  dom的指针
 * @param ev    dom的事件
 * @param fn    函数的名字
 */
function remoeEvent(ele, ev, fn) {
    try {
        if (!ele)
            throw "element is null";
        else {
            ele.removeEventListener(ev, fn);
        }
    }
    catch (err) {
        alert(err);
    }
}


/**
 * 剔除dom的子元素中的回车
 * @param ele  dom的指针
 */
function del_space(ele) {
    var ele_child = ele.childNodes;//得到参数元素的所有子元素
    for (var i = 0; i < ele_child.length; i++) { //遍历子元素
        if (ele_child[i].nodeName == '#text' && !/\s/.test(ele_child.nodeValue)) {
            ele.removeChild(ele_child[i]);
        }
    }
}


/*获取元素为其添加事件函数*/
var J = function (ele) {
    if (ele.constructor == String) {
        if (J_object[ele])
            return J_object[ele];
        if (!(this instanceof J)) {
            return new J(ele);
        }
        try {
            if (!document.getElementById(ele)) throw ele + " is not find";
            this.thisp = document.getElementById(ele);
            //this.value = this.thisp.value;
            //this.src = this.thisp.src;
            //this.css = window.getComputedStyle ? window.getComputedStyle(this.thisp, "") : this.thisp.currentStyle;
            //this.style = this.thisp.style;
            J_object[ele] = this;
            //return this;
        }
        catch (err) {
            console.log(err);
        }
    } else if (ele.nodeType == Node.ELEMENT_NODE) {
        //alert("this is node");
        if (!(this instanceof J)) {
            return new J(ele);
        }
        this.thisp = ele;
        //return this;
    }

    this.src = this.thisp.src;
    this.css = window.getComputedStyle ? window.getComputedStyle(this.thisp, "") : this.thisp.currentStyle;
    this.style = this.thisp.style;
    this.setcss = function(style,value){
        this.style[style]=value;
    }
    return this;
}
J.prototype = {
    touchstart: function (fun) {
        AddEvent(this.thisp, 'touchstart', fun);
    },
    touchend: function (fun) {
        AddEvent(this.thisp, 'touchend', fun);
    },
    click: function (fun) {
        AddEvent(this.thisp, 'click', fun);
    },
    dblclick: function (fun) {
        AddEvent(this.thisp, 'dblclick', fun);
    },
    blur: function (fun) {
        AddEvent(this.thisp, 'blur', fun);
    },
    change: function (fun) {
        AddEvent(this.thisp, 'change', fun);
    },
    focus: function (fun) {
        AddEvent(this.thisp, 'focus', fun);
    },
    mousemove: function (fun) {
        AddEvent(this.thisp, 'mousemove', fun);
    },
    mouseout: function (fun) {
        AddEvent(this.thisp, 'mouseout', fun);
    }
}
J.prototype.getType=function(type){
    return this.thisp[type];
}

J.prototype.setType=function(type,value){
    this.thisp[type]=value;
}

J.prototype.append = function (part) {
    this.thisp.innerHTML += part;
}
J.prototype.setValue = function (value) {
    this.thisp.value = value;
}

J.prototype.getValue = function () {
    return this.thisp.value;
}


J.prototype.getHtml = function () {
    return this.thisp.innerHTML ;
}

/**
 * 向dom设置为新的innerHtml  若没有参数,设置为空
 * @param html html代码
 */
J.prototype.setHtml = function (html) {
    var temp = '' || html
    this.thisp.innerHTML = temp;
}
/**
 * 向dom增加一个class
 * @param cla class
 */
J.prototype.addClass = function (cla) {
    if (!hasclass(this.thisp, cla)) this.thisp.className += " " + cla; //取消一个外部的css类
}

/**
 * 向dom消除一个class
 * @param cla class
 */
J.prototype.removeClass = function (cla) {
    if (hasclass(this.thisp, cla)) {
        var reg = new RegExp('(\\s|^)' + cla + '(\\s|$)');
        this.thisp.className = this.thisp.className.replace(reg, ' ');
    }
}

/**
 * 向dom动态增加或消除一个class
 * @param cla class
 */
J.prototype.toggleClass = function (cla) {
    if (hasclass(this.thisp, cla)) {
        this.removeClass(cla);
    }
    else
        this.addClass(cla);
}

/**
 * 发现父元素中的子元素
 * @param ele  dom的指针
 */

J.prototype.findChild=function(){
    del_space(this.thisp);
    //return this.thisp.childNodes;


    var kids =new Array();
    for(var i=0;i<this.thisp.childNodes.length;i++){
        kids[i]=J(this.thisp.childNodes[i]);
    }
    return kids;

}



/**
 ajax 上传数据 post
 **/
var Jajax = function (config) {
    var url = config.url;
    var data = config.data;
    var complete = config.complete;
    var json_back = config.json_back || false;  //返回值是否json数组遍历化,默认关闭
    var error = config.error;       //function for dealing error;
    var callback=config.callback;
    var type = config.type || "post";
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

    data = (function (obj) { // 转成post需要的字符串.
        var str = "";
        for (var name in obj) {
            str += name + "=" + obj[name] + "&"
        }
        return str;
    })(data);
    if (type == 'GET' || type == 'get') {
        url += "?";
        url += data;
        xhr.open('get', url, true);

    } else {
        xhr.open('post', url, true);
    }
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4)
            if (xhr.status == 200) {
                if (json_back == true) {
                    var result = xhr.responseText;
                    var re = eval("(" + result + ")");
                    complete(re);
                } else {
                    complete(xhr.responseText);
                }
                if(jsBox.isFunction(callback)) {
                    callback();
                }
            } else {
                alert("error:readyState:" + xhr.readyState + "status:" + xhr.status);
                error();
            }
    }
    if (type == 'get' || type == 'GET') {
        xhr.send();
    }
    else
        xhr.send(data);
}


/**
 ajax 上传文件和数据
 **/
var JajaxFile = function (config) {
    var file = config.file;  //获取文件
    var url = config.url;
    var data = config.data;
    var complete = config.complete;
    var callback=config.callback;
    var json_back = config.json_back;  //返回值是否json数组遍历化
    var error = config.error;
    var form = new FormData();  //建立一个表单对象
    for (var filename in file)
    form.append(filename, file[filename]);   //将data数据放入表单中
    for (var name in data)
        form.append(name, data[name]);
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4)
            if (xhr.status == 200) {
                if (json_back == true) {  //将json数据转换为array
                    var result = xhr.responseText;
                    var re = eval("(" + result + ")");
                    complete(re);
                } else {
                    complete(xhr.responseText);
                }
                if(jsBox.isFunction(callback)) {
                    callback();
                }
            } else {
                alert("error:readyState:" + xhr.readyState + "status:" + xhr.status);
                error();
            }
    }
    xhr.open("post", url, true);
    xhr.send(form);
}


/*
 实现界面回弹的功能
 */

function on_bounce(ele) {
    var ele = document.getElementById(ele)
    var touch_startY, startY;
    var back_speed = 7.5;

    function touchStart(event) {
        event.preventDefault(); //取消事件的默认动作
        if (!event.touches.length) return;
        var touch = event.touches[0];
        if (!ele.style.top)
            ele.style.top = 0 + "px";
        startY = parseInt(ele.style.top);
        touch_startY = touch.pageY;

    }

    // touch move listener
    function touchMove(event) {
        event.preventDefault();
        if (!event.touches.length) return;
        var touch = event.touches[0];
        ele.style.top = (touch.pageY - touch_startY) * 0.5 + startY + "px";
    }

    // touch end listener
    function touchEnd(event) {
        var endY = parseInt(ele.style.top);
        var back_length = endY - startY;
        var mg;
        //alert(back_length);
        if (back_length > 0)
            mg = requestAnimationFrame(step1);
        else
            mg = requestAnimationFrame(step2);


        function step1() {
            back_length -= back_speed;
            ele.style.top = back_length + "px";
            if (Math.abs(back_length) < back_speed) {
                ele.style.top = 0 + "px";
                cancelAnimationFrame(mg);
            }
            if (back_length > 0) {
                mg = requestAnimationFrame(step1);
            }
        }

        function step2() {
            back_length += back_speed;
            ele.style.top = back_length + "px";
            if (Math.abs(back_length) < back_speed) {
                ele.style.top = 0 + "px";
                cancelAnimationFrame(mg);
            }
            if (back_length < 0) {
                mg = requestAnimationFrame(step2);
            }
        }
    }


    // add touch start listener
    ele.addEventListener("touchstart", touchStart, false);
    ele.addEventListener("touchmove", touchMove, false);
    ele.addEventListener("touchend", touchEnd, false);
}

/**
 * 页面跳转
 * @param url 跳转地址
 */
function Jump(url) {
    window.location.href = url;
}



