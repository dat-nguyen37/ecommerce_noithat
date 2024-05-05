<template>
    <div v-if="open" class=" w-[100vh] h-[70vh] bg-white z-50 fixed top-[20vh] right-[50vh] shadow-2xl">
        <div class="text-center relative">
            <h1 class="uppercase font-bold text-xl bg-[#271511] text-white p-2">Edit Product</h1>
            <font-awesome-icon icon="close" @click="close" class="absolute top-0 right-0 p-3 text-xl hover:cursor-pointer text-white  hover:bg-red-500"/>
        </div>
        <div class="p-2">
            <input type="text" name="name" placeholder="Name product" v-model="name" class="border-b w-full p-2 mb-2">
            <select name="categoryId" id="" v-model="categoryId" class="w-full border-b p-2 mb-2">
                <option selected value="">Choose category</option>
                <option v-for="item in listCategory" :key="item._id" :value="item._id">{{ item.name }}</option>
            </select>   
            <input type="number" placeholder="Price" v-model="price" class="border-b p-2 mb-2">
            <textarea name="description" id="" v-model="description" placeholder="Description" class="w-full p-2 mb-2 border-b" />
            <div class="flex">
                <label v-if="!image" for="file" class=""><font-awesome-icon icon="camera" class="p-6 border-2 text-2xl block hover:cursor-pointer"/></label>
                <div v-else class="relative">
                    <img :src="image" alt="" class="w-20 h-20 border-2 text-2xl block hover:cursor-pointer">
                    <font-awesome-icon icon="close" @click="remove" class="absolute top-0 right-0 p-1 hover:cursor-pointer border bg-slate-100 rounded-[50%]"/>
                </div>
                    <input type="file" hidden id="file" name="image" @change="handleImageChange">
            </div>
            <button class="float-end p-2 bg-blue-400 shadow-md z-10 rounded-md" @click="handleEdit">Edit Product</button>
        </div>
    </div>
</template>
<script>
import {imgDb} from '../../../firebase'
import { ref, uploadBytesResumable,getDownloadURL } from 'firebase/storage'
import axios from 'axios'
export default {
    name:"EditProduct",
    props:['open','productIdToUpdate'],
    data(){
        return{
            percent:0,
            data:{},
            listCategory:[],
            image: '',
            name: '',
            price:'',
            categoryId: '',
            description: ''
        }
    },
    watch: {
        open(newVal) {
            if (newVal) {
                this.getProductById();
            }
        }
    },
    methods:{
        async getProductById(){
            try {
                const res=await axios.get('product/'+this.productIdToUpdate)
                this.data=res.data
                this.populateFields()
                this.getcategory()
            } catch (err) {
                alert("Lỗi")
            }
        },
        populateFields() {
            this.image = this.data[0].image;
            this.name = this.data[0].name;
            this.categoryId = this.data[0].categoryId;
            this.price = this.data[0].price;
            this.description = this.data[0].description;
        },
        async getcategory(){
            try {
                const res=await axios.get('category/getAll')
                this.listCategory=res.data
            } catch (err) {
                alert('Lỗi')
            }
        },
        close(){
            this.$emit('close');
        },
        remove(){
            this.image=''
        },
        async handleImageChange(event) {
            const file = event.target.files[0];
            if (!file) return;
            try {
                const imgRef = ref(imgDb, `/ecommerce/${file.name}`);
                const uploadTask = uploadBytesResumable(imgRef, file);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        this.percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    },
                    (err) => console.log(err),
                    async () => {
                        const url = await getDownloadURL(uploadTask.snapshot.ref);
                        this.image = url;
                    }
                );
            } catch (err) {
                console.error("Error uploading image:", err);
            }
        },
        async handleEdit(){
            try {
                await axios.put('product/update/'+this.productIdToUpdate,{
                    name:this.name,
                    categoryId:this.categoryId,
                    price:this.price,
                    description:this.description,
                    image:this.image
                })
                this.$emit('update')
                alert("Update product successfully")
            } catch (err) {
                alert('Lỗi')
            }
        }
        
    }
}
</script>