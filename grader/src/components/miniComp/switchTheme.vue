<template>
<v-switch prepend-icon="mdi-weather-sunny" append-icon="mdi-moon-waning-crescent"  v-model="$vuetify.theme.dark" color="white" hide-details>
</v-switch>
</template>

<script>
import mixin from '../mixins'

export default {
    mixins: [mixin],
}
</script>
