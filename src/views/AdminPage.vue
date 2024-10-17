<template>
    <div class="admin-page">
      <h1>Admin Dashboard</h1>
  
      <!-- Admin-specific content can go here -->
      <div class="admin-content">
        <h2>Manage Users</h2>
        <!-- Example management actions -->
        <button @click="manageUsers">Manage Users</button>
        <button @click="viewReports">View Reports</button>
      </div>
      <div class="buttonContainer">
        <button @click="logout"> Logout </button>
      </div>
    </div>
  </template>
  
  <script setup>
  function manageUsers() {
    console.log('Managing users...');
    // Admin-specific action can be handled here
  }
  
  function viewReports() {
    console.log('Viewing reports...');
    // Another admin-specific action
  }

  import { useRouter } from "vue-router";
  import { supabase } from "../clients/supabase"

  const router = useRouter();

  async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
    }
    else {
      console.log("Sign out success")
          router.push("/")
    }
  }

  </script>
  
  <style scoped>
  .admin-page {
    text-align: center;
    margin: 2em;
  }
  
  button {
    margin: 1em;
    padding: 10px 20px;
    background-color: #42b883;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #2e896b;
  }
  </style>
  