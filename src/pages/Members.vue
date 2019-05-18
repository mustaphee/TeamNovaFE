<template>
    <div id="pageDashboard">
        <v-container grid-list-xl fluid>
            <v-layout row wrap>
                <template v-if="members.length">
                    <v-flex lg3 sm6 xs12 v-for="(item, i) in members" :key="i" >
                        <member-view :user="item"></member-view>
                    </v-flex>
                </template>

                <div v-else class="headline" style="margin: 0 auto">No Members yet</div>
            </v-layout>
        </v-container>
    </div>
</template>


<script>
    import MemberView from "../components/MemberView";
    export default {
        name: "Members",
        components: {MemberView},
        data: ()=>({
            members:[
            ]
        }),
        mounted(){
            this.fetchMembers()
        },
        methods:{
          fetchMembers(){
              this.$httpT().get('members')
                  .then((res)=>{
                      console.log(res)
                      this.members = res.data.data
                  })
                  .catch((err)=>{
                      console.log(err)
                  })
          }
        }
    }
</script>

<style scoped>

</style>
