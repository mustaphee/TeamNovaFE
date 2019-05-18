<template>
    <div id="pageDashboard">
        <v-container v-if="user.user_type === 'P' " grid-list-xl fluid>
            <v-layout justify-center row wrap>
                <v-dialog v-model="showForm" persistent max-width="500px">
                    <v-container   slot="activator" style="margin: 0 auto">
                        <v-btn color="primary"  dark >Request for a Doctor</v-btn>
                    </v-container>
                    <v-card>
                        <v-card-title>
                            <span class="headline">Make Request</span>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <v-form ref="form" :lazy-validation="false">
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12>
                                            <v-select
                                                    :items="specialities"
                                                    item-text="title"
                                                    item-value="id"
                                                    label="Speciality"
                                                    solo
                                                    v-model="form.speciality"
                                                    :rules="[rules.required]"
                                            ></v-select>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-textarea solo label="What is doing you? abi Where is it paining you?" v-model="form.message" :rules="[rules.required]"></v-textarea>
                                        </v-flex>


                                    </v-layout>
                                </v-container>
                            </v-form>

                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click.native="showForm = false">Close</v-btn>
                            <v-btn color="blue darken-1" flat @click.native="makeRequest()" :loading="loading">Request</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-layout>
        </v-container>

        <v-container v-else grid-list-xl fluid>
            <v-layout justify-center row wrap>
                Welcome Doctor below are the recent requests
            </v-layout>
        </v-container>
    </div>
</template>

<script>

    export default {

        data: () => ({
            showForm: false,
            loading:false,
            form:{
                speciality: '',
                message:''
            },
            specialities:[],

        }),
        mounted() {
            this.fetchSpecialities()
        },
        computed:{
          user(){
              console.log(this.$store.state.user)
              return this.$store.state.user
          }
        },
        methods:{
            fetchSpecialities(){
                this.$http().get('/doctors/specialities/')
                    .then(res=>{
                        console.log(res)
                        this.specialities = res.data
                    })
            },
            makeRequest(){
                if(this.$refs.form.validate()){
                    this.$httpT().post('/patients/doctor_request/create_request/', this.form)
                        .then(res=>{
                            console.log(res)
                            this.$callSnack('Request Submitted', 'success')
                            this.showForm = false
                        })
                        .catch(err=>{

                        })
                }else{
                    this.$callSnack('All fields are required', 'warning')
                }
            }
        }

    };
</script>
