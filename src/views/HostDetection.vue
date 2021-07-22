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
        <ul>
          <li>IP: {{ info[0].ip }}</li>
          <li>Type: {{ info[0].type }}</li>
          <li>Isp ID: {{ info[0].isp_id }}</li>
          <li>Isp name: {{ info[0].isp_name }}</li>
        </ul>
      </div>
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
    };
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
            let lastSearch = localStorage.getItem("lastSearch")
            lastSearch = lastSearch ? JSON.parse(lastSearch) : []
            lastSearch.push([this.url, this.info])
            localStorage.setItem(
              "lastSearch",
              JSON.stringify(lastSearch)
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