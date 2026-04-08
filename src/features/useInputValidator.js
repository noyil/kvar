import { ref, watch } from 'vue'

export default function (startVal, validators, onValidate) {
    const input = ref(startVal)
    const errors = ref([])

    watch(input, value => {
      errors.value = validators.map(validator => validator(value));
      if(onValidate) onValidate(value);
    })
    
    return {
      input,
      errors
    }
  }