<template>
    <KvarCard :kvar="{ author: 'Noyil', title: 'כבר סיימו לבנות את כבר?', status: 'לא', ranking: {} }" />
</template>

<script>
//import logo from '../assets/logo.svg';
import KvarCard from '@/components/KvarCard.vue'

export default {
  name: 'HelloWorld',
  components: {
    KvarCard
  },
}
</script>