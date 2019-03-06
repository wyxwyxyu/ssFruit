function dayinitial (){
  const years = [];
  const months = [];
  const days = [];
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  this.dayjudge(month + 1, year)
  return [years,months,days,year,month,day]
  // this.setData({
  //   years:years,
  //   months:months,
  //   days:days,
  //   year:year,
  //   month:month,
  //   day:day
  // })
}

function dayjudge(month, year) {
  var flag = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)
  if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
    var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
    return days;
  } else {
    if (month == 4 || month == 6 || month == 9 || month == 11) {
      var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
      return days;
    } else {
      if (flag == false) {
        var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]
        return days;
      } else {
        var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
        return days;
      }

    }

  }
}
function bindChange(e) {
  const val = e.detail.value
  var year = this.data.years[val[0]]
  var month = this.data.months[val[1]]
  this.dayjudge(month, year)
  this.setData({
    year: this.data.years[val[0]],
    month: this.data.months[val[1]],
    day: this.data.days[val[2]]
  })
}

module.exports = {
  dayinitial:dayinitial,
  dayjudge:dayjudge
}