<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="/static/m.png" alt="Vue Material Admin" width="120" height="120">
                  <h1 class="flex my-4 primary--text text-xs-center">Electrical Engineering Library</h1>
                </div>                
                <v-form>
                  <v-text-field append-icon="person" name="login" label="Login" type="email" v-model="model.email" :rules="[rules.required, rules.email]"></v-text-field>
                  <v-text-field append-icon="lock" name="password" label="Password" id="password" type="password" v-model="model.password" :rules="[rules.required]"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn block color="primary" type="submit" @click="login" :loading="loading">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    loading: false,
    model: {
      email: '',
      password: ''
    }
  }),

  methods: {
    login () {
      if(this.model.email !== '' && this.model.password !== ''){
        this.loading = true;
        this.$http().post('login', this.model)
            .then((resp)=>{
                console.log(resp)
                this.$callSnack(resp.data.message, 'success')
                this.$store.commit('setToken', resp.data.token)
                this.$store.commit('setUser', resp.data.data)
                this.$router.push('/dash')
            })
            .catch((err)=>{
                console.log(err.response.data)
                this.$callSnack(err.response.data.message, 'danger')
            })
            .finally(()=>{
                this.loading = false
            })
      }else{
        this.$callSnack('All fields are required', 'warning');
      }

    }
  }

};
</script>
<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
