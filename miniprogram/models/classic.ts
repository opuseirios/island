import {HTTP} from "../utils/http";

class ClassicModel extends HTTP{
    //获取最新期刊
   async getLatest(){
       const res:any = await this.request({
            url:'/classic/latest'
        })
       this._setLatestIndex(res.index);
       wx.setStorageSync(this._getKey(res.index),res)
       return res;
    }
    //获取期刊
    async getClassic(index:number,nextOrPrev:string){
       const key:string = nextOrPrev==='prev'? this._getKey(index-1):this._getKey(index+1);
       let classic = wx.getStorageSync(key);
       if(!classic){
           classic = await this.request({
               url:`/classic/${index}/${nextOrPrev}`
           })
           wx.setStorageSync(this._getKey(classic.index),classic)
       }
       return classic;
    }

    async getMyFavor(){
       return this.request({
           url:'/classic/favor'
       })
    }

    async getById(cid:number,type:number){
        return await this.request({
            url:`/classic/${type}/${cid}`
        })
    }

    isFirst(index:number):boolean{
        return index == 1
    }

    isLatest(index:number):boolean{
        const latestIndex = this._getLatestIndex();
        return latestIndex == index;
    }

    _setLatestIndex(index:number){
       wx.setStorageSync('latest',index);
    }

    _getLatestIndex():number{
       return wx.getStorageSync('latest')
    }

    _getKey(index:number):string{
       return 'classic-'+index;
    }
}

export {ClassicModel}
