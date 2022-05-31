import request from '../utils/config'

const login = {
    // 登录
    login(data) {
        return request.post('/system/wxapp/login', data)
    }
}
export default login