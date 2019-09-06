<template>
    <div>
        <mu-appbar class="" style="width: 100%;position:fixed;top:0" color="primary">
        <mu-button icon slot="left" @click="navigate_back">
            <mu-icon value="navigate_before"></mu-icon>
        </mu-button>
            杆路段列表
        </mu-appbar>
        <mu-container  class="barsectionResult">
        <div v-if="noData" style="width:100%;text-align:center;height:50px;line-height:50px;margin-top: 60px">
            <span >暂无数据</span>
        </div>
     <mu-load-more  :loaded-all="loadOver" @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load" :loading-text=" loadOver === true ? '已经到底了' : '正在努力加载...'">
      <mu-list toggle-nested >
 
             <div v-for="(item,index) in data" :key="index">  
               <mu-list-item  nested :open="open === index">
                <mu-list-item-content @click="toggleShow(index)">
                    <mu-list-item-title class="wall_title">
                        <img src="../../assets/01_03_03.png" style="width:16px; height:16px;">
                        {{item.ganluduanbianhao}}
                    </mu-list-item-title>

                    <mu-list-item-sub-title >
                        <span class="item">
                        {{item.aqujumingcheng}}|{{item.ajusuomingcheng}}
                        </span>
                    </mu-list-item-sub-title>

                </mu-list-item-content>
                <mu-list-item-action>
                    <mu-list-item-after-text>

                    <router-link style="margin-left:25px;" :to="{path:'/barsectionDetail',query:{id:item.id}}">详情</router-link>
                           
                    </mu-list-item-after-text>
                </mu-list-item-action>

            </mu-list-item>
          <mu-divider></mu-divider>
          </div>

      </mu-list>
     </mu-load-more> 
  </mu-container>
    </div>
</template>

<script>
export default {
     props:["id"],
     
    data(){
        return {
            open:'',
            refreshing:false,
            loading:false,
            data:[],
            noData:false,
            loadingData:false,
            currPage:0,
            loadOver:false,
            total:0,
        };
    },

    mounted(){ 
        //挂载后 清除所有数据 重新加载
        this.loadingData = true;
        this.loadData();
    },
    methods:{
        
        navigate_back(){
            this.$router.back(-1);
        },
        toggleShow(i){
          //  this.open =  this.open ===  i  ? '' : i;
        }
        ,
        refresh(){
            this.total = 0;
            this.loadOver = false
            this.refreshing = true;
            this.currPage = 0;
            this.loadData();

        },
        load(){
            this.loading = true;
            this.currPage++;
            this.loadData();
        },
 
        loadData(){
            let params=new URLSearchParams();
            params.append("dianganId",this.id);
             params.append("page",this.currPage);
            this.$axios.post("/pole/getGanLuDuanByDianGanId",params).then((response)=>{
                this.total = response.data.total
                this.loadingData = false
                this.refreshing = false
                this.loading = false
                let data = response.data.data
                if(response.data.code !== 200){
                    this.$toast.error(data.msg);
                }else{
                    this.data = this.data.concat(data);
                    if(this.data.length === 0){
                        this.noData = true
                    }
                }
           }).catch((e)=>{
                this.loadingData = false;
                this.$toast.error("数据加载错误");
           });

        }

       
    },
    watch:{
        '$route'(to,from){
            this.data = [];
            this.noData = false
            this.currPage = 0
            this.loadingData = true;
            this.refreshing = false
            this.loadData();
        },
        data:{
            handler(){
                if(this.data.length >= this.total){
                    this.loadOver = true
                } else {
                    this.loadOver = false
                }
            }
        }
    }
   
}
</script>


<style scoped>

.buildingList{

    padding: 0px;

}
.wall_item{

    font-size: 12px;

}
.wall_title{
    font-size: 14px;
    font-weight: bold;
}
.mu_item{
    height:45px;
}
.mu-list{
    padding:0;
}
.container{
    padding-left:0;
    padding-right:0;
    margin-top:60px;
}
.tubulationResult{
    margin-top:57px;
}
</style>
