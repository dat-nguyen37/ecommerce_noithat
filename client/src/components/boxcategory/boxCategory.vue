,<template>
    <div class="w-full">
        <!--  -->
        <div v-for="(product,index) in data" :key="index" class="w-full py-2">
            <div class="flex border-b-2 border-black justify-between">
                <div class="uppercase text-2xl">{{ product.categoryName }}</div>
                <div>
                    <ul class="flex">
                        <li class="border-r-2 border-black px-2"><a href="">Sofa gỗ phòng khách</a></li>
                        <li class="border-r-2 border-black px-2"><a href="">Kệ tivi</a></li>
                        <li class="px-2"><a href="">Bàn nước</a></li>
                    </ul>
                </div>
            </div>
            <div class="px-4">
                <div class="w-100 grid grid-cols-4 mt-4 gap-3">
                    <ProductItem v-for="item in product.product" :item="item" :key="item._id"/>
                </div>  
            </div>  
        </div>
    </div>
</template>
<script>

import axios from 'axios';
import ProductItem from '../productItem/ProductItem.vue';
export default ({
    name:"BoxCategory",
    components:{ProductItem},
    data(){
        return{
            data:[]
        }
    },
    mounted(){
        this.getproduct()
    },
    methods:{
        async getproduct(){
           try {
              const res=await axios.get('product/getProductByCategory')
              this.data=res.data
           } catch (err) {
            alert("loi!")
           }
        }
    }
})
</script>
