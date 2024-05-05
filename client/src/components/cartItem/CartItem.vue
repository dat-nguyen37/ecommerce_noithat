<template>
    <tr>
        <td class="border border-gray-300 px-4 py-2 w-60">
            <img :src="image" alt="" class="h-40">
            <div class="flex justify-between mt-2 items-center">
                <h1>{{ name }}</h1>
                <button class="border-2 px-1 border-b rounded-lg" @click="handleDelete(item.cartId)">Xóa</button>
            </div>
        </td>
        <td class="border border-gray-300 px-4 py-2">
            <button class="border py-2 px-4" @click="decrementCount(item.cartId)">-</button>
            <input type="number" placeholder="1" min="1" max="10" v-model="quantity" disabled class="w-10 border text-center py-2">
            <button class="border py-2 px-4" @click="incrementCount(item.cartId)">+</button>
        </td>
        <td class="border border-gray-300 px-4 py-2">{{ price | numeral}}</td>
        <td class="border border-gray-300 px-4 py-2">{{ totalAmount | numeral}}</td>
    </tr>
</template>
<script>
import axios from 'axios';

export default {
    name:"CartItem",
    props:['item','getCart'],
    data(){
        return{
            quantity:this.item.quantity,
            totalAmount:this.item.totalAmount,
            price:this.item.product[0].price,
            image:this.item.product[0].image,
            name:this.item.product[0].name
        }
    },
    methods: {
        incrementCount(id) {
            if (this.quantity < 10) {
                this.quantity++;
                this.totalAmount=this.price * this.quantity
                this.handleUpdate(id)
            }
        },
        decrementCount(id) {
            if (this.quantity > 1) {
                this.quantity--;
                this.totalAmount=this.price * this.quantity
                this.handleUpdate(id)
            }
        },
        async handleDelete(id){
            try {
                await axios.delete(`cart/delete/${id}`)
                this.getCart()
                alert("delete success")
            } catch (err) {
                alert("Loi!")
            }
        },
        async handleUpdate(id){
            try {
                await axios.put(`cart/update/${id}`,{
                    image:this.image,
                    name:this.name,
                    quantity:this.quantity,
                    totalAmount:this.totalAmount
                })
                this.getCart()
            } catch (err) {
                alert("Loi!")
            }
        }
    }
}
</script>