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

                                    <v-text-field solo  label="First Name" type="text" v-model="doc.first_name" :rules="[rules.required]"></v-text-field>
                                    <v-text-field solo  label="Last Name" type="text" v-model="doc.last_name" :rules="[rules.required]"></v-text-field>
                                    <v-text-field solo  label="Email Address" type="text" v-model="doc.email" :rules="[rules.required, rules.email]"></v-text-field>
                                    <v-text-field solo label="Phone Number" type="number" v-model="doc.username" :rules="[rules.required]"></v-text-field>
                                    <v-text-field  solo label="Address" type="text" v-model="doc.address" :rules="[rules.required]"></v-text-field>
                                    <v-select
                                            :items="specialities"
                                            label="Speciality"
                                            solo
                                            v-model="doc.speciality"
                                    ></v-select>
                                    <v-text-field solo label="Hospital" type="text" v-model="doc.hospital" :counter="50" :rules="[rules.required, (v) => v.length < 51 || 'Invalid field length']"></v-text-field>
                                    <v-menu
                                            class="pr-2"
                                            ref="docdob"
                                            lazy
                                            :close-on-content-click="false"
                                            v-model="docmodal"
                                            transition="scale-transition"
                                            offset-y
                                            full-width
                                            :nudge-bottom="-22"
                                            max-width="290px"
                                            :return-value.sync="doc.dob"
                                    >
                                        <v-text-field
                                                slot="activator"
                                                label="Date of Birth"
                                                v-model="doc.dob"
                                                solo
                                                readonly
                                        ></v-text-field>
                                        <v-date-picker v-model="doc.dob" no-title scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="docmodal = false">Cancel</v-btn>
                                            <v-btn flat color="primary" @click="$refs.docdob.save(doc.dob)">OK</v-btn>
                                        </v-date-picker>
                                    </v-menu>
                                    <v-text-field solo name="password" label="Password" id="password" type="password" v-model="doc.password1" :rules="[rules.required]"></v-text-field>
                                    <v-text-field solo  label="Confirm Password" type="password" v-model="doc.password2" :rules="[rules.required, (val)=> val === doc.password1  || 'Password does not match']"></v-text-field>


                                </v-form>
                                <v-form v-else ref="patRegForm" :lazy-validation="true">

                                    <v-text-field solo label="First Name" type="text" v-model="pat.first_name" :rules="[rules.required]"></v-text-field>
                                    <v-text-field solo label="Last Name" type="text" v-model="pat.last_name" :rules="[rules.required]"></v-text-field>
                                    <v-text-field solo label="Address" type="text" v-model="pat.address" :rules="[rules.required]"></v-text-field>
                                    <v-text-field solo label="Phone Number" type="number" v-model="pat.username" :rules="[rules.required]"></v-text-field>
                                    <v-menu
                                            class="pr-2"
                                            ref="patdob"
                                            lazy
                                            :close-on-content-click="false"
                                            v-model="patmodal"
                                            transition="scale-transition"
                                            offset-y
                                            full-width
                                            :nudge-bottom="-22"
                                            max-width="290px"
                                            :return-value.sync="pat.dob"
                                    >
                                        <v-text-field
                                                slot="activator"
                                                label="Date of Birth"
                                                v-model="pat.dob"
                                                solo
                                                readonly
                                        ></v-text-field>
                                        <v-date-picker v-model="pat.dob" no-title scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="patmodal = false">Cancel</v-btn>
                                            <v-btn flat color="primary" @click="$refs.patdob.save(pat.dob)">OK</v-btn>
                                        </v-date-picker>
                                    </v-menu>
                                    <v-text-field solo label="Occupation" type="text" v-model="pat.occupation" :rules="[rules.required]"></v-text-field>
                                    <v-text-field solo  name="password" label="Password" id="password" type="password" v-model="pat.password1" :rules="[rules.required]"></v-text-field>
                                    <v-text-field  solo  label="Confirm Password" type="password" v-model="pat.password2" :rules="[rules.required, (val)=> val === pat.password1  || 'Password does not match']"></v-text-field>


                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn v-if="!post" block color="primary" :loading="loading" @click="patReg">Register</v-btn>
                                <v-btn v-else block color="primary"  @click="docReg" :loading="loading">Register</v-btn>
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
            docmodal:false,
            patmodal:false,
            doc: {
                first_name: '',
                last_name: '',
                speciality: '',
                email: '',
                password1: '',
                password2: '',
                username: '',
                occupation:'Medical Practitioner',
                address: '',
                dob: new Date().toISOString().substr(0,10),
                hospital: '',
                user_type:'D'
            },
            pat: {
                first_name: '',
                last_name: '',
                password1: '',
                password2: '',
                username: '',
                address: '',
                dob: new Date().toISOString().substr(0,10),
                occupation:'',
                user_type:'P'

            }
        }),
        mounted(){
            this.fetchSpecialities()
        },
        methods: {
            docReg(){
                if(this.$refs.docRegForm.validate()){
                    this.loading = true
                    this.$http().post('rest-auth/registration/', this.doc)
                        .then(res=>{
                            console.log(res)
                            this.$store.commit('setToken', res.data.key)
                            this.$router.push('dash')
                        })
                        .catch(err=>{
                            console.log(err)
                            this.$callSnack('A user with that phone number already exists')
                        })
                        .finally(()=>this.loading = false)
                }else{
                    this.$callSnack('All fields are required', 'warning')
                }

            },
            patReg(){
                if(this.$refs.patRegForm.validate()){
                    this.loading = true
                    this.$http().post('rest-auth/registration/', this.pat)
                        .then(res=>{
                            console.log(res)
                            this.$store.commit('setToken', res.data.key)
                            this.$router.push('dash')
                        })
                        .catch(err=>{
                            console.log(err)
                            this.$callSnack('A user with that phone number already exists')
                        })
                        .finally(()=>this.loading = false)
                }else{
                    this.$callSnack('All fields are required', 'warning')
                }
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
