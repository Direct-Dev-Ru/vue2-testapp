Vue.component("info-tabs", {
  template: `
  <div class="info-tabs">
    <span class="info-tab" 
      v-for="(tab,index) in tabs" 
      @click = "selectedTab=tab"
      :key="index"
      :class="{activeTab: selectedTab === tab}"
    >
      {{tab}}
    </span>
    
    <div class="row">
      <div class="col col-12 info-tab-content" v-show="selectedTab ==='Shipping'">

        <div>
          <span>Select your size</span>
          <select v-model="selectedSize">
            <option v-for="elem in sizes" v-bind:value="elem.item" :key="elem._id">
              {{elem.item}}
            </option>
          </select>
        </div>
        &nbsp;        
        <div>
          <span>Select your color</span>
          <select v-model="selectedColor" @change="colorChange">
            <option v-for="elem in colors" v-bind:value="elem.item" :key="elem._id">
              {{elem.item}}
            </option>
          </select>
        </div>
        &nbsp;        
        <button v-on:click="addToCart" :disabled="!canAddToCart" :class="{disabledButton: !canAddToCart, greenButton: selectedColor ==='green',
          blueButton: selectedColor ==='blue'}">
          + To Cart
        </button>
        <button v-on:click="removeFromCart" :disabled="!canRemoveFromCart" :class="{disabledButton: !canRemoveFromCart, greenButton: selectedColor ==='green',
          blueButton: selectedColor ==='blue'}">
          - From Cart
        </button>

      </div>

      <div class="col col-12 info-tab-content" v-show="selectedTab ==='Details'">
        
        <p><strong>Details:</strong></p>
        <ul>
          <li v-for="item in details.listOfDetails" :key="item._id">{{item.item}}</li>
        </ul>
        
        <a :href="details.moreProductsLink" target="_blank" rel="noopener noreferrer">More Products like this ...</a>
     
      </div>
    </div>

  </div>         
  `,
  data() {
    return {
      cart: 0,
      tabs: ["Shipping", "Details"],
      selectedTab: "Shipping",
      sizes: this.hasharray(["S", "M", "L", "XL", "XXL", "XXXL"]),
      selectedSize: "L",
      colors: this.hasharray(["green", "blue"]),
      selectedColor: "green",
    };
  },
  computed: {
    canAddToCart: function () {
      return this.inventory > this.cart && !this.isOutOfStock;
    },
    canRemoveFromCart: function () {
      return this.cart > 0 && !this.isOutOfStock;
    },
    isOutOfStock: function () {
      return this.inventory === 0;
    },
  },
  methods: {
    addToCart() {
      if (this.canAddToCart) {
        this.cart += 1;
        // генерируем событие изменения главной корзинки
        eventBus.$emit("change-cart", this.cart);
      }
    },
    removeFromCart() {
      if (this.cart > 0) {
        this.cart -= 1;
        // генерируем событие изменения главной корзинки
        eventBus.$emit("change-cart", this.cart);
      }
    },    
    colorChange() {
      let colorIndex = this.colors.findIndex((el) => el.item === this.selectedColor);
      //this.image = this.images[index].item;
      // генерируем событие обнуления корзинки
      eventBus.$emit("change-cart", { cart: this.cart });
      eventBus.$emit("change-color", { colorIndex });
    },
  },
  props: {
    inventory: {
      type: Number,
      required: true,
    },
    details: {
      type: Object,
      required: true,
    },
    hasharray: {
      type: Function,
      required: true,
    },
  },
});
