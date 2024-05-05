<template>
    <div class="w-full">
        <div class="w-full h-64 relative overflow-hidden">
            <button @click="prevSlide" class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-400 p-1 z-10">
                <font-awesome-icon icon="chevron-left" />
            </button>
            <img :src="images[currentIndex]" :alt="images[currentIndex]" class="w-full h-full object-cover">
            <button @click="nextSlide" class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-400 p-1">
                <font-awesome-icon icon="chevron-right" />
            </button>
        </div>
    </div>
</template>
<script>
export default {
    name:"SliderView",
    data(){
        return {
            images:["/slider/sl1.jpg","/slider/sl2.jpg","/slider/sl3.jpg"],
            currentIndex:0,
            intervalId:null
        }
    },
    mounted(){
        this.startSlider();
    },
    methods:{
        nextSlide(){
            this.currentIndex=(this.currentIndex +1) % this.images.length;
        },
        prevSlide(){
            this.currentIndex=(this.currentIndex -1) % this.images.length;
        },
        startSlider(){
            this.intervalId=setInterval(()=>{
                this.nextSlide();
            },2000)
        },
    }
}
</script>
<style lang="css" scoped>

</style>