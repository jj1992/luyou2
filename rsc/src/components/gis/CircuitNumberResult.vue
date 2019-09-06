<template>
  <mu-container  class="circuitNumberResult">
      <div v-if="noData" style="width:100%;text-align:center;height:50px;line-height:50px;">
        <span >暂无数据</span>
    </div>
    <div v-if="loadingData" style="width:100%;text-align:center;height:50px;line-height:50px;">
        <div v-loading="true" data-mu-loading-overlay-color="rgba(0, 0, 0, .6)" style="position: relative; width: 100%; height: 100%;"></div>
    </div>

    <mu-load-more  :loaded-all="loadOver" @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load" :loading-text=" loadOver === true ? '已经到底了' : '正在努力加载...'">
      <mu-list toggle-nested >
          <div v-for="item in data" :key="item.id">

            <mu-list-item nested>
                <mu-list-item-content>
                    <mu-list-item-title class="wall_title">
                        {{item.leixing}}--{{item.bianhao}}
                    </mu-list-item-title>
                </mu-list-item-content>
                 <!-- 定位 -->
                <mu-list-item-action @click="showCircuitNumInMap(item.id)" style="margin-right:20px;">
                    <img src="../../assets/01_14.png" style="width:30px; height:30px;" />
                </mu-list-item-action>
                <mu-list-item-action>
                    <mu-list-item-after-text>
                    <div style="margin-left:25px;color:#FF4081" @click="toWholeRouteLibrary(item.bianhao)">查询</div>    
                    </mu-list-item-after-text>
                </mu-list-item-action>   
            </mu-list-item>
          </div>
      </mu-list>
       </mu-load-more>
  </mu-container>
</template>


<script>
export default {

    props:["circuitNumber"],
    
    data(){

        return {
            open:'',
            data:[],
            refreshing:false,
            loading:false,
            noData:false,
            loadingData:false,
            currPage:0,
            loadOver:false,
            total:0
        };
    },

    mounted(){ 
        //挂载后 清除所有数据 重新加载
        this.loadingData = true;
        this.loadData();
    },
    methods:{
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
            params.append("circuitNumber",this.circuitNumber);
            params.append("page",this.currPage);
            this.$axios.post("/odfmodule/specialLines",params).then((res)=>{
                this.total = res.data.total
                this.loadingData = false
                this.refreshing = false
                this.loading = false
                let data = res.data.data.content
                if(res.data.code !== 200){
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
        },
        toWholeRouteLibrary(bianhao){
            if(bianhao.includes(':')){
                this.$router.push({path:'/lineFullroute/',query:{leasedLineStatus:bianhao.split(':')[1],code:bianhao.split(':')[0]}});
            }else{
            this.$router.push({path:'/relayFullroute/',query:{specialLineCode:bianhao}});
            }
        },
        //定位
        showCircuitNumInMap(id){
            // var lineNumber = bianhao.split(':')[0]
            var params = new URLSearchParams()
            params.append('lineNumber',id);
            this.$axios.post("guanglan/locationByLineNumber",params).then((res)=>{
                if(res.data.code == 200){
                    var ids = new Array
                    for(var i = 0;i < res.data.data.length;i ++){
                        ids.push(res.data.data[i])
                    }
                    var type = 'bianhao'
                    window.mapifram.gisParams.ziYuanLocation(ids,7,0,type);
                    if(res.data.data.length <= 0){
                        this.$toast.error('无资源');
                    }
                }else{
                    this.$toast.error(res.data.msg);
                }
            }).catch(()=>{
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
}
</style>

