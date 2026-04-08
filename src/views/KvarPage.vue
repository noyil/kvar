<template>
  <q-page padding class="kvar-card-container full-height column justify-center items-center content-center">
    <KvarCard v-if="kvarData" v-model:kvar="kvarData"/>
  </q-page>
</template>

<script>
import { reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import KvarCard from '@/components/KvarCard.vue'

import { colors } from 'quasar'
const { rgbToHex, hsvToRgb } = colors

export default {
  name: 'KvarPage',

  components: {
    KvarCard
  },

  setup() {
    const route = useRoute()
    const kvarData = reactive({ id:'', author:'', title:'', status:'', color:'', ranking:{} })

    function fetchKvarByID(id) {
      return {
        id: id,
        author: "Noyil",
        title: "כבר " + id + "?",
        status: Math.random()>0.5?"לא":"כן",
        color: rgbToHex(hsvToRgb( { h: Math.random()*360, s: 60, v: 60, a: 100} )),
        ranking: { positive: Math.round(Math.random()*50) , negative: Math.round(Math.random()*50), minimum: Math.round(Math.random()*100) }
      }
    }

    async function routeChanged(routeParams) {
      if(routeParams.id)
        Object.assign( kvarData, await fetchKvarByID(routeParams.id) )
    }

    routeChanged(route.params);

    watch( () => route.params, () => routeChanged(route.params) )

    return {
      kvarData
    }
  }
}
</script>
