<template>
<nav>
  <a href="/#/"><img src="/static/icon.png" class="icon"></a>
  <a href="/#/" :class="[selected === 'sign-up' ? 'selected' : '', 'text-button']">Sign up</a>
  <a href="/#/login" :class="[selected === 'sign-in' ? 'selected' : '', 'text-button']">Sign in</a>
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
nav .icon {
  width: 35px;
  height: 35px;
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
</style>
