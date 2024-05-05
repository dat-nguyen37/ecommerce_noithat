<template>
    <div class="max-w-6xl mx-auto">
        <div class="py-2 border-b">
            <h6><router-link :to='{name:"home"}'>Trang chủ</router-link> | <span class="text-gray-500">Giỏ hàng</span></h6>
        </div>
        <div class="grid grid-cols-12 gap-4 mt-2">
            <div class="col-span-8">
                <h2 class="border-b uppercase text-xl">Giỏ hàng</h2>
                <table class="border-collapse border border-gray-300 w-full">
                    <thead class="text-center">
                        <tr>
                            <td class="border border-gray-300 px-4 py-2">Sản phẩm</td>
                            <td class="border border-gray-300 px-4 py-2">Số lượng</td>
                            <td class="border border-gray-300 px-4 py-2">Đơn giá</td>
                            <td class="border border-gray-300 px-4 py-2">Thành tiền</td>
                        </tr>
                    </thead>
                    <tbody class="text-center">
                        <CartItem v-for="item in cartData" :key="item.cartId" :item="item" :getCart="getCart"/>
                    </tbody>
                    <tfoot class="">
                        <tr class="text-right bg-gray-300">
                            <td colspan="4" class="py-2">Tổng tiền: {{ totalAmount | numeral }}VNĐ</td>
                        </tr>
                        <tr>
                            <td colspan="4" class="p-3 text-white ">
                                <span class="px-2">
                                    <router-link to="/" class="w-32 h-14 bg-[rgb(38,21,17)] uppercase font-bold p-2">Tiếp tục mua hàng</router-link>
                                </span>
                                <span class="px-2">
                                    <router-link :to="{name:'payment'}" class="w-32 h-14 bg-[rgb(38,21,17)] uppercase font-bold p-2">Thực hiện thanh toán</router-link>
                                </span>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div class="col-span-4">
                <div class="border-b uppercase text-xl">Bài viết mới</div>
                <p class="">Bí quyết trang trí bàn trà để tăng vẻ đẹp, sang trọng cho phòng khách
                    NHỮNG MẪU THIẾT KẾ NỘI THẤT PHÒNG KHÁCH HIỆN ĐẠI NHẤT NĂM 2018
                    Thiết kế và thi công nội thất chung cư hiện đại (Anh Hà – Tân Mai)
                    <a href="" class="hover:text-red-600">THIẾT KẾ NỘI THẤT CHUNG CƯ HIỆN ĐẠI THE SUNSHINE PLACE</a></p>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import CartItem from '../components/cartItem/CartItem.vue'
export default {
    name:"CartView",
    components:{CartItem},
    props:['getCountCart'],
    data(){
        return{
            cartData:[],
            totalAmount:0
        }
    },
    mounted(){
        this.getCart()
    },
    methods:{
        async getCart(){
            try {
                const res=await axios.get('cart/find')
                this.cartData=res.data.data
                this.totalAmount = res.data.totalAmount
                this.getCountCart()
            } catch (err) {
                alert('Loi!')
            }
        }
    }
}
</script>