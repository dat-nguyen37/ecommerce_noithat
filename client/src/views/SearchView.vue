<template>
    <div class="max-w-6xl my-2 h-auto mx-auto">
        <div class=" border-b py-2">
            <h6><router-link :to="{name:'home'}">Trang chủ</router-link> | <span class="text-gray-500">Search results for "{{ Value }}"</span></h6>
        </div>
        <div class="text-center">
            <h1 class="uppercase py-2 bg-gray-300 text-xl">TÌM KIẾM: {{ Value }}</h1>
        </div>
        <div  class=" w-100 grid grid-rows-1 grid-cols-4 mt-4 gap-3">
            <ProductItem v-for="item in data" :key="item._id" :item="item"/>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import ProductItem from '../components/productItem/ProductItem.vue'
export default {
    name:"SearchView",
    components:{ProductItem},
    data(){
        return{
            Value:this.$route.query.q,
            data:[]
        }
    },
    watch: {
    '$route.query.q'(newQueryValue) {
      this.Value = newQueryValue || '';
      this.getproduct()
    }
  },
  mounted(){
    this.getproduct()
  },
  methods:{
    async getproduct(){
        try {
            const res=await axios.get(`product/search?q=${this.Value}`)
            this.data=res.data
        } catch (err) {
            alert('Loi!')
        }
    }
  }
}
</script>