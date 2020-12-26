var eventBus = new Vue();

var app = new Vue({
  el: "div#app",
  data() {
    return {
      sitename: "Vue.js Socks Shop",
      cart: "0",
    };
  },
  mount() {
    eventBus.$on("change-cart", (e) => {
      updateCart(e.cnt);
    });
  },
  methods: {
    getArrayWithSHAIds(original) {
      var result = original.map((elem) => ({ item: elem, _id: 0 }));
      result.forEach((item) => {
        item._id = CryptoJS.SHA1(item.item).toString();
      });
      return result;
    },
    setCartItemCount: (val) => {
      // решение не огонь !!! из дочернего компонента будет ссылка на родителя через глобальный объект window
      this.app.cart = val.toString();
    },
    updateCart(cnt) {
      this.cart = cnt;
    },
  },
});
