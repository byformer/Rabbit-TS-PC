<script setup lang="ts" name="Cart">
import useStore from '@/store';
import FnMessage from '@/components/message'
import Confirm from '@/components/confirm';
const { cart } = useStore()
const delCart = async (skuId: string[]) => {
    await cart.deleteCart(skuId)
    FnMessage({
        type: 'success',
        text: '删除成功'
    })
}
</script>

<template>
    <div class="xtx-cart-page">
        <div class="container">
            <Bread>
                <BreadItem to="/">首页</BreadItem>
                <BreadItem>购物车</BreadItem>
            </Bread>
            <div class="cart">
                <table>
                    <thead>
                        <tr>
                            <th width="120">
                                <XtxCheckbox>全选</XtxCheckbox>
                            </th>
                            <th width="400">商品信息</th>
                            <th width="220">单价</th>
                            <th width="180">数量</th>
                            <th width="180">小计</th>
                            <th width="140">操作</th>
                        </tr>
                    </thead>
                    <!-- 有效商品 -->
                    <tbody>
                        <tr v-for="item in cart.effectiveList" :key="item.skuId">
                            <td>
                                <Checkbox :modelValue="item.selected" />
                            </td>
                            <td>
                                <div class="goods">
                                    <RouterLink :to="`/goods/${item.id}`">
                                        <img :src="item.picture" alt="" />
                                    </RouterLink>
                                    <div>
                                        <p class="name ellipsis">
                                            {{ item.name }}
                                        </p>
                                        <p class="attr">{{ item.attrsText }}</p>
                                    </div>
                                </div>
                            </td>
                            <td class="tc">
                                <p>&yen;{{ item.nowPrice }}</p>
                            </td>
                            <td class="tc">
                                <Numbox :hasLabel="false" :modelValue="item.count" />
                            </td>
                            <td class="tc">
                                <p class="f16 red">&yen;{{ (+item.nowPrice * item.count).toFixed(2) }}</p>
                            </td>
                            <td class="tc">
                                <p><a href="javascript:;">移入收藏夹</a></p>
                                <p><a @click="delCart([item.skuId])" class="green" href="javascript:;">删除</a></p>
                                <p><a href="javascript:;">找相似</a></p>
                            </td>
                        </tr>
                        <!-- 删除光购物车之后使用元素占位 -->
                        <tr v-if="cart.effectiveList.length === 0">
                            <td colspan="6">
                                <div class="cart-none" style="text-align: center">
                                    <img src="@/assets/images/none.png" alt="" />
                                    <p>购物车内暂时没有商品</p>
                                    <div class="btn" style="margin: 20px">
                                        <XtxButton type="primary"> 继续逛逛 </XtxButton>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- 操作栏 -->
            <div class="action">
                <div class="batch"></div>
                <div class="total">
                    共 7 件有效商品，已选择 2 件，商品合计：
                    <span class="red">¥400</span>
                    <Button type="primary">下单结算</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.tc {
    text-align: center;

    .xtx-numbox {
        margin: 0 auto;
        width: 120px;
    }
}

.red {
    color: @priceColor;
}

.green {
    color: @xtxColor;
}

.f16 {
    font-size: 16px;
}

.goods {
    display: flex;
    align-items: center;

    img {
        width: 100px;
        height: 100px;
    }

    >div {
        width: 280px;
        font-size: 16px;
        padding-left: 10px;

        .attr {
            font-size: 14px;
            color: #999;
        }
    }
}

.action {
    display: flex;
    background: #fff;
    margin-top: 20px;
    height: 80px;
    align-items: center;
    font-size: 16px;
    justify-content: space-between;
    padding: 0 30px;

    .xtx-checkbox {
        color: #999;
    }

    .batch {
        a {
            margin-left: 20px;
        }
    }

    .red {
        font-size: 18px;
        margin-right: 20px;
        font-weight: bold;
    }
}

.tit {
    color: #666;
    font-size: 16px;
    font-weight: normal;
    line-height: 50px;
}

.xtx-cart-page {
    .cart {
        background: #fff;
        color: #666;

        table {
            border-spacing: 0;
            border-collapse: collapse;
            line-height: 24px;

            th,
            td {
                padding: 10px;
                border-bottom: 1px solid #f5f5f5;

                &:first-child {
                    text-align: left;
                    padding-left: 30px;
                    color: #999;
                }
            }

            th {
                font-size: 16px;
                font-weight: normal;
                line-height: 50px;
            }
        }
    }
}
</style>

