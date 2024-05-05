<template>
    <div class="h-full my-6">
        <div class=" w-100 w-100 items-center flex justify-center uppercase text-gray-500">
                <div id="newTab" class="text-black px-2 mr-3 border-r-2 border-black text-xl hover:text-black hover:cursor-pointer font-medium">Sản phẩm mới</div>
                <div id="hotTab" class="px-2 mr-3 border-r-2 border-black text-xl hover:text-black hover:cursor-pointer font-medium">Sản phẩm hót</div>
                <div id="sellingTab" class="px-2 mr-3 text-xl hover:text-black hover:cursor-pointer font-medium">Sản phẩm bán chạy</div>
        </div>
       <div class="px-4">
            <div id="news" class=" w-100 grid grid-rows-1 grid-cols-4 mt-4 gap-3">
                <ProductItem v-for="item in data" :item="item" :key="item._id"/>
            </div>
            <div id="hots" class="hidden w-100 grid grid-rows-2 grid-cols-4 mt-4 gap-3">
                <ProductItem v-for="item in data" :item="item" :key="item._id"/>
            </div>
            <div id="selling" class="hidden w-100 grid grid-rows-1 grid-cols-4 mt-4 gap-3">
                <ProductItem v-for="item in data" :item="item" :key="item._id"/>
            </div>
       </div>

    </div>
</template>

<script>
import axios from 'axios'
import ProductItem from '../productItem/ProductItem.vue'
export default {
    name:"BoxTop",
    components:{ProductItem},
    data(){
        return{
            data:[]
        }
    },
    methods:{
        async getSell(){
            try {
                const res=await axios.get('order/selling')
                this.data=res.data
            } catch (err) {
                alert('Loi')
            }
        },
        async getNew(){
            try {
                const res=await axios.get('product/new')
                this.data=res.data
            } catch (err) {
                alert('Loi')
            }
        },
    },
    mounted(){
        this.getNew()
        const self = this;
        const hotTab=document.getElementById("hotTab")
        const newTab=document.getElementById("newTab")
        const sellingTab=document.getElementById("sellingTab")

        const news=document.getElementById("news")
        const hots=document.getElementById("hots")
        const selling=document.getElementById("selling")


        hotTab.addEventListener("click",function(){
            hotTab.classList.add('text-black')
            newTab.classList.remove('text-black')
            sellingTab.classList.remove('text-black')

            news.classList.add('hidden')
            hots.classList.add('block')
            selling.classList.add('hidden')
            news.classList.remove('block')
            hots.classList.remove('hidden')
            selling.classList.remove('block')
        })
        newTab.addEventListener("click",function(){
            self.getNew()
            hotTab.classList.remove('text-black')
            newTab.classList.add('text-black')
            sellingTab.classList.remove('text-black')

            news.classList.add('block')
            hots.classList.add('hidden')
            selling.classList.add('hidden')
            news.classList.remove('hidden')
            hots.classList.remove('block')
            selling.classList.remove('block')
        })
        sellingTab.addEventListener("click",function(){
            self.getSell()
            hotTab.classList.remove('text-black')
            newTab.classList.remove('text-black')
            sellingTab.classList.add('text-black')

            news.classList.add('hidden')
            hots.classList.add('hidden')
            selling.classList.add('block')
            news.classList.remove('block')
            hots.classList.remove('block')
            selling.classList.remove('hidden')
        })
    },

}
</script>