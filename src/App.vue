<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style>
	html,body{
		height: 100%;
	}
  #app {
    height: 100%;
  }
  ul{
    padding:0px;
    margin:0px;    
  }
  li{
    list-style: none;
  }


</style>
