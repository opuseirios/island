import {ClassicModel} from '../../models/classic'
import {LikeModel} from '../../models/like'

const classicModel = new ClassicModel();
const likeModel = new LikeModel();

Page({

    data: {
        classic: {},
        latest: true,
        first: false,
        like: false,
        count: 0
    },

    onLoad: async function (options: any) {
        console.log(123);
        console.log(options);
        const cid = options.cid;
        const type = options.type;
        const classicData: any = await classicModel.getById(cid, type)
        await this._getLikeStatus(cid, type);
        this.setData({
            classic: classicData
        })
    },
    async _getLikeStatus(cid: number, type: number) {
        const data: any = await likeModel.getClassicLikeStatus(cid, type);
        this.setData({
            like: data.like_status,
            count: data.fav_nums
        })
    }
})
