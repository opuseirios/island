import {HTTP} from "../utils/http";

class BookModel extends HTTP{
   async getHotList(){
       return await this.request({
            url:'/book/hot_list'
        })
    }

    async search(start=0,q:string){
       return await this.request({
           url:'/book/search?summary=1',
           data:{
               q,
               start
           }
       })
    }

    async getMyBookCount(){
       return await this.request({
           url:'/book/favor/count'
       })
    }

    async getBookDetail(bid:number){
       return await this.request({
           url:`/book/${bid}/detail`
       })
    }

    async getLikeStatus(bid:number){
       return await this.request({
           url:`/book/${bid}/favor`
       })
    }

    async getComments(bid:number){
        return await this.request({
            url:`/book/${bid}/short_comment`
        })
    }

    async postComment(bid:number,comment:string){
       return await this.request({
           url:'/book/add/short_comment',
           method:"POST",
           data:{
               bookId:bid,
               content:comment
           }
       })
    }

}

export {BookModel}
