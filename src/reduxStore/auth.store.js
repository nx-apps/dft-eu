import axios from '../axios'
import {commonAction} from '../config'
import jwtDecode from 'jwt-decode'

const initialState = {
    user:{role:'none'}
}



//function _initUser(){
  //  var token=_getCookie("token");
  //  localStorage.setItem("token",token);
//}
//_initUser();

export function authReducer(state = initialState,action){

    switch (action.type) {
        case 'AUTH_SET_USER':
            var userInfo;
            if(action.payload.token){
                userInfo = jwtDecode(action.payload.token)
            }else{
                userInfo = action.payload;
            }
            return Object.assign({},state,{user:userInfo});
        case 'AUTH_CLEAR_USER':
            return Object.assign({},state,{user:{role:'none'}})
        default:
            return state
    }

}

export function authAction(store){

    return [commonAction(),
        {
            AUTH_LOGIN:function(formLogin){
                axios.post('./auth/login',{username:formLogin.user,password:formLogin.pass})
                .then((response)=>{

                   _setCookie("token",response.data.token,1);
                   // localStorage.setItem("token",response.data.token);
                    store.dispatch({type:'AUTH_SET_USER',payload:response.data})

                    let userInfo;
                    if(response.data.token){
                        userInfo = jwtDecode(response.data.token)
                    }else{
                        userInfo = response.data;
                    }
                    if(userInfo.status == true){
                        if(userInfo.role=="teacher"){
                            //this.fire('nylon-change-page',{path:'/examRoom'})
                            window.location = "/examRoom";
                        }else{
                            // this.fire('nylon-change-page',{path:'/examHistory'})
                          
                            // this.selected = '1';
                            window.location = "/examHistory";
                        }
                    }
                    else{
                        this.toPagePassword();
                    }
                })
                .catch((error)=>{
                    //console.log('error');
                    console.log({error});
                    this.fire('toast',{status:'connectError',text:'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
                         callback:function(){}
                    })
                });
            },
            AUTH_CLEAR_USER:function(){
               // localStorage.removeItem("token");
                _deleteCookie("token");
                store.dispatch({type:'AUTH_CLEAR_USER'});
            },
            AUTH_SET_PASSWORD:function(data){
                // alert('AUTH_SET_PASSWORD')
                this.fire('toast',{status:'load'});
                axios.put('./user/user',data)
                .then((response)=>{
                    this.fire('toast',{status:'success',text:'บันทึกสำเร็จ',
                      callback:()=>{
                          
                      }
                     });
                    this.AUTH_CLEAR_USER();
                    this.fire('page-login')
                    //  this.USER_MANAGE_GET_LIST(this.newTag);
                })
                .catch((error)=>{
                console.log('error');
                console.log(error);
                });
        }
    }
    ]

}