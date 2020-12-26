Vue.component("product", {
  template: `
    <div class="container product">
      <div class="row">
        <div class="col-4 product-image">
          <img class="img-fluid" :src="image" :alt="altText" />
          <!-- <img v-bind:src="image" v-bind:alt="altText"/> -->
        </div>

        <div class="col-8 product-info">
          <h1>{{brandaryProduct}}</h1>
          <p>{{description}}</p>
          <p v-if="inventory > 10">In stock</p>
          <p v-else-if="inventory <= 10 && inventory > 0">
            Almost sold out!
          </p>
          <p v-else :class="{outOfStock: isOutOfStock}">Out of stock</p>
          <p v-show="onSale"><span>OnSale</span></p>

          <info-tabs :inventory="this.inventory" :hasharray="hasharray" :details="details"/>

          
        </div>
        
        <product-tabs :reviews="reviews"></product-tabs> 


        <!-- вывод reviews 
        <div class="container">
          <div class="row">
            <div class="col col-6">
              <h4>Reviews: </h4>
              <p v-if="!reviews.length">There are no reviews yet.</p>
              <ul v-else>
                <li v-for="(review, index) in reviews" :key="index">
                  <p>{{ review.name }}</p>
                  <p>Rating:{{ review.rating }}</p>
                  <p>{{ review.review }}</p>
                </li>
              </ul>
            </div>
            <div class="col col-6">
              <product-review @review-submitted="addReview"></product-review>            
            </div>

          </div>
        </div> -->

      </div>
    </div>
  `,
  data() {
    return {
      cart: 0,
      sitename: "The One SocksShop",
      product: "Socks",
      brand: "Adidas",
      description: "A pair of warm, fuzzy socks !!!",
      altText: "A pair of socks",
      inventory: 5,
      onSale: false,
      details: {
        listOfDetails: this.hasharray([
          "80% cotton",
          "20% polyester",
          "Gender-unisex",
        ]),
        moreProductsLink: `https://www.amazon.com/s?k=green+socks&ref=nb_sb_noss_1`,
      },
      image: "../assets/images/greensocks.png",
      images: this.hasharray([
        "../assets/images/greensocks.png",
        "../assets/images/bluesocks.png",
      ]),
      reviews: [],
    };
  },
  mounted() {
    eventBus.$on("review-submitted", (productReview) => {
      this.reviews.push(productReview);
    });
    eventBus.$on("change-color", ({colorIndex}) => {
      this.image = this.images[colorIndex].item;      
    });
  },
  computed: {
    cartItemCount: function () {
      return this.cart.toString() || "";
    },
    canAddToCart: function () {
      return this.inventory > this.cart && !this.isOutOfStock;
    },
    canRemoveFromCart: function () {
      return this.cart > 0 && !this.isOutOfStock;
    },
    isOutOfStock: function () {
      return this.inventory === 0;
    },
    brandaryProduct: function () {
      return this.brand + " " + this.product;
    },
  },
  methods: {},
  props: {
    hasharray: {
      type: Function,
      required: true,
    },
    setcartcount: {
      type: Function,
      required: true,
    },
  },
});
