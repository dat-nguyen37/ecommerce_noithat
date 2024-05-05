<template>
    <div class="">
      <apexChart type="line" height="300"  :options="chartOptions" :series="series"/>
    </div>
</template>

<script>
export default {
  name:"SplineChart",
  props:['categories','revenueByMonth'],
    data() {
      return {
        chartOptions: {
          chart: {
            id: 'line_chart',
          },
          xaxis: {
            categories: [],
          },
          title: {
          text: "Doanh thu (triệu VND)",
          align: "center", 
          margin: 20, 
          style: {
            fontSize: "18px", 
            fontWeight: "bold", 
            color: "#333", 
          },
        },
          
        },
        series: [{
          name: 'Doanh thu',
          data: [],
        }],
        
      }
      
    },
    watch: {
      categories: function(newVal) {
        this.chartOptions.xaxis.categories = newVal;
      },
      revenueByMonth: function(newVal) {
        this.series[0].data = newVal;
      }
    },
    created() {
      this.chartOptions.xaxis.categories = this.categories;
      this.series[0].data = this.revenueByMonth;
  }
  }
</script>