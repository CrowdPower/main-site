<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html {
  margin: 0;
  height: 100%;
  font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
}

body {
  margin: 0;
  background-color: #4A5056;
}

#app {
  text-align: center;
  color: #FFF;
  margin-top: 56px;
  margin-bottom: 0;
  margin-left: auto;
  margin-right: auto;
  padding: 16px;
  max-width: 1024px;
}

a {
  text-decoration: none;
}

button {
  cursor: pointer;
}

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

.box {
  box-shadow: 0 0 4px 0 #141618;
  background-color: #6A6D71;
  padding: 16px;
  border-radius: 6px;
}

form {
  display: flex;
  flex-direction: column;
  width: 350px;
  padding-top: 8px;
  text-align: left;
}

form label {
  font-size: 0.75em;
  padding-bottom: 4px;
  padding-top: 4px;
}

form input {
  margin-bottom: 8px;
  border-radius: 4px;
  font-size: 1.2em;
  outline-color: #70E15E;
  box-shadow: 0 0 6px 0 #141618;
}

form input[type="checkbox"] {
  margin-bottom: 0;
  margin-top: 0;
}

form button {
  border-radius: 4px;
  font-size: 1.4em;
  background-color: #70E15E;
  border-color: #70E15E;
  padding: 8px;
  margin-bottom: 0;
  margin-top: 8px;
  color: #4A5056;
  font-weight: bold;
  outline-color: #70E15E;
  box-shadow: 0 0 6px 0 #141618;
}

form .error {
  border: solid 1px #E74C3C;
  background: #E74C3C66;
  margin: 0;
  margin-bottom: 8px;
  padding: 4px;
  border-radius: 4px;
}

form .error:empty {
  display: none;
}
</style>
