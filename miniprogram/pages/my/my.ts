import {BookModel} from "../../models/book";
import {ClassicModel} from "../../models/classic";

const bookModel = new BookModel();
const classicModel = new ClassicModel();

Page({
    data: {
        authorized: false,
        userInfo: {},
        bookCount:0,
        classic:[]
    },
    onShow() {
        this.userAuthorized();
        this.getMyBookCount();
        this.getMyFavor();
    },

    async getMyBookCount(){
        const res:any = await bookModel.getMyBookCount()
        this.setData({
            bookCount: res.count
        })
    },

    async getMyFavor(){
      const res:any = await classicModel.getMyFavor();
      this.setData({
          classic:res
      })
    },

    userAuthorized() {
        wx.getSetting({
            success: data => {
                if (data.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: data => {
                            console.log(data);
                            this.setData({
                                authorized: true,
                                userInfo: data.userInfo
                            })
                        }
                    })
                }
            }
        })
    },

    onGetUserInfo() {
        wx.getUserInfo({
            success: data => {
                console.log(data);
                this.setData({
                    authorized: true,
                    userInfo: data.userInfo
                })
            }
        })
    },
    onJumpToAbout() {
        wx.navigateTo({
            url:'/pages/about/about'
        })
    },
    onStudy(){
        wx.navigateTo({
            url:'/pages/course/course'
        })
    },
    onPreviewTap: function(event:any) {
        console.log(event);
        wx.navigateTo({
          url: '/pages/classic-detail/classic-detail?cid=' + event.detail.cid + '&type=' + event.detail.type
        })
      },
})
