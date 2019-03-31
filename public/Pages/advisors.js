var app = new Vue({
  el: '#admin',
  data: {
    items: [],
    title: "",
    city: null,
    name: "",
    phone: "",
    email: "",
    specialty: "",
    addItem: null,
    findName: "",
    findItem: null,
  },
  created() {
    this.getItems();
  },
  computed: {
    suggestions() {
      return this.items.filter(item => item.name.toLowerCase().startsWith(this.findName.toLowerCase()));
    }
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    selectItem(item) {
      this.findPhone = "";
      this.findName = "";
      this.findItem = item;
      this.findCity = "";
      this.findEmail = "";
      this.findSpecialty = "";
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem(item) {
      try {
        let response = axios.delete("/api/items/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editItem(item) {
      try {
        let response = await axios.post("/api/items/" + item._id, {
          name: this.findItem.name,
          phone: this.findItem.phone,
          email: this.findItem.email,
          specialty: this.findItem.specialty,
          city: this.findItem.city,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async upload() {
      try {
        const formData = new FormData();
        let r1 = await axios.post('/api/items', {
          title: this.title,
          name: this.name,
          phone: this.phone,
          email: this.email,
          specialty: this.specialty,
          city: this.city,
        });
        this.addItem = r1.data;
      } catch (error) {
        console.log(error);
      }
    },
  }
});