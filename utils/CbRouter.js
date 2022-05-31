import Taro from "@tarojs/taro";
import systemApi from "../api/system";

const whiteList = ["a"]

async function interceptors(url, next) {
    console.log('interceptors', url)
    if (whiteList.indexOf(url) !== -1) {
        return next()
    } else {
        systemApi.checkToken().then(res => {
            if (res.code == 200) {
                return next()
            } else {
                return Promise.reject(res)
            }
        }).catch(e => {
            console.error(e)
            Taro.navigateTo({
                url: "/pages/login/login",
            })
        })
    }
}

function urlJoinParams(url = '', params = {}) {
    if (params && typeof params === 'object') {
        let str = ''
        Object.keys(params).forEach(key => {
            if (str == '') {
                str += `${key}=${params[key]}`
            } else {
                str += '&' + `${key}=${params[key]}`
            }
        })
        if (str) url += (url.indexOf('?') !== -1 ? '&' : '?') + str
    }
    return url
}

export default {
    /**
     * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
     * @param {string} url
     * @param {{}} params
     * @returns {Promise<unknown>}
     */
    switchTab(url, params) {
        url = urlJoinParams(url, params)
        return interceptors(url, () => Taro.switchTab({url}))
    },
    /**
     * 关闭所有页面，打开到应用内的某个页面
     * @param {string} url
     * @param {{}} params
     * @returns {Promise<unknown>}
     */
    reLaunch(url, params) {
        url = urlJoinParams(url, params)
        return interceptors(url, () => Taro.reLaunch({url}))
    },
    /**
     * 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。
     * @param {string} url
     * @param {{}} params
     * @returns {Promise<unknown>}
     */
    redirectTo(url, params) {
        url = urlJoinParams(url, params)
        return interceptors(url, () => Taro.redirectTo({url}))
    },
    /**
     * 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。
     * 使用 Taro.navigateBack 可以返回到原页面。小程序中页面栈最多十层。
     * @param {string} url
     * @param {{}} params
     * @returns {Promise<unknown>}
     */
    navigateTo(url, params) {
        url = urlJoinParams(url, params)
        console.log('navigateTo--------', url)
        return interceptors(url, () => Taro.navigateTo({url}))
    },
    /**
     * 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages 获取当前的页面栈，决定需要返回几层。
     * @param delta 返回的页面数，如果 delta 大于现有页面数，则返回到首页。
     * @returns {Promise<TaroGeneral.CallbackResult>}
     */
    navigateBack(delta) {
        return Taro.navigateBack({delta})
    }
}
