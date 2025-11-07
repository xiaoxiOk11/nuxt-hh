<template>
    <div>
        <Header />
        <div class="pageComContainer">
            
        </div>

        <Tabbar />
    </div>
</template>

<script setup>
import Header from './publicComponents/Header.vue';
import Tabbar from './publicComponents/Tabbar.vue';
import { countryApi } from '~/api/home/home'
const getData = () => {
    countryApi().then(res => {
        console.log('res',res);
    })
}
getData()
</script>


<style lang="scss" scoped>
.pageBoxEl{
    padding: 16px;
}
</style>