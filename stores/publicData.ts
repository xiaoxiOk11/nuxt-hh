import { defineStore } from "pinia";
import { getUserInfo } from "~/api/home/home.ts";

export const publicStore = defineStore("publicStoreSCR", {
  state: () => ({
    userInfo: {},
    currency: "", //平台货币符号
    appData: {}, //app数据
    showLoading: false,
    actionLoading: false,
    loadingMsg: "",
    rechargeTypeList: [], //充值列表类型
    selectRechargeType:{}
  }),

  actions: {
    initPlantData() {
      this.updateUserInfo();
    },
    updateUserInfo() {
      getUserInfo().then((res) => {
        this.userInfo = res;
      });
    },
  },
  persist: {
    key: "publicStore", //如果需要对存储的密钥key进行命名
    storage: localStorage,
  },
});