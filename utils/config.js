export const REQ_URL = 'http://localhost:9002/chbs'

function request({url, method = "GET", data}) {
    let header = {
        'Content-Type': 'application/json'
    };
    return wx.request({
        url: REQ_URL + url,
        method: method,
        data: data,
        header: header
    }).then(res => {
        if (res.statusCode === 200 && res.statusCode < 300) {
            if (res.data.code === 110) {
                wx.navigateTo({
                    url: '/pages/login/login'
                })
            }
            if (res.data.code === 3) {
                wx.navigateTo({
                    url: '/pages/login/login'
                })
            }
            if (res.data.code !== 200) {
                if (res.data.code === 110 || res.data.code === 3) {
                    res.data.msg = '未登录或者token失效'
                }
                const msg = res.data.msg || '未知错误'
                wx.show(msg).then()
                return Promise.reject(msg);
            }
            return res.data;
        }
        return Promise.reject('运行出错，请重试');
    }).catch(err => {
        return Promise.reject(err);
    })

}

function get(url, data) {
    return request({url, method: 'GET', data})
}

function post(url, data) {
    return request({url, method: 'POST', data})
}

function put(url, data) {
    return request({url, method: 'PUT', data})
}

function del(url, data) {
    return request({url, method: 'DELETE', data})
}

export default {
    request:request,
    get:get,
    post:post,
    put:put,
    del:del
}