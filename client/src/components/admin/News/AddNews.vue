<template>
    <div v-if="open"  class=" w-[120vh] h-[92vh] bg-white z-50 fixed top-[5vh] right-[50vh] shadow-2xl">
        <div class="text-center relative">
            <h1 class="uppercase font-bold text-xl bg-[#271511] text-white p-2">Add News</h1>
            <font-awesome-icon icon="close" @click="close" class="absolute top-0 right-0 p-3 text-xl hover:cursor-pointer text-white  hover:bg-red-500"/>
        </div>
        <div class="p-2">
            <input type="text" name="title" v-model="name" placeholder="Title" class="border-b w-full p-2 mb-2"> 
            <textarea name="description" v-model="description" id="" placeholder="Description" class="w-full p-2 mb-2 border-b" />
            <quill-editor
            class="h-[30vh]"
            :ref="commonRef"
            :options="options"
            v-model.trim="content"
            @input="handleInput" 
            @change="handleChange($event)"  
            />
            <div class="flex absolute bottom-2 w-[90vh] overflow-x-auto">
                <label for="file" class=""><font-awesome-icon icon="camera" class="p-6 border-4 text-2xl block hover:cursor-pointer"/></label>
                <div v-if="image" class="flex">
                    <div v-for="(img,index) in image" :key="index" class="relative">
                        <img :src="img" alt="" class="w-20 h-20 border-2 text-2xl block hover:cursor-pointer">
                        <font-awesome-icon icon="close" @click="remove(index)" class="absolute top-0 right-0 p-1 hover:cursor-pointer border bg-slate-100 rounded-[50%]"/>
                    </div>
                </div>
                    <input type="file" hidden id="file" name="image" @change="handleImageChange">
            </div>
            <button class="float-end p-2 bg-blue-400 shadow-md z-10 rounded-md absolute bottom-2 right-2" @click="handleAdd">Add News</button>
        </div>
    </div>
</template>
<script>
import {imgDb} from '../../../firebase'
import { ref, uploadBytesResumable,getDownloadURL } from 'firebase/storage'
import axios from 'axios'
export default {
    name:"AddNews",
    props:['open','getnews'],
    data(){
        return{
            percent:0,
            image:[],
            name:'',
            description:'',
            content:''
        }
    },
    methods:{
        close(){
            this.$emit('close');
        },
        remove(index) {
            this.image.splice(index, 1); 
        },
        async handleImageChange(event) {
            const file = event.target.files[0];
            if (!file) return;
            try {
                const imgRef = ref(imgDb, `/ecommerce/news/${file.name}`);
                const uploadTask = uploadBytesResumable(imgRef, file);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        this.percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    },
                    (err) => console.log(err),
                    async () => {
                        const url = await getDownloadURL(uploadTask.snapshot.ref);
                        this.image.push(url);
                    }
                );
            } catch (err) {
                console.error("Error uploading image:", err);
            }
        },
        async handleAdd(){
            try {
                await axios.post('news/create',{
                    title:this.name,
                    description:this.description,
                    content:this.content,
                    image:this.image
                })
                this.getnews()
                alert("Add news successfully")
            } catch (err) {
                alert('Lỗi')
            }
        }
    }
}
</script>