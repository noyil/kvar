<template>
  <q-layout view="hHr LpR fFr">
    <q-header class="bg-primary header" dir="ltr">
      <q-btn flat label="Kvar" class="text-body1 text-bold"/>
      <q-btn flat label="by Noyil" class="text-overline"/>
    </q-header>

    <q-page-container class="fit row wrap justify-center items-center content-center">
      <router-view class="pageContainer"/>
    </q-page-container>

    <q-footer class="bg-primary footer">
        <q-tabs align="justify">
          <q-route-tab to="/my" :icon="mdiAccount"/>
          <q-route-tab to="/" :icon="mdiHome"/>
          <q-route-tab to="/new" :icon="mdiPlus" />
        </q-tabs>
    </q-footer>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
//import HelloWorld from './components/HelloWorld.vue'

import {
  mdiAccount,
  mdiPlus,
  mdiHome,
} from '@quasar/extras/mdi-v5'

export default {
  name: 'LayoutDefault',

  components: {
    //HelloWorld
  },

  created () {
    this.mdiAccount = mdiAccount
    this.mdiPlus = mdiPlus
    this.mdiHome = mdiHome
  },

  setup () {
    const rightDrawerOpen = ref(false)

    return {
      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  }
}
</script>

<style>
  .fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
  .fade-enter-from, .fade-leave-to { opacity: 0; }
  .scale-enter-active, .scale-leave-active { transform-origin: 50% 50%; transition: transform 0.3s ease; }
  .scale-enter-from, .scale-leave-to { transform: scale(0); }

  .q-layout__section--marginal {
    color: black !important;
  }
  
  /* heebo-regular - latin_hebrew 
  @font-face {
    font-family: 'Heebo';
    font-style: normal;
    font-weight: 400;
    src: local(''),
        url('./styles/fonts/heebo-v10-latin_hebrew-regular.woff2') format('woff2'),
        url('./styles/fonts/heebo-v10-latin_hebrew-regular.woff') format('woff');
  } */
  * {
    font-family: 'Heebo';
  }

  .q-btn--round {
    transition: transform 0.1s ease-in-out;
  }
  .q-btn--round:hover {
    transform: scale( 1.1 );
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .header .q-btn{
    text-transform: unset !important;
    letter-spacing: 2px;
  }
  .pageContainer {
    min-width: 80vw;
    /* display: flex;
    align-content: stretch;
    align-items: stretch; */
  }
  @media only screen and (min-width: 500px) {
    .footer {
      max-width: 500px;
      border-radius: 20px 20px 0 0;
      overflow: hidden;
      margin: auto;
    }
  }
</style>
