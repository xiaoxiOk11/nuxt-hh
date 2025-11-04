<script setup>
import icon from '~/assets/images/o2.png'

useHead({
    title: '特卖会',
    meta: [
        {
            name: '特卖会',
            content: 'This is the article page of the Nuxt 3 demo application.'
        },
        { property: 'og:title', content: '特卖会' },
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
        <van-nav-bar title="特卖会" left-arrow @click-left="$router.back()" />


        <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item>
                <img src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg"
                    style="width: 100%; height: 200px; object-fit: cover;" />
            </van-swipe-item>
            <van-swipe-item>
                <img src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg"
                    style="width: 100%; height: 200px; object-fit: cover;" />
            </van-swipe-item>
        </van-swipe>

        <div class="custom-card">
            <van-card num="2" price="268.00" desc="设计师联名款" title="限定款卫衣"
                thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg">
                <template #tags>
                    <van-tag type="primary" plain>新品</van-tag>
                    <van-tag type="danger" plain>热门</van-tag>
                </template>
                <template #footer>
                    <van-button size="mini">加入购物车</van-button>
                    <van-button size="mini" type="primary">立即购买</van-button>
                </template>
            </van-card>
        </div>

        <div style="padding: 0 16px;">
            <van-button type="primary" color="linear-gradient(to right, #ff9f1c, #ff6b6b)" block>
                抢购更多优惠
            </van-button>
        </div>
        <img :src="icon" alt="">

    </div>
</template>

<style scoped lang="scss">
.page-content {
    padding-bottom: 20px;
}

// 为卡片组件微调
:deep(.van-card__price) {
    font-weight: bold;
}
</style>