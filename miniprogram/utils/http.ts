import {Base64} from 'js-base64'
import {config} from "../config";
import {Token} from "../models/token";

class HTTP {
    request({
                url = '',
                data = {},
                method = 'GET'
            }) {
        return new Promise((resolve, reject) => {
            this._request(url, resolve, reject, data, method)
        })
    }

    _request(url: string, resolve: any, reject: any, data = {}, method: any = 'GET', noRefresh = false) {
        wx.request({
            url: config.api_base_url + url,
            method,
            data,
            header: {
                'content-type': 'application/json',
                Authorization: this._encode()
            },
            success: (res: any) => {
                const code = res.statusCode.toString();
                if (code.startsWith('2')) {
                    resolve(res.data)
                } else {
                    if (code === '403') {
                        if (!noRefresh) {
                            this._refetch(url, resolve, reject, data, method)
                        }
                    } else {
                        const errMsg = res.data.msg;
                        this._showError(errMsg);
                    }
                }
            },
            fail: () => {
                reject();
                this._showError('1')
            }
        })
    }

    _showError(errMsg: string = '我犯了个错误') {

        wx.showToast({
            title: errMsg,
            icon: 'none',
            duration: 2000
        })
    }

    _encode() {
        const token = wx.getStorageSync('token');
        const base64 = Base64.encode(token + ':');
        return 'Basic ' + base64;
    }

    _refetch(...param: any) {
        const token = new Token();
        token.getTokenFromServer(() => {
            // @ts-ignore
            this._request(...param, true)
        })
    }
}

export {HTTP}
