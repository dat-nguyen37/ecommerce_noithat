<template>
    <div class="min-h-[60vh] mt-2 relative">
        <div class="flex justify-between px-4">
            <h1 class="font-bold uppercase">Product</h1>
            <button class="bg-blue-400 p-2 rounded-sm z-10 shadow-lg" @click="handleAdd">Add product</button>
        </div>
        <div class="bg-white shadow-lg mt-1">
            <table class="w-full">
                <thead class="border">
                    <tr class="bg-gray-400">
                        <th scope="col" class="border">Name</th>
                        <th scope="col" class="border">Category</th>
                        <th scope="col" class="border">Price</th>
                        <th scope="col" class="border">Image</th>
                        <th scope="col" class="border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in data" :key="item._id">
                        <td scope="col" class="border text-center">{{item.name}}</td>
                        <td scope="col" class="border text-center">{{ item.categoryName }}</td>
                        <td scope="col" class="border text-center">{{ item.price }}</td>
                        <td scope="col" class="border flex justify-center" v-viewer>
                            <img :src="item.image" class="w-10 h-10" alt="">
                        </td>
                        <viewer :src="item.image">
                            <img :src="src">
                        </viewer>
                        <td scope="col" class="text-red-500 border text-center text-xl">
                            <font-awesome-icon icon="edit" class="mx-2 hover:cursor-pointer" @click="handleUpdate(item.id)"/>
                            <font-awesome-icon icon="trash" class="mx-2 hover:cursor-pointer" @click="handleDelete(item.id)"/>
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
        <AddProduct :open="add" @close="handleClose"/>
        <EditProduct :open="update" :productIdToUpdate="productIdToUpdate" @close="handleClose" @update="handleLoad"/>
    </div>
</template>
<script>
import AddProduct from './AddProduct.vue'
import EditProduct from './EditProduct.vue'

import axios from 'axios'
export default {
    name:'ProductView',
    components:{AddProduct,EditProduct},
    props:['updateProduct'],
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
        this.getproduct()
    },
    methods:{
        async getproduct(){
            try {
                const res=await axios.get(`product/getAll?page=${this.page}&limit=${this.limit}`)
                this.data=res.data
                this.updateProduct()
            } catch (err) {
                console.error(err)
            }
        },
        async handledelete(id){
            try {
                await axios.delete(`product/delete/${id}`)
                this.getproduct()
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
                await this.getproduct();
            }
        },
        async nextPage() {
            this.page++;
            await this.getproduct();
        }
    }
}
</script>