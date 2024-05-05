<template>
    <div class="min-h-[60vh] mt-2 relative">
        <div class="flex justify-between px-4">
            <h1 class="font-bold uppercase">News</h1>
            <button class="bg-blue-400 p-2 rounded-sm z-10 shadow-lg" @click="handleAdd">Add News</button>
        </div>
        <div class="bg-white shadow-lg mt-1">
            <table class="w-full">
                <thead class="border">
                    <tr class="bg-gray-400">
                        <th scope="col" class="border">Name</th>
                        <th scope="col" class="border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in data" :key="item._id">
                        <td scope="col" class="border text-center">{{item.title}}</td>
                        <td scope="col" class="text-red-500 border text-center text-xl">
                            <font-awesome-icon icon="edit" class="mx-2 hover:cursor-pointer" @click="handleUpdate(item._id)"/>
                            <font-awesome-icon icon="trash" class="mx-2 hover:cursor-pointer" @click="handleDelete(item._id)"/>
                        </td>
                    </tr>
                    
                    
                </tbody>
            </table>
        </div>
        <div class="absolute bottom-0 right-0">
            <div class="flex gap-2">
                <font-awesome-icon icon="arrow-left" v-if="page>1" @click="prevPage" class="p-2 bg-blue-400 hover:cursor-pointer"/>
                <font-awesome-icon icon="arrow-right" @click="nextPage" class="p-2 bg-blue-400 hover:cursor-pointer"/>
            </div>
        </div>
        <AddNews :open="add" @close="handleClose" :getnews="getnews"/>
    </div>
</template>
<script>
import AddNews from './AddNews.vue'

import axios from 'axios'
export default {
    name:'NewsView',
    components:{AddNews},
    data(){
        return{
            add:false,
            update:false,
            data:[],
            page:1,
            limit:5,
            productIdToUpdate:''
        }
    },
    created(){
        this.getnews()
    },
    methods:{
        async getnews(){
            try {
                const res=await axios.get(`news/all`)
                this.data=res.data
            } catch (err) {
                alert('Lỗi')
            }
        },
        handleLoad(){
            this.getproduct()
        },
        handleAdd(){
            this.add=true;
        },
        handleUpdate(id){
            this.update=true;
            this.productIdToUpdate = id;
        },
        handleClose(){
            this.add = false;
            this.update = false;
        },
        async prevPage(){
            if (this.page > 1) {
                this.page--;
                await this.getnews();
            }
        },
        async nextPage() {
            this.page++;
            await this.getnews();
        }
    }
}
</script>