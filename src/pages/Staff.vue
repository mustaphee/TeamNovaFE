<template>
    <v-container grid-list-xl fluid>
        <v-layout row wrap>
            <v-flex sm12>
                <v-dialog v-model="showForm" persistent max-width="500px">
                    <v-btn color="primary" dark slot="activator">Add Staff</v-btn>
                    <v-card>
                        <v-card-title>
                            <span class="headline">Staff Detail</span>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <v-form ref="staffForm" :lazy-validation="false">
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12 sm6 md4>
                                            <v-text-field label="First Name" v-model="form.first_name" :rules="[rules.required]"></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm6 md4>
                                            <v-text-field label="Last Name" v-model="form.last_name" :rules="[rules.required]"></v-text-field>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-text-field label="Staff School ID" v-model="form.staff_id" :rules="[rules.required]"></v-text-field>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-text-field label="Email" v-model="form.email" :rules="[rules.required, rules.email]"></v-text-field>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-text-field label="Phone Number" v-model="form.phone" type="phone" :rules="[rules.required, (v)=> !isNaN(v) || 'digits only', (v)=> v.length === 11 || 'accepted length is 11']"></v-text-field>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-text-field label="Address" v-model="form.address" type="text" :rules="[rules.required]"></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-form>

                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click.native="showForm = false">Close</v-btn>
                            <v-btn color="blue darken-1" flat @click.native="addStaff" :loading="addLoading">Add</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-flex>
            <v-card>
                <v-card-text>
                    <v-data-table
                        :headers="table"
                        :items="staff"
                        :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                        class="elevation-1"
                        item-key="name"
                    >
                        <template slot="items" slot-scope="props">
                            <td>{{ props.item.name }}</td>
                            <td class="text-xs-right">{{ props.item.staff_id }}</td>
                            <td class="text-xs-right">{{ props.item.email }}</td>
                            <td class="text-xs-right">{{ props.item.phone_number }}</td>
                            <td>
                                <v-btn v-if="props.item.ban_status" color="info" @click="enableStaff(props.item.id)">Enable</v-btn>
                                <v-btn v-else color="error " @click="disableStaff(props.item.id)">Disable</v-btn>
                            </td>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "Staff",
        data:()=>({
            table: [
                {
                    text:'Name',
                    value: 'name'
                },
                {
                    text: 'Staff ID',
                    value: 'staff_id'
                },
                {
                    text: 'Email',
                    value: 'email'
                },
                {
                    text: 'Phone',
                    value: 'phone_number'
                },
                {
                    text:'Actions'
                }
            ],
            staff:[],
            showForm: false,
            addLoading: false,
            form:{
                first_name: '',
                last_name: '',
                email:'',
                phone: '',
                address: '',
                staff_id: ''
            }
        }),
        mounted(){
          this.fetchStaff()
        },
        methods:{
            addStaff(){
                if(this.$refs.staffForm.validate()){
                    this.addLoading = true
                    this.$httpT().post('staff/add', {
                        name: this.form.first_name+' '+this.form.last_name,
                        staff_id: this.form.staff_id,
                        email: this.form.email,
                        address: this.form.address,
                        phone_number: this.form.phone
                    })
                        .then((resp)=>{
                            this.showForm = false
                            this.$callSnack(resp.data.message, 'success')
                            this.$refs.staffForm.reset()
                            this.fetchStaff()
                        })
                        .catch((err)=>{
                            this.$callSnack(err.response.data.message, 'danger')
                        })
                        .finally(()=>this.addLoading = false)

                }else{
                    this.$callSnack('All fields are required', 'warning')
                }
            },
            fetchStaff(){
                this.$httpT().get('staff/all')
                    .then(res=>{
                        this.staff = res.data.data
                        console.log(res.data.data)
                    })
            },
            enableStaff(id){
                this.$httpT().put(`staff/${id}/enable`)
                    .then((res)=>{
                        this.fetchStaff()
                        this.$callSnack(res.data.message, 'success')
                    })
            },
            disableStaff(id){
                this.$httpT().put(`staff/${id}/disable`)
                    .then((res)=>{
                        this.fetchStaff()
                        this.$callSnack(res.data.message, 'success')
                    })
            }
        }
    }
</script>

<style scoped>

</style>
