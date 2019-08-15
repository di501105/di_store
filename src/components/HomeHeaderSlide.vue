<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide>
        <div class="bg-cover header-main-image"
          style="background-image: url(https://images.unsplash.com/photo-1473256599800-b48c7c88cd7e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ae0d68ab0db4ee79bdce92722b31112b&auto=format&fit=crop&w=2725&q=80)"></div>
      </swiper-slide>
      <swiper-slide>
        <div class="bg-cover header-main-image"
          style="background-image: url(https://images.unsplash.com/photo-1496174883999-edcc585a373f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80)"></div>
      </swiper-slide>
      <swiper-slide>
        <div class="bg-cover header-main-image"
          style="background-image: url(https://images.unsplash.com/photo-1469533778471-92a68acc3633?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80)"></div>
      </swiper-slide>
      <swiper-slide>
        <div class="bg-cover header-main-image"
          style="background-image: url(https://images.unsplash.com/photo-1430025460695-1ff7b3c13074?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80)"></div>
      </swiper-slide>
    </swiper>
    <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
    <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        slidesPerView: 'auto',
        autoplay: { // 自動撥放-delay延遲
          delay: 5000,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    }
  },
}
</script>