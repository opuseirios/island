import {BookModel} from "../../models/book";
import {random} from "../../utils/util";

const bookModel = new BookModel();

Page({
    data: {
        books: <any>[],
        searching: false,
        more:''
    },

    async onLoad() {
        const books = await bookModel.getHotList();
        this.setData({
            books
        })
    },
    onSearching() {
        this.setData({
            searching: true
        })
    },
    onCancel() {
        this.setData({
            searching: false
        })
    },
    onReachBottom(){
      this.setData({
          more: random(16)
      })
    }
})
