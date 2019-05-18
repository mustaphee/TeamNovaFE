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
                                    <h2 class="flex text-xs-center">Registration</h2>
                                    <hr>
                                    <br>
                                </div>
                                <div class="basic">
                                    <span class="title grey--text text--darken-1">Register as : {{post ? 'Medical Practitioner' : 'Patient'}} </span>
<!--                                    <v-radio-group v-model="model.post" :mandatory="true" row>-->
<!--                                        <v-radio label="Doctor" value="doctor" ></v-radio>-->
<!--                                        <v-radio label="Patient" value="patient" ></v-radio>-->
<!--                                    </v-radio-group>-->
                                    <v-switch v-model="post" color="green" :label="post? 'Medical Practitioner' : 'Patient'"></v-switch>
                                </div>
                                <v-form v-if="post" ref="docRegForm" :lazy-validation="true">

                                    <v-text-field solo  label="Full Name" type="text" v-model="doc.full_name" :rules="[rules.required]"></v-text-field>
                                    <v-text-field  solo label="Address" type="text" v-model="doc.address"></v-text-field>
                                    <v-text-field solo label="Phone Number" type="number" v-model="doc.phone_number"></v-text-field>
                                    <v-select
                                            :items="specialities"
                                            label="Speciality"
                                            solo
                                            v-model="doc.speciality"
                                    ></v-select>
                                    <v-text-field solo name="password" label="Password" id="password" type="password" v-model="doc.password" :rules="[rules.required]"></v-text-field>
                                    <v-text-field solo  label="Confirm Password" type="password" v-model="doc.password_c" :rules="[rules.required, (val)=> val === doc.password  || 'Password does not match']"></v-text-field>


                                </v-form>
                                <v-form v-else ref="patRegForm" :lazy-validation="true">

                                    <v-text-field solo label="Full Name" type="text" v-model="pat.full_name" :rules="[rules.required]"></v-text-field>
                                    <v-text-field solo label="Address" type="text" v-model="pat.address"></v-text-field>
                                    <v-text-field solo label="Phone Number" type="number" ></v-text-field>
                                    <v-text-field solo label="Occupation" type="text" v-model="pat.occupation"></v-text-field>
                                    <v-text-field solo  name="password" label="Password" id="password" type="password" v-model="pat.password" :rules="[rules.required]"></v-text-field>
                                    <v-text-field  solo  label="Confirm Password" type="password" v-model="pat.password_c" :rules="[rules.required, (val)=> val === pat.password  || 'Password does not match']"></v-text-field>


                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn v-if="!post" block color="primary" @click="patReg">Register</v-btn>
                                <v-btn v-else block color="primary" type="submit" @click="docReg" :loading="loading">Register</v-btn>
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
        name: 'Register',
        data: () => ({
            loading: false,
            successful: false,
            specialities: ['sdfasdfa', 'sdfada','sdfa'],
            post: false,
            doc: {
                first_name: '',
                last_name: '',
                speciality: '',
                email: '',
                password: '',
                password_c: '',
                phone_number: '',
                address: '',
                passport:'',
                id_card_image:''
            },
            pat: {
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                password_c: '',
                phone_number: '',
                address: '',
                passport:'',
                id_card_image:''
            }
        }),
        mounted(){
            this.fetchSpecialities()
        },
        methods: {
            docReg(){

            },
            patReg(){

            },
            register () {
                if(this.$refs.regForm.validate() && this.model.passport !=='' && this.model.id_card_image !== ''){
                    this.loading = true;
                    let fd = new FormData()
                    fd.append('passport', this.model.passport, this.model.passport.name)
                    fd.append('id_card', this.model.id_card_image, this.model.id_card_image.name)
                    fd.append('name', `${this.model.first_name} ${this.model.last_name} ${this.model.other_names}`)
                    fd.append('email', this.model.email)
                    fd.append('password', this.model.password)
                    fd.append('phone_number', this.model.phone_number)
                    fd.append('school_id', this.model.school_id)
                    fd.append('role', this.model.post)
                    fd.append('address', this.model.address)

                    this.$http().post('member/register', fd).
                        then((res)=>{
                        this.$callSnack(res.data.message, 'success')
                        this.$refs.regForm.reset()
                        this.model.id_card_image = ''
                        this.model.passport = ''
                        this.successful = true
                        this.$router.push('/login')
                    })
                    .catch((err)=>{
                        console.log(err)
                        this.$callSnack(err.response.data.message, 'warning')
                    })
                        .finally(()=> this.loading = false)
                    // fd.append('start_date', this.processDate(this.form.startDate, this.form.startTime))
                    // fd.append('end_date', this.processDate(this.form.endDate, this.form.endTime))
                    // fd.append('venue', this.form.location)
                    // fd.append('title',this.form.title)
                    // fd.append('description', this.form.description)
                    // fd.append('max_refund_date', this.processDate(this.form.maxRefDate, this.form.maxRefTime))

                }else{
                    this.$callSnack('All fields are required', 'warning');
                }

            },
            fetchSpecialities(){

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
