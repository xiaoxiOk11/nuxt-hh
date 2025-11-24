<template>
    <div>
        <TopNav :pageTitle="recordTitle"> </TopNav>
        <div class="pageComContainer">
            
        </div>
    </div>
</template>

<script setup>
import TopNav from "../publicComponents/TopNavBar.vue";
const route = useRoute(); 
const recordType = route.query.type || '0';
const recordTitle = computed(() => {
    if (recordType === '1') {
        return "Commission Record";
    }
    return "Balance Record";
});
</script>

<style lang="scss" scoped>
.pageBoxEl {
    padding: 16px;
    color: #130040;
}
</style>
