import axios from '../axios'
import {commonAction} from '../config'

const initialState = {
    dataList:[],
    dataSelect:{}
}

export function examinationRoomReducer(state = initialState,action){

    switch (action.type) {
        case 'EXAMINATION_ROOM_GET_LIST':
            return Object.assign({},state,{dataList:action.payload});
        case 'EXAMINATION_ROOM_SELECT':
            return Object.assign({},state,{dataSelect:action.payload});
        case 'EXAMINATION_ROOM_CLEAR_DATA_SELECT':
            return Object.assign({},state,{dataSelect:{}});
        default:
            return state
    }

}

export function examinationRoomAction(store){

    
    return [commonAction(),
        {
            EXAMINATION_ROOM_SELECT:function(dataSelect){
                axios.get('./student/student')
                .then((response)=>{
                    console.log('success!!');
                    store.dispatch({type:'EXAMINATION_ROOM_SELECT',payload:dataSelect});
                    // console.log(response.data);
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            },
            EXAMINATION_ROOM_CLEAR_DATA_SELECT:function(){
                store.dispatch({type:'EXAMINATION_ROOM_CLEAR_DATA_SELECT'});
            },
            EXAMINATION_ROOM_GET_LIST:function(){
                axios.get('./student/student')
                .then((response)=>{
                    console.log(response.data);
                    store.dispatch({type:'EXAMINATION_ROOM_GET_LIST',payload:response.data});
                })
                .catch((error)=>{
                    console.log(error);
                })
            },
            EXAMINATION_ROOM_INSERT:function(data){
                this.fire('toast',{status:'load'});
                axios.post('./student/student',data)
                .then((response)=>{
                    console.log('success!!');
                    this.fire('toast',{status:'success',text:'บันทึกสำเร็จ',
                      callback:()=>{
                            this.EXAMINATION_ROOM_GET_LIST();
                      }
                     });
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error.message);
                    this.fire('toast',{status:'connectError',text:error.msg,
                    callback:function(){
                    }})
                });
            },
            EXAMINATION_ROOM_UPDATE:function(data){
                this.fire('toast',{status:'load'});
                axios.put('./student/student',data)
                .then((response)=>{
                    console.log('success!!');
                    this.fire('toast',{status:'success',text:'แก้ไขสำเร็จ',
                     callback:()=>{
                          this.EXAMINATION_ROOM_GET_LIST();
                     }
                    });
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                    this.fire('toast',{status:'connectError',text:error.msg,
                    callback:function(){
                    }})
                });
            },
            EXAMINATION_ROOM_DELETE:function(id){
                this.fire('toast',{status:'load'});
                axios.delete('./student/student?id='+id)
                .then((response)=>{
                    console.log('success!!');
                    console.log(response.data);
                    this.fire('toast',{status:'success',text:'ลบข้อมูลสำเร็จ',
                    callback:()=>{
                          this.EXAMINATION_ROOM_GET_LIST();
                     }
                    });
                })
                .catch((error)=>{
                    console.log('error');
                    console.log(error);
                });
            }
        }
    ]

}