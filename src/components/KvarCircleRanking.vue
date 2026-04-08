<template>
    <g :style="rankingStyle">
        <circle class="segment neutral"/><circle class="segment negative"/><circle class="segment positive"/>
    </g>
</template>
<script>
import { computed } from 'vue'
export default {
    name: 'KvarCircleRanking',
    props: {
        visible: {type: Boolean, default: true},
        ranking: {type: Object, required: true}
    },
    setup(props) {
        return { rankingStyle: computed(()=>{
            const ranking = props.visible&&props.ranking
            const [positive, negative, minimum, voted] = [ranking.positive||0, ranking.negative||0, ranking.minimum||0, !ranking.voted]
            const sum = positive+negative
            const diameter = 400*3.141592
            const perimeter = diameter/(Math.max(sum, minimum)+voted)
            const [positiveArc, negativeArc] = [positive*perimeter, negative*perimeter]
            return { '--positive': `0 ${diameter-positiveArc} ${positiveArc} 0`,
                     '--negative':   `${negativeArc} ${diameter-negativeArc}` }
        }) }
    }
}
</script>
<style scoped>
    .segment.positive { stroke: var(--q-positive);  stroke-dasharray: var(--positive); }
    .segment.negative { stroke: var(--q-negative); stroke-dasharray: var(--negative); }
    .segment          { cy: 50%; cx: 50%; r: 50%; stroke-width: 2%; stroke-dashoffset: 942.4776; transition: stroke-dasharray 0.2s ease-in-out; fill: none; }
    .neutral          { stroke: rgb(0, 0, 0); stroke-width: 1.5%; opacity: 0.15; }
</style>