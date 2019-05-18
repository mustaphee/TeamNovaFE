<template>
    <v-app id="login" class="primary">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4 lg4>
                        <v-card class="elevation-1 pa-3">
                            <v-card-text>
                                <div class="layout column align-center">
                                    <h1 class="flex my-4 primary--text text-xs-center">Electrical Engineering Library</h1>
                                    <h2 class="flex text-xs-center">Member Registration</h2>
                                </div>
                                <div v-if="successful">
                                    Registration successful. You will receive an email when your account has been approved.
                                </div>
                                <v-form  v-else ref="regForm" :lazy-validation="true">
                                    <v-text-field name="first_name" label="First Name" type="text" v-model="model.first_name" :rules="[rules.required]"></v-text-field>
                                    <v-text-field name="last_name" label="Last Name" type="text" v-model="model.last_name" :rules="[rules.required]"></v-text-field>
                                    <v-text-field label="Other Names" v-model="model.other_names"></v-text-field>
                                    <v-text-field name="login" label="Email Address" type="email" v-model="model.email" :rules="[rules.email, rules.required]"></v-text-field>
                                    <v-text-field name="login" label="School ID" type="text" v-model="model.school_id" :rules="[rules.required]"></v-text-field>
                                    <v-text-field name="login" label="Phone Number" type="number" v-model="model.phone_number" :rules="[rules.required, (v)=> !isNaN(v) || 'digits only', (v)=> v.length === 11 || 'accepted length is 11']"></v-text-field>
                                    <v-text-field name="password" label="Password" id="password" type="password" v-model="model.password" :rules="[rules.required]"></v-text-field>
                                    <v-text-field label="Confirm Password" type="password" v-model="model.password_c" :rules="[rules.required, (val)=> val === model.password  || 'Password does not match']"></v-text-field>
                                    <div class="basic">
                                        <span class="title grey--text text--darken-1">Role: {{model.post}} </span>
                                        <v-radio-group v-model="model.post" :mandatory="true" row>
                                            <v-radio label="Student" value="student" ></v-radio>
                                            <v-radio label="Lecturer" value="lecturer" ></v-radio>
                                            <v-radio label="Staff" value="staff" ></v-radio>
                                        </v-radio-group>
                                    </div>
                                    <v-text-field label="Address" type="text" v-model="model.address"></v-text-field>
                                    <p>Passport : {{model.passport.name}}</p>
                                    <v-btn @click="$refs.fileInput.click()" color="primary">Upload Passport</v-btn>
                                    <input type="file" ref="fileInput" @change="fileSelected($event.target.name, $event.target.files)" accept="image/png" style="display:none">
                                    <p>ID Card : {{model.id_card_image.name}}</p>
                                    <v-btn @click="$refs.fileInput2.click()" color="primary">Upload ID Card Image</v-btn>
                                    <input type="file" ref="fileInput2" @change="file2Selected($event.target.name, $event.target.files)" accept="image/png" style="display:none">

                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn v-if="successful" block color="primary" @click="successful=false">Close</v-btn>
                                <v-btn v-else block color="primary" type="submit" @click="register" :loading="loading">Register</v-btn>
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
            model: {
                first_name: '',
                last_name: '',
                other_names: '',
                school_id:'',
                email: '',
                password: '',
                password_c: '',
                post: '',
                phone_number: '',
                address: '',
                passport:'',
                id_card_image:''
            }
        }),

        methods: {
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
            fileSelected(name, files){
                    this.model.passport =  files[0]
                console.log(files)
            },
            file2Selected(name, files){
                this.model.id_card_image =  files[0]
                console.log(files)
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
