<template>
    <div class="w-full my-2 h-auto">
        <div class="max-w-6xl border-b mx-auto py-2">
            <h6><router-link :to='{name:"home"}'>Trang chủ</router-link> | <span class="text-gray-500">Đăng nhập</span></h6>
        </div>
        <div class="max-w-sm mt-3 mx-auto flex flex-col border bg-[#f4f4f4] shadow-md rounded-sm p-5 gap-4 text-center">
            <input type="text" placeholder="Email" v-model="email" class="h-10 rounded-lg p-2" required>
            <input type="text" placeholder="Mật khẩu" v-model="password" class="h-10 rounded-lg p-2" required>
            <span v-if="errorMessage">{{ errorMessage }}</span>
            <button class="w-24 h-12 bg-blue-400 text-white rounded-lg self-center" @click="login">Đăng nhập</button>
            <div class="w-full text-center">
                <button class="w-24 h-12 bg-[#261511] text-white rounded-lg  mx-2" @click="github">Github</button>
                <button class="w-24 h-12 bg-[#E02F2F] text-white rounded-lg  mx-2" @click="google">Google</button>
            </div>
            <router-link :to='{name:""}'>Quên mật khẩu</router-link>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name:"LoginView",
    data(){
        return{
            email:'',
            password:''
        }
    },
    computed: {
        errorMessage() {
            return this.$store.state.error;
        }
    },
    methods:{
        async login(){
            this.$store.commit('LOGIN_START')
            try {
                const res=await axios.post('api/signin',{
                    email:this.email,
                    password:this.password
                })
                this.$store.commit('LOGIN_SUCCESS',res.data)
                alert('success')
                this.$router.push('/')
            } catch (err) {
                this.$store.commit('LOGIN_FAILURE',err.response.data)
            }
        },
        async github(){
            try {
                await window.open("http://localhost:5000/auth/github", "_self")
            } catch (err) {
            alert('failure')
            }
        },
        async google(){
            try {
                await window.open("http://localhost:5000/auth/google", "_self")
            } catch (err) {
            alert('failure')
            }
        }
    }

}
</script>