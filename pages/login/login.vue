<template>
  <view class="login">
    <view class="login-title">
      车号报送系统
    </view>
    <view class="login-from">
      <nut-input placeholder="请输入用户名"
                 v-model="form.userName"
                 :require-show="true"
                 def
                 label="用户名"
      />
      <nut-input placeholder="请输入密码"
                 v-model="form.password"
                 :require-show="true"
                 type="password"
                 label="密码"
      />
    </view>
    <view class="btn">
      <nut-button type="primary" @click="handleClick('text', msg, true)">登录</nut-button>
    </view>
    <nut-toast :msg="msg" v-model:visible="show" :type="type" :cover="cover" />
  </view>
</template>

<script>
import { reactive, toRefs } from 'vue';
import login from "../../api/login";
export default {
  name: "login",
  component: {
  },
  setup(){
    const state = reactive({
      msg: '',
      type: 'text',
      show: false,
      cover: false,
      form:{
        userName:'sysadmin',
        password:'123456',
      }
    });

    const handleClick = (type, msg, cover = false) => {

      login.login(state.form).then(res=>{
        state.show = true;
        state.msg = res.msg;
        state.type = type;
        state.cover = cover;
        CbRouter.reLaunch('/pages/menu/orderMenu')
      }).catch(e=>{
        console.error(e)
      })
    };
    return {
      ...toRefs(state),
      handleClick,
    }
  }
}
</script>
