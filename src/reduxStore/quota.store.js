import axios from '../axios'
import {commonAction} from '../config'

const initialState = {
    dataList:[],
    dataSelect:{
        quantity:[]
    }
}

export function quotaReducer(state = initialState,action){

    switch (action.type) {
        case 'QUOTA_GET_QUOTA_LIST':
            return Object.assign({},state,{dataList:action.payload});
        case 'QUOTA_SELECT':
            return Object.assign({},state,{dataSelect:action.payload});
        case 'QUOTA_CLEAR_QUOTA_SELECT':
            return Object.assign({},state,{
                dataSelect:{
                    quantity:[]
                }
            });
        default:
            return state
    }

}

export function quotaAction(store){

    
    return [commonAction(),
        {
            QUOTA_GET_QUOTA_LIST:function(year){
                this.fire('toast',{status:'load'});
                axios.get('./quota/quota/'+year)
                .then((response)=>{
                    store.dispatch({type:'QUOTA_GET_QUOTA_LIST',payload:response.data});
                    this.fire('toast',{status:'success',
                      callback:()=>{
                          this.nylonPageActive();
                          this.$$('panel-right').close();
                      }
                     });
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            QUOTA_SELECT:function(id){
                // console.log(id);
               
                this.fire('toast',{status:'load'});
                axios.get('./quota/quota/id/'+id)
                .then((response)=>{
                    // console.log(response.data)
                    store.dispatch({type:'QUOTA_SELECT',payload:response.data});
                    this.fire('toast',{status:'success',
                      callback:()=>{
                          this.$$('panel-right').open();
                      }
                     });
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            QUOTA_CLEAR_QUOTA_SELECT:function(){
                store.dispatch({type:'QUOTA_CLEAR_QUOTA_SELECT'})
            },
            QUOTA_INSERT:function(data){
                var year = data.year.toString();
                axios.post('./quota/quota',data)
                .then((response)=>{
                    this.$$('vaadin-combo-box').value = year;
                    this.QUOTA_GET_QUOTA_LIST(year);
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            QUOTA_UPDATE:function(data){
                var year = data.year.toString();
                axios.put('./quota/quota',data)
                .then((response)=>{
                    this.$$('vaadin-combo-box').value = year;
                    this.QUOTA_GET_QUOTA_LIST(year);
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            QUOTA_DELETE:function(data){
                var year = data.year.toString();
                var id = data.id;
                axios.delete('./quota/quota/'+id)
                .then((response)=>{
                    this.$$('vaadin-combo-box').value = year;
                    this.QUOTA_GET_QUOTA_LIST(year);
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            }
            
        }
    ]

}