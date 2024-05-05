<template>
    <div class="min-h-[60vh] mt-2 relative">
        <div class="flex justify-between px-4">
            <h1 class="font-bold uppercase">Order</h1>
        </div>
        <div class="bg-white shadow-lg mt-1">
            <table class="w-full">
                <thead class="border">
                    <tr class="bg-gray-400">
                        <td scope="col" class="px-1 py-3 border">Đơn hàng</td>
                        <td scope="col" class="px-1 py-3 border">Ngày</td>
                        <td scope="col" class="px-1 py-3 border">Địa chỉ</td>
                        <td scope="col" class="px-1 py-3 border">Giá trị đơn hàng</td>
                        <td scope="col" class="px-1 py-3 border">Hình thức thanh toán</td>
                        <td scope="col" class="px-1 py-3 border">Trạng thái</td>
                        <td scope="col" class="px-1 py-3 border">Action</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in data" :key="item._id">
                        <td scope="col" class="border text-center">{{ item._id }}</td>
                        <td scope="col" class="border text-center">{{ formatDate(item.createdAt) }}</td>
                        <td scope="col" class="border text-center">{{ item.address }}</td>
                        <td scope="col" class="border text-center">{{ item.price | numeral}}</td>
                        <td scope="col" class="border text-center"><button class="p-1 bg-gray-400" @click="handlePayment(item._id,item.paymentStatus)">{{item.paymentStatus}}</button></td>
                        <td scope="col" class="border text-center"><button class="p-1 bg-gray-400" @click="handleStatus(item._id,item.confimationStatus)">{{item.confimationStatus}}</button></td>
                        <td scope="col" class="text-red-500 border text-center text-xl">
                            <font-awesome-icon icon="trash" class="mx-2 hover:cursor-pointer" />
                        </td>
                    </tr>  
                </tbody>
            </table>
        </div>
        <div class="absolute bottom-0 right-0">
            <div class="flex gap-2">
                <font-awesome-icon icon="arrow-left" v-if="page>1" @click="prevPage" class="p-2 bg-blue-400 hover:cursor-pointer"/>
                <font-awesome-icon icon="arrow-right" @click="nextPage" class="p-2 bg-blue-400 hover:cursor-pointer"/>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import moment from 'moment';

export default {
    name:'OrderView',
    props:['updateTotal'],
    data(){
        return{
            data:[],
            page:1,
            limit:5
        }
    },
    methods:{
        formatDate(date) {
            return moment(date).format('YYYY-MM-DD');
        },
        async prevPage(){
            if (this.page > 1) {
                this.page--;
                await this.getOrder();
            }
        },
        async nextPage() {
            this.page++;
            await this.getOrder();
        },
        async getOrder(){
            try {
                const res=await axios.get(`order/all?page=${this.page}&limit=${this.limit}`)
                this.data=res.data
            } catch (err) {
                alert("Loi!")
            }
        },
        async handlePayment(id,statusPayment){
        try {
            let newStatusPayment;
            if(statusPayment==="Chưa thanh toán"){
                newStatusPayment="Đã thanh toán"
            }else{
                newStatusPayment="Đã thanh toán"
            }
            await axios.put(`/order/update/${id}`,{paymentStatus:newStatusPayment})
            this.getOrder()
            this.updateTotal()
        } catch (err) {
            alert("Loi!")
        }
    },
    async handleStatus(id,status){
        try {
            let newStatus;
            if(status==="Chưa xác nhận"){
                newStatus="Đã xác nhận"
            }else{
                newStatus="Đã xác nhận"
            }
            await axios.put(`/order/update/${id}`,{confimationStatus:newStatus})
            this.getOrder()
        } catch (err) {
            console.log(err)
        }
    },
    },
    mounted(){
        this.getOrder()
    }
}
</script>