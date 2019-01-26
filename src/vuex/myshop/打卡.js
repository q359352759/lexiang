import axios from "@/api/axios.js";
import qs from "qs";
import { 当前时间格式化 } from "@/assets/js/currency.js";
const 店员打卡记录 = {
	loading: true,
	list: [],
	page_index: 0,
	total: 0,
	query: {
		start: 0,
		length: 10,
		shopid: "",
		clerksid: "",
		// startOfficehours:'',
		startQuittingtime: "",
		endQuittingtime: ""
	}
};
export default {
	namespaced: true,
	state: {
		员工自己打卡记录: [],
		店员打卡记录: {
			loading: true,
			list: [],
			page_index: 0,
			total: 0,
			query: {
				start: 0,
				length: 10,
				shopid: "",
				clerksid: "",
				// startOfficehours:'',
				startQuittingtime: "",
				endQuittingtime: ""
			}
		}
	},
	getters: {
		员工自己打卡记录(state) {
			return state.员工自己打卡记录;
		},
		店员打卡记录(state) {
			return state.店员打卡记录;
		}
	},
	mutations: {},
	actions: {
		添加打卡({ }, obj) {
			var loginDate = JSON.parse(localStorage.loginDate);
			var access_token = loginDate.access_token ? loginDate.access_token : '';
			return new Promise((resolve, reject) => {
				axios.post("/api-s/shops/addShopClerksPunchcard", obj, { headers: { Authorization: "Bearer " + access_token } }).then(x => {
					resolve(x);
				}).catch(err => {
					reject(err);
				});
			});
		},
		打下班卡({ }, obj) {
			return new Promise((resolve, reject) => {
				axios
					.post("/api-s/shops/updateShopClerksPunchcard", obj)
					.then(x => {
						resolve(x);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		查询自己的打卡记录({ state, rootGetters }) {
			// /shops/findShopClerksPunchcardAll
			var 店铺 = rootGetters["get_myshop"];
			var userInfo = JSON.parse(localStorage.userInfo);
			var query = {
				shopid: 店铺.shopid,
				clerksid: userInfo.username,
				start: 0,
				length: 10
			};
			console.log(userInfo, 店铺);
			axios.get("/api-s/shops/findShopClerksPunchcardAll", { params: query }).then(x => {
				state.员工自己打卡记录 = x.data.data;
			}).catch(err => { });
		},
		店员打卡记录初始化({ state }, [clerksid, startQuittingtime, endQuittingtime]) {
			state.店员打卡记录 = JSON.parse(JSON.stringify(店员打卡记录));
			state.店员打卡记录.query.clerksid = clerksid;
			state.店员打卡记录.query.startQuittingtime = startQuittingtime ? startQuittingtime : "";
			state.店员打卡记录.query.endQuittingtime = endQuittingtime ? endQuittingtime : "";
		},
		查询打卡记录({ state, dispatch, rootGetters }) {
			var 店铺 = rootGetters["get_myshop"];
			state.店员打卡记录.query.shopid = 店铺.shopid;
			state.店员打卡记录.loading = true;
			state.店员打卡记录.query.start = state.店员打卡记录.page_index * state.店员打卡记录.query.length;
			axios.get("/api-s/shops/findShopClerksPunchcardAll", {params: state.店员打卡记录.query}).then(x => {
				if (x.data.code == 200) {
					var list = x.data.data.data;
					// for(let i=0;i<list.length;i++){
					// 	list[i].被替班人员={};
					// 	list[i].营业额='';
					// 	dispatch('查询营业额',list[i])
					// 	if (list[i].replaceid) {
					// 		dispatch("根据clerksid查询店员", list[i]);
					// 	}
					// }
					list.forEach(item => {
						item.被替班人员 = {};
						item.营业额=0;
						
						dispatch('营业额',item)
						if (item.replaceid) {
							dispatch("根据clerksid查询店员", item);
						}
					});
					state.店员打卡记录.list = state.店员打卡记录.list.concat(list);
					state.店员打卡记录.total = x.data.data.total;
				}
				state.店员打卡记录.loading = false;
			}).catch(err => {
				state.店员打卡记录.loading = false;
			});
		},
		//记录专用
		根据clerksid查询店员({ state }, item) {
			var clerksid = item.replaceid;
			axios.get("/api-s/shops/findShopClerksByClerksId?clerksId=" + clerksid)
				.then(x => {
					if (x.data.code == 200) {
						item.被替班人员 = x.data.data;
					}
				}).catch(err => { });
		},
		//列表专用
        营业额({ state }, item) {
            var query = {
					startTime: 当前时间格式化('yyyy-MM-dd hh:mm:',item.officehours),
					endTime: 当前时间格式化('yyyy-MM-dd hh:mm:',item.quittingtime),
					staffid: item.clerksid,
					shopid: item.shopid,
					state: 1
				}
            axios.get("/api-s/shops/findAmountSum", { params: query }).then(x => {
				if(x.data.data){
					item.营业额 = x.data.data;
				}
				console.log(x.data,item);
            }).catch(err => { });
        },
		查询记录下一页({ state, dispatch }) {
			state.店员打卡记录.page_index++;
			dispatch("查询打卡记录");
		}
	},
	modules: {}
};
