Vue.component("product-tabs", {
  template: `
  <div class="product-tabs">
    <span class="tab" 
      v-for="(tab,index) in tabs" 
      @click = "selectedTab=tab"
      :key="index"
      :class="{activeTab: selectedTab === tab}"
    >
      {{tab}}
    </span>

    <div class="row">
      <div class="col col-12 m-3" v-show="selectedTab ==='Reviews'">
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul v-else>
          <li v-for="(review, index) in reviews" :key="index">
            <p>{{ review.name }}</p>
            <p>Rating:{{ review.rating }}</p>
            <p>{{ review.review }}</p>
          </li>
        </ul>
      </div>
      <div class="col col-12" v-show="selectedTab ==='Make a Review'">
        <product-review></product-review>            
      </div>
    </div>

  </div>         
  `,
  data() {
    return {
      tabs: ["Reviews", "Make a Review"],
      selectedTab: "Reviews"
    };
  },
  computed: {},
  methods: {},
  props: {
    reviews: {
      type: Array,
      required: false
    }
  }
});
