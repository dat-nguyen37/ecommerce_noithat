<template>
     <div class="col-span-1 h-[55vh] hover:duration-1000 hover:scale-125">
        <div class="border w-full h-full p-1 text-center">
            <router-link :to="{name:'productDetail',params:{id: item._id}}" class="w-100 h-[35vh] relative group flex">
                <img :src="item.image" alt="" class="w-full h-full object-cover hover:cursor-pointer hover:opacity-50">
                <button class="hidden group-hover:block  text-black bg-white px-2 absolute top-24 right-20">Xem nhanh</button>
            </router-link>
            <h5 class="py-3 uppercase">{{item.name}}</h5>
            <h1 class="text-red-600">{{item.price | c}} VNĐ</h1>
        </div>
    </div>
</template>

<script>
export default {
    name:"ProductItem",
    props:['item']
}
</script>