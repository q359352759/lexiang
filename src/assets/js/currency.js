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
function  dateFtt(val, format){
        const REGEX = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/

    if (val) {
        /**
         * @instructions 如果不是时间戳格式，且含有字符 '-' 则将 '-' 替换成 '/' && 删除小数点及后面的数字
         * @reason 将 '-' 替换成 '/' && 删除小数点及后面的数字 的原因是safari浏览器仅支持 '/' 隔开的时间格式
         */
        if (val.toString().indexOf('-') > 0) {
            val = val.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/(-)/g, '/'); // 将 '-' 替换成 '/'
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
                .replace('yyyy', yy)
                .replace('yy', yy.slice(2))
                .replace('MM', MM)
                .replace('dd', dd)
                .replace('hh', hh)
                .replace('mm', mm)
                .replace('ss', ss)
        } else {
            return [yy, MM, dd].join('-') + ' ' + [hh, mm, ss].join(':');
        }
    } else {
        return '--';
    }
}

//获取数字在数组中最接近那个数
function limit(arr, num){
    var newArr = [];
    arr.map(function(x){
        // 对数组各个数值求差值
        newArr.push(Math.abs(x - num));
    });
    // 求最小值的索引
    var index = newArr.indexOf(Math.min.apply(null, newArr));
    // return arr[index];
    return index;
}

function openloading(x){
    if(x){
        document.getElementById('loading').style.opacity='1';
        document.getElementById('loading').style.display='block';
    }else{
        document.getElementById('loading').style.opacity='0';
        setTimeout(function(){
            document.getElementById('loading').style.display='none';
        },500)
    }
}

export { 
    Get_URL_parameters, 
    dateFtt, 
    limit,
    openloading
};
