function inputHandle(inputContent) {
  console.log(`Hello ${inputContent} !`)
}
function sayGoodbye(name) {
  console.log(`Goodbye ${name} !`)
}

function modalBox(){
  wx.showModal({
    title: '提示',
    content: '请补全信息',
    success(res) {
      if (res.confirm) {
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
}
function modalSuccess(){
  wx.showToast({
    title: '提交成功',
  })
}
module.exports.modalBox = modalBox
module.exports.sayHello = inputHandle
module.exports.modalSuccess = modalSuccess
