<script setup>
import icon from '~/assets/images/o1.png'

useHead({
    title: 'Nuxt 3 Demo 数据中心',
    meta: [
        {
            name: '数据中心',
            content: 'This is the data center page of the Nuxt 3 application.'

        },
        { property: 'og:title', content: '数据中心' },
        { property: 'og:description', content: '了解我们的公司' },
        { property: 'og:image', content: icon },
        { property: 'og:image:width', content: '1200' }, // 图片宽度 (可选)
        { property: 'og:image:height', content: '630' },  // 图片高度 (可选，1.91:1 比例通常效果最好)
        { property: 'og:type', content: 'article' },
    ],
    link: [
        { rel: 'icon', type: 'image/x-icon', href: icon }
    ]
})
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