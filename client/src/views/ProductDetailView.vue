<template>
    <div class="max-w-6xl h-auto mx-auto">
        <div class="max-w-6xl border-b mx-auto py-2">
            <h6><router-link :to="{name:'home'}">Trang chủ</router-link> / <span class="text-gray-500">{{ data[0].name }}</span></h6>
        </div>
        <div class="grid grid-cols-12 gap-4">
            <div class="col-span-7">
                <img :src="data[0].image" alt="">
            </div>
            <div class="col-span-5">
                <div class="py-2 border-b-2 border-black ">
                    <h1 class="font-bold">{{ data[0].name }}</h1>
                    <span>MÃ SP: {{ data[0].id }}</span>
                </div>
                <div class="text-center text-4xl border-b text-red-500">{{ data[0].price*quantity | numeral}} VND    </div>
                <div class="w-full">
                    <label for="">Số lượng:</label>
                    <div class="flex mt-4 text-4xl">
                        <button type="button" class="border border-black w-10 h-10 text-center" @click="incrementQuantity">-</button>
                        <input type="number" name="quantity" v-model="quantity" placeholder="1" min="1" class="w-14 text-center border border-black">
                        <button type="button" class="border border-black w-10 h-10 text-center" @click="decrementQuantity">+</button>
                    </div>
                    <button class="mt-4 w-full h-14 bg-[#271511] text-white text-3xl rounded-md flex items-center px-2" @click="handleAddToCart(data[0].id,data[0].price)">
                        <font-awesome-icon icon="shopping-cart" class="" />
                        <span class="mx-auto">Đặt hàng</span>
                    </button>
                    <button class="mt-4 w-full h-14 bg-[#271511] text-white text-3xl rounded-md flex items-center px-2">
                        <div class="w-12 h-12 border-2 rounded-full flex justify-center items-center">
                            <font-awesome-icon icon="phone" class="" />
                        </div>
                        <a href="tel:19002812" class="mx-auto">19002812</a>
                    </button>
                    <div class="mt-4">
                       <h1>Địa chỉ mua hàng:</h1>
                       <p>Showroom 1: Thái thịnh, Đống Đa, Hà Nội</p>
                    </div>
                    <p class="font-bold">Thể loại: {{ data[0].categoryName }}</p>
                </div>
            </div>
            <div class="col-span-8 border">
                <div class="grid grid-cols-2 gap-1">
                    <div class="h-10 bg-[#271511] text-white leading-10 text-center hover:cursor-pointer" @click="openDescription">
                        Thông tin sản phẩm
                    </div>
                    <div class="h-10 bg-[#271511] text-white leading-10 text-center hover:cursor-pointer" @click="openComment">
                        Đánh giá nhận xét ({{ average }}/5)
                    </div>
                </div>
                <div v-if="open" class="p-4"><p>{{ data[0].description }}</p></div>
                <div v-else class="p-4 bg-blue-300">
                    <div class="border p-2 h-[150vh] bg-white">
                        <h1 class="uppercase font-bold">Đánh giá của bạn:</h1>
                        <select name="star" v-model="star" id="" class="border-2 w-56 my-2">
                            <option value="1" selected>1sao</option>
                            <option value="2">2sao</option>
                            <option value="3">3sao</option>
                            <option value="4">4sao</option>
                            <option value="5">5sao</option>
                        </select>
                        <h1 class="uppercase font-bold">Nhận xét của bạn:</h1>
                        <textarea name="" v-model="description" id="" class="border w-full p-1" placeholder="nhận xét ..."></textarea>
                        <div class="flex bottom-2 overflow-x-auto justify-between">
                            <div class=" w-[90vh] flex">
                                <label for="file" class=""><font-awesome-icon icon="camera" class="p-6 border-4 text-2xl block hover:cursor-pointer"/></label>
                                <div v-if="image" class="flex">
                                    <div v-for="(img,index) in image" :key="index" class="relative">
                                        <img :src="img" alt="" class="w-20 h-20 border-2 text-2xl block hover:cursor-pointer">
                                        <font-awesome-icon icon="close" @click="remove(index)" class="absolute top-0 right-0 p-1 hover:cursor-pointer border bg-slate-100 rounded-[50%]"/>
                                    </div>
                                </div>
                            </div>
                                <input type="file" hidden id="file" name="image" @change="handleImageChange">
                                <button type="button" class="py-2 px-4 border bg-blue-500 h-10 self-center rounded-sm" @click="handleComment">Send</button>
                        </div>
                        <div class=' mt-3 border-4 border-black h-[105vh] p-2 relative'>
                            <h1>Comments ({{ count }})</h1>
                            <div class="h-[90vh] overflow-y-auto">
                                <div v-for="item in listComment.data" :key="item.comment._id" class='border-b'>
                                <div class='flex mt-3 items-center'>
                                    <div class="border w-10 h-10 rounded-[50%]" >
                                        <img :src="item.image" alt="" class='rounded-[50%]'/> 
                                    </div>
                                    <div class='mx-2'>
                                        <span class="text-md">{{item.name}}</span> <br/>
                                        <font-awesome-icon v-for="starIndex in parseInt(item.comment.star)" icon="star" :key="starIndex" class="text-[10px] text-yellow-300"/>
                                        <p class="text-[10px]">{{item.comment.createdAt}}</p>
                                    </div>
                                </div>
                                <div class='my-2 px-2'>
                                    <span>{{item.comment.description}}</span>
                                    <div  v-viewer class="flex gap-2">
                                        <img v-for="(img,index) in item.comment.image" :key="index" :src="img" alt="" class="w-10 h-10">
                                    </div>
                                    <viewer :images="item.comment.image">
                                        <img v-for="src in images" :key="src" :src="src">
                                    </viewer>
                                </div>
                            </div>
                            </div>
                            <button class="w-full text-center bg-[#271511] text-white leading-8" @click="handleLimit">Xem thêm bình luận (<span v-if="count>limit">{{ count-limit }}</span> <span v-else>0</span>)</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-4 border">
                <div class="w-full h-10 bg-[#271511] text-white text-center leading-10">
                    LÍ DO BẠN NÊN CHỌN
                </div>
                <div class="w-full flex flex-col p-2">
                    <img src="https://pos.nvncdn.com/940d71-40111/store/20181231_500uZWWGMYZ6cglXbfR81lgJ.png" alt="" class="w-40 h-20 self-center">
                    <ul class=" mt-2">
                        <li class="relative py-2">Thương hiệu - dịch vụ Việt Nam phát triển bền vững do Chủ tịch nước trao tặng</li>
                        <li class="relative py-2">Là doanh nghiệp tiêu biểu trong lĩnh vực Kiến trúc- Nội thất</li>
                        <li class="relative py-2">Đội ngũ kiến trúc sư giàu kinh nghiệm, xu hướng thiết kế hiện đại</li>
                        <li class="relative py-2">Chế độ bảo hành tại nhà, bảo trì vĩnh viễn tất cả sản phẩm</li>
                        <li class="relative py-2">Vận chuyển miễn phí cho khu vụ nội thành hoặc 50km đầu</li>
                        <li class="relative py-2">Kiểm tra hàng, thanh toán tại nhà khi nhận hàng</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="w-full mt-5">
            <div class="h-10 bg-[#271511] text-white leading-10 text-center text-2xl uppercase">
                        Sản phẩm liên quan
            </div>
            <div class=" grid grid-rows-1 grid-cols-4 gap-3 p-2">
                <ProductItem v-for="item in listproduct" :key="item._id" :item="item"/>
            </div>
        </div>
    </div>
