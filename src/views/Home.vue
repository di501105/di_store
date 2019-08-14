<template>
  <div>
    <HomeNavbar/>
    <HomeContent/>
    <Footer/>
  </div>
</template>

<script>
import HomeNavbar from '../components/HomeNavbar.vue';
import HomeContent from '../components/HomeContent.vue';
import Footer from '../components/Footer.vue';

export default {
  components: {
    HomeNavbar,
    HomeContent,
    Footer,
  },
};
</script>
