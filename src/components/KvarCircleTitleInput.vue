<template>
    <textarea ref="textAreaElement" class="title-input" v-model="input"></textarea>
</template>
<script>
import useInputValidator from "@/features/useInputValidator"
import { minLength } from "@/features/validators"
import { ref, watch } from 'vue'

export default {
    name: 'KvarCircleTitleInput',
    props: {
        modelValue: { type: String, required: true },
        fontMinMax: { type: Object, required: true }
    },
    setup (props, { emit }) {
        const textAreaElement = ref()
        const textAreaFontSize = ref(props.fontMinMax.current)

        const setFontSizeToFillTextArea = textRemoved => {
            const minFontSize    = props.fontMinMax.min
            const maxFontSize    = props.fontMinMax.max
            const textArea       = textAreaElement.value
            const updateFontSize = size => textArea.style.fontSize = size + 'px'
            const scrollable     = () => textArea.scrollHeight > textArea.clientHeight
            while( scrollable() && textAreaFontSize.value > minFontSize )
                updateFontSize(textAreaFontSize.value--)
            if( textRemoved )
                while( !scrollable() && textAreaFontSize.value < maxFontSize )
                    updateFontSize(textAreaFontSize.value++)
        }

        const { input, errors } = useInputValidator( props.modelValue, [ minLength(3) ] )
        watch(input, (newValue, oldValue) => {
            setFontSizeToFillTextArea( oldValue.length > newValue.length )
            emit("update:modelValue", newValue)
        } )

        return {
            input,
            errors,
            textAreaElement
        }
    }
}
</script>

<style>
    .title-input {
        z-index: 5000;
        width: 100%;
        height: 100%; 
        text-align: center;

        resize: none;
        overflow: hidden;

        font-size: 40px;
        line-height: 1.3;
        background-color: transparent;
        border-color: transparent;
        outline-width: 0;
        outline-color: transparent;

        color: var(--textColor);
    }
</style>