import request from "~/api/request.ts";
/**
 * @returns 手机号注册
 */ 
export function joinRegister(data) {
  return request({
    url: "/join/register",
    method: "POST",
    data,
  });
}
/**
 * @returns 邮箱注册
 */ 
export function emailRegister(data) {
  return request({
    url: "/join/email/register",
    method: "POST",
    data,
  });
}
/**
 * @returns 手机发送验证码
 */ 
export function sendPhoneCode(data) {
  return request({
    url: "/join/sms",
    method: "POST",
    data:data,
  });
}
/**
 * @returns 邮箱发送验证码
 */ 
export function sendEmailCode(data) {
  return request({
    url: "/join/email/sms",
    method: "POST",
    data,
  });
}
/**
 * @returns 获取注册信息
 */ 
export function registerSetting() {
  return request({
    url: "/setting/register",
  });
}
/**
 * @returns 登陆
 */ 
export function joinLogin(data) {
  return request({
    url: "/join/login",
    method: "POST",
    data,
  });
}
/**
 * @returns 邮箱登陆
 */ 
export function emailLogin(data) {
  return request({
    url: "/join/email/login",
    method: "POST",
    data,
  });
}
/**
 * @returns 获取区号
 */ 
export function countryApi() {
  return request({
    url: "/setting/country",
  });
}

/**
 * @returns 获取网站app内容
 */ 
export function getWebSite() {
  return request({
    url: "/setting/website",
  });
}
/**
 * @returns 用户信息
 */ 
export function getUserInfo() {
  return request({
    url: "/user/index",
    cancelable: false, // 不可取消
  });
}
/** 
 * @returns 语言列表   
 */
export function langListApi() {
  return request({
    url: "/setting/lang",
  });
}
/**
 * @returns 获取上传配置 
 */ 
export function getUploadHostService() {
  return request({
    url: "/setting/upload",
  });
}


/**
 * @returns 获取平台货币符号  /setting/userAgreement
 */ 
export function getPlantCurrency() {
  return request({
    url: "/setting/currency",
  });
}

// /**    
//  * @returns 图片验证码 
//  */
// export function imgVerifyConfigApi() {
//   return request({
//     url: "/join/imgVerifyConfig",
//     params,
//   });
// }

/**    
 * @returns 注册配置 
 */
export function getRegisterConfig() {
  return request({
    url: "join/registerConfig",
  });
}