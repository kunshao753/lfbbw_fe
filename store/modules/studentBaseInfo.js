const state={
	    user_id:"zmy",
			year:2020,
		  province_id:"130000000000",
			score:636,
			rank:12058,
			sceneId:123,
			wenli:2,
			
			//专科5 本科7
			diploma_id:7,
			//用户选科 逗号分隔
			courseListIds:""
}

// "user_id": "zmy",
//   "year": 2020,
//   "province_id": 13,
//   "score": 636,
//   "rank": 12058,
//   "sceneId": 123,
//   "wenli": 2,
//   "diploma_id": 7

const getters={
	
}
const mutations={
	   updateState(state,payload){
			 if(payload.user_id)
			 state.user_id= payload.user_id
			 
			 if(payload.province_id)
			 state.province_id= payload.province_id
			 
			 if(payload.score)
			 state.score= payload.score
			 
			 if(payload.rank)
			 state.rank= payload.rank
			 
			 if(payload.sceneId)
			 state.sceneId= payload.sceneId
			 
			 if(payload.wenli)
			 state.wenli= payload.wenli
			 
			 if(payload.diploma_id)
			 state.diploma_id= payload.diploma_id
			 
			 console.log('studentInfo updateState 执行了')		   
		 }
}

const actions={
	
		getStudentBaseInfo: function ({
			commit,
			state
		}){
			console.log('action-getStudentBaseInfo执行了')
			
		},
	
	
}

export default{
	  namespaced:true,
		state,
		getters,
		mutations,
		actions
}