<template>
  <v-navigation-drawer
    id="appDrawer"
    :mini-variant.sync="mini"
    fixed
    :dark="$vuetify.dark"
    app
    v-model="drawer"
    width="260"
    >
    <v-toolbar color="primary darken-1" dark>
      <img v-bind:src="computeLogo" height="36" alt="Vue Material Admin Template">
      <v-toolbar-title class="ml-0 pl-3">
        <span class="hidden-sm-and-down">TeleMedicina</span>
      </v-toolbar-title>
    </v-toolbar>
    <vue-perfect-scrollbar class="drawer-menu--scroll" :settings="scrollSettings">
      <v-list dense expand>
<!--        <v-list-tile to="/dash">-->
<!--          <v-list-tile-action>-->
<!--            <v-icon>dashboard</v-icon>-->
<!--          </v-list-tile-action>-->
<!--          <v-list-tile-content>-->
<!--            <v-list-tile-title>Dashboard</v-list-tile-title>-->
<!--          </v-list-tile-content>-->
<!--        </v-list-tile>-->
<!--        <v-list-tile to="/members">-->
<!--          <v-list-tile-action>-->
<!--            <v-icon>people</v-icon>-->
<!--          </v-list-tile-action>-->
<!--          <v-list-tile-content>-->
<!--            <v-list-tile-title>Members</v-list-tile-title>-->
<!--          </v-list-tile-content>-->
<!--        </v-list-tile>-->
          <v-list-tile v-for="(item, i) in menuList" :to="item.to" :key="item.title+i">
              <v-list-tile-action>
                  <v-icon>{{item.icon}}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                  <v-list-tile-title>{{item.title}}</v-list-tile-title>
              </v-list-tile-content>

          </v-list-tile>
          <v-list-tile   v-if="$store.state.user.user_type === 'D'">
              <v-list-tile-action>
                  <v-icon>people</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                  <v-list-tile-title>Patients</v-list-tile-title>
              </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-else>
              <v-list-tile-action>
                  <v-icon>history</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                  <v-list-tile-title>Medical History</v-list-tile-title>
              </v-list-tile-content>
          </v-list-tile>
          <v-list-tile >
              <v-list-tile-action>
                  <v-icon>settings</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                  <v-list-tile-title>Settings</v-list-tile-title>
              </v-list-tile-content>
          </v-list-tile>
<!--        <template v-for="(item, i) in menus">-->
<!--            &lt;!&ndash;group with subitems&ndash;&gt;-->
<!--            <v-list-group v-if="item.items" :key="item.name" :group="item.group" :prepend-icon="item.icon" no-action="no-action">-->
<!--              <v-list-tile slot="activator" ripple="ripple">-->
<!--                <v-list-tile-content>-->
<!--                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>-->
<!--                </v-list-tile-content>-->
<!--              </v-list-tile>-->
<!--              <template v-for="(subItem, i) in item.items">-->
<!--                &lt;!&ndash;sub group&ndash;&gt;-->
<!--                <v-list-group v-if="subItem.items" :key="subItem.name" :group="subItem.group" sub-group="sub-group">-->
<!--                  <v-list-tile slot="activator" ripple="ripple">-->
<!--                    <v-list-tile-content>-->
<!--                      <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>-->
<!--                    </v-list-tile-content>-->
<!--                  </v-list-tile>-->
<!--                  <v-list-tile v-for="(grand, i) in subItem.children" :key="i" :to="genChildTarget(item, grand)" :href="grand.href" ripple="ripple">-->
<!--                    <v-list-tile-content>-->
<!--                      <v-list-tile-title>{{ grand.title }}</v-list-tile-title>-->
<!--                    </v-list-tile-content>-->
<!--                  </v-list-tile>-->
<!--                </v-list-group>-->
<!--                &lt;!&ndash;child item&ndash;&gt;-->
<!--                <v-list-tile v-else :key="i" :to="genChildTarget(item, subItem)" :href="subItem.href" :disabled="subItem.disabled" :target="subItem.target" ripple="ripple">-->
<!--                  <v-list-tile-content>-->
<!--                    <v-list-tile-title><span>{{ subItem.title }}</span></v-list-tile-title>-->
<!--                  </v-list-tile-content>-->
<!--                  <v-list-tile-action v-if="subItem.action">-->
<!--                    <v-icon :class="[subItem.actionClass || 'success&#45;&#45;text']">{{ subItem.action }}</v-icon>-->
<!--                  </v-list-tile-action>-->
<!--                </v-list-tile>-->
<!--              </template>-->
<!--            </v-list-group>-->
<!--            <v-subheader v-else-if="item.header" :key="i">{{ item.header }}</v-subheader>-->
<!--            <v-divider v-else-if="item.divider" :key="i"></v-divider>-->
<!--            &lt;!&ndash;top-level link&ndash;&gt;-->
<!--            <v-list-tile v-else :to="!item.href ? { name: item.name } : null" :href="item.href" ripple="ripple" :disabled="item.disabled" :target="item.target" rel="noopener" :key="item.name">-->
<!--              <v-list-tile-action v-if="item.icon">-->
<!--                <v-icon>{{ item.icon }}</v-icon>-->
<!--              </v-list-tile-action>-->
<!--              <v-list-tile-content>-->
<!--                <v-list-tile-title>{{ item.title }}</v-list-tile-title>-->
<!--              </v-list-tile-content>-->
<!--              <v-list-tile-action v-if="item.subAction">-->
<!--                <v-icon class="success&#45;&#45;text">{{ item.subAction }}</v-icon>-->
<!--              </v-list-tile-action>-->
<!--            </v-list-tile>-->
<!--        </template>-->
      </v-list>
    </vue-perfect-scrollbar>
  </v-navigation-drawer>
</template>
<script>
import menu from '@/api/menu';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
export default {
  name: 'app-drawer',
  components: {
    VuePerfectScrollbar,
  },
  props: {
    expanded: {
      type: Boolean,
      default: true
    },
  },
  data: () => ({
    mini: false,
    drawer: true,
    menus: menu,
    scrollSettings: {
      maxScrollbarLength: 160
    }    ,
    menuList: [
      {
        title:'Dashboard',
        icon: 'dashboard',
        to: '/dash',
      },
        {
            title:'Chats',
            icon: 'forum',
            to: '/chat',
        },


    ]
  }),
  computed: {
    computeGroupActive () {
      return true;
    },
    computeLogo () {
      return '/static/m.png';
    },

    sideToolbarColor () {
      return this.$vuetify.options.extra.sideNav;
    }
  },
  created () {
    window.getApp.$on('APP_DRAWER_TOGGLED', () => {
      this.drawer = (!this.drawer);
    });
  },


  methods: {
    genChildTarget (item, subItem) {
      if (subItem.href) return;
      if (subItem.component) {
        return {
          name: subItem.component,
        };
      }
      return { name: `${item.group}/${(subItem.name)}` };
    },
  }
};
</script>


<style lang="stylus">
// @import '../../node_modules/vuetify/src/stylus/settings/_elevations.styl';

#appDrawer
  overflow: hidden
  .drawer-menu--scroll
    height: calc(100vh - 48px)
    overflow: auto

</style>
