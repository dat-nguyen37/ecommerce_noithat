<template>
    <apexChart type="pie" height="300" :options="chartOptions" :series="series"></apexChart>
</template>

<script>
export default {
  name:"PieChart",
  props:['categories','revenueByMonth'],
  data() {
    return{
        series: [],
          chartOptions: {
            chart: {
              width: 380,
              type: 'pie',
              toolbar: {
                show: true,
                offsetX: 0,
                offsetY: 0,
                tools: {
                  download: true,
                  selection: true,
                  zoom: true,
                  zoomin: true,
                  zoomout: true,
                  pan: true,
                  reset: true ,
                  customIcons: []
                },
               
                autoSelected: 'zoom'
              }
            },
            labels: [],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          },
    }
         
  },
  watch: {
    categories: function(newVal) {
      this.chartOptions.labels = newVal.map(month => `Tháng ${month}`);
    },
    revenueByMonth: function(newVal) {
      this.series = newVal;
    }
  },
  created() {
    this.series = this.revenueByMonth;
    this.chartOptions.labels = this.categories.map(month => `Tháng ${month}`);
  }
  }
</script>