import axios from "@/api/axios.js";
import qs from "qs";

export default {
    namespaced: true,
    state: {
    },
    getters: {

    },
    mutations: {},
    actions: {
        分享图片({dispatch},base64){
            var sweixin;
            console.log('app分享');
            function plusReady(){
				updateSerivces()
			}
			// 更新分享服务
			function updateSerivces() {
				plus.share.getServices(function(s) {
					var shares = {};
					for (var i in s) {
						var t = s[i];
						shares[t.id] = t;
                    }
                    console.log('更新分享服务')
					sweixin = shares['weixin'];
                    base64分享()
				}, function(e) {
					alert('获取分享服务列表失败：' + e.message);
				});
			}
			
			if (window.plus) {
				plusReady();
			} else {
				document.addEventListener('plusready', plusReady, false);
			}
			
			// 分享
			function share(srv, msg, button) {
				if (!srv) {
					alert('无效的分享服务！');
					return;
				}
				button && (msg.extra = button.extra);
				// 发送分享
				if (srv.authenticated) {
					// alert('已授权')
					doShare(srv, msg);
				} else {
					// alert('未授权');
					srv.authorize(function() {
						doShare(srv, msg);
					}, function(e) {
						alert('认证授权失败：' + JSON.stringify(e));
					});
				}
			}
			// 发送分享
			function doShare(srv, msg) {
				// alert('发送分享',JSON.stringify(msg));
				srv.send(msg, function() {
					// alert('分享到"' + srv.description + '"成功！');
				}, function(e) {
					alert('分享到"' + srv.description + '"失败: ' + JSON.stringify(e));
				});
			}
			
			// 分享图片
			function shareImage() {
				console.log('分享开始')
				var msg = {
					type: 'image'
				};
				if (!image_picture.realUrl) {
					plus.nativeUI.alert('请选择要分享的图片!');
					return;
				}
				msg.pictures = [image_picture.realUrl];
				sweixin ? plus.nativeUI.actionSheet({
					title: '分享图片到微信',
					cancel: '取消',
					buttons: buttons
				}, function(e) {
					(e.index > 0) && share(sweixin, msg, buttons[e.index - 1]);
				}) : plus.nativeUI.alert('当前环境不支持微信分享操作!');
			}
			
			
			var bitmap=null;
			// H5 plus事件处理
			function base64分享(){
                try {
                    bitmap.clear();           
                } catch (error) {
                }
                var name=new Date().getTime()
			    bitmap = new plus.nativeObj.Bitmap(name);
			    bitmap.loadBase64Data(base64, function(){
			        console.log("加载Base64图片数据成功");
			        bitmap.save("_doc/"+name+".jpg",{},function(i){
						// alert('保存图片成功：'+JSON.stringify(i))
						var msg = {
							type: 'image'
						};
						msg.pictures = [i.target];
						var buttons=[{title: '我的好友',extra: {scene: 'WXSceneSession'} },
										{title: '朋友圈',extra: {scene: 'WXSceneTimeline'}}
									]
						sweixin ? plus.nativeUI.actionSheet({
							title: '分享图片到微信',
							cancel: '取消',
							buttons: buttons
						}, function(e) {
							if(e.index!=0){
								share(sweixin, msg, buttons[e.index - 1])
							}
						}) : plus.nativeUI.alert('当前环境不支持微信分享操作!');
			        },function(e){
			            console.log('保存图片失败：'+JSON.stringify(e));
			        });
			    }, function(){
			        console.log('加载Base64图片数据失败：'+JSON.stringify(e));
			    });
			}
        }
    },
    modules: {
    }
};

// store.commit( 'hongbao/...');
