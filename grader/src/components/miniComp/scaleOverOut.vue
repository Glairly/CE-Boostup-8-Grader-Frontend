<template>
    <div class="scaleOver-out" :class="scaleover"></div>
</template>

<script>
export default {
    props: {
        scaleover: String
    }
}
</script>

<style>
.scaleOver-out {
    /* background: #42b983; */
    background: var(--theme-1);
    border-radius: 50%;
    position: fixed;
    z-index: 15;
    top: -250px;
    right: -250px;
    width: 250px;
    height: 250px;
    transform: scale(50);
}
</style>
