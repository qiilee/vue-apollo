<template>
    <div id="app" v-cloak>
        <header :class="{opacity:succedOnOff}">
            <p>新版「尤果圈」将不支持微博、QQ登录
                为了您的账号安全，请尽快绑定手机</p>
        </header>
        <div class="marker" :class="{opacity:succedOnOff}">
            <i></i>
            <p>已有 {{userApply}} 名尤果用户绑定了手机号</p>
        </div>
        <div class="userFromBox">
            <div class="userFrom" v-if="!succedOnOff">
                <div class="inputBox" :class="{error:_inputIf.inputMobile}">
                    <input
                            type="text"
                            class="inputDefault"
                            placeholder="输入手机号"
                            @input="_updateValueMobile($event.target)"
                            v-model="postData.Mobile">
                    <span class="inputError" v-if="inputIf.inputMobile">输入错误 请输入正确手机号码</span>
                </div>
                <div class="inputBox" :class="{error:_inputIf.inputCode}">
                    <div class="codeBox">
                        <input
                                type="number"
                                class="inputCode"
                                placeholder="输入验证码"
                                oninput="if(value.length>4)value=value.slice(0,4)"
                                @input="_updateValueCode($event.target)"
                                v-model="postData.Code">
                        <span class="spanCode" @click="_code">{{code.codeText}}</span>
                    </div>
                    <span class="inputError" v-if="inputIf.inputCode">验证码输入错误</span>
                </div>
                <div class="inputBox" :class="{error:_inputIf.inputPassword}">
                    <input
                            type="password"
                            class="inputDefault"
                            placeholder="输入密码(5-20位数字或字母)"
                            @input="_updateValuePassword($event.target)"
                            v-model="postData.Pass">
                    <span class="inputError" v-if="inputIf.inputPassword">密码输入有误</span>
                </div>
                <div class="inputBoxBottom">
                    <button class="inputSubimt" @click="_subimtFrom">确认绑定</button>
                </div>
            </div>
            <div class="userFrom succeedBox" v-if="succedOnOff">
                <div class="succeedIcon"></div>
                <p>绑定成功</p>
            </div>
        </div>
        <shadeBox :on-off.sync="shadeBoxOnOff" :text-container="textContainer"></shadeBox>
    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';
    import shadeBox from '../../../components/shadeBox/shadeBox.vue';
    export default {
        data (){
            return {
                postCheckAccount:{
                    Account:Number,
                    secure:0
                },
                postData:{
                    UserId:window.userId,
                    Mobile:'',
                    Code:'',
                    Pass:'',
                    Token:'weiran'
                },
                code:{
                    codeText:'获取验证码',
                    codeOnOff:true
                },
                inputIf:{
                    inputMobile:false,
                    inputCode:false,
                    inputPassword:false
                },
                shadeBoxOnOff:false,
                textContainer:'',
                succedOnOff:false,
                userApply:''
            }
        },
        computed:{
            _inputIf(){
                return this.inputIf;
            }
        },
        components:{
            shadeBox
        },
        methods:{
            _subimtFrom () {
                let _this = this;
                for(let item in _this.postData){
                    if(!_this.postData[item]){
                        return false;
                    }
                }
                for(let item in _this.inputIf){
                    if(_this.inputIf[item]){
                        return false;
                    }
                }
                _this.$axios.post('/Users/Common/BindingAccount',_this.postData,Lib.Conf.Rxports).then((response)=>{
                    let res = response.data;
                    _this.textContainer = res.Msg;
                    if(res.Status == 1){
                        this.succedOnOff = true;
                        setTimeout(()=>{
                            if(window.browser.versions.android){
                                window.ugirls.bindPhoneCallback();
                            }else{
                                window.ugirlsClose();
                            }
                        },3000)
                    }else{
                        _this.postData.Code = '';
                        _this.shadeBoxOnOff = true;
                    }
                }).catch((response)=>{
                    console.log('请求失败')
                })
            },
            _code (){
                let _this = this;
                let num = 60;
                if(_this.code.codeOnOff){
                    if(_this.postData.Mobile && !_this.inputIf.inputMobile){
                        _this.postCheckAccount.Account = _this.postData.Mobile;
                        _this.code.codeOnOff = false;
                        let clock = setInterval(()=>{
                            num--;
                            _this.code.codeText = num;
                            if(num == 0){
                                clearInterval(clock);
                                _this.code.codeText = "重新发送";
                                _this.code.codeOnOff = true;
                            }
                        },1000);
                        _this.$axios.post('/Reg/RegStep/CheckAccount',_this.postCheckAccount,Lib.Conf.Rxports);
                    }else{
                        _this.inputIf.inputMobile = true;
                    }
                }
            },
            _updateValueMobile (target){
                let _this = this;
                if(!(/^1[34578]\d{9}$/.test(target.value))){
                    // 不符合
                    _this.inputIf.inputMobile = true;
                }else{
                    _this.inputIf.inputMobile = false;
                }
            },
            _updateValueCode (target){
                let _this = this;
                if(target.value.length < 4){
                    _this.inputIf.inputCode = true;
                }else{
                    _this.inputIf.inputCode = false;
                }
            },
            _updateValuePassword (target){
                let _this = this;
                if(target.value.length == 0){
                    _this.inputIf.inputPassword = true
                }else{
                    if(!(/^[a-zA-Z0-9]{5,20}$/.test(target.value))){
                        // 不符合
                        _this.inputIf.inputPassword = true
                    }else{
                        _this.inputIf.inputPassword = false
                    }
                }
            }
        },
        mounted(){
            let _this = this;
            let appId = document.getElementById('app');
            appId.style.height = document.body.scrollHeight +'px';
            _this.$axios.get('/Users/Common/GetBoundedCount',Lib.Conf.Rxports).then((response)=>{
                _this.userApply = response.data.data;
            })
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../../../assets/scss/common.scss";
    #app{
        padding-top:0.625rem;
        background: url(./bg.png) no-repeat left top/cover;
        .opacity{
            opacity: 0;
        }
        header{
            display: flex;
            width:9.35rem;
            height:3.42rem;
            margin:0 auto 0.5rem;
            background: url(./header.png) no-repeat center center/cover;
            p{
                width:7.75rem;
                font-size:0.42rem;
                text-align: center;
                color: $fontColor;
                margin:0 auto;
                padding-top:0.7rem;
                line-height:0.6rem;
            }
        }
        .marker{
            display: flex;
            justify-content:center;
            align-items: center;
            box-sizing: content-box;
            width:73%;
            margin:0 auto;
            padding:0 3.5% 0.4rem;
            i{

                width:$fontSize20;
                height:$fontSize20;
                background: url(./icon.png) no-repeat 0 0/cover;
                margin-right:0.15rem;
            }
            p{
                font-size:$fontSize24;
                color: #FEFFEA;
            }
        }
        .userFromBox{
            width:8.35rem;
            background: #FFDFDF;
            margin:0 auto;
            .userFrom{
                display: block;
                width:8.35rem;
                height:100%;
                padding:0.5rem 4.5%;
                background: #FFBCBC;
                position: relative;
                bottom:0;
                right:0;
                -webkit-transform: translate(-0.1rem, -0.1rem);
                -moz-transform: translate(-0.1rem, -0.1rem);
                -ms-transform: translate(-0.1rem, -0.1rem);
                -o-transform: translate(-0.1rem, -0.1rem);
                transform: translate(-0.1rem, -0.1rem);
                .inputBox{
                    width:100%;
                    padding-bottom:0.35rem;
                    .inputDefault{
                        display: block;
                        width:100%;
                        height: 1.125rem;
                        font-size:0.32rem;
                        color: $fontColor;
                        padding:0 3.3%;
                        border:1px solid #ffffff;
                        &::-webkit-input-placeholder{
                             color: #D0D0D0;
                         }
                    }
                    .codeBox{
                        display: flex;
                        justify-content: space-between;
                    }
                    .inputCode{
                        @extend .inputDefault;
                        width: 60%;
                    }
                    .spanCode{
                        display: block;
                        font-size:0.32rem;
                        width:35%;
                        height:1.125rem;
                        color: #FE6581;
                        text-align: center;
                        line-height: 1.125rem;;
                        background: #ffffff;
                    }
                    .inputError{
                        display: block;
                        width:100%;
                        font-size:0.32rem;
                        color: red;
                        padding:0 3.3%;
                        line-height:0.8rem;
                    }
                }
                .error{
                    padding-bottom:0;
                    .inputDefault,.inputCode{
                        border:1px solid red;
                    }
                }
                .inputBoxBottom{
                    @extend .inputBox;
                    padding-bottom:0;
                    .inputSubimt{
                    @extend .inputDefault;
                        background-image: linear-gradient(-180deg, #FA4C6C 0%, #FF6C87 98%);
                        border-radius: 3px;
                        border:none;
                        color: #ffffff;
                    }
                }
             }
            .succeedBox{
                @extend .userFrom;
                background: #ffffff;
                padding:1.875rem 0 1.6rem 0;
                .succeedIcon{
                width:100%;
                display: flex;
                justify-content: center;
                    &::before{
                         content: '';
                         width:1.6rem;
                         height:1.6rem;
                         background: url(./succced.png) no-repeat center center/cover;
                     }
                }
                p{
                    padding-top:0.55rem;
                    text-align: center;
                    font-size:0.5625rem;
                    color: #3A3A3A;
                }
            }
        }
    }
</style>
