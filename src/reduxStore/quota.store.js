import axios from '../axios'
import {commonAction} from '../config'

const initialState = {
    dataList:[],
    dataSelect:{}
}

export function quotaReducer(state = initialState,action){

    switch (action.type) {
        case 'QUOTA_GET_QUOTA_LIST':
            return Object.assign({},state,{dataList:action.payload});
        case 'QUOTA_SELECT':
            return Object.assign({},state,{dataSelect:action.payload});
        case 'QUOTA_CLEAR_DATA_SELECT':
            return Object.assign({},state,{dataSelect:{}});
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
                      callback:function(){
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
            }
            // QUOTA_CLEAR_DATA_SELECT:function(){
            //     store.dispatch({type:'QUOTA_CLEAR_DATA_SELECT'});
            // },
            // QUOTA_GET_LIST:function(){
            //     axios.get('./student/student')
            //     .then((response)=>{
            //         console.log(response.data);
            //         store.dispatch({type:'QUOTA_GET_LIST',payload:response.data});
            //     })
            //     .catch((error)=>{
            //         console.log(error);
            //     })
            // },
            // QUOTA_INSERT:function(data){
            //     this.fire('toast',{status:'load'});
            //     axios.post('./student/student',data)
            //     .then((response)=>{
            //         console.log('success!!');
            //         this.fire('toast',{status:'success',text:'บันทึกสำเร็จ',
            //           callback:()=>{
            //                 this.QUOTA_GET_LIST();
            //           }
            //          });
            //     })
            //     .catch((error)=>{
            //         console.log('error');
            //         console.log(error.message);
            //         this.fire('toast',{status:'connectError',text:error.msg,
            //         callback:function(){
            //         }})
            //     });
            // },
            // QUOTA_UPDATE:function(data){
            //     this.fire('toast',{status:'load'});
            //     axios.put('./student/student',data)
            //     .then((response)=>{
            //         console.log('success!!');
            //         this.fire('toast',{status:'success',text:'แก้ไขสำเร็จ',
            //          callback:()=>{
            //               this.QUOTA_GET_LIST();
            //          }
            //         });
            //     })
            //     .catch((error)=>{
            //         console.log('error');
            //         console.log(error);
            //         this.fire('toast',{status:'connectError',text:error.msg,
            //         callback:function(){
            //         }})
            //     });
            // },
            // QUOTA_DELETE:function(id){
            //     this.fire('toast',{status:'load'});
            //     axios.delete('./student/student?id='+id)
            //     .then((response)=>{
            //         console.log('success!!');
            //         console.log(response.data);
            //         this.fire('toast',{status:'success',text:'ลบข้อมูลสำเร็จ',
            //         callback:()=>{
            //               this.QUOTA_GET_LIST();
            //          }
            //         });
            //     })
            //     .catch((error)=>{
            //         console.log('error');
            //         console.log(error);
            //     });
            // }
        }
    ]

}