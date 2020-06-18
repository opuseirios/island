import {classicBeh} from "../classic-beh";

const mMgr = wx.getBackgroundAudioManager();

Component({
    behaviors:[classicBeh],
    /**
     * 组件的属性列表
     */
    properties: {
        src:String,
        title:String
    },

    /**
     * 组件的初始数据
     */
    data: {
        pauseSrc:'images/player@waitting.png',
        playSrc:'images/player@playing.png',
        playing:false
    },

    attached(){
        this._recoverStatus();
        this._monitorSwitch();
    },

    /**
     * 组件的方法列表
     */
    methods: {
        //播放/暂停
        onPlay(){
            this.setData({
                playing:!this.data.playing
            })
            //播放状态
            if(this.data.playing){
                mMgr.src = this.properties.src;
                mMgr.title = this.properties.title;
            }else {
                mMgr.pause();
            }
        },
        _recoverStatus(){
            if(mMgr.paused){
                this.setData({
                    playing:false
                })
                return;
            }
            if(mMgr.src == this.properties.src){
                this.setData({
                    playing:true
                })
            }
        },
        _monitorSwitch(){
            mMgr.onPlay(()=>{
                this._recoverStatus();
            })
            mMgr.onPause(()=>{
                this._recoverStatus();
            })
            mMgr.onStop(()=>{
                this._recoverStatus();
            })
            mMgr.onEnded(()=>{
                this._recoverStatus();
            })
        }
    }
})
