export const validateNumber = (rule, value, callback) => {
  let reg = /^([0-9]|[-]|[.])+$/g
  let msg = rule.name || ''
  let max = rule.max
  let min = rule.min
  let toFixed = rule.toFixed
  if (rule.required) {
    if (value === '') {
      callback(new Error(`${msg}不能为空`))
      return false
    }
  }
  if (max && value > max) {
    callback(new Error(`${msg}不能超过${max}`))
    return false
  }
  if (value) {
    if (!reg.exec(value)) {
      callback(new Error(`${msg}必须是数字`))
      return false
    }
    if (min || min === 0) {
      if (value < min) {
        callback(new Error(`${msg}不能小于${min}`))
        return false
      }
    } else if (value < 1) {
      callback(new Error(`${msg}格式错误`))
      return false
    }
    if (toFixed) {
      if (value) {
        let val = value.toString()
        let st = val.split('.')[1]
        if (st) {
          let fixed = st.toString().length
          if (fixed > toFixed) {
            callback(new Error(`${msg}只能保留小数点后${toFixed}位`))
            return false
          }
        }
      }
    }
    callback()
  } else {
    callback()
  }
}
