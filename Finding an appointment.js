function getStartTime(schedules, duration) {
  for(let item of schedules){
    item.unshift(['00:00', '09:00']);
    item.push(['19:00', '00:00']);
  }

  let timeIntervals = []; 
  let minTime = 600, maxTime  = 0; 
  let zeroArr = schedules[0];
  
  for(let i = 0; zeroArr[i][0] != '19:00'; i ++) {
    if( check(zeroArr[i][1], zeroArr[i + 1][0]) ) {
      unshift_timeIntervals(zeroArr[i][1], zeroArr[i + 1][0]);
      check_MinMax();
          
      for( let arr of schedules.slice(1,schedules.length) ) {
        for(let t = 0; arr[t][0] != '19:00'; t++) {
          if( check(arr[t][1], arr[t + 1][0]) ) {
            unshift_timeIntervals(arr[t][1], arr[t + 1][0]);
            check_MinMax();
              break;
          }
        }    
        if (timeIntervals.length == schedules.length) outputResult;
      }
    }

    timeIntervals.length = 0;
    minTime = 600, maxTime  = 0; 
    
  } 

  return null;
  
  function check(first, second) {
    let start = format(first);
    let end = format(second);
    if (end - start < duration) return false;
    if (timeIntervals.length == 0) return true;
    if (start + duration <= minTime && end >= maxTime + duration) return true;
  }
  
  function format(time) {
    return (new Date(`December 1, 1975 ${time}:00`) - new Date ("December 1, 1975 09:00")) / 60000;
  }
  
  function unshift_timeIntervals(start, end) {
    timeIntervals.unshift([format(start), format(end)]);
  }
  
  function check_MinMax() {
    if(timeIntervals[0][0] > maxTime) maxTime = timeIntervals[0][0];
    if(timeIntervals[0][1] < minTime) minTime = timeIntervals[0][1];
  }

  function outputResult(){
    let t = new Date(9 * 3600  * 1000 + maxTime * 60000);
    return `${(t.getHours() < 10) ? '0' + t.getHours() : t.getHours()}:${(t.getMinutes() < 10) ? '0' + t.getMinutes() : t.getMinutes()}`; 
  }
}
