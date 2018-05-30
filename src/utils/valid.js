class validate {
  isEmpty(prompt) {
    ;(rule, value, callback) => {
      console.log(value)
      if (value === '') callback(new Error(`${prompt}不能为空`))
    }
    return this
  }

  isNumber(prompt) {
    ;(rule, value, callback) => {
      if (value === '') callback(new Error(`${prompt}必须是数字`))
    }
    return this
  }
  isTrue() {
    ;(rule, value, callback) => {
      callback()
    }
  }
}

const ruleValidate = new validate()

export default ruleValidate
