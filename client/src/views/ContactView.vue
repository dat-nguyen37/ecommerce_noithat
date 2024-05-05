<template>
    <div class="max-w-6xl mx-auto">
        <div class=" border-b py-2">
            <h6><router-link :to='{name:"home"}'>Trang chủ</router-link> | <span class="text-gray-500">Liên hệ</span></h6>
        </div>
        <div class=" gap-4 mt-2 flex">
            <div class="">
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14894.629801668254!2d105.7849436!3d21.046388!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abb158a2305d%3A0x5c357d21c785ea3d!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyDEkGnhu4duIEzhu7Fj!5e0!3m2!1svi!2s!4v1713012861555!5m2!1svi!2s" width="600 " height="350" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div class="">
                <h1>Để lại thông tin để được tư vấn</h1>
                <div class="p-2 text-center">
                    <input type="text" placeholder="Tên quý khách hàng" class="border w-full h-8 p-1 mb-3">
                    <input type="text" placeholder="Địa chỉ email" class="border w-full h-8 p-1 mb-3">
                    <input type="text" placeholder="Điện thoại liên hệ" class="border w-full h-8 p-1 mb-3">
                    <input type="text" placeholder="Địa chỉ" class="border w-full h-8 p-1 mb-3">
                    <textarea name="" id="" cols="" rows="" placeholder="Mô tả" class="border w-full p-1 mb-3"></textarea>
                    <button class="bg-[#261511] text-white font-bold p-2">Đăng ký ngay</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"ContactView"
}
</script>