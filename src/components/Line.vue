<template>
    <div class="line">
        <div class="line-color"></div>
        <img src="@/assets/subtract-line.png" class="line-img" />
        <div class="line-color"></div>
    </div>
</template>

<script>
export default {
    name: 'line',
    data() {
        return {
            // commonProblems: []
        };
    },
    computed: {
       
    },
};
</script>

<style scoped>
.line-color {
    background: #efd8aa;
    flex: 1;
    height: 1px;
}

.line {
    display: flex;
    align-items: center;
    gap: 26px;
    margin-top: 18px;
}
.line-img {
    width: 18px;
    height: 18px;
}
@media screen and (max-width: 900px) {
    .line {
        margin-top: 12px;
        gap: 20px;
    }
    

}
</style>
