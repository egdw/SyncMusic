<template>
  <div id="app">
    <div id="nav">
     <div class="nav_title">音乐同步播放<span class="nav_desc">by:恶搞大王</span></div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="stylus" socped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  width: 100%;
  background-color: black;
  color: white;

  .nav_title {
    line-height: 2.44rem;
    padding-left: 0.8rem;
  }

  .nav_desc {
    line-height: 2.44rem;
    font-size: 0.1rem;
    padding-left: 0.1rem;
    color: rgba(220, 220, 220, 0.5);
  }
}
</style>
