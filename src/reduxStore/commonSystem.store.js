import axios from '../axios'
import {commonAction} from '../config'

const initialState = {
    quotaYear:[],
    typeRice:[]
}

export function commonSystemReducer(state = initialState,action){
    switch (action.type) {
        case 'COMMON_QUOTA_YEAR':
            return Object.assign({},state,{quotaYear:action.payload});
        case 'COMMON_TYPE_RICE':
            return Object.assign({},state,{typeRice:action.payload});
        default:
            return state;
    }
}

export function commonSystemAction(store){
    return [
        commonAction(),{
            COMMON_QUOTA_YEAR:function(){
                axios.get('./common/year')
                .then((response)=>{
                    // console.log(response.data);
                    store.dispatch({type:'COMMON_QUOTA_YEAR',payload:response.data});
                })
                .catch((error)=>{
                    console.log("error");
                    console.log(error.message);
                    this.fire('toast',{status:'connectError',text:error.message,
                    callback:function(){
                    }})
                });
            },
            COMMON_TYPE_RICE:function(){
                axios.get('./common/type_rice')
                .then((response)=>{
                    console.log(response.data);
                    store.dispatch({type:'COMMON_TYPE_RICE',payload:response.data});
                })
                .catch((error)=>{
                    console.log("error");
                    console.log(error.message);
                    this.fire('toast',{status:'connectError',text:error.message,
                    callback:function(){
                    }})
                });
            }
        }
    ]
}