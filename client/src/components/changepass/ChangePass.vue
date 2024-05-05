<template>
    <div>
        <div v-if="$store.state.user.email && $store.state.user.password" class="text-center px-2">
        <h1 class="text-2xl">Đổi mật khẩu tài khoản cá nhân</h1>
        <table class="mt-4 w-[50%] h-auto">
            <tbody>
                <tr class="">
                    <td class="text-start">* Mật khẩu cũ:</td>
                    <td><input type="text" placeholder="Mật khẩu cũ" class="border p-1 outline-none"></td>
                </tr>
                <tr class="">
                    <td class="text-start">* Mật khẩu mới:</td>
                    <td><input type="text" placeholder="Mật khẩu mới" class="border p-1 outline-none"></td>
                </tr>
                <tr>
                    <td class="text-start">* Nhập lại mật khẩu mới:</td>
                    <td><input type="tel" placeholder="Nhập lại mật khẩu mới" class="border p-1 outline-none"></td>
                </tr>
            </tbody>
        </table>
        <button class="bg-black text-white py-2 px-4 mt-2">Xác nhận</button>
    </div>
    <div v-else class="text-center px-2">
        <h1 class="text-2xl">Cập nhật tài khoản cho lần đăng nhập tiếp theo</h1>
        <table class="mt-4 w-[50%] h-auto">
            <tbody>
                <tr class="">
                    <td class="text-start">* Email</td>
                    <td><input type="email" :disabled="$store.state.user.email" placeholder="Email" v-model="email" class="border p-1 outline-none"></td>
                </tr>
                <tr class="">
                    <td class="text-start">* Password</td>
                    <td><input type="text" placeholder="Mật khẩu mới" v-model="password" class="border p-1 outline-none"></td>
                </tr>
            </tbody>
            <span class="text-sm">Lưu ý: Mật khẩu không trùng với mật khẩu gmail</span>
        </table>
        <button class="bg-black text-white py-2 px-4 mt-2" @click="updateUser">Xác nhận</button>
    </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name:'ChangePassView',
    data(){
        return{
            email:this.$store.state.user.email,
            password:'',
        }
    },
    methods:{
        async updateUser(){
            try {
                const res=await axios.put('api/update/'+this.$store.state.user._id,{
                    email:this.email,
                    password:this.password
                })
                alert('Success')
                this.$store.commit('LOGIN_SUCCESS',res.data)
            } catch (err) {
                alert("Loi!")
            }
        }
    }
}
</script>