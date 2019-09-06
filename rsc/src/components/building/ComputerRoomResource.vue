<template>
    <mu-container class="computerRoomResource"   >


        <mu-appbar style="width: 100%;" color="primary">

        <mu-button icon slot="left" @click="navigate_back">
            <mu-icon value="navigate_before"></mu-icon>
        </mu-button>
      设备列表

    </mu-appbar>

        <mu-tabs  :value.sync="currentIndex" color="#2196f3" text-color="#2196f3" indicator-color="#2196f3" inverse full-width style="width:100%"> 
            <mu-tab :class="currentIndex==0?'cont':''" :to="{path:'/copticalfiberIndex',query:{id:this.id}}" :replace=true v-if="$util.hasRight('opticalfiberList')">光纤局向</mu-tab>
            <mu-tab :class="currentIndex==1?'cont':''" :to="{path:'/cpassive',query:{id:this.id}}" :replace=true v-if="$util.hasRight('POSlist') || $util.hasRight('ODFlist')">无源</mu-tab>
            <mu-tab :class="currentIndex==2?'cont':''" :to="{path:'/cactiveDeviceInfo',query:{id:this.id}}" :replace=true v-if="$util.hasRight('activeDeviceList')">有源</mu-tab>
        </mu-tabs>
        <div style="flex: 1 ;overflow: auto;" >
          <keep-alive :include="['copticalfiberIndex','Passive','ActiveDeviceInfo']">
            <transition name="slide">
                <router-view></router-view>
            </transition>
          </keep-alive>
        </div>
    </mu-container>


</template>


<script>
import OpticalfiberIndex from '../opticalfiber/index.vue';
import Passive from '../passiveManage/PassiveDevice.vue';
import ActiveDeviceInfo from '../activeDevice/ActiveDeviceInfo';
export default {
  components:{
        OpticalfiberIndex,Passive,ActiveDeviceInfo
  },
  props:["id"],
  data() {
    return {
      currentIndex: 0,
    };
  },
  created() {
    if(localStorage.getItem("idd") != null){
      this.currentIndex = localStorage.getItem("idd")
    }
    localStorage.removeItem('idd');
  },
  methods: {
    navigate_back() {
      this.$router.back(-1); 
      localStorage.removeItem('idd');
    },
  },
};
</script>


<style scoped>
.computerRoomResource {
  width: 100%;
  padding: 0px;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.cont{
    color: rgb(33, 150, 243);
    border-bottom: 2px solid rgb(33, 150, 243);
}
</style>

