<template>
    <div class="kvar-circle-container" :style="circleStyle">
        <transition name="fade"><div v-if="editMode" class="click-outside" @click.self="edit(false)"></div></transition>
        <transition name="scale"><div v-if="editMode" class="kvar-color-picker-circle" @mousemove="colorPickerMouseMove" @mouseenter="colorPickerMouseEnter" @mouseleave="colorPickerMouseLeave" @click="colorPickerMouseClick" @touchmove.prevent="colorPickerTouchMove"><div></div></div></transition>
        <svg ref="kvarCircleSvg" class="kvar-circle no-pointer-events" viewBox="0 0 400 400">
            <circle class="all-pointer-events" @click="edit(true)"/>
            <circle class="status-circle" @click="edit(true)"/>
            <KvarCircleRanking :visible="!editMode" v-model:ranking="kvarRef.ranking"/>
            <foreignObject class="all-pointer-events" v-if="editMode" v-bind="textTransforms.title" >
                <KvarCircleTitleInput v-model.trim="editableTitle" :fontMinMax="textTransforms.fontSizes" @keydown.enter.prevent @keyup.enter="edit(false,true)"/>
            </foreignObject>
            <foreignObject class="all-pointer-events" v-if="editMode" v-bind="textTransforms.confirmTitle">
                <q-btn round size="lg" color="primary" text-color="accent" :icon="mdiCheck" @click="edit(false,true)" />
            </foreignObject>
        </svg>
    </div>
</template>

<script>
import KvarCircleRanking    from '@/components/KvarCircleRanking.vue'
import KvarCircleTitleInput from '@/components/KvarCircleTitleInput.vue'
import { mdiCheck, mdiThumbUp, mdiThumbDown } from '@quasar/extras/mdi-v5'
import { reactive, computed, watch, onMounted } from 'vue'
import { TextBox } from 'd3plus-text'
import { radToDeg, createRefs, textColorByBackgroundRGB } from "@/features/Helpers"
import { colors } from 'quasar'
const  { hexToRgb, rgbToHex, hsvToRgb } = colors
export default {
    name: 'KvarCircle',
    props: {
        kvar    : { type: Object , required: true },
        editMode: { type: Boolean, default: false }
    },
    components: { KvarCircleRanking, KvarCircleTitleInput },
    setup(props, { emit }) {
        const kvarRef = reactive(props.kvar)
        watch(()=>props.kvar.ranking, ()=>Object.assign(kvarRef.ranking, props.kvar.ranking))
        watch(()=>props.kvar.title, ()=>editableTitle.value=kvarRef.title)
        watch(()=>props.kvar.color, ()=>hoverColor.value=kvarRef.color)
        const [kvarCircleSvg, hoverColor, selectedColor, editableTitle] = createRefs([null, kvarRef.color, undefined, kvarRef.title])
        const circleStyle = computed(() => {
            const [titleMode, bgColor, textareaMode, scale] = props.editMode ? ['none', hoverColor.value, 'unset', '1.05'] : ['unset', kvarRef.color, 'none', '1.0']
            const textColor = textColorByBackgroundRGB(hexToRgb(bgColor||""))
            return { '--titleMode': titleMode, '--textareaMode': textareaMode, '--scale': scale,
                ...bgColor ? { '--bgColor': bgColor, '--textColor': textColor, '--statusColor': textColor==='white'?'#0000004C':'#FFFFFF4C' }:{} }
        })
        const textTransforms = {
            title       : { height: 220, width: 320, x: 40 , y: 80  },
            status      : { height: 80 , width: 240, x: 80 , y: 292 }, 
            confirmTitle: { height: 60 , width: 60 , x: 170, y: 300, overflow: 'visible' },
            fontSizes   : { min: 14, max: 40, current: 40 }
        }
        const CircleTextData = () => [
            { id: 'title' , text: kvarRef.title , resize: true, min: 14, max: 40 , ...textTransforms.title  },
            { id: 'status', text: kvarRef.status, resize: true, min: 40, max: 100, ...textTransforms.status }
        ]
        const setFontSize     = () => { textTransforms.fontSizes.current = parseFloat(kvarCircleSvg.value.querySelector("#d3plus-textBox-title text").style.fontSize) }
        const removeTextboxes = () => kvarCircleSvg.value.querySelectorAll(".d3plus-textBox").forEach( element => element.remove() )
        const updateTextboxes = () => {
            removeTextboxes()
            new TextBox().data( CircleTextData() )
                .fontResize(data=>data.resize).fontMin(data=>data.min).fontMax(data=>data.max)
                .fontFamily(['Heebo','heebo']).fontWeight(400).textAnchor("middle").verticalAlign("middle")
                .select(kvarCircleSvg.value).id(data=>data.id).render(setFontSize)
        }
        const renderCircle = () => { updateTextboxes() }
        const edit = (value, confirm) => {
            if(props.editMode != value) emit("update:editMode", value)
            if(confirm) {
                if(editableTitle.value.length>3 && editableTitle.value != kvarRef.title) kvarRef.title = editableTitle.value
                if(selectedColor.value          && selectedColor.value != kvarRef.color) kvarRef.color = selectedColor.value
                emit('update:kvar', kvarRef )
            } else {
                editableTitle.value = kvarRef.title
                hoverColor.value = kvarRef.color
            }
        }
        watch([()=>kvarRef.status, ()=>kvarRef.title], updateTextboxes)
        const colorPickerMouseEnter = () => { }
        const colorPickerMouseLeave = () => { hoverColor.value = selectedColor.value||kvarRef.color }
        const colorPickerMouseMove  = (e) => {
            const [x,y,w,h] = [e.offsetX,e.offsetY,e.target.clientWidth/2,e.target.clientHeight/2]
            const angle = radToDeg(Math.atan2(y-h/2,x-w/2)+180)%360
            let distance = 100*(Math.sqrt((Math.pow(w-x,2))+(Math.pow(h-y,2)))-w*0.8)/(w*0.2); if(distance<0) distance*=-0.2
            hoverColor.value = rgbToHex(hsvToRgb( { h: angle, s: 60, v: Math.min(distance,100), a: 100} ))
        }
        const colorPickerMouseClick = () => { selectedColor.value = hoverColor.value }
        const colorPickerTouchMove  = (e) => {
            const rect = e.target.getBoundingClientRect()
            const touch = e.targetTouches[0]
            e.offsetX = touch.pageX-rect.left; e.offsetY = touch.pageY-rect.top
            colorPickerMouseMove(e); colorPickerMouseClick()
        }
        onMounted(() => renderCircle() )
        return { kvarRef, circleStyle, kvarCircleSvg, textTransforms, editableTitle, edit, mdiCheck, mdiThumbUp, mdiThumbDown,
                colorPickerMouseMove, colorPickerMouseEnter, colorPickerMouseLeave, colorPickerMouseClick, colorPickerTouchMove }
    }
}
</script>

