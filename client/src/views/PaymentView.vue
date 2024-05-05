<template>
    <div class="max-w-6xl py-2 grid grid-cols-12 gap-4 mx-auto">
        <div class="col-span-9">
            <div class="border rounded-md">
                <h2 class="leading-10 uppercase text-white bg-[#3f4140] px-2 font-bold">Giỏ hàng ({{ count }})</h2>
                <div v-for="item in cartData" :key="item.cartId" class="grid grid-cols-12 gap-3 text-center border-b">
                    <div class=" col-span-4 p-4">
                        <img :src="item.product[0].image" alt="" class="">
                    </div>
                    <div class="col-span-4 p-4">
                        <h1 class="font-bold uppercase">{{ item.product[0].name }}</h1>
                        <p><b class="text-gray-500">Mã sản phẩm : </b><span class="text-orange-300">{{ item.product[0]._id }}</span></p>
                        <p><b class="text-gray-500">Tình trạng : </b><span class="text-orange-300">Còn Hàng</span></p>
                        <button class="uppercase border leading-10 px-8 font-bold bg-gray-300 mt-6">XÓA</button>
                    </div>
                    <div class="col-span-4 p-4">
                        <h1 class="uppercase font-bold">Giá đã giảm:</h1> <br>
                        <span class="font-bold text-orange-300">{{ item.totalAmount| numeral }} ₫</span> <br/>
                        <span><b>Số lượng: </b> {{ item.quantity }}</span>
                    </div>
                </div>
            </div>
            <div class="mt-2"><router-link to="/" class="p-2 border rounded-md w-[20%] text-white bg-orange-300 font-bold">TIẾP TỤC MUA HÀNG</router-link></div>
            <div class="mt-6">
                <h2 class="leading-10 uppercase text-white bg-[#3f4140] px-2 font-bold">THÔNG TIN KHÁCH HÀNG</h2>
                <div class="bg-gray-300 p-3">
                    <form class="bg-white p-3">
                        <div class="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ và tên</label>
                                <input type="text" id="name" name="name" v-model="name"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Họ và tên" required />
                            </div>
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" id="email" name="email" v-model="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required />
                            </div>
                            <div>
                                <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số điện thoại</label>
                                <input type="tel" id="phone" name="phone" v-model="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Số điện thoại" pattern="[0][0-9]{9}" required />
                            </div>
                            <div>
                                <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ</label>
                                <input type="text" id="address" name="address" v-model="address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Địa chỉ" required />
                            </div>
                            <div>
                                <label for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tỉnh / thành</label>
                                <select name="" id="" @change="handleCityChange" v-model="city" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected value="">Chọn tỉnh / thành</option>
                                    <option v-for="c in cities" :key="c.Id" :value="c.Name">{{ c.Name }}</option>
                                </select>
                            </div>
                            <div>
                                <label for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quận / huyện</label>
                                <select name="" id="" @change="handleDistrictChange" v-model="district" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected value="">Chọn quận / huyện</option>
                                    <option v-for="d in districts" :key="d.Id" :value="d.Name">{{ d.Name }}</option>
                                </select>
                            </div>
                            <div>
                                <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phường / xã</label>
                                <select name="" id="" v-model="ward" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected value="">Chọn phường / xã</option>
                                    <option v-for="w in wards" :key="w.Id" :value="w.Name">{{ w.Name }}</option>
                                </select>
                            </div>
                        </div>
                    </form> 
                    <div class="bg-white p-3">
                        <h1 class="font-bold">Phương thức thanh toán</h1>
                        <div class="mt-1">
                           <div>
                                <input type="radio" class="" name="payment" @change="changePayment" value="Chưa thanh toán">
                                <span>Thanh toán tại nhà (Quý Khách vui lòng thanh toán hóa đơn khi nhận được hàng. Cảm ơn Quý Khách!)</span>
                           </div>
                           <div>
                                <input type="radio" class="" name="payment" @change="changePayment" value="Đã thanh toán">
                                <span>Thanh toán trực tuyến</span>
                           </div>
                        </div>
                        <div class="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
                            <p>Chọn hãng vận chuyển</p>
                            <table class="mt-2 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr class="text-center">
                                        <th class="px-6 py-3">Hãng</th>
                                        <th class="px-6 py-3">Cước phí</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="px-6 py-3"><img src="https://carrier.nvncdn.com/carrier/carr_1692349682_711.png" alt=""></td>
                                        <td class="flex justify-between px-6 py-3">
                                            <div>
                                                <input type="radio" name="shipping" value="Giao tiêu chuẩn" @change="updateShipping" >
                                                <span class="px-1 font-bold">Giao tiêu chuẩn (7-10 ngày)</span>
                                            </div>
                                            <p>26,000</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="px-6 py-3"><img src="https://carrier.nvncdn.com/carrier/carr_1692349526_269.png" alt=""></td>
                                        <td class="flex justify-between px-6 py-3">
                                            <div>
                                                <input type="radio" name="shipping" value="Tiết kiệm" @change="updateShipping" >
                                                <span class="px-1 font-bold">Tiết kiệm (4-6 ngày)</span>
                                            </div>
                                            <p>105,000</p>
                                        </td>
                                    </tr>
                                    <tr class="">
                                        <td class="px-6 py-3"><img src="https://carrier.nvncdn.com/carrier/carr_1692349752_369.png" alt=""></td>
                                        <td class="flex justify-between px-6 py-3">
                                            <div>
                                                <input type="radio" name="shipping" value="Giao nhanh" @change="updateShipping" >
                                                <span class="px-1 font-bold">Giao nhanh (2 - 3 ngày)</span>
                                            </div>
                                            <p>237,600</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <textarea name="description" v-model="description" id="" cols="" rows="" class="w-full border-2 p-1 mt-5"  placeholder="Ghi chú"></textarea>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-3 text-white bg-[#3f4140] p-3 h-[70vh]">
            <h2 class="leading-10 uppercase font-bold text-xl">Thanh toán</h2>
            <div class="mt-2">
                <p class="font-bold text-sm border-b py-2">NHẬP MÃ ƯU ĐÃI ( MÃ COUPON, VOUCHER )</p>
                <div class="mt-3">
                    <p>MÃ GIẢM GIÁ</p>
                    <div class="flex h-8 gap-2 mt-2">
                        <input type="text" placeholder="Mã giảm giá" class="font-bold px-1 w-32 rounded-md text-black">
                        <button class="font-bold py-1 px-2 bg-orange-300 uppercase rounded-md">Sử dụng</button>
                    </div>
                </div>
                <table class="mt-5 w-full">
                    <tr class="flex justify-between py-2">
                        <td class="font-bold text-sm">TẠM TÍNH</td>
                        <td class=""><span>{{ totalAmount | numeral }}</span></td>
                    </tr>
                    <tr class="flex justify-between py-2">
                        <td class="font-bold text-sm">PHÍ VẬN CHUYỂN</td>
                        <td class=""><span>{{ shipTotal | numeral }}</span></td>
                    </tr>
                    <tr class="flex justify-between py-2">
                        <td class="font-bold text-sm">THÀNH TIỀN</td>
                        <td class=""><span>{{ sumTotal | numeral }}</span></td>
                    </tr>
                </table>
                <button class="w-full py-2 text-center uppercase bg-orange-300" @click="checkout">Thanh toán</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:"PaymentView",
    data(){
        return{
            cities:[],
            districts:[],
            wards:[],
            cartData:[],
            totalAmount:0,
            count:0,
            shipTotal:0,
            product:[],
            shipping:'',
            payment:'',
            sumTotal:0,
            name:'',
            email:'',
            phone:'',
            address:'',
            city:'',
            district:'',
            ward:'',
            description:'',
            message:this.$route.query.Message
        }
    },
    methods:{
        async getCities(){
           try {
            const response= await fetch("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json")
            const data = await response.json();
            this.cities=data
           } catch (err) {
            console.error(err)
           }
        },
        handleCityChange(e){
            const selectedCityName = e.target.value;
            const selectedCity = this.cities.find(city => city.Name === selectedCityName);
            if (selectedCity) {
            this.districts=selectedCity.Districts;
            }
        },
         handleDistrictChange  (e)  {
        const selectedDistrictName = e.target.value;
        const selectedDistrict = this.districts.find(district => district.Name === selectedDistrictName);
        if (selectedDistrict) {
          this.wards=selectedDistrict.Wards;
        }
        },
        async getCart(){
            try {
                const res=await axios.get('cart/find')
                this.cartData=res.data.data
                this.totalAmount = res.data.totalAmount
                this.sumTotal = res.data.totalAmount
                this.count = res.data.count
                if (this.cartData) {
                    const updatedProducts = this.cartData.map(item => ({
                        productId: item.product[0]._id,
                        quantity: item.quantity
                    }));
                    this.product=updatedProducts
                    }
            } catch (err) {
                alert('Loi!')
            }
        },
        updateShipping(event){
            this.shipping=event.target.value
            if(this.shipping=="Giao tiêu chuẩn"){
                this.shipTotal=26000
                this.sumTotal=this.totalAmount + this.shipTotal
            }
            if(this.shipping=="Tiết kiệm"){
                this.shipTotal=105000
                this.sumTotal=this.totalAmount + this.shipTotal
            }
            if(this.shipping=="Giao nhanh"){
                this.shipTotal=237000
                this.sumTotal=this.totalAmount + this.shipTotal
            }
        },
        changePayment(event){
            this.payment=event.target.value
        },
        async handlePayment(){
            try {
                await axios.post('order/create',{
                        product:this.product,
                        price:this.sumTotal,
                        paymentStatus:this.payment,
                        name:this.name,
                        email:this.email,
                        phone:this.phone,
                        address:this.address,
                        city:this.city,
                        ward:this.ward,
                        district:this.district,
                        shipping:this.shipping,
                        description:this.description
                    })
                    this.getCart()
            } catch (err) {
                alert('Loi!')
            }
        },
        async checkout(){
            try {
                if(this.payment==""){
                    return alert("Vui lòng chọn phương thức thanh toán")
                }
                if(this.shipping==""){
                    return alert("Vui lòng chọn phương thức vận chuyển")
                }
                if(this.cartData.length<1){
                    return alert("Bạn không có đơn hàng nào")
                }
                if(this.payment=="Chưa thanh toán"){
                    this.handlePayment()
                    alert("Order successfull")
                }
                else{
                    const res= await axios.post('/create_payment_url',{
                    amount :this.sumTotal,
                    bankCode : "NCB",
                    orderInfo : "fdfd",
                    orderType : "dfdfd",
                    language:"vn",
                    })
                    window.location.href = res.data.paymentUrl;
                    this.handlePayment()
                    this.getCart()
                }

            } catch (err) {
                alert("Loi!")
            }
        },
    },
    mounted(){
        this.getCities(),
        this.getCart();
        if(this.message=="Success"){
            alert("Order success")
            this.$router.push('/cart')
        }
    }
}
</script>
