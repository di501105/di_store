<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <section class="container px-0 px-md-1">
      <div class="row">
        <swiper :options="swiperOption">
          <swiper-slide class="col-lg-4 col-md-6 mb-5 mb-md-0" v-for="item in products"
          :key="item.id">
            <div class="product-card">
              <div class="product-image" :style="{backgroundImage: `url(${item.imageUrl})`}">
                <div class="product-tag">本日精選</div>
                <div class="product-favorite">
                  <label class="favorite-checked-display">
                    <input type="checkbox" class="favorite-checkbox">
                    <i class="material-icons" @click.prevent="removeFavorite(item, false)" v-if="item.is_favorite">favorite</i>
                    <i class="material-icons" @click.prevent="addFavorite(item)" v-else>favorite_border</i>
                  </label>
                </div>
              </div>
              <router-link class="product-body text-center d-flex" :to="`/shopping/${item.id}`">
                <div class="product-name col">{{ item.title }}</div>
                <strong class="product-price col">NT$ {{ item.price }}</strong>
              </router-link>
              <a href="#" class="btn btn-primary-lighter btn-block btn-xl"
              @click.prevent="addtoCart(item.id)">加入購物車</a>
            </div>
          </swiper-slide>
          <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
          <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
        </swiper>
      </div>
    </section>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';
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
          delay: 4000,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    };
  },
  methods: {
    getProducts() {
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/products`;
      this.$store.dispatch('getProducts', url);
    },
    addtoCart(id, qty = 1) {
      this.$store.dispatch('addtoCart', { id, qty });
    },
    addFavorite(item) {
      this.$store.dispatch('favoriteModules/addFavorite', item)
    },
    removeFavorite(item, del) {
      this.$store.dispatch('favoriteModules/removeFavorite', {item, del})
    }
  },
  computed: {
    ...mapGetters(['isLoading', 'products']),
  },
  created() {
    this.getProducts();
  },
};
</script>
