<template>
  <div>
    <form @submit.prevent="fetchHost">
      <input type="text" v-model="url" class="mr-3 border-2 px-2 py-1" />
      <button
        type="submit"
        class="px-4 py-1 bg-blue-500 hover:bg-blue-700 text-white"
      >
        Scan
      </button>
    </form>
    <div v-if="error" class="text-red-500 font-bold mt-4">
      {{ error }}
    </div>
    <div class="mt-4">
      <div v-if="info">
        <ul v-for="(data, index) in info" :key="index">
          <li>IP: {{ data.ip }}</li>
          <li>Type: {{ data.type }}</li>
          <li>Isp ID: {{ data.isp_id }}</li>
          <li>Isp name: {{ data.isp_name }}</li>
          <li>
            Isp URL:
            <a :href="data.isp_url" target="_blank">{{ data.isp_url }}</a>
          </li>
        </ul>
      </div>
      <div class="mt-4" v-if="getLastSearchHost">
        <div v-for="(lastSearch, index) in getLastSearchHost" :key="index">
          <h3>{{ lastSearch[0] }}</h3>
          <ul v-for="(data, index) in lastSearch[1]" :key="index">
            <li>IP: {{ data.ip }}</li>
            <li>Type: {{ data.type }}</li>
            <li>Isp ID: {{ data.isp_id }}</li>
            <li>Isp name: {{ data.isp_name }}</li>
            <li>
              Isp URL:
              <a :href="data.isp_url" target="_blank">{{ data.isp_url }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
import HostDetection from "../Apis/HostDetection";
export default {
  data() {
    return {
      info: "",
      url: "",
      error: "",
      lastSearchHost: [],
    };
  },
  created() {
    this.lastSearchHost = JSON.parse(localStorage.getItem("lastSearchHost"));
  },
  computed: {
    getLastSearchHost() {
      return this.lastSearchHost.reverse().slice(0, 3);
    },
  },
  methods: {
    fetchHost() {
      this.error = "";
      this.info = "";
      if (this.url != "") {
        HostDetection.hostDetection(this.url).then((res) => {
          if (res.data.result.code != "200") this.error = res.data.result.msg;
          else {
            this.info = res.data.results;
            let lastSearch = localStorage.getItem("lastSearchHost");
            lastSearch = lastSearch ? JSON.parse(lastSearch) : [];
            lastSearch.push([this.url, this.info]);
            localStorage.setItem("lastSearchHost", JSON.stringify(lastSearch));
            this.lastSearchHost = JSON.parse(
              localStorage.getItem("lastSearchHost")
            );
          }
        });
      } else {
        this.error = "The url can not be empty.";
      }
    },
  },
};
</script>

<style scoped>
</style>