let app = new Vue({
  el: '#app',
  data: {
    numAdvisors: 3,
    searchInput: '',
    searched: false,
    noAdvisors: false,
    noAdvisorMessage: "There don't seem to be any advisors in that city!",
    advisorsSearched: [],
    items: [],
    findName: "",
    findItem: null,
  },
  created() {
    this.getItems();
  },
  computed: {
    suggestions() {
      return this.items.filter(item => item.city.toLowerCase().startsWith(this.findName.toLowerCase()));
    }
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    searchClick() {
      this.searched = true;
    },
    selectItem(item) {
      this.findName = item.city;
    },
    advisorSearch() {
      this.searched = true;
      if (this.searchInput === "") {
        this.noAdvisorMessage = "Please enter a city and state (ie: Provo UT) and click \"search\""
        console.log("correction message given");
        this.noAdvisors = true;
        return;
      }
      this.noAdvisors = false;
      this.noAdvisorMessage = "There don't seem to be any advisors in that city!";
      let cityMatch = false;
      for (let i = 0; i < this.numAdvisors; ++i) {
        if (this.advisors[i].city === this.searchInput) {
          this.advisorsSearched[i] = (this.advisors[i]);
          console.log("advisor successfully pushed to advisorsSearched[]");
          cityMatch = true;
        }
      }
      if (cityMatch === false) {
        this.noAdvisors = true;
      }
      return;
    }
  }
});