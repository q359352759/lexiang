//获取当前月份的第一天
function getCurrentMonthFirst(){
    var date = new Date();
    date.setDate(1);
    var month = parseInt(date.getMonth()+1);
    var day = date.getDate();
    if (month < 10) {
        month = '0' + month
    }
    if (day < 10) {
        day = '0' + day
    }
    return date.getFullYear() + '-' + month + '-' + day;
}
//获取当前月的最后一天
function getCurrentMonthLast(){
    var date=new Date();
    var currentMonth=date.getMonth();
    var nextMonth=++currentMonth;
    var nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
    var oneDay=1000*60*60*24;
    var lastTime = new Date(nextMonthFirstDay-oneDay);
    var month = parseInt(lastTime.getMonth()+1);
    var day = lastTime.getDate();
    if (month < 10) {
        month = '0' + month
    }
    if (day < 10) {
        day = '0' + day
    }
    return date.getFullYear() + '-' + month + '-' + day;
}

export{
    getCurrentMonthFirst,
    getCurrentMonthLast
}