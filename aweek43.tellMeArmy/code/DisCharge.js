var console = require("console");

// 서버에서 user id에 맞는 end(전역일)을 받아옴
module.exports.function = function DisCharge ($vivContext) {
  const http = require('http');
  // JSON으로 받아오도록 option
  var options = { 
    format: 'json',
    cacheTime: 0,
    headers:{'Accept':'application/json'}
  };
  var url = "http://35.200.14.245:9597/users/remain?";
  url += encodeURI("id=") + String($vivContext.bixbyUserId);
  var response = http.getUrl(url, options);
  console.log("log: ", response);

  var now = new Date(formatDate(Date.now()));
  var end = new Date(formatDate(response['end_time']));

  console.log("end: ", now, new Date(formatDate(response['start_time'])));
  // 아직 입대일 전일 경우
  if (now < new Date(response['start_time'])) {
    result = {
      "end": String(end),
      "interval": [Number((new Date(formatDate(response['start_time'])).getTime() - now.getTime()) / (1000 * 3600 * 24))],
      "content": "",
      "time": ""
    };
    console.log('result1: ', result);
    return result;
  }


  var interval = Number((end.getTime() - now.getTime()) / 1000);
  result = {
    "end": String(end),
    "interval": [interval, interval / 3600, interval / (3600 * 24)],
    "content": response['content']['content'],
    "time": parseInt(interval / response['content']['time'])
  };


  console.log('result2: ', result);
  return result;
}


// Date format TO String format
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('/');
}