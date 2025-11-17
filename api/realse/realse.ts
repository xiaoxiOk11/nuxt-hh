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