<template>
    <div class="w-full">
        <div class="max-w-6xl mx-auto py-2">
            <h6><router-link :to='{name:"home"}'>Trang chủ</router-link> | <span class="text-gray-500">{{ listproduct.categoryName }}</span></h6>
        </div>
        <div class="max-w-6xl mx-auto border-4 border-blue-400">
            <div class="leading-10 px-6 border-b">
                <span class="text-gray-400 pe-8">Danh mục</span>
                <router-link to="" class="px-2">Phòng khách</router-link>
                <router-link to="" class="px-2">Phòng ngủ</router-link>
                <router-link to="" class="px-2">Phòng bếp</router-link>
            </div>
            <div class="max-w-6xl px-6 flex">
                <span class="text-gray-400 pe-8">Khoảng giá</span>
                <div class=" px-2 w-full">
                    <span class="text-sm">
                        Từ
                        <span class="" data-size="0">{{min}}VND</span>
                        :
                        <span class="" data-size="16000000" data-max="16000000"> {{ max }}</span>
                    </span>
                    <vue-slider class="custom-slider" v-model="value" :min="0" :max="16000000" @drag-end="updateMinMax"  :drag-range="true"/>
                </div>
            </div>
        </div>
        <div class="max-w-6xl mx-auto mt-4">
            <div class="py-2 flex justify-between border-b aitems-center">
                <h6 class="uppercase text-xl">{{ listproduct.categoryName }}</h6>
                <div class="flex ">
                    <p class="px-2">Sắp xếp theo:</p>
                    <select name="sort" id="" v-model="sort" class="border outline-none">
                        <option selected value="">Sắp xếp theo</option>
                        <option value="desc">Giá tăng dần</option>
                        <option value="asc">Giá giảm dần</option>
                        <option value="new">Mới nhất</option>
                    </select>
                </div>
            </div>
            <div class=" grid grid-rows-1 grid-cols-4 gap-3 p-2">
                <ProductItem v-for="item in listproduct.product" :key="item._id" :item="item"/>
            </div>
            <div>

            </div>
        </div>
    </div>
</template>

<script>
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';
import ProductItem from '../components/productItem/ProductItem.vue'
import axios from 'axios';
export default {
    name:"categoryView",
    components: {
    VueSlider,
    ProductItem
  },
    data(){
        return{
            NameCategory:this.$route.params.NameCategory,
            value: [0, 16000000],
            min:0,
            max:16000000,
            listproduct:[],
            sort:''
        }
    },
    mounted(){
        this.getProduct()
    },
    watch:{
        '$route.params.NameCategory':function(newValue){
            this.NameCategory=newValue
            this.getProduct()
        },
        sort(newValue){
            this.sort=newValue
            this.getProduct()
        },
        min(newValue){
            this.min=newValue
            this.getProduct()
        },
        max(newValue){
            this.max=newValue
            this.getProduct()
        }
    },
    methods: {
        updateValues(value) {
            this.value = value;
        },
        updateMinMax() {
            // Lấy giá trị mới của min và max sau khi thả chuột
            this.min = this.value[0];
            this.max = this.value[1];
        },
        async getProduct(){
            try {
                const res=await axios.get(`product/find/${this.NameCategory}?min=${this.min}&max=${this.max}&sort=desc&page=${1}&limit=${8}`)
                this.listproduct=res.data
            } catch (err) {
                alert('Loi!')
            }
        }
    }
}
</script>