</template>

<script>
import ProductItem from '@/components/productItem/ProductItem.vue';
import {imgDb} from '../firebase'
import { ref, uploadBytesResumable,getDownloadURL } from 'firebase/storage'
import axios from 'axios'

export default {
    name:"ProductDetailView",
    components:{ProductItem},
    props:['getCart','getCountCart'],
    data(){
        return{
            productId:this.$route.params.id,  
            percent:0,
            data:{},
            star:1,
            listproduct:[],
            quantity:1,
            description:'',
            image:[],
            open:false,
            listComment:[],
            page:1,
            limit:10,
            count:0,
            average:0
        }
    },
    mounted(){
        this.getProduct()
        this.getComment()
    },
    watch: {
        '$route.params.id': function(newProductId) {
            this.productId = newProductId;
            this.getProduct();
        }
    },
    methods:{
        openDescription(){
            this.open=true
        },
        openComment(){
            this.open=false
        },
        remove(index) {
            this.image.splice(index, 1); 
        },
        async getProduct(){
            try {
                const res=await axios.get('product/'+this.productId)
                this.data=res.data
                this.getProductByCategoryId()
            } catch (err) {
                alert('Loi!')
            }
        },
        async getProductByCategoryId(){
            try {
                const res=await axios.get(`product/category/${this.data[0].categoryId}`)
                this.listproduct=res.data
            } catch (err) {
                alert('Loi!')
            }
        },
        incrementQuantity(){
            if(this.quantity>1){
                this.quantity--
            }
        },
        decrementQuantity(){
            if(this.quantity<10){
                this.quantity++
            }
        },
        async handleAddToCart(id,price){
            try {
                await axios.post('cart/create',{
                    productId:id,
                    quantity:this.quantity,
                    totalAmount:price*this.quantity
                })
                this.getCountCart()
                alert("Add to cart success")
            } catch (err) {
                alert("Loi!")
            }
        },
        async handleImageChange(event) {
            const file = event.target.files[0];
            if (!file) return;
            try {
                const imgRef = ref(imgDb, `/ecommerce/comment/${file.name}`);
                const uploadTask = uploadBytesResumable(imgRef, file);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        this.percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    },
                    (err) => console.log(err),
                    async () => {
                        const url = await getDownloadURL(uploadTask.snapshot.ref);
                        this.image.push(url);
                    }
                );
            } catch (err) {
                console.error("Error uploading image:", err);
            }
        },
        async handleComment(){
            try {
                await axios.post('comment/create/'+this.productId,{
                    description:this.description,
                    image:this.image,
                    star:this.star
                })
                this.getComment()
                this.description=''
                this.image=[]
            } catch (err) {
                alert("Loi!")
            }
        },
        handleLimit(){
            this.limit+=10
            this.getComment()
        },
        async getComment(){
            try {
                const res=await axios.get(`comment/getAll/${this.productId}?page=${this.page}&limit=${this.limit}`)
                this.listComment=res.data
                this.average=res.data.average
                this.count=res.data.count

            } catch (err) {
                alert("Loi!")
            }
        },
    }
}
</script>
<style lang="css" scoped>
</style>