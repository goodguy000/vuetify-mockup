
<template>
    <v-snackbar v-model="snackbar" :timeout="5000" top color="success">
        <span>{{ message }}</span>
        <v-btn flat color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
</template>

<script>
export default {
    
}
</script>