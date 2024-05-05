<template>
    <div v-if="open"  class=" w-[100vh] bg-white z-50 fixed top-[20vh] right-[50vh] shadow-2xl">
        <div class="text-center relative">
            <h1 class="uppercase font-bold text-xl bg-[#271511] text-white p-2">Add Category</h1>
            <font-awesome-icon icon="close" @click="close" class="absolute top-0 right-0 p-3 text-xl hover:cursor-pointer text-white  hover:bg-red-500"/>
        </div>
        <div class="p-2">
            <input type="text" name="name" v-model="name" placeholder="Name category" class="border-b w-full p-2 mb-2">
            <button class="float-end p-2 bg-blue-400 shadow-md z-10 rounded-md" @click="handleAdd">Add Category</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name:"AddCategory",
    props:['open','getcategory'],
    data(){
        return{
            name:'',
        }
    },
    methods:{
        close(){
            this.$emit('close');
        },
        async handleAdd(){
            try {
                await axios.post('category/create',{
                    name:this.name,
                })
                this.getcategory()
                alert("Add category successfully")
            } catch (err) {
                alert(err.response.data)
            }
        }
    }
}
</script>