<style>
    .kvar-circle-container { --bgColor: var(--q-accent); --statusColor: rgba(0,0,0,0.3); --textColor: white; position: relative; }
    .kvar-circle {
        position: relative; z-index: 4000; overflow: hidden; border-radius: 50%;
        box-shadow: 0 8px 12px 0 rgba(0, 0, 0, 0.3), 0 4px 40px 0 rgba(0, 0, 0, 0.2);
        transform: scale( var(--scale) ); transition: transform 0.2s ease-in-out, border 0.2s ease-in-out;
    }
    .kvar-color-picker-circle {
        position: absolute; top:0; left:0; right:0; bottom:5px; z-index: 3500; border-radius: 50%;
        margin: -11.5%; border: solid 0px var(--q-primary); cursor: pointer;
        background: conic-gradient(from 135deg, #cc3d3d 0%,#cccc3d,#3dcc3d,#3dcccc,#3d3dcc,#cc3dcc,#cc3d3d);
        transition: transform 0.2s ease-in-out, margin 0.15s ease-in-out;
        box-shadow: 0 8px 12px 0 rgba(0, 0, 0, 0.3), 0 4px 40px 0 rgba(0, 0, 0, 0.2);
    }
    .kvar-color-picker-circle div {
        position: absolute; top:0; left:0; right:0; bottom:0px; border-radius: 50%; pointer-events: none;
        background: radial-gradient(circle closest-side, black 70%, transparent 106%);
    }
    .kvar-color-picker-circle:hover { margin: -12.5%; }
    .kvar-color-picker-circle:active { margin: -13.5%; filter: brightness(0.93); }
    .kvar-circle circle         { fill: var(--bgColor); r: 50%; cx: 50%; cy: 50%; }
    .kvar-circle .status-circle { fill: var(--statusColor); cy: 121%; }
    .kvar-circle text           { unicode-bidi: unset !important; pointer-events: none; fill: var(--textColor); user-select: none; }
    #d3plus-textBox-title, #d3plus-textBox-status { display: var(--titleMode); }

    .click-outside {
        position: fixed; z-index: 3000; top: 0; left: 0; right: 0; bottom: 0;
        background-color: rgba(0,0,0,0.3); background: radial-gradient(circle at center, rgba(0,0,0,0.1) 25%, rgba(0,0,0,0.6) 90%);
    }
</style>