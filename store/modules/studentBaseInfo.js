const state={
	    user_id:"",
			year:2020,
		  province_id:"",
			score:0,
			rank:0,
			sceneId:0,
			wenli:0
}

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