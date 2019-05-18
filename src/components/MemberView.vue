<template>
    <v-card v-if="!declined">
        <v-card-title class="headline">
            {{user.name}}
        </v-card-title>
        <v-card-text>
            <v-layout row wrap>
                <v-flex sm6>
                    <v-img :src="user.id_card"></v-img>
                </v-flex>
                <v-flex sm6>
                    <v-img :src="user.passport"></v-img>
                </v-flex>
            </v-layout>
            <p><strong>School ID:</strong> {{user.school_id}} <br><strong>Email:</strong> {{user.email}}<br><strong>Address:</strong> {{user.address}}</p>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <template v-if="approved || user.approved">
                <v-btn color="error" :loading="banLoading" @click="ban">Ban</v-btn>
            </template>
            <template v-else-if="user.ban_status">
                <v-btn color="info" :loading="unbanLoading" @click="unBan">UnBan</v-btn>
            </template>
            <template v-else>
                <v-btn color="success" :loading="approveLoading" @click="approve">Approve</v-btn>
                <v-btn color="error" :loading="declineLoading" @click="decline">Decline</v-btn>
            </template>
        </v-card-actions>
    </v-card>
    <v-card v-else>
        <span class="headline">Declined</span>
    </v-card>
</template>

<script>
    export default {
        name: "MemberView",
        props:[
            'user'
        ],
        data:()=>({
            approveLoading: false,
            declineLoading: false,
            banLoading:false,
            unbanLoading:false,
            approved: false,
            declined: false
        }),
        methods:{
            approve(){
                this.approveLoading = true
                this.$httpT().post('member/approve', {
                    'user': this.user.id
                })
                    .then((resp)=>{
                        console.log(resp)
                        this.approved = true
                        this.$callSnack(resp.data.message, 'success')
                    })
                    .catch(err=>{
                        this.$callSnack(err.response.data.message, 'danger')
                    })
                    .finally(()=>this.approveLoading  =false)
            },
            decline(){
                this.declineLoading = true
                this.$httpT().post('member/decline',{
                    'user':this.user.id
                })
                    .then(resp=>{
                        this.declined = true
                        this.$callSnack(resp.data.message, 'success')
                    })
                    .catch(err=>{
                        this.$callSnack(err.response.data.message, 'danger')
                    }).finally(()=>this.declineLoading = false)
            },
            ban(){
                this.banLoading = true
                this.$httpT().put(`member/${user.id}/ban`)
                    .then(resp=>{
                        this.$callSnack(resp.data.message, 'success')
                    })
                    .catch(err=>{
                        this.$callSnack(err.response.data.message, 'danger')
                    })
                    .finally(()=>this.banLoading = false)
            },
            unBan(){
                this.unbanLoading = true
                this.$httpT().put(`member/${user.id}/ban`)
                    .then(resp=>{
                        this.$callSnack(resp.data.message, 'success')

                    })
                    .catch(err=>{
                        this.$callSnack(err.response.data.message, 'danger')
                    })
                    .finally(()=>this.unbanLoading = false)

            }
        }
    }
</script>

<style scoped>

</style>
