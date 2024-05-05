<template>
    <div class="min-h-[60vh] mt-2 relative">
        <div class="flex justify-between px-4">
            <h1 class="font-bold uppercase">Category</h1>
        </div>
        <div class="bg-white shadow-lg mt-1">
            <table class="w-full">
                <thead class="border">
                    <tr class="bg-gray-400">
                        <th scope="col" class="border">Name</th>
                        <th scope="col" class="border">Gmail</th>
                        <th scope="col" class="border">Admin</th>
                        <th scope="col" class="border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in data" :key="item._id">
                        <td scope="col" class="border text-center">{{ item.name }}</td>
                        <td scope="col" class="border text-center">{{ item.email }}</td>
                        <td scope="col" class="border text-center">
                            <input type="checkbox" v-model="item.admin" @click="Update(item._id,item.admin)">
                        </td>
                        <td scope="col" class="text-red-500 border text-center text-xl">
                            <font-awesome-icon v-if="$store.state.user._id !=item._id" icon="trash" class="mx-2 hover:cursor-pointer" @click="handleDelete(item._id)"/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="absolute bottom-0 right-0">
            <div class="flex gap-2">
                <font-awesome-icon icon="arrow-left" class="p-2 bg-blue-400"/>
                <font-awesome-icon icon="arrow-right" class="p-2 bg-blue-400"/>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name:'CategoryView',
    props:['updateUser'],
    data(){
        return{
            data:[]
        }
    },
    created(){
        this.getuser();
    },
    methods:{
        async getuser(){
            try {
                const res=await axios.get('api/getAll')
                this.data=res.data
                this.updateUser()
            } catch (err) {
                alert("Loi")
            }
        },
        async handleDelete(id){
            try {
                await axios.delete('api/delete/'+id)
                this.getuser();
                alert("Delete successfull")
            } catch (err) {
                alert("Loi!")
            }
        },
        async Update(id,admin){
            try {
                await axios.put('api/update/'+id,{admin:!admin})
                alert(`${!admin?'Cấp quyền thành công':'Hủy cấp quyền'}`)
                this.getuser();
            } catch (err) {
                alert("Loi!")
            }
        }
    },
}
</script>