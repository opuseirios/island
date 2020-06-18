import {config} from "../config";

class Token{
    public verifyUrl: string;
    public tokenUrl: string;
    constructor() {
        this.verifyUrl = config.api_base_url+'/token/verify'
        this.tokenUrl = config.api_base_url+'/token'
    }

    verify(){
        const token = wx.getStorageSync('token')
        if(!token){
            this.getTokenFromServer()
        }else {
            this._verifyFromServer(token);
        }
    }
    getTokenFromServer(callback?:any){
        const that = this;
        wx.login({
            success(res:any){
                wx.request({
                    url:that.tokenUrl,
                    method:"POST",
                    data:{
                        account:res.code,
                        type:100
                    },
                    success(res:any){
                        wx.setStorageSync('token',res.data.token)
                        callback&&callback(res.data.token)
                    }
                })
            }
        })
    }
    _verifyFromServer(token:string){
        const that = this;
        wx.request({
            url:that.verifyUrl,
            method:"POST",
            data:{
                token
            },
            success(res:any){
                const valid = res.data.isValid;
                if(!valid){
                    that.getTokenFromServer();
                }
            }
        })
    }
}

export {
    Token
}
