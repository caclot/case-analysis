// 导入需要的 uni-app API
// 定义一个函数，用于获取手机位置并上传到服务器
function uploadLocationToServer() {
	// 获取当前手机位置
	uni.getLocation({
		type: 'wgs84', // 使用国测局坐标
		success: (res) => {
			console.log('当前位置的经度：' + res.longitude);
			console.log('当前位置的纬度：' + res.latitude);
			const {
				longitude,
				latitude
			} = res;

			// 构建要发送的位置数据对象
			const vehicleData = {
				id: 1, // 假设载具id为123，根据实际情况修改
				coordinate: {
					latitude: latitude,
					longitude: longitude
				}
			};
			// 发送 POST 请求到服务器更新载具位置信息
			uni.request({
				url: 'http://139.196.211.123:8081/vehicle/insertCoordinate',
				method: 'POST',
				data: vehicleData,
				success: (response) => {
					console.log('Vehicle location updated successfully:', response.data);
				},
				fail: (error) => {
					console.error('Error updating vehicle location:', error);
				}
			});
		},
		fail: (error) => {
			console.log('Error getting location:', error);
		}
	});
}


// 设置定时器，每隔一小时调用更新函数
const interval = 10 * 60 * 1000; 
setInterval(uploadLocationToServer, interval);


// 调用获取位置函数
uploadLocationToServer();