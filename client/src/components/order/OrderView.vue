<template>
    <div class="text-center">
        <h1 class="text-xl">Đơn hàng</h1>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-400 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <td scope="col" class="px-6 py-3">Đơn hàng</td>
                    <td scope="col" class="px-6 py-3">Ngày</td>
                    <td scope="col" class="px-6 py-3">Địa chỉ</td>
                    <td scope="col" class="px-6 py-3">Giá trị đơn hàng</td>
                    <td scope="col" class="px-6 py-3">Hình thức thanh toán</td>
                    <td scope="col" class="px-6 py-3">Trạng thái</td>
                    <td scope="col" class="px-6 py-3">Action</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in listOrder" :key="item._id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{ item._id }}
                </th>
                <td class="px-6 py-4">
                    {{item.createdAt}}
                </td>
                <td class="px-6 py-4">
                    {{item.address}}
                </td>
                <td class="px-6 py-4">
                    {{item.price | numeral}}
                </td>
                <td class="px-6 py-4">
                    {{item.paymentStatus}}
                </td>
                <td class="px-6 py-4">
                    {{item.confimationStatus}}
                </td>
                <td class="px-6 py-4">
                    <font-awesome-icon icon="trash" class="text-xl text-red-500"/>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name:'OrderView',
    data(){
        return{
            listOrder:[]
        }
    },
    methods:{
        async getOrder(){
            try {
                const res=await axios.get('order/getByUser')
                this.listOrder=res.data
            } catch (err) {
                alert("Loi!")
            }
        }
    },
    mounted(){
        this.getOrder()
    }
}
</script>