<template>
    <div>
        <TopNav pageTitle="Recharge" >
            </TopNav>
        <div class="pageComContainer">

        </div>

    </div>
</template>

<script setup>
import TopNav from '../publicComponents/TopNavBar.vue';
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const usePublicStore = publicStore()
</script>


<style lang="scss" scoped>
.pageBoxEl {
    padding: 16px;
}
</style>