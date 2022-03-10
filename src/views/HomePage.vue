<template>
    <div class="card">
        <h1>Hi {{user.firstName}}!</h1>
        <p>You're logged in</p>
        <p>
            <router-link to="/login">Logout</router-link>
        </p>
    </div>
</template>

<script>
import { Vue } from "vue-class-component";
import { userService } from '../services/user.service';

export default class HomePage extends Vue {
  user= {};

//   created () {
//       this.user = JSON.parse(localStorage.getItem('user') || "");
//       if(this.user == ""){
//         userService.logout;
//         location.reload;
//       }
//   }
}
</script>

<style>

</style>