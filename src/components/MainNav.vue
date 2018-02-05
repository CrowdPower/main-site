<template>
<nav>
  <a href="/"><img src="/static/icon.png" class="icon"></a>
  <a href="/" v-bind:class="{'selected': (selected === 'sign-up')}">Sign up</a>
  <a href="/#/login" v-bind:class="{'selected': (selected === 'sign-in')}">Sign in</a>
</nav>
</template>

<script>
export default {
  props: {
    selected: String
  }
}
</script>

<style scoped>
nav {
  height: 40px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #6A6D71;
  padding: 8px;
  box-shadow: 0 0 4px 0 #141618;
}

nav .icon {
  width: 35px;
  height: 35px;
  margin-left: 8px;
  margin-right: auto;
}

nav a:nth-child(2) {
  margin-left: auto;
}

nav a {
  margin-left: 8px;
  margin-right: 8px;
  color: #FFF;
  transition: 0.2s;
}

nav a.selected {
  color: #B9BABB;
  transition: 0.2s;
}

nav a:hover {
  color: #B9BABB;
}
</style>
