<template>
     <div class="grid grid-cols-5 gap-2">
        <div class=" col-span-3 shadow-lg">
            <div class=""><LineChart :categories="categories" :revenueByMonth="revenueByMonth" /></div>
        </div>
        <div class=" col-span-2 shadow-lg  ">
           <div class=""> <PieChartVue :categories="categories" :revenueByMonth="revenueByMonth" /></div>
        </div>
    </div>
</template>
<script>

import axios from 'axios'
import PieChartVue from '../piechart/PieChart.vue'
import LineChart from '../splinechart/SplineChart.vue'
export default {
    name:'ChartView',
    components:{LineChart,PieChartVue},
    data(){
        return{
            categories:[],
            revenueByMonth:[]
        }
    },
    methods:{
        async getTotalByMonth(){
            try {
                const res=await axios.get('order/totalByMonth')
                const data = res.data;
                this.categories = Array.from({ length: 12 }, (v, i) => `${i + 1}`);
                const revenueByMonth = new Array(12).fill(0);
                data.map(i =>i.monthlyRevenue.map(item=> {
                    if (item._id && item.totalRevenue) {
                        revenueByMonth[item._id - 1] = item.totalRevenue / 1000000;
                    }
                }));
                this.revenueByMonth = revenueByMonth;
            } catch (err) {
                alert("Loi!")
            }
        }
    },
    mounted(){
        this.getTotalByMonth()  
    }
}
</script>