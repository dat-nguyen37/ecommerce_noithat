<template>
    <div class="min-h-[60vh] mt-2 relative">
        <div class="flex justify-between px-4">
            <h1 class="font-bold uppercase">Category</h1>
            <button class="bg-blue-400 p-2 rounded-sm z-10 shadow-lg" @click="handleAdd">Add category</button>
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
                        <td scope="col" class="border text-center">{{ item.name }}</td>
                        <td scope="col" class="text-red-500 border text-center text-xl">
                            <font-awesome-icon icon="edit" class="mx-2 hover:cursor-pointer" />
                            <font-awesome-icon icon="trash" class="mx-2 hover:cursor-pointer" @click="handleDalete(item._id)"/>
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
        <AddCategory :open="add" :getcategory="getcategory" @close="handleClose"/>
    </div>
</template>
<script>
import axios from 'axios'
import AddCategory from './AddCategory.vue'

export default {
    name:'CategoryView',
    components:{AddCategory},
    data(){
        return{
            add:false,
            data:[],
            page:1,
            limit:5
        }
    },
    created(){
        this.getcategory();
    },
    methods:{
        async getcategory(){
            try {
                const res=await axios.get(`category/getAll?page=${this.page}&limit=${this.limit}`)
                this.data=res.data
            } catch (err) {
                alert(err.response.data)
            }
        },
        async handleDalete(id){
            try {
                await axios.delete('category/delete/'+id)
                this.getcategory();
                alert("Delete successfull")
            } catch (err) {
                alert(err.response.data)
            }
        },
        handleAdd(){
            this.add=true;
        },
        handleClose(){
            this.add = false;
        },
        async prevPage(){
            if (this.page > 1) {
                this.page--;
                await this.getcategory();
            }
        },
        async nextPage() {
            this.page++;
            await this.getcategory();
        },
    },
}
</script>