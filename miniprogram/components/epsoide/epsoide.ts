// components/classic/epsoide/epsoide.js

enum Months{
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月'
}

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        index:{
            type:String,
            observer(newVal,oldVal,changePath){
                console.log(newVal,oldVal,changePath);
                let val = parseInt(newVal)<10?'0'+newVal:newVal;
                this.setData({
                    _index:val
                })
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        year:0,
        month:'',
        _index:''
    },

    attached(){
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();

        this.setData({
            year,
            month:Months[month]
        })
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
