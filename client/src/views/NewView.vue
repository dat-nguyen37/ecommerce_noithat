<template>
    <div class="max-w-6xl mx-auto">
        <div class=" border-b py-2">
            <h6><router-link :to='{name:"home"}'>Trang chủ</router-link> | <span class="text-gray-500">Tin tức</span></h6>
        </div>
        <div class="grid grid-cols-12 gap-4">
            <div class="col-span-8 px-2">
                <div class="py-2 border-b">
                    <h1 class="uppercase">TIN TỨC</h1>
                </div>
                <div v-for="news in data" :key="news._id">
                    <div class="p-10 w-full">
                        <img :src="news.image" alt="" class="w-full h-[60vh]">
                        <div class="">
                            <h1 class="font-bold py-1">{{ news.title }}</h1>
                            <p>{{ news.description }}
                            <router-link :to="{name:'newDetail',query:{id:news._id}}" class="text-red-600">Xem thêm</router-link>
                            </p>
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="col-span-4 px-2">
                <div class="py-2 border-b">
                    <h1 class="uppercase">BÀI VIẾT MỚI</h1>
                </div>
                <div class="py-2">
                    <ul >
                        <li v-for="news in data" :key="news._id"><router-link :to="{name:'newDetail',query:{id:news._id}}" class="hover:text-gray-300">{{ news.title }}</router-link></li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name:"NewView",
    data(){
        return{
            data:[]
        }
    },
    mounted(){
        this.getNews()
    },
    methods:{
        async getNews(){
            try {
                const res=await axios.get('news/all')
                this.data=res.data
            } catch (err) {
                alert("Loi")
            }
        }
    }
}
</script>