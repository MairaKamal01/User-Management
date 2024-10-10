<template>
    <h1>Main Page</h1>
    <div class="buttonContainer">
		<button @click="logout"> Logout </button>
	</div>
</template>

<script setup>
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
