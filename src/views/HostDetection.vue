<template>
  <div>
    <h1 class="font-semibold custom-blue text-3xl text-center">
      Detect the host for the inserted website
    </h1>
    <form @submit.prevent="fetchHost" class="flex justify-center mt-5">
      <input
        type="text"
        v-model="url"
        class="
          mr-3
          border-2 border-green-500
          px-2
          py-1
          rounded
          w-full
          sm:w-3/5
          lg:w-2/5
        "
      />
      <button
        type="submit"
        class="
          px-5
          py-2
          bg-green-500
          hover:bg-green-700
          text-white
          rounded
          font-semibold
          uppercase
        "
      >
        Scan
      </button>
    </form>
    <div v-if="error" class="text-red-500 font-bold mt-5 text-center text-xl">
      {{ error }}
    </div>
    <div class="mt-5 text-center">
      <div v-if="info">
        <ul v-for="(data, index) in info" :key="index">
          <li><span class="font-semibold">IP:</span> {{ data.ip }}</li>
          <li><span class="font-semibold">Type:</span> {{ data.type }}</li>
          <li><span class="font-semibold">Isp ID:</span> {{ data.isp_id }}</li>
          <li>
            <span class="font-semibold">Isp name:</span> {{ data.isp_name }}
          </li>
          <li>
            <span class="font-semibold">Isp URL:</span>
            <a :href="data.isp_url" target="_blank"> {{ data.isp_url }}</a>
          </li>
        </ul>
      </div>
      <div class="mt-5" v-if="getLastSearchHost">
        <h2 class="text-xl text-green-700 font-bold">Your last 3 URLs</h2>
        <div
          v-for="(lastSearch, index) in getLastSearchHost"
          :key="index"
          class="mt-4 last-search relative flex flex-col justify-center items-center content-center w-full"
        >
          <h3 class="font-bold custom-blue text-lg"> {{ lastSearch[0] }}</h3>
          <ul v-for="(data, index) in lastSearch[1]" :key="index" class="mt-3">
            <li><span class="font-semibold">IP:</span> {{ data.ip }}</li>
            <li><span class="font-semibold">Type:</span> {{ data.type }}</li>
            <li>
              <span class="font-semibold">Isp ID:</span> {{ data.isp_id }}
            </li>
            <li>
              <span class="font-semibold">Isp name:</span> {{ data.isp_name }}
            </li>
            <li>
              <span class="font-semibold">Isp URL: </span>
              <a :href="data.isp_url" target="_blank"> {{ data.isp_url }}</a>
            </li>
          </ul>
        </div>
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
.last-search:after {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  bottom: -12px;
  background-color: #42b983;
  width: 70%;
  height: 2px;
  content: "";
}
</style>