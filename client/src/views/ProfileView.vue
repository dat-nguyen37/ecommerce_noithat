<template>
    <div class="max-w-6xl mx-auto">
        <div class="py-2 border-b">
            <h6><router-link :to='{name:"home"}'>Trang chủ</router-link> | <span class="text-gray-500">Trang khách hàng</span></h6>
        </div>
        <div class="grid grid-cols-12 gap-4">
            <div class="col-span-3">
                <div class="bg-[#271511] text-xl text-white p-2 flex items-center">
                    <font-awesome-icon icon="bars" class="text-2xl absolute py-2 "/>
                    <p class="px-8 font-bold">Danh mục</p>
                </div>
                <div class="border">
                    <ul class="text-xl">
                        <li class="hover:bg-slate-200 p-2 border-b">
                            <router-link :to="{name: 'account', }" class="flex items-center">
                                <font-awesome-icon icon="user" class="text-2xl absolute py-2"/>
                                <p class="px-8">Thông tin cá nhân</p>
                            </router-link></li>
                        <li class="hover:bg-slate-200 p-2 border-b">
                            <router-link :to="{name: 'changePass', }" class="flex items-center">
                                <font-awesome-icon icon="lock" class="text-2xl absolute py-2"/>
                                <p class="px-8">Thay đổi mật khẩu</p>
                            </router-link></li>
                        <li class="hover:bg-slate-200 p-2 border-b">
                            <router-link :to="{name: 'order', }" class="flex items-center">
                                <font-awesome-icon icon="file" class="text-2xl absolute py-2"/>
                                 <p class="px-8">Đơn hàng</p>
                            </router-link>
                        </li>
                        <li class="hover:bg-slate-200 p-2 border-b">
                            <router-link to="" class="flex items-center">
                                <font-awesome-icon icon="sign-out" class="text-2xl absolute py-2"/>
                                 <p class="px-8" @click="logout">Đăng xuất</p>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-span-9">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name:'ProfileView',
    methods:{
        async logout(){
            try {
                await axios.get('api/logout')
                this.$store.commit('SET_LOGOUT')
                this.$router.push('/')
            } catch (err) {
                console.log(err)
            }
        }
    }
}
</script>