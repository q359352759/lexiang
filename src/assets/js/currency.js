//获取 url get 参数
function Get_URL_parameters(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}

//时间格式化	yyyy.MM.dd hh:mm
// function dateFtt(date, fmt) {
//     //author: meizz
//     var date = new Date(date);
//     var o = {
//         "M+": date.getMonth() + 1, //月份
//         "d+": date.getDate(), //日
//         "h+": date.getHours(), //小时
//         "m+": date.getMinutes(), //分
//         "s+": date.getSeconds(), //秒
//         "q+": Math.floor((date.getMonth() + 3) / 3), //季度
//         S: date.getMilliseconds() //毫秒
//     };
//     if (/(y+)/.test(fmt))
//         fmt = fmt.replace(
//             RegExp.$1,
//             (date.getFullYear() + "").substr(4 - RegExp.$1.length)
//         );
//     for (var k in o)
//         if (new RegExp("(" + k + ")").test(fmt))
//             fmt = fmt.replace(
//                 RegExp.$1,
//                 RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
//             );
//     return fmt;
// }
// 时间格式化 yyyy.MM.dd hh:mm
function dateFtt(val, format) {
    const REGEX = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/;

    if (val) {
        /**
         * @instructions 如果不是时间戳格式，且含有字符 '-' 则将 '-' 替换成 '/' && 删除小数点及后面的数字
         * @reason 将 '-' 替换成 '/' && 删除小数点及后面的数字 的原因是safari浏览器仅支持 '/' 隔开的时间格式
         */
        if (val.toString().indexOf("-") > 0) {
            val = val
                .replace(/T/g, " ")
                .replace(/\.[\d]{3}Z/, "")
                .replace(/(-)/g, "/"); // 将 '-' 替换成 '/'
            val = val.slice(0, val.indexOf(".")); // 删除小数点及后面的数字
        }
        let date = new Date(val);
        date.setHours(date.getHours() + 8);
        const [whole, yy, MM, dd, hh, mm, ss] = date.toISOString().match(REGEX);
        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        const dates = new Date().getDate();
        if (format) {
            return format
                .replace("yyyy", yy)
                .replace("yy", yy.slice(2))
                .replace("MM", MM)
                .replace("dd", dd)
                .replace("hh", hh)
                .replace("mm", mm)
                .replace("ss", ss);
        } else {
            return [yy, MM, dd].join("-") + " " + [hh, mm, ss].join(":");
        }
    } else {
        return "--";
    }
}
// 获取指定时间前后几天  getDateStr(天数)；
function getDateStr (AddDayCount,time) {
    if(time){
        var dd = new Date(time);
    }else{
        var dd = new Date();
    }
    dd.setDate(dd.getDate() + AddDayCount);   //获取AddDayCount天后的日期
    var year = dd.getFullYear();
    var mon = dd.getMonth()+1;                             //获取当前月份的日期
    var day = dd.getDate();
    return year + '-' + ( mon < 10 ? ( '0' + mon ) : mon ) + '-' + ( day < 10 ? ( '0' + day ) : day) ;
}

//获取数字在数组中最接近那个数
function limit(arr, num) {
    var newArr = [];
    arr.map(function (x) {
        // 对数组各个数值求差值
        newArr.push(Math.abs(x - num));
    });
    // 求最小值的索引
    var index = newArr.indexOf(Math.min.apply(null, newArr));
    // return arr[index];
    return index;
}

//加载动画
function openloading(x) {
    if (x) {
        document.getElementById("loading").style.opacity = "1";
        document.getElementById("loading").style.display = "block";
    } else {
        document.getElementById("loading").style.opacity = "0";
        setTimeout(function () {
            document.getElementById("loading").style.display = "none";
        }, 500);
    }
}
//将百度坐标转换成谷歌
function bd_decrypt(bd_lng, bd_lat) {
    var X_PI = (Math.PI * 3000.0) / 180.0;
    var x = bd_lng - 0.0065;
    var y = bd_lat - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
    var gg_lng = z * Math.cos(theta);
    var gg_lat = z * Math.sin(theta);
    return { lng: gg_lng, lat: gg_lat };
}

//递归
function convert(arr, id) {
    var res = [];
    for (var i = 0; i < arr.length; i++) {
        arr[i].value = arr[i].id;
        arr[i].text = arr[i].name;
        if (arr[i].parentid == id) {
            res.push(arr[i]);
            arr[i].children = convert(arr, arr[i].id);
        }
    }
    return res;
}
//反向递归
function get_url(list, type, return_list) {
    var return_list = return_list ? return_list : [];
    for (var i = 0; i < list.length; i++) {
        if (list[i].id == type) {
            return_list.unshift(list[i])
        } else {
            if (list[i].children) {
                var length=return_list.length
                var res=get_url(list[i].children, type, return_list);
                if(res.length!=length){
                    get_url(list, list[i].id, return_list);
                }
            }
        }
        //unshift
    };
    return return_list;
}

// 经纬度进行两地的距离计算
function Rad(d){
    return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
 }
function GetDistance(lat1,lng1,lat2,lng2){
    var radLat1 = Rad(lat1);
    var radLat2 = Rad(lat2);
    var a = radLat1 - radLat2;
    var  b = Rad(lng1) - Rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
    Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s *6378.137 ;// EARTH_RADIUS;
    s = Math.round(s * 10000)
    // s = Math.round(s * 10000) / 10000; //输出为公里

    //s=s.toFixed(4);
    return s;
}

export { 
    Get_URL_parameters, 
    dateFtt, 
    getDateStr,
    limit, 
    openloading, 
    bd_decrypt,
    convert,
    get_url,
    GetDistance
};
