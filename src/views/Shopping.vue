<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <HomeNavbar/>
    <div class="container px-0 px-md-1 mb-0 mb-md-7">
      <header class="header">
        <div class="bg-cover header-main-image"
        style="background-image: url(https://images.unsplash.com/photo-1512484457149-266d165a4eca?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=786581a33fd6c9343735655439ce2e5a&auto=format&fit=crop&w=800&q=60)">
          <h1 class="text-hide">Sweetaste 甜點
            <img src="static/images/lg-想吃甜點是不需要理由的.svg"
            class="header-image-slogan" width="89" alt="">
          </h1>
        </div>
      </header>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-lg-3 px-0 px-md-1 mb-3">
          <div class="sticky-top" style="top: 20px;">
            <h2 class="h4 font-weight-bold bg-primary text-white text-center mb-0 py-2">甜點類別</h2>
            <ul class="list-group text-center mb-5">
              <a href="#" class="h4 font-weight-bold list-group-item list-group-item-action"
              :class="{'active': category === '所有甜點'}"
              @click.prevent="category = '所有甜點'; getProducts()">所有甜點</a>
              <a href="#" class="h4 font-weight-bold list-group-item list-group-item-action"
              :class="{'active': category === '人氣推薦'}"
              @click.prevent="category = '人氣推薦'; getProducts()">人氣推薦</a>
              <a href="#" class="h4 font-weight-bold list-group-item list-group-item-action"
              :class="{'active': category === '新品上市'}"
              @click.prevent="category = '新品上市'; getProducts()">新品上市</a>
              <a href="#" class="h4 font-weight-bold list-group-item list-group-item-action"
              :class="{'active': category === '本日精選'}"
              @click.prevent="category = '本日精選'; getProducts()">本日精選</a>
              <!-- <a href="#" class="h4 font-weight-bold list-group-item list-group-item-action"
              :class="{'active': category === item}"
              v-for="item in categoryList" :key="item"
              @click.prevent="category = item; getProducts()">{{ item }}</a> -->
            </ul>
            <form class="input-group mb-3">
              <input type="search" class="form-control" placeholder="搜尋甜點" maxlength="20" v-model="searchText">
              <div class="input-group-append">
                <button class="input-group-text bg-light" @click.prevent="search()">
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div class="col-lg-9">
          <div class="row">
            <div class="col-md-6 mb-5 mb-md-3" v-for="item in filterData" :key="item.id">
              <div class="product-card">
                <div class="product-image" :style="{backgroundImage: `url(${item.imageUrl})`}">
                  <div class="product-tag">{{ item.category }}</div>
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
                <a href="#" class="btn btn-primary-lighter btn-block btn-xl mt-0"
                @click.prevent="addtoCart(item.id)">加入購物車</a>
              </div>
            </div>
          </div>

          <div class="jumbotron text-center" v-if="filterData.length === 0">
            <div class="mb-5">
              <img src="static/images/search_empty.svg" alt="" />
            </div>
            <div class="h2">找不到此商品，請重新輸入關鍵字查詢</div>
          </div>

          <div v-show="filterData.length > 0" class="mt-1 mb-7">
            <Pagination :pages="pagination" @emitPages="getProducts" v-if="pagination"></Pagination>
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
import Pagination from '../components/Pagination.vue';

export default {
  components: {
    HomeNavbar,
    Footer,
    Pagination,
  },
  data() {
    return {
      category: '所有甜點',
      searchText: '',
      filterText: ''
    };
  },
  methods: {
    getProducts(page = 1) {
      const url = this.category === '所有甜點'
        ? `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`
        : `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      this.$store.dispatch('getProducts', url);
    },
    // getCategoryList() {
    //   const vm = this;
    //   const categoryList = new Set();
    //   vm.products.forEach((item, i) => {
    //     categoryList.add(item.category);
    //   });
    //   console.log(categoryList);
    //   vm.categoryList = Array.from(categoryList).sort();
    // },
    addtoCart(id, qty = 1) {
      this.$store.dispatch('addtoCart', { id, qty });
    },
    getCart() {
      this.$store.dispatch('getCart');
    },
    search() {
      this.filterText = this.searchText;
    },
    addFavorite(item) {
      this.$store.dispatch('favoriteModules/addFavorite', item)
    },
    removeFavorite(item, del) {
      this.$store.dispatch('favoriteModules/removeFavorite', {item, del})
    }
  },
  computed: {
    ...mapGetters(['isLoading', 'products', 'pagination', 'cart']),
    // categoryList() {
    //   return this.$store.state.categoryList;
    // },
    filterData() {
      const vm = this;
      if (vm.filterText) {
        return vm.products.filter(item => item.title.indexOf(vm.filterText) !== -1)
      }
      if (vm.category !== '所有甜點') {
        return vm.products.filter(item => item.category === vm.category);
      }
      return vm.products;
    }
  },
  watch: {
    searchText() {
      if (this.searchText === '') {
        this.filterText = '';
      }
    }
  },
  created() {
    this.getProducts();
  },
};
</script>
