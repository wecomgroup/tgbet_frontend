<template>
  <TopBar @togglePledgeDetail="togglePledgeDetail" @toggleHowToBuy="toggleHowToBuy" />
  <div v-if="showPledgeDetail">
    <PledgeDetail />
  </div>
  <div v-else-if="showHowToBuy">
    <HowToBuy />
  </div>
  <div v-else>
    <ActionView />
    <HomeCom />
    <CryptoNews />
    <PreSale />
    <OperationWay />
    <PledgeCoin />
    <EconomicToken />
    <SafeInstructions />
    <CoinChance />
    <CoinTimes />
    <WhiteBook />
    <WeGame />
    <WhyPopular />
    <NoKyc />
    <LicenseProof />
    <CommonProblem />
  </div>

  <BottomBar @togglePledgeDetail="togglePledgeDetail" @toggleHowToBuy="toggleHowToBuy" />
</template>


<script>
import TopBar from './components/TopBar.vue'
import HomeCom from '@/components/HomeCom.vue'
import PreSale from './components/PreSale.vue'
import OperationWay from './components/OperationWay.vue'
import LicenseProof from './components/LicenseProof.vue'
import CoinTimes from './components/CoinTimes.vue'
import WhiteBook from './components/WhiteBook.vue'
import WhyPopular from './components/WhyPopular.vue'
import SafeInstructions from './components/SafeInstructions.vue'
import CoinChance from './components/CoinChance.vue'
import BottomBar from './components/BottomBar.vue'
import CommonProblem from './components/CommonProblem.vue'
import NoKyc from './components/NoKyc.vue'
import WeGame from './components/WeGame.vue'
import CryptoNews from './components/CryptoNews.vue'
import PledgeCoin from './components/PledgeCoin.vue'
import EconomicToken from './components/EconomicToken.vue'
import PledgeDetail from './components/PledgeDetail.vue'
import HowToBuy from './components/HowToBuy.vue'


export default {
  name: 'App',
  components: {
    TopBar,
    HomeCom,
    PreSale,
    OperationWay,
    LicenseProof,
    CoinTimes,
    WhiteBook,
    WhyPopular,
    SafeInstructions,
    CoinChance,
    CommonProblem,
    BottomBar,
    NoKyc,
    WeGame,
    CryptoNews,
    PledgeCoin,
    EconomicToken,
    PledgeDetail,
    HowToBuy
  },
  data() {
    return {
      showPledgeDetail: false,
      showHowToBuy: false,
    };
  },
  mounted() {
    const flag = sessionStorage.getItem('pageName');
    if (flag === 'showPledgeDetail') {
      this.showPledgeDetail = true
      this.showHowToBuy = false
    } else if ( flag === 'showHowToBuy') {
      this.showPledgeDetail = false
      this.showHowToBuy = true
    } else {
      this.showPledgeDetail = false
      this.showHowToBuy = false
    }
  },
  methods: {
    togglePledgeDetail(val) {
      this.showPledgeDetail = val
      sessionStorage.setItem('pageName', 'showHowToBuy')
    },

    toggleHowToBuy(val) {
      this.showHowToBuy = val
      sessionStorage.setItem('pageName', 'showPledgeDetail')
    }
  }
}


</script>



<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Inter;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
  padding-top: 104px;
}

@media screen and (max-width: 1000px) {
  #app {
    padding-top: 80px;
  }
}

body {
  overflow-x: hidden
}

img {
  vertical-align: middle;
  border-style: none
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  appearance: none;
}
</style>
