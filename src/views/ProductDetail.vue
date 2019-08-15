<template>
  <div>
    <HomeNavbar/>
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <div class="row mb-7">
        <div class="col-md-8">
          <div class="detail-card">
            <div class="detail-image" :style="{backgroundImage: `url(${product.imageUrl})`}">
              <div class="detail-tag">{{ product.category }}</div>
              <div class="detail-favorite">
                <label class="favorite-checked-display">
                  <input type="checkbox" class="favorite-checkbox">
                  <i class="material-icons" @click.prevent="removeFavorite(product, false)" v-if="isFavorite">favorite</i>
                  <i class="material-icons" @click.prevent="addFavorite(product)" v-else>favorite_border</i>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <h1 class="h2">{{ product.title }}</h1>
          <div class="d-flex justify-content-end align-items-end">
            <del class="text-primary-100">原價 {{ product.origin_price | currency }}</del>
            <div class="h3 ml-auto mb-0 text-danger">
              <small>特價 </small>
              <strong>{{ product.price | currency }}</strong>
            </div>
          </div>
          <div class="mt-3">
            <div class="h4">商品介紹</div>
            <p>{{ product.description }}</p>
          </div>
          <div class="input-group mt-3">
            <select name="" id="" class="form-control mr-2" v-model="count">
              <option :value="i" v-for="i in 10" :key="i">
                {{i}} {{product.unit}}
              </option>
            </select>
            <a href="#" class="btn btn-primary" @click="addtoCart(product.id, count)">加入購物車</a>
          </div>
        </div>
      </div>
    </div>

    <Footer/>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';
import HomeNavbar from '../components/HomeNavbar.vue';
import Footer from '../components/Footer.vue';

export default {
  components: {
    HomeNavbar,
    Footer,
  },
  data() {
    return {
      product: [],
      productId: '',
      count: 1,
      isFavorite: false,
    };
  },
  methods: {
    getProduct() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/product/${vm.productId}`;
      vm.$store.dispatch('updateLoading', true);
      this.$http.get(url).then((response) => {
        if (response.data.success) {
          vm.product = response.data.product;
          vm.favorite.forEach(e => {
            if (vm.product.id === e.id) {
              vm.isFavorite = true;
            }
          });
          vm.$store.dispatch('updateLoading', false);
        } else {
          vm.$store.dispatch('updateMessage', { message: response.data.message, status: 'danger' });
        }
      });
    },
    addtoCart(id, qty = 1) {
      this.$store.dispatch('addtoCart', { id, qty });
    },
    addFavorite(item) {
      this.$store.dispatch('favoriteModules/addFavorite', item);
      this.isFavorite = true;
    },
    removeFavorite(item, del) {
      this.$store.dispatch('favoriteModules/removeFavorite', {item, del});
      this.isFavorite = false;
    }
  },
  computed: {
    ...mapGetters(['isLoading']),
    ...mapGetters('favoriteModules', ['favorite'])
  },
  created() {
    this.productId = this.$route.params.productId;
    this.getProduct();
  },
};
</script>
