//收藏
function addtoFavorite(id,data){
	let curData = data.find(item => item.id === id)
	//console.log('curdata',curData)
	var isFavorite = curData.isFavorite
	//console.log('isFavorite',isFavorite)
	isFavorite = !isFavorite
	let msg = isFavorite?'已收藏':'已取消收藏'
	uni.showToast({
		title:msg+curData.name,
		icon:'none'
	})
	data.forEach((item)=>{
		if(item.id === id){
			item.isFavorite = isFavorite
		}
	})
};
module.exports = {
	addtoFavorite: addtoFavorite
}