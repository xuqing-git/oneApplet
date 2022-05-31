/*

const CookieStorageKey = 'Cookie'

export function getCookie(key) {
    const {value = ''} = getAllCookie()[key] || {}
    return value
}
//获取所有cookie并且清除已过期的cookie
export function getAllCookie() {
    const cookies = wx.getStorageSync(CookieStorageKey) || {}
    const nowTime = new Date().getTime()
    Object.keys(cookies).forEach(key => {
        const {expires} = cookies[key]
        if (expires && expires - nowTime < 0) {
            delete cookies[key]
        }
    })
    return cookies
}

//获取所有cookie
export function getAllCookieStr() {
    const cookies = getAllCookie()
    return Object.keys(cookies).map(key => {
        const {value} = cookies[key]
        return `${key}=${value}`
    }).join('; ')
}

//把cookie加到缓存中
export function setCookie(str) {
    let key = ''
    const value = {}
    str.replace(/(?<=;) +/g, '').split(';').forEach((item, index) => {
        item = item.split('=')
        if (index === 0) {
            key = item[0]
            value.value = item[1]
        } else {
            value[item[0].toLowerCase()] = item[1]
        }
    })
    if (value.expires) {
        value.expires = new Date(value.expires).getTime()
    }
    const cookies = getAllCookie()
    cookies[key] = value
    saveAllCookie(cookies)
}

function saveAllCookie(cookies = {}) {
    const nowTime = new Date().getTime()
    Object.keys(cookies).forEach(key => {
        const {expires} = cookies[key]
        if (expires && expires - nowTime < 0) {
            delete cookies[key]
        }
    })
    return wx.setStorageSync(CookieStorageKey, cookies)
}
*/
