<template>
    <div class="text-center px-2">
        <h1 class="text-2xl">Sửa thông tin tài khoản cá nhân</h1>
        <table class="mt-4 w-[50%] h-auto">
            <tbody>
                <tr class="">
                    <td class="text-start">Địa chỉ email</td>
                    <td><input type="email" placeholder="Email" name="email" v-model="userData.email" class="border p-1 outline-none"></td>
                </tr>
                <tr class="">
                    <td class="text-start">Họ và tên</td>
                    <td><input type="text" placeholder="Họ và tên" name="name"  v-model="userData.name" class="border p-1 outline-none"></td>
                </tr>
                <tr>
                    <td class="text-start">Điện thoại</td>
                    <td><input type="tel" placeholder="Điện thoại" name="phone"  v-model="userData.phone" class="border p-1 outline-none"></td>
                </tr>
                <tr>
                    <td class="text-start">Địa chỉ</td>
                    <td><input type="text" placeholder="Địa chỉ" name="address"  v-model="userData.address" class="border p-1 outline-none"></td>
                </tr>
            </tbody>
        </table>
        <button class="bg-black text-white py-2 px-4 mt-2" @click="update">Xác nhận</button>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name:'AcountView',
    data() {
        return {
            userData: {
                email: '',
                name: '',
                phone: '',
                address: ''
            }
        };
    },
    created(){
        this.userData.email=this.$store.state.user.email,
        this.userData.name=this.$store.state.user.name,
        this.userData.phone=this.$store.state.user.phone,
        this.userData.address=this.$store.state.user.address
    },
    methods:{
        async update(){
            try {
                const res=await axios.put('api/update/'+this.$store.state.user._id,this.userData)
                this.$store.commit('LOGIN_SUCCESS',res.data)
                console.log(res)
                alert('success')
            } catch (err) {
                this.$store.commit('LOGIN_FAILURE',err.response.data)
            }
        }
    }

}
</script>