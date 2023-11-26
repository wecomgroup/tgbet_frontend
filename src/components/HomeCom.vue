<template>
  <div class="home-wrapper" id="home">
    <el-row :gutter="30">
      <el-col :lg="3"></el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <ActionView />
      </el-col>
      <el-col :xs="24" :sm="24" :lg="11">
        <HomeForm />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ActionView from '@/components/ActionView.vue'
import HomeForm from "@/components/HomeForm.vue";
export default {
  components: {
    ActionView,
    HomeForm
  }
}
</script>
<style scoped>
.home-wrapper {
  width: 100%;
  background: url('../assets/indexBackgroud.png') center/cover;
  padding: 40px 0 60px;
}

@media screen and (max-width: 900px) {
  .home-wrapper {
    padding: 20px;
    box-sizing: border-box;
  }
}</style>
