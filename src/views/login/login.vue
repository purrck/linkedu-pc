<template>
  <div class="box">
    <div class="text-center">
      <el-button>
        <router-link :to="{name : 'bootPage'}">引导页</router-link>
      </el-button>
    </div>
    <!--登录那个form-->
    <div class="grey-login-content">
      <div class="flex row space-between y-center x-center" style="height: 300px">
        <div class="login-logo">
          <img src="../../assets/img/icon-logo-4.png" alt="">
        </div>
        <div style="width:35%">
          <div class="login-box-title">
            <span class="login-font" style="white-space:nowrap">用户登录</span>
            <span class="login-font-ed bl" style="font-size: 0.875em;border-color: #fff;white-space:nowrap" >SIGN IN</span>
          </div>
          <form action="" :modal="form" style="padding:0 10px;">
            <div class="login-box-input">
              <div class="bb" style="padding-bottom: 1px">
                <i></i>
                <input type="text" placeholder="请输入账号" autocomplete="none"  v-model="form.username">
              </div>
              <div class="bb">
                <i></i>
                <input type="password" placeholder="请输入密码" autocomplete="none"  v-model="form.password" @keydown.enter="handleLogin">
              </div>
            </div>
            <div class="login-box-password">
              <div style="border-color: #fff">
                <label style="color: #fff;padding-left: 18px;line-height: 23px;">
                  <input name="Fruit" type="checkbox" value=""
                         style="position: absolute;margin: 6px 0px 0 -13px;"/><span
                  style="padding: 0 3px;font-size:0.875em">记住密码</span></label>
              </div>
              <div style="justify-content: flex-end;font-size:0.875em"><span>忘记密码?</span></div>
            </div>
            <div class="flex row center">
              <div class="login-box-login" @click="handleLogin()">登录</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "login",
    data() {
      return {
        form: {
          username: '',
          randomStr: 66481543570872070,
          code: 2134,
          grant_type: 'password',
          scope: 'server',
          password: ''
        },
        loginEd: true,
        nav: []
      }
    },
    components: {
    },
    computed: {
      ...mapGetters(["routerOne", 'activeOne'])
    },
    created() {

    },
    methods: {
      skipTo(e) {
        this.$store.commit("SET_ACTIVEONE", e);
        this.$router.push({'path': '/login'})
      },
      handleLogin() {
        console.log(this.form);
        // this.$refs.loginForm.validate(valid => {
        //   if (valid) {
        this.$store.dispatch("LoginByUsername", this.form).then(res => {
            this.$router.push({path: '/page/wel'})
          },
          error => {
            this.$message.error(error)
          });
      }
    }
  }

</script>

<style scoped lang="scss">
  .box {
    margin: 0;
    width: 100%;
    height: 100%;
    /*超出body范围部分隐藏*/
    overflow: hidden;
    z-index: 2;
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    background-image: url('../../assets/img/bg-edu-1.png');
    background-size: cover;
  }

  img {
    width: 100%;
  }


  .grey-login-content {
    position: absolute;
    width: 36%;
    background-color: rgba(84, 147, 136, 0.7);
    min-width: 560px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    padding: 8%;
    border-radius: 10px;
    margin: auto;
    height: 300px;
    color: #fff;
    z-index: 3;
    .login-logo {
      width: 35%;
      img {
        /*height: 111px;*/
      }
      z-index: 4;
    }
    .login-box-title {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      span {
        padding: 0 15px;
      }
      .login-font{
        font-size:2.25rem
      }
      .login-font-ed{
        font-size:0.875rem
      }
    }
    .login-box-input {
      display: flex;
      padding: 15px 0;
      justify-content: center;

      width: 100%;
      flex-direction: column;
      input {
        border: none;
        height: 30px;
        width: 100%;
        background: none;
        color: #fff;
        margin-top: 12px;
        letter-spacing: 2px;
        padding-left: 20px;
        line-height: 30px;
      }
      ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
        color: #fff;
      }
      :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: #fff;
      }
      ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #fff;
      }
      :-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #fff;
      }
      div:nth-child(1) {
        i {
          background: url("../../assets/img/icon-person-blank.png") no-repeat;
          width: 16px;
          position: absolute;
          margin: 17px 0 0 0;
          height: 18px;
        }
      }
      div:nth-child(2) {
        i {
          background: url("../../assets/img/icon-lock-blank.png") no-repeat;
          width: 16px;
          position: absolute;
          margin: 17px 0 0 0;
          height: 18px;
        }
      }
    }
    .login-box-password {
      display: flex;
      padding: 15px 0px;
      justify-content: space-between;
      flex-direction: row;
      div {
        display: flex;
        width: 50%;
        align-items: center;
        flex-direction: row;
      }

    }
    .login-box-login {
      width: 144px;
      height: 44px;
      margin-top: 25px;
      line-height: 44px;
      background-color: #fff;
      border-radius: 44px;
      font-size: 20px;
      font-weight: 400;
      color: #509A8F;
      letter-spacing: 2.5px;
      border: none;
    }
    .login-box-tip {
      border-color: #2F4D48;
      padding-top: 25px;
      margin-top: 30px;
      height: 20px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      font-size: 15px;
      img {
        margin-right: 5px;
      }
    }

  }
  /*@media (min-width: 768px) {*/
      /*.login-box-title{*/
        /*font-size:12px*/
      /*}*/
  /*}*/

  /*@media (min-width: 992px) {*/
    /*.login-box-title{*/
      /*font-size:14px*/
    /*}*/
  /*}*/

</style>
