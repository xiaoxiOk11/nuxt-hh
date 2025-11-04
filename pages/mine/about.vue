<template>
    <div>
        ABOUT
        <NuxtLink to="/">
            <van-button type="primary">这是一个按钮</van-button>
        </NuxtLink>
    </div>
</template>


<script setup>

useHead({
    title: '关于我们',
    meta: [
        {
            name: '关于我们',
            content: 'This is the article page of the Nuxt 3 demo application.'
        },
        { property: 'og:title', content: '关于我们' },
        { property: 'og:description', content: '了解我们的公司' },
        { property: 'og:image', content: icon },
        { property: 'og:type', content: 'website' },

    ],
    link: [
        { rel: 'icon', type: 'image/x-icon', href: icon }
    ]
})
</script>