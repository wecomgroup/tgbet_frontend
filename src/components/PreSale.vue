<!-- preSale.vue -->
<template>
  <div class="preSale" id="preSale">
    <div class="preSaleTitleImg">
      {{ $t("blockTitle.preTxt1") }}
     
    </div>
    <Line class="pc-1" style="width: 700px;"></Line>
    <Line class="mobile-1" ></Line>
    
    <div class="desc">{{ $t("preSale.text1") }}</div>
    <!-- 线条 -->
   

    <el-row align="middle" :gutter="40">
      <el-col
        :xs="24"
        :sm="24"
        :md="6"
        v-for="(item, index) in preSaleDescList"
        :key="index"
        style="
          padding-bottom: 32767px !important;
          margin-bottom: -32767px !important;
        "
      >
        <div class="descItem">
          <img class="preSaleImg" :src="item.src" />
          <div>
            <p class="title">{{ item.title }}</p>
            <p class="subtitle">{{ item.desc }}</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import specialRewards from "../assets/specialRewards.png";
import preferentialPrice from "../assets/preferentialPrice.png";
import plutocrat from "../assets/plutocrat.png";
import money from "../assets/money.png";
import Line from "./Line.vue";

export default {
  name: "PreSale",
  components: { Line },
  data() {
    return {
      // preSaleDescList: []
    };
  },
  computed: {
    preSaleDescList() {
      return [
        {
          title: this.$t("preSale.text2"),
          desc: this.$t("preSale.text3"),
          src: specialRewards,
        },
        {
          title: this.$t("preSale.text4"),
          desc: this.$t("preSale.text5"),
          src: preferentialPrice,
        },
        {
          title: this.$t("preSale.text6"),
          desc: this.$t("preSale.text7"),
          src: plutocrat,
        },
        {
          title: this.$t("preSale.text8"),
          desc: this.$t("preSale.text9"),
          src: money,
        },
      ];
    },
  },
};
</script>

<style scoped>
.preSale {
  background-color: #2e3442;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 120px 5%;
}

.preSale .el-row.is-align-middle {
  align-items: normal;
}

.desc {
  color: rgba(255, 255, 255, 0.6);
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.8px;
  margin-top: 32px;
  margin-bottom: 80px;
}

.descItem {
  height: 100%;
  background-color: #1f2129;
  border-radius: 8px;
  border: 1px solid #30323a;
  align-items: flex-start;
  padding: 32px;
}

.title {
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 12px;
}

.subtitle {
  text-align: left;
  color: rgba(255, 255, 255, 0.6);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.64px;
}

.preSaleTitleImg {
  /* width: 472px; */
  height: 63px;
  font-size: 40px;
  font-weight: bold;
}

.preSaleImg {
  width: 60px;
  height: 60px;
  margin-bottom: 34px;
}

@media screen and (max-width: 900px) {
  .preSale {
    padding: 40px 24px;
  }

  .preSaleTitleImg {
    /* width: 294px; */
    height: auto;
    font-size: 24px;
  }

  .desc {
    font-size: 14px;
    margin-top: 16px;
    margin-bottom: 24px;
  }

  .descItem {
    height: auto;
    margin-bottom: 16px;
    flex-direction: row;
    padding: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
  }

  .title {
    font-size: 16px;
    margin-bottom: 5px;
    margin-left: 16px;
  }

  .subtitle {
    font-size: 14px;
    margin-left: 16px;
  }

  .preSaleImg {
    width: 40px;
    height: 40px;
    margin-bottom: 0;
  }
}
</style>
