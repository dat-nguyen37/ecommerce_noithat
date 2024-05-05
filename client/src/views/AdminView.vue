<template>
    <div className='max-h-[100vh] w-full'>
        <div class="flex min-h-[100vh]">
            <div :class="{ 'hidden': !isSidebarVisible }" class="w-80 bg-[#070808] text-white shadow-md">
                <div class="h-10 bg-[#261511] text-white p-2 uppercase font-bold text-center border-r">
                    <router-link to="/">ADMIN</router-link>
                </div>
                <div class="p-2">
                    <div class="h-12 pb-2 flex border-b border-gray-200">
                        <img src="data:image/jpeg;base64,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" class="rounded-[50%]" alt="">
                        <div class="flex flex-col px-2">
                            <span>{{ this.$store.state.user.email }}</span>
                            <span class="relative flex h-3 w-3 mt-1 items-center">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                                <span class="absolute left-5">online</span>
                            </span>
                        </div>
                    </div>
                    <div class="p-2 uppercase font-bold">
                        <ul>
                            <li><router-link :to="{name:'adminProduct',}" class="block py-2 text-center hover:bg-slate-300 hover:text-black">Product</router-link></li>
                            <li><router-link :to="{name:'adminCategory',}" class="block py-2 text-center hover:bg-slate-300 hover:text-black">Category</router-link></li>
                            <li><router-link :to="{name:'adminOrder',}" class="block py-2 text-center hover:bg-slate-300 hover:text-black">Order</router-link></li>
                            <li><router-link :to="{name:'adminUser',}" class="block py-2 text-center hover:bg-slate-300 hover:text-black">User</router-link></li>
                            <li><router-link :to="{name:'adminNews',}" class="block py-2 text-center hover:bg-slate-300 hover:text-black">News</router-link></li>
                            <li><router-link to="" class="block py-2 text-center hover:bg-slate-300 hover:text-black">Logout</router-link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="w-full h-[100vh]">
                <div class="h-10 bg-[#261511] text-white p-2 flex justify-between">
                    <font-awesome-icon icon="bars" class="text-xl hover:cursor-pointer" @click="toggleSidebar"/>
                    <div class="flex justify-between px-2">
                        <img src="data:image/jpeg;base64,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" class="px-2 rounded-[50%]" alt="">
                        <span>{{ this.$store.state.user.email }}</span>
                    </div>
                </div>
                <div class="bg-gray-200 h-[calc(100vh-2.5rem)] p-2">
                    <div class="h-10 flex justify-between">
                        <h1 class="font-bold text-xl">Dashboard</h1>
                        <p class="px-2"><font-awesome-icon icon="home" class="px-2"/><router-link :to="{name:'adminHome'}">Home</router-link> - Dashboard</p>
                    </div>
                    <div class="grid grid-rows-4 gap-2 mt-1 h-[80vh]">
                        <div class="grid row-span-1 grid-cols-4 gap-10">
                            <div class="bg-blue-400 shadow-2xl flex items-center text-center ">
                                <div class="w-[50%]">{{ userCount |numeral }}</div>
                                <div class="w-[50%] ">
                                    <font-awesome-icon icon="user" class="text-5xl"/>
                                </div>
                            </div>
                            <div class="bg-red-400 shadow-2xl flex items-center text-center ">
                                <div class="w-[50%]">{{ productCount |numeral }}</div>
                                <div class="w-[50%] ">
                                    <font-awesome-icon icon="chair" class="text-5xl"/>
                                </div>
                            </div>
                            <div class="bg-yellow-400 shadow-2xl flex items-center text-center ">
                                <div class="w-[50%]">{{ orderCount |numeral }}</div>
                                <div class="w-[50%] ">
                                    <font-awesome-icon icon="truck" class="text-5xl"/>
                                </div>
                            </div>
                            <div class="bg-gray-400 shadow-2xl flex items-center text-center ">
                                <div class="w-[50%]">{{ totalCount |numeral }}</div>
                                <div class="w-[50%] ">
                                    <font-awesome-icon icon="dollar-sign" class="text-5xl"/>
                                </div>
                            </div>
                        </div>
                       <div class="grid row-span-3">
                        <router-view :updateTotal="getTotal" :updateUser="getUser" :updateProduct="getProduct" :updateOrder="getOrder" ></router-view>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'AdminView',
    data(){
        return{
            isSidebarVisible:true,
            userCount:0,
            productCount:0,
            totalCount:0,
            orderCount:0
        }
    },
    methods:{
        toggleSidebar(){
            this.isSidebarVisible=!this.isSidebarVisible
        },
        async getUser(){
            try {
                const res=await axios.get('api/getAll')
                this.userCount=res.data.length
            } catch (err) {
                alert("Loi")
            }
        },
        async getProduct(){
            try {
                const res=await axios.get('product/getAll?page=1&limit=10000000')
                this.productCount=res.data.length
            } catch (err) {
                alert("Loi")
            }
        },
        async getOrder(){
            try {
                const res=await axios.get('order/all?page=1&limit=10000000')
                this.orderCount=res.data.length
            } catch (err) {
                alert("Loi")
            }
        },
        async getTotal(){
            try {
                const res=await axios.get('order/totalByMonth')
                this.totalCount=res.data.map(item=>item.total)
            } catch (err) {
                alert("Loi")
            }
        },
    },
    mounted(){
        this.getUser()
        this.getProduct()
        this.getOrder()
        this.getTotal()
    }
}
</script>