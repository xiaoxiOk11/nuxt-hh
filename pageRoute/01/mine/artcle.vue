<script setup>
import icon from '~/assets/images/o1.png'

</script>

<template>
    <div class="page-content">
        <van-nav-bar title="数据中心" left-arrow @click-left="$router.back()" />

        <div class="custom-card">
            <van-cell-group inset>
                <van-cell title="今日访客" value="1,280" icon="user-o" />
                <van-cell title="销售额" value="¥ 15,600.00" icon="gold-coin-o" />
            </van-cell-group>
        </div>

        <div class="custom-card">
            <van-cell title="最新动态" />
            <van-steps direction="vertical" :active="0">
                <van-step>
                    <h3>【发布】V4.2 版本上线</h3>
                    <p>2023-10-27 10:30</p>
                </van-step>
                <van-step>
                    <h3>【维护】服务器例行维护</h3>
                    <p>2023-10-26 02:00</p>
                </van-step>
            </van-steps>
        </div>

        <div style="padding: 16px;">
            <van-button type="primary" block round>查看完整报告</van-button>
        </div>

        <img :src="icon" alt="">
    </div>
</template>

<style scoped lang="scss">
.page-content {
    padding-bottom: 20px;
}
</style>