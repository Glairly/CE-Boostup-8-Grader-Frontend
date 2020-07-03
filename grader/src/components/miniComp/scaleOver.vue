<template>
<div class="scaleOver" :class="scaleover"></div>
</template>

<script>
export default {
    props: {
        scaleover : String
    }
}
</script>

<style>
.scaleOver {
    /* background: #42b983; */
    background: var(--theme-1);
    border-radius: 50%;
    position: fixed;
    top: -250px;
    right: -250px;
    z-index: 15;
    width: 250px;
    height: 250px;
}
</style>
