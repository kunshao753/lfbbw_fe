const state={
	    volunteerIds:[]
}

const getters={
	
}
const mutations={
	   updateState(state,payload){
			 if(payload.volunteerIds)
			 state.volunteerIds= payload.volunteerIds
			 
			
			 
			 console.log('volunteerInfo updateState 执行了')		   
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