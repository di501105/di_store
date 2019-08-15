export default ({
  namespaced: true,
  state: {
    favorite: [],
    favoriteLength: 0,
  },
  actions: {
    getFavorite(context) {
      const favoriteData = JSON.parse(localStorage.getItem('favoriteData')) || [];
      context.commit('FAVORITE', favoriteData);
      context.commit('FAVORITE_LENGTH', favoriteData.length);
      context.dispatch('getProducts', `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_CUSTOMPATH}/products/all`, { root: true });
    },
    addFavorite(context, product) {
      const favoriteData = {
        id: product.id,
        title: product.title,
      };
      context.commit('PUSH_FAVORITE', favoriteData);
      localStorage.setItem('favoriteData', JSON.stringify(context.state.favorite));
      context.dispatch('getFavorite');
      context.dispatch('updateMessage', { message: '已加入我的最愛', status: 'success' }, { root: true });
    },
    removeFavorite(context, {item, del}) {
      if (del) {
        localStorage.removeItem('favoriteData');
      } else {
        context.commit('REMOVE_FAVORITE', item);
        localStorage.setItem('favoriteData', JSON.stringify(context.state.favorite));
      }
      context.dispatch('getFavorite');
      context.dispatch('updateMessage', { message: '已從我的最愛移除', status: 'warning' }, { root: true });
    }
  },
  mutations: {
    FAVORITE(state, payload) {
      state.favorite = payload;
    },
    FAVORITE_LENGTH(state, payload) {
      state.favoriteLength = payload;
    },
    PUSH_FAVORITE(state, product) {
      state.favorite.push(product);
    },
    REMOVE_FAVORITE(state, payload) {
      state.favorite.forEach((item, index) => {
        if (item.id === payload.id) {
          state.favorite.splice(index, 1);
        }
      });
    }
  },
  getters: {
    favorite: state => state.favorite,
    favoriteLength: state => state.favoriteLength,
  }
});