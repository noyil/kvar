<template>
    <div class="kvar-card-container" :style="kvarCardStyle">
        <KvarCircle v-model:kvar="kvarRef" v-model:editMode="editMode"/>
        <div class="kvar-text-accent full-width row no-wrap items-center justify-between">
            <div class="row no-wrap items-center justify-start">
                <q-btn flat round :icon="mdiMessage"></q-btn>
                <span>{{ kvarRef.comments&&kvarRef.comments.count?kvarRef.comments.count:'' }}</span>
            </div>
            <div class="row no-wrap items-center justify-center">
                <div class="ranking positive text-right" :voted="kvarRef.ranking.voted&&kvarRef.ranking.voted==='positive'">
                    <span>{{ kvarRef.ranking.positive?kvarRef.ranking.positive:'' }}</span>
                    <q-btn flat round :icon="mdiThumbUp"   @click="Vote('positive')"></q-btn>
                </div>
                <div class="ranking negative text-left" :voted="kvarRef.ranking.voted&&kvarRef.ranking.voted==='negative'">
                    <q-btn flat round :icon="mdiThumbDown" @click="Vote('negative')"></q-btn>
                    <span>{{ kvarRef.ranking.negative?kvarRef.ranking.negative:'' }}</span>
                </div>
            </div>
            <div class="row no-wrap items-center justify-end">
                <q-btn flat round :icon="mdiPencil" @click="Edit()"></q-btn>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { fixColorBrightness } from "@/features/Helpers"
import KvarCircle from '@/components/KvarCircle.vue'
import {
    mdiPencil,
    mdiMessage,
    mdiHome,
    mdiThumbUp,
    mdiThumbDown
} from '@quasar/extras/mdi-v5'

export default {
    name: 'KvarCard',
    components: { KvarCircle },
    props: {
        kvar: { type: Object, required: true }
    },
    created () {
        this.mdiPencil = mdiPencil
        this.mdiMessage = mdiMessage
        this.mdiHome = mdiHome
        this.mdiThumbUp = mdiThumbUp
        this.mdiThumbDown = mdiThumbDown
    },
    setup(props, {emit}) {
        const inEditMode = ref(false)
        const editMode = reactive(inEditMode)
        const kvarRef = reactive(props.kvar)
        const kvarCardStyle = computed(() => kvarRef.color ? { '--bgColor': fixColorBrightness(kvarRef.color) } : {} )
        const Edit = () => inEditMode.value=true

        const Vote = value => {
            const voted = kvarRef.ranking.voted
            if(voted) kvarRef.ranking[voted]--
            if(voted===value) value = undefined
            else if(kvarRef.ranking[value])
                    kvarRef.ranking[value]++
            else    kvarRef.ranking[value] = 1
            kvarRef.ranking.voted = value
            emit('update:kvar', kvarRef )
        }

        onMounted(() => {  });
        return { kvarCardStyle, kvarRef, editMode, Edit, Vote }
    }
}
</script>

<style scoped>
    .kvar-card-container  { overflow: visible; min-width: 250px; width: 100%; max-width: 400px; --bgColor: var(--q-accent); }
    .kvar-text-accent     { color: var(--bgColor) !important; }
    .kvar-text-accent div { flex: 1 1 140px; }
    .kvar-text-accent div:first-child, .kvar-text-accent div:last-child { flex-basis: 80px; }
    
    .ranking { font-size: 0.8em; width: 35px; }
    .ranking[voted=true].positive { color: var(--q-positive) }
    .ranking[voted=true].negative { color: var(--q-negative) }
    .ranking[voted=false] { color: rgb(172, 172, 172) }
</style>