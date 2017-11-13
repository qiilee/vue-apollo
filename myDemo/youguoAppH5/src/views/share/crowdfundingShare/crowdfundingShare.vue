<template>
    <div id="app">
        <header :class="{headerFixed:onOff}" id="headerTop" v-if="!terminal">
            <div class="logoBox">
                <div class="logo">
                    <img src="./logo.png" alt="">
                </div>
                <p>尤果圈-专业拍摄高颜值美女写真美图的私密社区</p>
            </div>
            <a class="span" href="http://app.youguoquan.com?channel=84">下载app</a>
        </header>
        <div class="information">
            <header v-if="getData.models">
                <div class="logoBoxInformation">
                    <div class="logoInformation">
                        <img :src="getData.models[0].sHeaderImg" alt="">
                    </div>
                    <p>{{getData.models[0].sNick}}</p>
                </div>
                <span v-if="status">{{status}}</span>
            </header>
            <div class="videoBox" v-if="getData.sVideoUri" @click="_playOnOff">
                <i v-if="playOnff"></i>
                <video :src="'http://img.youguoquan.com'+ getData.sVideoUri" :poster="getData.models[0].sHeaderImg"></video>
            </div>
            <footer>
                <h3>{{getData.sCrowdFundingName}}</h3>
                <ul v-if="getData.sTagList">
                    <li v-for="(item,index) in keyword" :style="{background:colors[Math.trunc(Math.abs(Math.random()*10-colors.length))]}">{{item}}</li>
                </ul>
                <div class="progressBarBox">
                    <div class="progressBar">
                        <div class="currentBar" :style="{width:iPercent+'%'}"></div>
                    </div>
                    <span :class="{overFlow:iPercent>=100}">{{iPercent}}%</span>
                </div>
                <ol>
                    <li>
                        <h6>已筹集尤果币</h6>
                        <p>{{getData.iHaveYgCoin}}</p>
                    </li>
                    <li>
                        <h6>支持人数</h6>
                        <p>{{getData.iJoinCount}}人</p>
                    </li>
                    <li>
                        <h6>剩余时间</h6>
                        <p>{{getData.iDay}}天</p>
                    </li>
                </ol>
            </footer>
        </div>
        <dl class="content" v-if="getData.sPicUri">
            <dt v-if="getData.sContent" v-html="getData.sContent"></dt>
            <dd v-for="item in sPicUri">
                <img :src="'http://img.youguoquan.com'+ item.sImg" alt="" width="100%">
            </dd>
        </dl>
        <div class="problemBox">
            <h2>常见问题</h2>
            <dl>
                <dt>
                    <div class="iconLeft"></div>
                    <p>「众筹」失败后退钱么？</p>
                </dt>
                <dd>在众筹规定的时间内没有筹集到相应的金额，那么你支付的「尤果币」将退回你的账户中。</dd>
                <dt>
                    <div class="iconLeft"></div>
                    <p>「尤果币」可以折现么？</p>
                </dt>
                <dd>不可以。尤果币作为参与众筹活动的虚拟币，是不予折现的。</dd>
                <dt>
                    <div class="iconLeft"></div>
                    <p>「众筹」成功后多久才能收到回报。</p>
                </dt>
                <dd>在众筹成功后的20个工作日内，众筹回报将下发到「我的—已购买—众筹」中。</dd>
                <dt>
                    <div class="iconLeft"></div>
                    <p>参与众筹后没有收到礼物怎么办？</p>
                </dt>
                <dd>众筹成功后20个工作日以上，在「我的—已购买—众筹」中依然没收到回报，即可联系客服: 180-3052-1820 (工作时间：上午09:00-凌晨01:00）</dd>
            </dl>
        </div>
        <span class="download" :class="{over:crowdFundingStatus}" @click="_switchover">{{footerContent}}</span>
    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';
    export default {
        data (){
            return {
                getData:{},
                colors:["#64CFD0","#FFBF7E","#9D9CCB","#7CB2FF","#FF8C8C"],
                onOff:false,
                playOnff:false,
                crowdFundingStatus:false
            }
        },
        computed:{
            iPercent(){
                if(!this.getData.iHaveYgCoin){
                    return 0;
                }else{
                    return Math.trunc((this.getData.iHaveYgCoin/this.getData.iNeedYgCoin)*100)
                }
            },
            keyword (){
                return this.getData.sTagList.split(',');
            },
            sPicUri (){
                return JSON.parse(this.getData.sPicUri);
            },
            status (){
                if(this.getData.iJoinStatus == 1){
                    switch (this.getData.iStatus){
                        case 3:
                            return '回报制作中';
                            break;
                        case 4:
                            return '回报已发放';
                            break;
                        default:
                            return '参与中';
                    }
                }else{
                    return false;
                }
            },
            terminal (){
                if(window.terminal){
                    return true;
                }else{
                    return false;
                }
            },
            footerContent (){
                if(this.terminal){
                    if(this.getData.iStatus == 2){
                        return '众筹结束';
                    }else{
                        return '去支持（'+ Math.trunc(this.getData.iLevelGear) +'尤果币起）';
                    }
                }else{
                    return '下载尤果圈';
                }
            }
        },
        methods:{
            _switchover (){
                if(this.terminal){
                    if(this.getData.iStatus != 2){
                        if(window.browser.versions.android){
                            window.ugirls.openWindow();
                        }else{
                            window.openWindow();
                        }
                    };
                }else{
                    window.location.href = 'http://app.youguoquan.com?channel=84';
                }
            },
            _playOnOff (){
                let _this =this;
                if(window.browser.versions.android){
                    if(_this.terminal){
                        window.ugirls.openVideoUrl('http://img.youguoquan.com'+ _this.getData.sVideoUri);
                    }else{
                        this.playOnff = false;
                    }
                };
            },
            _videoFPS(){
                //暂时无用
                let _this = this;
                _this.$refs.video.addEventListener('loadeddata',()=>{
                    let scale = 0.8;
                    let canvas = document.createElement("canvas");
                    canvas.width = _this.$refs.video.clientWidth * scale;
                    canvas.height = _this.$refs.video.clientHeight * scale;
                    canvas.getContext('2d').drawImage(_this.$refs.video, 0, 0, canvas.width, canvas.height);
                    let img = document.createElement("img");
                    console.log(img);
                    //img.src = canvas.toDataURL("image/png");
                    _this.$refs.videoBox.appendChild(img);
                })
            }
        },
        mounted (){
            let _this = this;
            if(window.browser.versions.android){
                _this.playOnff = true;
            };
            _this.$axios.post('/Crowd/list/one',{CrowdId:window.CrowdId},Lib.Conf.Rxports).then((response)=>{
                _this.getData = response.data.data;
                if(_this.terminal){
                    if(_this.getData.iStatus == 2){
                        _this.crowdFundingStatus = true;
                    }
                }
            }).catch(()=>{
                console.log('接口调取失败')
            });
            if(!_this.terminal){
                let headerTop = document.getElementById('headerTop');
                window.addEventListener('scroll',()=>{
                    if(document.body.scrollTop >= headerTop.clientHeight){
                        document.getElementById('app').style.paddingTop = headerTop.clientHeight +'px';
                        _this.onOff = true;
                    }else{
                        document.getElementById('app').style.paddingTop = 0;
                        _this.onOff = false;
                    }
                });
            }

        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../../../assets/scss/common.scss";
    #app{
        font-size:$fontSize20;
        background-color:#F7F7F7;
        position: relative;
        #headerTop{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width:100%;
            height:1.6rem;
            background: #FFF7F3;
            padding:0 5.3%;
            .logoBox{
                display: flex;
                align-items: center;
                width:60%;
                .logo{
                    margin-right:0.25rem;
                    img{
                        width:1.06rem;
                        height:1.06rem;
                    }
                }
                p{
                    line-height:0.45rem;
                }
            }
        }
        .span{
            display: inline-block;
            box-sizing: content-box;
            background: #50A8EA;
            border-radius: 0.13rem;
            padding:0 0.1875rem;
            line-height:0.625rem;
            height:0.625rem;
            box-shadow: 0.05rem 0.06rem 0.08rem #2E93DF;
            color: #ffffff;
        }
        .headerFixed{
            position: fixed;
            top:0;
            left:0;
            z-index: 99999;
        }
        .information{
            width:100%;
            margin-bottom:0.15rem;
            header{
                display: flex;
                justify-content: space-between;
                align-items: center;
                width:100%;
                height:1.25rem;
                padding:0 3.2%;
                background:#ffffff;
                .logoBoxInformation{
                    display: flex;
                    align-items: center;
                    .logoInformation{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 50%;
                        overflow: hidden;
                        margin-right:0.45rem;
                        img{
                            width:0.95rem;
                            height:0.95rem;
                            border-radius:50%;
                        }
                    }
                    p{
                        font-size: $fontSize24;
                        color: #333333;
                    }
                }
                span{
                    @extend .span;
                    box-shadow:none;
                }
            }
            .videoBox{
                background: #D8D8D8;
                overflow: hidden;
                position: relative;
                i{
                    width:1.6rem;
                    height:1.6rem;
                    background: url(./iconPlay.png) no-repeat 0 0/cover;
                    position: absolute;
                    top:50%;
                    left:50%;
                    z-index: 1;
                    -webkit-transform: translate(-50%, -50%);
                    -moz-transform: translate(-50%, -50%);
                    -ms-transform: translate(-50%, -50%);
                    -o-transform: translate(-50%, -50%);
                    transform: translate(-50%, -50%);
                }
                video{
                    width:100%;
                }
            }
            footer{
                width: 100%;
                padding:0 5.3% $fontSize20;
                h3{
                    padding:0.4rem 0;
                    font-size:$fontSize24;
                    color: $fontColor3A;
                }
                ul{
                    display:flex;
                    flex-wrap:wrap;
                    li{
                        margin:0 $fontSize20 $fontSize20 0;
                        line-height:0.8rem;
                        padding:0 0.2rem;
                        -webkit-border-radius:0.05rem;
                        -moz-border-radius:0.05rem;
                        border-radius:0.08rem;
                        color: #ffffff;
                        font-size:0.28rem;
                    }
                }
                .progressBarBox{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom:0.3rem;
                    overflow: hidden;
                    .progressBar{
                        width:80%;
                        height:0.1rem;
                        background: #D8D8D8;
                        border-radius: 0.05rem;
                        overflow: hidden;
                        .currentBar{
                            height:100%;
                            background-image: -webkit-linear-gradient(left,#FF4869,#BE28FE);
                            box-shadow: 0 0.03rem 0.04rem 0 rgba(245,67,127,0.50);
                            border-radius:0.05rem;
                        }
                    }
                    .overFlow{
                        max-width:15%;
                        padding:0 0.2rem;
                        height:0.5rem;
                        line-height:0.5rem;
                        border-radius:0.25rem;
                        background: #BB28E3;
                        color: #ffffff;
                    }
                }
                ol{
                    display:flex;
                    justify-content:space-between;
                    padding:0 0.35rem;
                    li{
                        text-align:center;
                        h6{
                            padding-bottom:0.25rem;
                        }
                    }
                }
            }
        }
        .content{
            padding-bottom:0.4rem;
            dt{
                background: #ffffff;
                padding:0.2rem 0 0.8rem;
                p{
                    font-size:$fontSize24;
                    line-height:0.6rem;
                    strong{
                        font-weight:700;
                    }
                }
            }
            dd{
                width:100%;
                margin-bottom:0.15rem;
            }
        }
        .problemBox{
            width:92.5%;
            background: #ffffff;
            margin:0 auto;
            h2{
                font-size:$fontSize24;
                text-align: center;
                padding:0.35rem 0;
                margin:0 auto;
            }
            dl{
                padding-bottom:$fontSize24;
                dt{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    height: $fontSize24;
                    margin-bottom:0.1rem;
                    .iconLeft{
                        width: 1.1%;
                        height: 0.35rem;
                        background: #FF6C87;
                        margin-right: $fontSize24;
                     }
                     p{
                         color: #333333;
                         font-size:$fontSize24;
                     }
                }
                dd{
                    line-height:0.5rem;
                    padding:0 5% 0.1rem 0.5rem;
                }
            }
        }
        .download{
            display: block;
            width:100%;
            height:1.17rem;
            background: #6AAFFD;
            font-size:$fontSize24;
            text-align: center;
            line-height:1.17rem;
            color: #ffffff;
        }
        .over{
            background: #cccccc;
        }
    }
</style>
