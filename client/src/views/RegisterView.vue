<template>
    <div class="w-full my-2 h-auto">
        <div class="max-w-6xl border-b mx-auto py-2">
            <h6><router-link :to="{name:'home'}">Trang chủ</router-link> | <span class="text-gray-500">Đăng ký</span></h6>
        </div>
        <div class="max-w-sm mt-3 mx-auto h-[52vh] flex flex-col border bg-[#f4f4f4] shadow-md rounded-sm p-5 gap-4 ">
            <input type="text" v-model="name" placeholder="Họ và tên" class="h-10 rounded-lg p-2" required>
            <input type="email" v-model="email" placeholder="Email" class="h-10 rounded-lg p-2" required>
            <input type="text" v-model="password" placeholder="Mật khẩu" class="h-10 rounded-lg p-2" required>
            <input type="text" v-model="phone" placeholder="Điện thoại" class="h-10 rounded-lg p-2" required>
            <button class="w-24 h-20 bg-[#000] text-white rounded-lg self-center" @click="register">Đăng ký</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name:"RegisterView",
    data(){
        return{
            name:'',
            email:'',
            password:'',
            phone:''
        }
    },
    methods:{
        async register(){
            try {
                await axios.post('api/register',{
                    name:this.name,
                    email:this.email,
                    password:this.password,
                    phone:this.phone
                })
                alert("success")
            } catch (err) {
                alert(err.response.data)
            }
        }
    }
}
</script>