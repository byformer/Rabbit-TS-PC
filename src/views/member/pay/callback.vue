<script setup lang="ts">
import { ApiRes } from '@/types/data'
import request from '@/utils/request'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const payResult = route.query.payResult === 'true'
const order = ref<any>({} as any)
onMounted(async () => {
  // 根据订单id获取订单详情
  const res = await request.get<ApiRes<any>>(
    `/member/order/${route.query.orderId}`
  )
  order.value = res.data.result
})
</script>

<template>
  <div class="xtx-pay-page">
    <div class="container">
      <Bread>
        <BreadItem to="/">首页</BreadItem>
        <BreadItem to="/cart">购物车</BreadItem>
        <BreadItem>支付结果</BreadItem>
      </Bread>
      <!-- 支付结果 -->
      <div class="pay-result">
        <span v-if="payResult" class="iconfont icon-queren2 green"></span>
        <span v-else class="iconfont icon-shanchu red"></span>
        <p class="tit">{{ payResult ? '订单支付成功' : '订单支付失败' }}</p>
        <p class="tip">我们将尽快为您发货，收货期间请保持手机畅通</p>
        <p>支付方式：<span>支付宝支付</span></p>
        <p>
          支付金额：<span>¥{{ order?.payMoney?.toFixed(2)}}元</span>
        </p>
        <div class="btn">
          <Button type="primary" @click="$router.push('/member/order')" style="margin-right: 20px">
            查看订单
          </Button>
          <Button type="gray" @click="$router.push('/')">进入首页</Button>
        </div>
        <p class="alert">
          <span class="iconfont icon-tip"></span>
          温馨提示：小兔鲜儿不会以订单异常、系统升级为由要求您点击任何网址链接进行退款操作，保护资产、谨慎操作。
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.pay-result {
  padding: 100px 0;
  background: #fff;
  text-align: center;
  > .iconfont {
    font-size: 100px;
  }
  .green {
    color: #1dc779;
  }
  .red {
    color: @priceColor;
  }
  .tit {
    font-size: 24px;
  }
  .tip {
    color: #999;
  }
  p {
    line-height: 40px;
    font-size: 16px;
  }
  .btn {
    margin-top: 50px;
  }
  .alert {
    font-size: 12px;
    color: #999;
    margin-top: 50px;
  }
}
</style>