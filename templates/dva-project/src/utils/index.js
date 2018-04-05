/* global window */
import classnames from 'classnames'
import config from './config'
import request from './request'
import { color } from './theme'

// 连字符转驼峰
const hyphenToHump = function (str) {
  return str.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase()
  })
}

// 驼峰转连字符
const humpToHyphen = function (str) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 日期格式化
const formatDate = function (date, format) {
  const o = {
    'd+': date.getDate(),
    'h+': date.getHours(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr(`${o[k]}`.length))
    }
  }
  return format
}


/**
 * @param   {String}
 * @return  {String}
 */

const queryURL = (name) => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}

module.exports = {
  config,
  request,
  color,
  classnames,
  queryURL,
  hyphenToHump,
  humpToHyphen,
  formatDate
}