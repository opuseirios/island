import {HTTP} from "../utils/http";

class LikeModel extends HTTP{
    async like(behavior:string,artId:string,category:string){
        const url = behavior==='like'?'/like':'/like/cancel'
       await this.request({
            url,
           method:"POST",
            data:{
                artId:parseInt(artId),
                type:parseInt(category)
            }
        })
    }
    async getClassicLikeStatus(artId:number,category:number){
        return await this.request({
            url:`/classic/${category}/${artId}/favor`
        })
    }
}

export {LikeModel}
