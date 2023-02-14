<script lang="ts" setup name="XtxConfirm">
import { PropType, ref, onMounted } from 'vue';

defineProps({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    confirmCllabck: {
        type: Function as PropType<() => void> | any
    },
    cancelConfirm: {
        type: Function as PropType<() => void> | any
    },
})

const isShow = ref(false)

onMounted(()=>{
    isShow.value = true
})
</script>
<template>
    <Transition name="down">
        <div class="xtx-confirm" v-if="isShow">
            <div class="wrapper">
                <div class="header">
                    <h3>{{ title }}</h3>
                    <a href="JavaScript:;" class="iconfont icon-close-new"></a>
                </div>
                <div class="body">
                    <i class="iconfont icon-warning"></i>
                    <span>{{ text }}</span>
                </div>
                <div class="footer">
                    <Button size="mini" type="gray" @click="cancelConfirm">取消</Button>
                    <Button size="mini" type="primary" @click="confirmCllabck">确认</Button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped lang="less">
.down {
  &-enter {
    &-from {
      transform: translate3d(0, -75px, 0);
      opacity: 0;
    }
    &-active {
      transition: all 0.5s;
    }
    &-to {
      transform: none;
      opacity: 1;
    }
  }
}
.xtx-confirm {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 8888;
    background: rgba(0, 0, 0, 0.5);

    .wrapper {
        width: 400px;
        background: #fff;
        border-radius: 4px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .header,
        .footer {
            height: 50px;
            line-height: 50px;
            padding: 0 20px;
        }

        .body {
            padding: 20px 40px;
            font-size: 16px;

            .icon-warning {
                color: @priceColor;
                margin-right: 3px;
                font-size: 16px;
            }
        }

        .footer {
            text-align: right;

            .xtx-button {
                margin-left: 20px;
            }
        }

        .header {
            position: relative;

            h3 {
                font-weight: normal;
                font-size: 18px;
            }

            a {
                position: absolute;
                right: 15px;
                top: 15px;
                font-size: 20px;
                width: 20px;
                height: 20px;
                line-height: 20px;
                text-align: center;
                color: #999;

                &:hover {
                    color: #666;
                }
            }
        }
    }
}
</style>

