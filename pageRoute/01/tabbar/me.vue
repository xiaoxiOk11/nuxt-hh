<template>
    <div>
        <Header />
        <div class="myPage  pageComContainer">
            <div class="flex col_center">
                <div>
                    <img src="~/assets/images/01/img/header.png" class="ww-50 hh-50">
                </div>
                <div class="ml20">
                    <div class="flex col_center">
                        <span>+4******554</span>
                        <span class="copyBtn">Copy</span>
                    </div>
                    <div class="mainTextColor mt5">VIP0</div>
                </div>
            </div>
        </div>
        <Tabbar />
    </div>
</template>

<script setup>
import Tabbar from '../publicComponents/Tabbar.vue';
import Header from '../publicComponents/Header.vue';

</script>


<style lang="scss" scoped>
.myPage{
background: #0D081A;
min-height: 100vh;
.copyBtn{
    margin-left: 10px;
    padding: 5px 10px;
    background: var(--mainColor);
    border-radius: 5px;
}
}
</style>