import {ClassicModel} from "../../models/classic";
import {LikeModel} from "../../models/like";

const classicModel = new ClassicModel();
const likeModel = new LikeModel()


Page({
    /**
     * 页面的初始数据
     */
    data: {
        classic:{
            id:'',
            type:'',
            index:0
        },
        latest:true,
        first:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function(){
        const classicData:any = await classicModel.getLatest();
        this.setData({
            classic:classicData
        })
    },
    //点赞
    async onLike(event:any){
        const behavior = event.detail.behavior;
        const {id,type} = this.data.classic;
        await likeModel.like(behavior,id,type)
    },
    //获取下一期
   async onNext(){
       const index = this.data.classic.index;
       const classicData:any = await classicModel.getClassic(index,'next');
       this.setData({
           classic:classicData,
           latest:classicModel.isLatest(classicData.index),
           first: classicModel.isFirst(classicData.index)
       })
       this._getLikeStatus(classicData.id,classicData.type);
   },
    //获取上一期
    async onPrev(){
        const index = this.data.classic.index;
        const classicData:any = await classicModel.getClassic(index,'prev');
        this.setData({
            classic:classicData,
            latest:classicModel.isLatest(classicData.index),
            first: classicModel.isFirst(classicData.index)
        })
        this._getLikeStatus(classicData.id,classicData.type);
    },
    //获取点赞信息
   async _getLikeStatus(artId:number,category:number){
        const like = await likeModel.getClassicLikeStatus(artId,category)
       this.setData({
           classic:{
               ...this.data.classic,
               ...like
           }
       })
    }

})
