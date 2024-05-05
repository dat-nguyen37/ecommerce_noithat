<template>
    <div class="w-full mt-4 bg-[#261511] py-12">
        <div class="w-[calc(100%-150px)] mx-auto text-white ">
            <div class="grid grid-rows-1 grid-cols-4 gap-x-7 text-xl">
                <div class="grid-cols-1">
                    <div class="border-b-2 pb-1">Shop.vn</div>
                    <div class="mt-2 font-light text-lg">
                        <p>Giấy phép kinh doanh số:</p>
                        <p>0106162265 do phòng Kinh doanh sở KH&ĐT TP Hà Nội cấp ngày: 25/04/2013</p>
                        <p>Xưởng SX: Số 102 Thái Thịnh, phường Trung Liệt, quận Đống Đa, TP Hà Nội</p>
                        <p>Showroom 1: Thái thịnh, Đống Đa, Hà Nội</p>
                        <p>Mở cửa: 7h30 - 21h30 kể cả thứ 7 và Chủ Nhật, Có vị trí đỗ xe ô tô</p>
                    </div>
                </div>
                <div class="grid-cols-1">
                    <div class="border-b-2 pb-1">Liên hệ & Thanh toán</div>
                    <div class="mt-2 font-light text-lg">
                        <p>Hotline: <a href="tel:19002812" class="hover:text-orange-500">19002812</a></p>
                        <p>Email: <a href="mailto:dat958734@gmail.com" class="hover:text-orange-500">dat958734@gmail.com</a></p>
                        <p>Website: <a href="#" class="hover:text-orange-500">shop.com</a></p>
                        <p class="mt-4">ĐĂNG KÝ NHẬN THÔNG TIN KHUYẾN MẠI QUA EMAIL</p>
                        <div class="flex mt-3 gap-1 w-full">
                            <input type="text" class="w-48 text-black px-2">
                            <button class="border-white text-sm w-16 h-8 border">ĐĂNG KÝ</button>
                        </div>
                    </div>
                </div>
                <div class="grid-cols-1">
                    <div class="border-b-2 pb-1">Hỗ trợ khách hàng</div>
                    <div class="mt-2 font-light text-lg">
                        <ul class="font-normal">
                            <li class="hover:text-orange-500"><router-link to="">Chính sách bảo mật thông tin</router-link></li>
                            <li class="hover:text-orange-500"><router-link to="">Chính sách và quy định</router-link></li>
                            <li class="hover:text-orange-500"><router-link to=""></router-link>Hướng dẫn mua hàng</li>
                            <li class="hover:text-orange-500"><router-link to="">Sơ đồ chỉ đường</router-link></li>
                            <div class="">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14894.629801668254!2d105.7849436!3d21.046388!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abb158a2305d%3A0x5c357d21c785ea3d!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyDEkGnhu4duIEzhu7Fj!5e0!3m2!1svi!2s!4v1713012861555!5m2!1svi!2s" width="250" height="250" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </ul>
                    </div>
                </div>
                <div class="grid-cols-1">
                    <div class="border-b-2 pb-1">Fanpage</div>
                    <div class="mt-2 font-light text-lg">
                        <div class="w-full h-[40vh]">
                            <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61558321675166&tabs=timeline&width=250&height=250&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="250" height="250" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default ({
    name:"FooterView"
})
</script>
