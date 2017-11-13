<template>
    <div class="shadeBox" :style="{background:boxBackground}" v-if="onOff">
        <div class="shade">
            <div class="shadeTop">{{shadeTitle}}</div>
            <div class="shadeBottom">
                <p>{{textContainer}}</p>
                <span @click="_closeShade">确认</span>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    /**
     * @prarm boxBackground  遮罩背景颜色
     * @prarm shadeTitle  弹框标题
     * @prarm textContainer  提示内容
     * @prarm onOff  弹框开关
     */
    export default{
        props:{
            boxBackground:{
                type: String,
                default: 'rgba(0,0,0,0.3)'
            },
            shadeTitle:{
                type:String,
                default:'提示'
            },
            textContainer:{
                type:String
            },
            onOff:{
                type:Boolean,
                default:false
            }
        },
        methods:{
            _closeShade (){
                this.$emit('update:onOff', false)
            }
        }

    }
</script>

<style lang="scss">
    $fontSize24:0.375rem;
    .shadeBox{
        display: flex;
        justify-content: center;
        align-items: center;
        width:100%;
        height:100%;
        position: absolute;
        top:0;
        left:0;
        .shade{
            width:85%;
            background: #ffffff;
            -webkit-border-radius:0.2rem;
            -moz-border-radius:0.2rem;
            border-radius:0.2rem;
            .shadeTop{
                width:100%;
                height:1.5625rem;
                font-size: 0.42rem;
                color: #ffffff;
                text-align: center;
                line-height:1.5625rem;
                background: url(./shadeTop.png) no-repeat center center/cover;
            }
            .shadeBottom{
                width:100%;
                padding-bottom:0.55rem;
                p{
                    padding:1rem 0;
                    font-size:$fontSize24;
                    color: #3A3A3A;
                    line-height:$fontSize24;
                    text-align: center;
                }
                span{
                    display: block;
                    width:3.25rem;
                    height:0.9rem;
                    background: #FB5573;
                    border-radius: 2.65rem;
                    font-size:$fontSize24;
                    text-align: center;
                    line-height: 0.9rem;
                    color: #ffffff;
                    margin:0 auto;
                }
            }
        }
    }
</style>
