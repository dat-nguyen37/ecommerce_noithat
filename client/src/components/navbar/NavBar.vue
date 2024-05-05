<template>
    <div class=" w-full bg-[#261511] h-auto">
        <div class="w-full border-b border-white">
            <div class="flex justify-around py-2">
                <h6 class="text-white uppercase">Tháng bán sofa không lãi suất - ưu đãi tới 4.500.000 Đ</h6>
                <div class="h-100">
                    <ul class="flex gap-3 h-100 text-white">
                        <li><router-link :to='{name:"home"}' class="hover:text-gray-300">Trang chủ</router-link></li>
                        <li><router-link :to='{name:""}' class="hover:text-gray-300">Giới thiệu</router-link></li>
                        <li><router-link :to='{name:"contact"}' class="hover:text-gray-300">Liên hệ</router-link></li>
                        <li class="relative group" v-if="$store.state.user"><router-link to='/profile' class="hover:text-gray-300 up">{{ $store.state.user.name }}</router-link>
                            <ul  class="absolute group-hover:block hidden w-32 text-black bg-white shadow-md z-10 uppercase font-medium rounded">
                                <li v-if="$store.state.user.admin" class="border-b p-1 text-center"><router-link :to="{name:'adminHome'}" class="block">Admin</router-link></li>
                                <li class="border-b p-1 text-center hover:cursor-pointer" @click="logout">Logout</li>
                            </ul>
                        </li>
                        <div v-else class="flex gap-2">
                            <li ><router-link :to='{name:"register"}' class="hover:text-gray-300">Đăng ký</router-link></li>
                            <li ><router-link :to='{name:"login"}' class="hover:text-gray-300">Đăng nhập</router-link></li>
                        </div>  
                        <li><router-link :to='{name:"cart"}' class="hover:text-gray-300">Giỏ hàng</router-link></li>
                        <li><router-link to="/" class="relative">
                            <font-awesome-icon icon="shopping-cart" class="text-2xl" />
                            <span class="absolute -top-2 -right-3 w-4 h-4 rounded-full bg-yellow-400 flex justify-center items-center">{{ countCart }}</span>
                        </router-link></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="lg:container grid grid-rows-1 grid-cols-3 items-center py-2">
                <div class="flex justify-center">
                    <img src="https://pos.nvncdn.com/940d71-40111/store/20181231_500uZWWGMYZ6cglXbfR81lgJ.png" alt="">
                </div>
                <div class="flex justify-center w-full">
                    <div class="relative w-full h-10 bg-white rounded-lg">
                        <input type="text" class=" w-[90%] h-full outline-none mx-2" v-model="searchValue">
                        <router-link :to="{name:'search',query:{q:searchValue}}">
                            <font-awesome-icon icon="search" class="text-2xl absolute py-2" />
                        </router-link>
                        <div v-if="showSuggestions" class=" mt-2 absolute bg-white w-full z-10 shadow-md rounded-sm">
                            <div class="p-1 bg-gray-200 ">Sản phẩm gợi ý</div>
                            <div v-for="i in listSearch" :key="i._id" class="p-2 flex border-b">
                                <div class=""><img :src="i.image" alt="" class="w-14 h-10"></div>
                                <div class="flex flex-col mx-3">
                                    <router-link class="text-sm" :to="{name:'productDetail',params:{id:i._id}}">{{ i.name }}</router-link>
                                    <span>{{ i.price | numeral }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center">
                    <div class="w-[40px] h-[40px] border-2 rounded-full flex justify-center items-center border-white"><font-awesome-icon icon="phone" class="text-2xl text-white" /></div>
                    <div class="text-white self-center px-2">Hotline: <span class="uppercase text-2xl font-bold">19001812</span></div>
                </div>
            </div>
            <div class="w-full bg-[#433330] ">
                <div class="w-[970px] mx-auto">
                    <ul class="flex gap-10 text-white">
                        <li v-for="item in data" :key="item._id" class="py-2 relative group">
                            <router-link :to="{name:'category',params:{NameCategory: item._id}}" class="block hover:text-orange-400">{{ item.name }}</router-link>
                            <ul class="absolute text-white mt-2 w-44 group-hover:block hidden shadow-md z-10 py-2 bg-[rgba(37,37,37,0.65)] ">
                                <li class="border-b py-2 px-3"><router-link :to='{name:""}' class="block">Sofa gỗ phòng khách</router-link></li>
                                <li class="border-b py-2 px-3"><router-link :to='{name:""}' class="block">Kệ tivi</router-link></li>
                                <li class="border-b py-2 px-3"><router-link :to='{name:""}' class="block">Bàn nước</router-link></li>
                            </ul>
                        </li>
                        <li class="py-2"><router-link :to='{name:"news"}' class="block hover:text-orange-400">Tin tức</router-link></li>
                    </ul>   
                </div>
            </div>
    </div>
</template>

<script>
import axios from 'axios';



export default ({
    name:"NavBar",
    props:['countCart'],
    data() {
    return {
      searchValue: '',
      showSuggestions: false,
      data:[],
      listSearch:[]
    }; 
  },
  created(){
    this.getcategory()
  },
  methods:{
    async getcategory(){
            try {
                const res=await axios.get('category/getAll')
                this.data=res.data
            } catch (err) {
                alert(err.response.data)
            }
        },
    async getproduct(){
        try {
            const res=await axios.get(`product/search?q=${this.searchValue}`)
            this.listSearch=res.data
        } catch (err) {
            alert('Loi!')
        }
    },
    async logout(){
            try {
                await axios.get('api/logout')
                this.$store.commit('SET_LOGOUT')
                if(this.$route.path!="/")
                {
                    this.$router.push('/')
                }
            } catch (err) {
                console.log(err)
            }
        }
  },
  watch: {
    searchValue(newValue) {
      this.showSuggestions = newValue !== '';
      this.getproduct()
    }
  }
})
</script>
<style lang="css" scoped>

/* Nội dung CSS của bạn */
</style>