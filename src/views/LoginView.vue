<template>
	<h1> Login Form </h1>
	<div class="inputContainer">
	  <label for="email"> Email: </label>
	  <input type="email" id="email" v-model="email">
	</div>
  
	<div class="inputContainer">
	  <label for="password"> Password: </label>
	  <input type="password" id="password" v-model="password">
	</div>
  
	<div class="inputContainer">
	  <label for="firstName"> First Name: </label>
	  <input type="text" id="firstName" v-model="firstName">
	</div>
  
	<div class="buttonContainer">
	  <button @click="createAccount"> Signup </button>
	  <button @click="login"> Login </button>
	</div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { supabase } from "../clients/supabase";
  
  let email = ref("");
  let password = ref("");
  let firstName = ref("");
  const router = useRouter();
  
  async function createAccount() {
	console.log("Email:", email.value);
	console.log("First Name:", firstName.value);
  
	// Sign up the user
	const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
	email: email.value,
	password: password.value,
	// options: {
	// 	data: {
	// 		first_name: firstName.value,
	// 		username: email.value
	// 	}
	// }
	});

	console.log(signUpData);
  
	if (signUpError) 
	{
	  console.log("SignUp Error:", signUpError);
	} 
	else if (signUpData && signUpData.user) 
	{
	  const user = signUpData.user;
	  console.log("User Signed Up:", user);
  
	  // Insert into the profiles table after user creation
	  const { error: profileError } = await supabase
		.from('profiles')
		.insert([{ id: user.id, username: email.value, full_name: firstName.value }]);
  
	  if (profileError) 
	  {
		console.log("Profile creation error:", profileError);
	  } 
	  else 
	  {
		console.log("Profile created successfully.");
  
		// Insert the user role into the user_roles table
		const { error: roleError } = await supabase
		  .from('user_roles')
		  .insert({ profile_id: user.id, role_name: 'user' });
  
		if (roleError) {
		  console.log("User role error:", roleError);
		} else {
		  console.log("User role set as 'user'.");
		}
	  }
	}
  }
  
  async function login() {
	console.log("Login attempt");
	const { data, error } = await supabase.auth.signInWithPassword({
	  email: email.value,
	  password: password.value
	});
  
	if (error) {
	  console.log("Login Error:", error);
	} else {
	  console.log("Login Successful:", data);
  
	  // Retrieve the user's role from the user_roles table
	  const { data: roleData, error: roleError } = await supabase
		.from('user_roles')
		.select('role_name')
		.eq('profile_id', data.user.id)
		.single();
  
	  if (roleError) {
		console.log("Role Fetch Error:", roleError);
	  } else {
		console.log("User Role:", roleData.role_name);
  
		// Redirect based on role
		if (roleData.role_name === 'admin') {
		  router.push("/admin-dashboard");
		} else {
		  router.push("/main");
		}
	  }
	}
  }
  </script>
  
  <style scoped>
  .inputContainer {
	display: flex;
	flex-direction: column;
	margin-bottom: 1em;
  }
  
  input {
	font-size: 1.2em;
	padding: 0.5em;
	margin-top: 0.5em;
  }
  
  .buttonContainer {
	display: flex;
	flex-direction: column;
	margin-top: 1em;
  }
  
  button {
	margin-bottom: 1em;
	padding: 1em 2em;
	font-size: 1em;
  }
  </style>
  