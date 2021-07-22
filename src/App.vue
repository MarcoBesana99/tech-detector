<template>
  <div id="nav" class="text-center">
    <router-link to="/">Home</router-link> |
    <router-link to="/host-detection">HostDetection</router-link>
  </div>
  <div class="px-6 pb-10">
    <router-view />
  </div>
</template>

<style>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  box-sizing: border-box;
}

*:focus {
  outline: none;
}

.custom-blue {
  color: #2c3e50;
}
</style>
