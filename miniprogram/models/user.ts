import {HTTP} from "../utils/http";

class User extends HTTP{
    //获取token 
    async getToken(code:string){
        const url = '/token'
        return await this.request({
            url,
            method:"POST",
            data:{
                account:code,
                type:100
            }
        })
    }
}

export {User}