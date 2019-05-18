<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <h1 class="flex my-4 primary--text text-xs-center">{{app_name}}</h1>
                  <h2 class="flex text-xs-center">Login</h2>
                  <hr>
                  <br>
                </div>
                <v-form>
                  <v-text-field append-icon="person" name="login" label="Login" type="email" v-model="model.email" :rules="[rules.required, rules.phone]"></v-text-field>
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
        console.log(this.model)
        this.$http().post('rest-auth/login/', {"username": this.model.email, "password": this.model.password})
            .then((resp)=> {
                console.log(resp)
                this.$callSnack(resp.data.message, 'success')
                this.$store.commit('setToken', resp.data.key)
            }).then((res)=>{
              this.$httpT().get('user/').then((res)=>{
                  console.log(res.data)
                  this.$store.commit('setUser', res.data)
                  this.$router.push('/dash')
              })

            })
            .catch((err)=>{
                console.log(err.response.data)
                this.$callSnack(err.response.data['non_field_errors'][0], 'danger')
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
