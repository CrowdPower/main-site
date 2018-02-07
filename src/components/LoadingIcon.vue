<template>
  <div id="loading-icon">
    <div id="spinner"></div>
  </div>
</template>

<style scoped>
#spinner {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border-top: 5px solid #6A6D71;
  margin: 0;
  -webkit-animation: spin 1s linear infinite; /* Safari */
  animation: spin 1s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
