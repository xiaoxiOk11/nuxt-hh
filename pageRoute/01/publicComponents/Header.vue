<template>
    <div>
        <ClientOnly>
            <div class="topHeaderEl colorfff  between">
                <div class="f18 text_bold flex col_center ">
                    <img src="" alt="">
                    环宇出海量化平台
                </div>
                <div class="flex col_center colorfff">
                    <div class="center msgEl">
                        <img src="~/assets/images/01/icon/msg.png" class="ww-35 hh-35">

                    </div>
                    <div class="flex col_center ml15 langSelectorEl">
                        <img src="~/assets/images/01/icon/lang.png" class="ww-20 hh-20">

                        <span class="ml10">English</span>
                        <img src="~/assets/images/01/icon/down.png" class="ww-20 hh-20">

                    </div>
                </div>
            </div>
        </ClientOnly>
    </div>
</template>


<style lang="scss" scoped>
.topHeaderEl {
    height: 40px;
    padding: 10px 16px;

    .langSelectorEl {
        border: 1px solid #fff;
        padding: 5px 10px;
        border-radius: 50px;
    }
}
</style>