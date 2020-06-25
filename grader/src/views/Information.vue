<template>
<div style="height:100%">
    <v-textarea color="white" height="80vh" solo hide-details auto-grow no-resize readonly :value="text">
        {{text}}
    </v-textarea>

</div>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
            text: " {\nfront-end : Glairy,\nback-end : nonkung51,\ngrader/compiler : eXitHere,\nserver : RedZero\n},\n{\nProject-Name : Grader CE Boost-up 8 , \nVersion : 1.2, \nStaff : { \n} \n} ",
        }
    },
    created() {},
}
</script>
