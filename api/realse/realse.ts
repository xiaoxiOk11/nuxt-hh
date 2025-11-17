// api/
import request from "~/api/request.ts";


/**
 * @returns 充值列表
 */ 
export function getRechargeTypeList(params) {
  return request({
    url: "/finance/product/list",
    method: "GET",
    params,
  });
}

// 
/**
 * @returns 充值详情
 */ 
export function getRechargeInfo(params) {
  return request({
    url: "/finance/product/info",
    method: "GET",
    params,
  });
}