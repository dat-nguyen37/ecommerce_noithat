<template>
    <div class="w-full">
        <Slider/>
        <div class="w-[calc(100%-140px)] mx-auto">
            <BoxTop/>
            <BoxCategory/>
            <BoxNew/>
        </div>
    </div>
</template>

<script>
import Slider from "../components/slider/Slider.vue"
import BoxTop from "../components/boxtop/BoxTop.vue"
import BoxCategory from "../components/boxcategory/boxCategory.vue"
import BoxNew from "../components/boxnew/BoxNew.vue"

export default ({
    name:"HomeView",
    components:{Slider,BoxTop,BoxCategory,BoxNew},
})
</script>
<style scoped>

</style>
