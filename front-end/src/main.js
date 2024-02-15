import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './main.css';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCueAUx_RLu8aaiHlNYRJHV_4l9s9yz7BY",
    authDomain: "vue-site-a.firebaseapp.com",
    projectId: "vue-site-a",
    storageBucket: "vue-site-a.appspot.com",
    messagingSenderId: "103297795175",
    appId: "1:103297795175:web:684bc6f9f89772870ac0c2"
};

// Initialize Firebase
initializeApp(firebaseConfig);








createApp(App)
    .use(router)
    .mount('#app')
