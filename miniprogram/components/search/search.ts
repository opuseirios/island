import {KeywordModel} from "../../models/keyword";
import {BookModel} from "../../models/book";
import {paginationBev} from "../behaviors/pagination";

const keywordModel = new KeywordModel();
const bookModel = new BookModel();


Component({
    properties: {
        more: {
            type: String,
            async observer() {
                if (!this.data.q || this.data.loading || !this.hasMore()) {
                    return;
                }
                this.setData({
                    loading: true
                })
                const res: any = await bookModel.search(this.getCurrentStart(), this.data.q)
                this.setMoreData(res.books);
                this.setData({
                    loading: false
                })
            }
        }
    },
    data: {
        historyWords: [],
        hotWords: [],
        searching: false,
        q: '',
        loading: false,
        loadingCenter: false
    },
    behaviors: [paginationBev],
    //组件初始化
    async attached() {
        const historyWords = keywordModel.getHistory();
        const hotRes: any = await keywordModel.getHot();
        this.setData({
            historyWords,
            hotWords: hotRes.hot
        })
    },
    methods: {
        onCancel() {
            this.triggerEvent('cancel', {}, {})
        },
        async onConfirm(event: any) {
            this.setData({
                searching: true,
                loadingCenter: true
            })
            this.initialize();
            const q = event.detail.value || event.detail.text;
            const searchRes: any = await bookModel.search(0, q);
            this.setMoreData(searchRes.books);
            this.setTotal(searchRes.total);
            keywordModel.addToHistory(q);
            this.setData({
                q,
                loadingCenter: false
            })
        },
        onDelete() {
            console.log(1111);
            this.setData({
                searching: false,
                q: ''
            })
        },

    }
})
