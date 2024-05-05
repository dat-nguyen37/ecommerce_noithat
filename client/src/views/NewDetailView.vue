<template>
    <div class="max-w-6xl mx-auto">
        <div class=" border-b py-2">
            <h6><router-link :to='{name:"home"}'>Trang chủ</router-link> | <router-link :to="{name:'news'}">Tin tức</router-link> | <span class="text-gray-500">{{ data.title }}</span></h6>
        </div>
        <div class="grid grid-cols-12 gap-4">
            <div class="col-span-8 px-2">
                <div class="py-2 border-b">
                    <h1 class="uppercase text-2xl">{{data.title}}</h1>
                </div>
                <div class="p-10 w-full">
                    <img v-for="(img,index) in data.image" :src="img" :key="index" alt="" class="w-full h-[60vh] mb-2">
                    <div class="">
                        <h1 class="font-bold py-1">Bí quyết trang trí bàn trà để tăng vẻ đẹp, sang trọng cho phòng khách</h1>
                        <p>{{ data.content }}</p>
                    </div>
                </div>
            </div>
            <div class="col-span-4 px-2">
                <div class="py-2 border-b">
                    <h1 class="uppercase">BÀI VIẾT MỚI</h1>
                </div>
                <div class="py-2">
                    <ul >
                        <li v-for="news in list" :key="news._id"><router-link :to="{name:'newDetail',query:{id:news._id}}" class="hover:text-gray-300">{{ news.title }}</router-link></li>
                    </ul>
                </div>
            </div>

        </div>  
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name:"NewDetailView",
    data(){
        return{
            id:this.$route.query.id,
            data:'',
            list:[]
        }
    },
    mounted(){
        this.getNewId()
        this.getNewAll()
    },
    watch: {
        '$route.query.id': function(newId) {
            this.id = newId;
            this.getNewId();
        }
    },
    methods:{
        async getNewId(){
            try {
                const res=await axios.get('news/'+this.id)
                this.data=res.data
            } catch (err) {
                alert('Loi!')
            }
        },
        async getNewAll(){
            try {
                const res=await axios.get('news/all')
                this.list=res.data
            } catch (err) {
                alert('Loi!')
            }
        }
    }
}
</script>