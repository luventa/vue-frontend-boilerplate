import { isEmpty, isDate, isNumber, isArray, isPlainObject, forEach } from 'lodash'

// RegExp methods
const regMap = {
  // Letters
  letter: /^[a-z]+$/i,
  // Check mobile
  mobile: /^1[34578]\d{9}$/,
  // Check password
  password: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/,
  // Enterprise name
  enterPriseName: new RegExp('^[\u4E00-\u9FA5\uf900-\ufa2d]{2,20}$'),
  // Orgnization code
  orgnizationCode: new RegExp('^[0-9]{9}$'),
  // Legal name
  legalName: new RegExp('^[\u4E00-\u9FA5\uf900-\ufa2d]{2,5}$'),
  // Float
  float: /^[0-9]+.?[0-9]*$/
}

// Required
const required = msg => {
  return (rule, val, cb) => {
    if (isEmpty(val) && !isDate(val) && !isNumber(val)) {
      cb(new Error(msg))
    } else {
      cb()
    }
  }
}

// Letters
const letter = (rule, val, cb) => {
  if (isEmpty(val)) {
    cb(new Error('请输入字符'))
  } else if (!regMap.letter.test(val)) {
    cb(new Error('请输入字母'))
  } else {
    cb()
  }
}

// Mobile
const mobile = (rule, val, cb) => {
  if (isEmpty(val)) {
    cb(new Error('请输入手机号'))
  } else if (!regMap.mobile.test(val)) {
    cb(new Error('手机号码格式不正确'))
  } else {
    cb()
  }
}

// Password
const password = (rule, val, cb, confirmFn) => {
  if (isEmpty(val)) {
    cb(new Error('请输入密码'))
  } else if (!regMap.password.test(val)) {
    cb(new Error('密码不符合规则'))
  } else {
    if (typeof confirmFn === 'function') {
      confirmFn()
    }
    cb()
  }
}

// Confirm Password
const confirmPassword = (rule, val, cb, password) => {
  if (isEmpty(val)) {
    cb(new Error('请再次输入密码'))
  } else if (val !== password) {
    cb(new Error('两次输入密码不一致!'))
  } else {
    cb()
  }
}

// Float number
const isFloat = (rule, val, cb) => {
  if (!isEmpty(val) && !regMap.float.test(val)) {
    cb(new Error('请输入数值'))
  } else {
    cb()
  }
}

// Enterprise name
const companName = (rule, val, cb) => {
  if (!regMap.enterPriseName.test(val)) {
    cb(new Error('请输入正确的企业名称'))
  } else {
    cb()
  }
}

// Orgnization Code
const organizationCode = (rule, val, cb) => {
  if (!regMap.orgnizationCode.test(val)) {
    return cb(new Error('机构代码输入不正确'))
  } else {
    cb()
  }
}

// Legal name
const legalPerson = (rule, val, cb) => {
  if (!regMap.legalName.test(val)) {
    cb(new Error('法人名称输入不正确'))
  } else {
    cb()
  }
}

// Generator
const generate = (mapping, rules = {}) => {
  const addRule = (key, rule) => {
    if (isArray(rules[key])) {
      rules[key].push(rule)
    } else {
      rules[key] = [rule]
    }
  }

  if (isPlainObject(mapping)) {
    forEach(mapping, (validator, key) => {
      addRule(key, { validator: validator, trigger: 'blur' })
    })
  } else if (isArray(mapping)) {
    forEach(mapping, key => {
      addRule(key, { validator: required(), trigger: 'blur' })
    })
  }

  return rules
}

export default {
  regMap,
  letter,
  generate,
  required,
  isFloat,
  mobile,
  companName,
  organizationCode,
  legalPerson,
  password,
  confirmPassword
}
