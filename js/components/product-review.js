Vue.component("product-review", {
  template: `
  <div class="container">
    <div v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </div>  
    <form class="review-form" @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="name" class="form-label">Name:</label>
        <input id="name" class="form-control" v-model="name" placeholder="name" required >
      </div>
    
      <div class="form-group">
        <label for="review" class="form-label">Review:</label>
        <textarea class="form-control" rows="3" id="review" v-model="review"></textarea>
      </div>
    
      <div class="form-group">
        <label for="rating" class="form-label">Rating:</label>
        <select id="rating" class="form-control" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </div>
    
      <div class="form-group">
      <button type="submit" class="btn btn-success full-width"> Add Review </button>
        <!-- <input type="submit" value="Submit"> -->
      </div>    
    </form> 
  </div>         
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      errors: [],
    };
  },
  computed: {},
  methods: {
    onSubmit(e) {
      // e.preventDefault();
      this.errors = []
      if (this.name && this.review && this.rating) {
        var productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
        };
        this.name = null;
        this.review = null;
        this.rating = null;
        eventBus.$emit("review-submitted", productReview);
      } else {        
        if (!this.name) this.errors.push("name required")
        if (!this.review) this.errors.push("review required")
        if (!this.rating) this.errors.push("rating required")
      }
    },
  },
});
