//获取当前月份的第一天
function getCurrentMonthFirst() {
    var date = new Date();
    date.setDate(1);
    var month = parseInt(date.getMonth() + 1);
    var day = date.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    return date.getFullYear() + "-" + month + "-" + day;
}
//获取当前月的最后一天
function getCurrentMonthLast(time) {
    if (time) {
        var date = new Date(time);
    } else {
        var date = new Date();
    }
    var currentMonth = date.getMonth();
    var nextMonth = ++currentMonth;
    var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
    var oneDay = 1000 * 60 * 60 * 24;
    var lastTime = new Date(nextMonthFirstDay - oneDay);
    var month = parseInt(lastTime.getMonth() + 1);
    var day = lastTime.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    return date.getFullYear() + "-" + month + "-" + day;
}

/*获取一个月的天数 */
function getCountDays(time) {
    if (time) {
        var curDate = new Date(time);
    } else {
        var curDate = new Date();
    }
    var curMonth = curDate.getMonth();
    curDate.setMonth(curMonth + 1);
    curDate.setDate(0);
    return curDate.getDate();
}

//计算两个时间差
function getDaysByDateString(dateString1, dateString2) {
    var startDate = Date.parse(dateString1.replace("/-/g", "/"));
    try {
        var endDate = Date.parse(dateString2.replace("/-/g", "/"));
    } catch (error) {
        var endDate = Date.parse(new Date());
    }
    // var diffDate = endDate - startDate + 1 * 24 * 60 * 60 * 1000;
    var diffDate =endDate -startDate
    var days = diffDate / (1 * 24 * 60 * 60 * 1000);
    //alert(diffDate/(1*24*60*60*1000));
    return days;
}
export {
    getCurrentMonthFirst,
    getCurrentMonthLast,
    getCountDays,
    getDaysByDateString
};
