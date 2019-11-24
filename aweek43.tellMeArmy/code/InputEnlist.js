var console = require("console")

// start(입대일), where(복무 종류-육군, 해군, 공군, 해병대, 의경, 공익)
// 입력 받아서 서버에 저장
module.exports.function = function inputEnlist (start, where, $vivContext) {
  start = String(start.date.year) + "/" + String(start.date.month) + "/" + String(start.date.day);

  var options = { 
    format: 'json',
    cacheTime: 0,
    headers:{'Accept':'application/json'}
  };
  const http = require('http');
  var url = "http://35.200.14.245:9597/users/create?";
  url += encodeURI("id=") + String($vivContext.bixbyUserId);
  url += encodeURI("&military_type=") + String(where);
  url += encodeURI("&start_time=") + String(start);
  console.log('url:', url);
  var response = http.getUrl(url, options);

  // console.log('response:', response);

  return 1;
}