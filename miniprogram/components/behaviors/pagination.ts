const paginationBev = Behavior({
    data: {
        dataArray: [],
        total: 0,
        noneResult:false
    },
    methods: {
        setMoreData(dataArray) {
            const tempArray = this.data.dataArray.concat(dataArray)
            this.setData({
                dataArray: tempArray
            })
        },
        getCurrentStart(): number {
            return this.data.dataArray.length;
        },
        setTotal(total) {
            this.data.total = total;
            if(total == 0){
                this.setData({
                    noneResult:true
                })
            }
        },
        hasMore(): boolean {
            return this.data.dataArray.length < this.data.total
        },
        initialize(){
            this.data.total = 0;
            this.setData({
                dataArray:[],
                noneResult:false
            })
        }
    }
})

export {paginationBev}
