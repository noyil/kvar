<template>
  <q-page padding>
    <KvarCard :kvar="{ author: 'Noyil', title: 'כבר יש איך ליצור כבר?', status: 'לא', ranking: { positive: Math.round(Math.random()*30) , negative: Math.round(Math.random()*30), minimum: Math.round(Math.random()*50) } }" />
  </q-page>
</template>

<script>
import KvarCard from '@/components/KvarCard.vue'

export default {
  name: 'Create',
  components: {
    KvarCard
  },
}
</script>
