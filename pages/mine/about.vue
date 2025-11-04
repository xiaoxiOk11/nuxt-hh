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
    title: 'Nuxt 3 Demo ABOUT',
    meta: [
        {
            name: 'description',
            content: 'This is a demo Nuxt 3 application.'
        }
    ]
})
</script>