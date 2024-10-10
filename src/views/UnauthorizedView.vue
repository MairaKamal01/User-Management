<template>
  <div class="unauthorized-page">
    <h1>Unauthorized</h1>
    <p>You do not have permission to view this page.</p>

    <router-link to="/">Go back to Home</router-link>
  </div>
</template>

<script setup>
</script>

<style scoped>
.unauthorized-page {
  text-align: center;
  margin: 2em;
}

a {
  display: inline-block;
  margin-top: 1em;
  color: #42b883;
  text-decoration: none;
}

a:hover {
  color: #2e896b;
}
</style>
