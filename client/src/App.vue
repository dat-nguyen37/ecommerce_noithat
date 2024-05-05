<template>
  <div id="app w-full">
    <NavBar v-if="!$route.meta.hideNavbar" :countCart="countCart"/>
    <router-view :getCountCart="getCart"/>
    <Footer v-if="!$route.meta.hideFooter"/>
  </div>
</template>

<script>
import axios from 'axios';
import Footer from './components/footer/Footer.vue';
import NavBar from './components/navbar/NavBar'

export default ({
  components:{
    NavBar,
    Footer
  },
  data(){
    return{
      countCart:0
    }
  },
  
  methods:{
    async getCart(){
      try {
        const res=await axios.get('cart/find')
        this.countCart=res.data.count
      } catch (err) {
        console.error(err)
      }
    },
    async handleSuccess(){
            try {
                const res=await axios.get("/login/success")
                this.$store.commit('LOGIN_SUCCESS',res.data)
                this.getCart()
            } catch (err) {
                console.log(err)
            }
        },
  },
  mounted(){
    this.handleSuccess()
    this.getCart()
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}
</style>
