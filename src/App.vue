<template>
	<header>
	  <div class="wrapper" v-if="isHomePage || isLoginPage">
		<nav>
		  <RouterLink to="/">Home</RouterLink>
		  <RouterLink to="/login">Login</RouterLink>
		</nav>
	  </div>
	</header>
  
	<div class="content">
	  <RouterView />
	</div>
  </template>
  
  <script setup>
  import { RouterLink, RouterView, useRoute } from 'vue-router';
  import { computed } from 'vue';
  
  const route = useRoute();
  
  // Use computed properties to track if the current route is the home or login page
  const isHomePage = computed(() => route.path === '/');
  const isLoginPage = computed(() => route.path === '/login');
  </script>
  
  <style scoped>
  nav {
	display: flex;
	justify-content: center;
  }
  
  nav a {
	padding: 1em;
  }
  
  .content {
	display: flex;
	align-items: center;
	flex-direction: column;
	width: 500px;
	border: solid 1px black;
	margin-left: auto;
	margin-right: auto;
	border-radius: 1em;
	padding: 2em 0 2em 0;
  }
  </style>
  