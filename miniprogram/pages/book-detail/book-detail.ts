import {BookModel} from "../../models/book";
import {LikeModel} from "../../models/like";

const bookModel = new BookModel();
const likeModel = new LikeModel();

Page({
    data: {
        comments: <any>[],
        book: {
            id: 0
        },
        likeStatus: false,
        likeCount: 0,
        posting: false
    },
    async onLoad(options: any) {
        wx.showLoading({
            title:''
        });
        const bid = parseInt(options.bid);
        const book: any = await bookModel.getBookDetail(bid);
        const commentRes: any = await bookModel.getComments(bid);
        const likeRes: any = await bookModel.getLikeStatus(bid);
        wx.hideLoading();
        this.setData({
            book,
            comments: commentRes.comments,
            likeStatus: likeRes.likeStatus,
            likeCount: likeRes.favNums
        })
    },
    onLike(event: any) {
        const likeOrCancel = event.detail.behavior;
        likeModel.like(likeOrCancel, this.data.book.id + '', '400');
    },

    onFakePost() {
        this.setData({
            posting: true
        })
    },
    onCancel() {
        this.setData({
            posting: false
        })
    },
    async onPost(event: any) {
        const comment = event.detail.text || event.detail.value;
        if (comment.length > 12) {
            wx.showToast({
                title: '短评最多12个字',
                icon: 'none'
            })
            return
        }
        await bookModel.postComment(this.data.book.id, comment);
        wx.showToast({
            title: '+ 1',
            icon: 'none'
        })
        this.data.comments.unshift({
            content: comment,
            nums: 1
        })
        this.setData({
            comments: this.data.comments,
            posting: false
        })
    }
})
