<template>
    <v-container grid-list-xl fluid>
        <v-layout row wrap>
            <v-flex sm12>
                <v-dialog v-model="showForm" persistent max-width="500px">
                    <v-btn color="primary" dark slot="activator">Add New Section</v-btn>
                    <v-card>
                        <v-card-title>
                            <span class="headline">Section Detail</span>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <v-form ref="addForm" :lazy-validation="false">
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12>
                                            <v-text-field  label="Section Name" v-model="form.name" :rules="[rules.required]"></v-text-field>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-textarea label="Description" v-model="form.description" :rules="[rules.required]"></v-textarea>
                                        </v-flex>

                                    </v-layout>
                                </v-container>
                            </v-form>

                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click.native="showForm = false">Close</v-btn>
                            <v-btn color="blue darken-1" flat @click.native="addSection" :loading="addLoading">Add</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-flex>
            <v-flex sm12>
                <v-card>
                    <v-card-text>
                        <v-data-table
                                :headers="headers"
                                :items="sections"
                                :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                                class="elevation-1"
                                item-key="name"
                        >
                            <template slot="items" slot-scope="props">
                                <td>{{ props.item.name }}</td>
                                <td class="text-xs-justify">{{ props.item.description }}</td>
                                <td class="text-xs-justify">
                                    <v-btn color="info" @click="editSection(props.item)">Edit</v-btn>
                                    <v-btn color="error" @click="deleteSection(props.item.id)">Delete</v-btn>
                                </td>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
                <v-dialog v-model="showEditForm" persistent max-width="500px">
                    <v-card>
                        <v-card-title>
                            <span class="headline">Section Detail Edit</span>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <v-form ref="editForm" :lazy-validation="false">
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12>
                                            <v-text-field  label="Section Name" v-model="editForm.name" :rules="[rules.required]"></v-text-field>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-textarea label="Description" v-model="editForm.description" :rules="[rules.required]"></v-textarea>
                                        </v-flex>

                                    </v-layout>
                                </v-container>
                            </v-form>

                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click.native="showForm = false">Close</v-btn>
                            <v-btn color="blue darken-1" flat @click.native="updateSection" :loading="editLoading">Edit</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "LibrarySection",
        data:()=>({
            showForm:false,
            addLoading: false,
            showEditForm: false,
            editLoading: false,
            form:{
                name:'',
                description:''
            },
            sections:[],
            headers:[
                {
                    text:'Section Name',
                    value:'name'
                },
                {
                    text: 'Description',
                    value:'description'
                },
                {
                    text:'Actions'
                }
            ],
            editForm:{
                name:'',
                description: ''
            },
            selectedSectionID: ''
        }),
        mounted(){
            this.fetchSections()
        },
        methods:{
            fetchSections(){
                this.$httpT().get('/library/section/all')
                    .then(res=>{
                        this.sections = res.data.data
                    })
            },
            addSection(){
                if(this.$refs.addForm.validate()){
                    this.addLoading = true
                    this.$httpT().post('library/section/create', this.form)
                        .then(res=>{
                            this.fetchSections()
                            this.showForm = false
                            this.$callSnack(res.data.message, 'success')
                            this.$refs.addForm.reset()
                        })
                        .catch(err=>{
                            this.$callSnack(err.response.data.message, 'danger')
                        }).finally(()=>this.addLoading = false)

                }else{
                    this.$callSnack('All fields are required', 'warning')
                }
            },
            editSection(item){
                this.showEditForm = true
                this.editForm = {
                    name: item.name,
                    description: item.description
                }
                this.selectedSectionID = item.id
            },
            deleteSection(id){

            },
            updateSection(){
                if(this.$refs.editForm.validate()){
                    this.$httpT().put('library/section/'+this.selectedSectionID, editForm)
                        .then((res)=>{
                            this.fetchSections()
                            this.showEditForm = false
                            this.$refs.editForm.reset()
                            this.$callSnack(res.data.message, 'success')
                        })
                        .catch(err=>{
                            this.$callSnack(err.response.data.message, 'danger')
                        })
                }else{
                    this.$callSnack('All fields are required', 'warning')
                }
            }
        }
    }
</script>

<style scoped>

</style>
