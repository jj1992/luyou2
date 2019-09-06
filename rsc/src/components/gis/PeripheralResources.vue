<template>
    <div class="peripheralResources">
        <mu-appbar class="" style="width: 100%;position:fixed;top:0" color="primary">
        <mu-button icon slot="left" @click="navigate_back">
            <mu-icon value="navigate_before"></mu-icon>
        </mu-button>
            {{title}}
        </mu-appbar>

    <mu-container  class="peripheralResources">

    <div v-if="noData" style="width:100%;text-align:center;height:50px;line-height:50px;">
        <span >暂无数据</span>
    </div>
    <!-- 资源预判-ziyuanyupan机房壁挂点和放置点 -->
     <div v-if="this.type == 'ziyuanyupan'" style="width:100%;height:100%;">
         <div style="width:100%;height:550px;overflow-y:scroll;-webkit-overflow-scrolling: touch;">
            <table class="" style="width:100%; border-collapse: collapse; border:none; font-size:14px;min-height:100px;">
          <tr style="font-size:16px;background:#ccc;height:40px;">
            <th style="width:40px;">选中</th>
            <th style="width:60px;">类型</th>
            <th style="width:200px;">名称</th>
            <th style="width:60px;">空闲数</th>
          </tr>  
          <tr v-for="(item,index) in data" :key="item.id"  style="text-align:center;border-bottom:1px solid #ddd;height:40px;">
            <td><mu-radio :value="index" v-model="radio"></mu-radio></td>
            <td>{{item.ziyuanleixing}}</td>
            <td>{{item.ziyuanmingcheng}}</td>
            <td>{{item.kongxianshu}}</td>
          </tr>
        </table>
        </div>
        <mu-flex class="active-d-flex" align-items="center">
          <mu-flex justify-content="center" fill>
            <mu-button v-if="$util.hasRight('resourcePrediction')" slot="actions" color="primary" @click="toServiceBrace">资源预判</mu-button>
          </mu-flex> 
        </mu-flex> 
     </div>
    <!-- 范围搜索-楼宇-->
     <div v-if="this.type == 'build'" style="width:100%;height:100%;">
         <div style="width:100%;height:100%;overflow-y:scroll;-webkit-overflow-scrolling: touch;">
            <table class="" style="width:100%; border-collapse: collapse; border:none; font-size:14px;min-height:100px;">
          <tr style="font-size:16px;background:#ccc;height:40px;">
            <th style="width:280px;">楼宇名称</th>
            <th style="width:100px;">楼宇序号</th>
            <th style="width:100px;">详情</th>
          </tr>  
          <tr v-for="(item,index) in data" :key="index" style="text-align:center;border-bottom:1px solid #ddd;height:40px;">
            <td>{{item.louyuname}}</td>
            <td>{{item.louyuxuhao}}</td>
            <td>
              <router-link :to="{path:'/buildingDetail',query:{id:item.louyuxuhao,buildingType:0}}">详情</router-link>
            </td>
          </tr>
        </table>
        </div>
     </div>
     <!-- 范围搜索-放置点-->
     <div v-if="this.type == 'outdoorpoint'" style="width:100%;height:100%;">
         <div style="width:100%;height:100%;overflow-y:scroll;-webkit-overflow-scrolling:touch;">
            <table class="" style="width:100%; border-collapse: collapse; border:none; font-size:14px;min-height:100px;">
          <tr style="font-size:16px;background:#ccc;height:40px;">
            <th style="width:180px;">放置点名称</th>
            <th style="width:100px;">放置点编号</th>
            <th style="width:100px;">详情</th>
          </tr>  
          <tr v-for="(item,index) in data" :key="index" style="text-align:center;border-bottom:1px solid #ddd;height:40px;">
            <td>{{item.fangzhidianmingcheng}}</td>
            <td>{{item.fangzhidianbianhao}}</td>
            <td>
              <router-link :to="{path:'/outDoorDetail',query:{id:item.id}}">详情</router-link>
            </td>
          </tr>
        </table>
        </div>
     </div>
     <!-- 范围搜索-地井well-->
     <div v-if="this.type == 'well'" style="width:100%;height:100%;">
         <div style="width:100%;height:100%;overflow-y:scroll;-webkit-overflow-scrolling: touch;">
            <table class="" style="width:100%; border-collapse: collapse; border:none; font-size:14px;min-height:100px;">
          <tr style="font-size:16px;background:#ccc;height:40px;">
            <th style="width:100px;">管线名称</th>
            <th style="width:100px;">地井编号</th>
            <th style="width:120px;">维护单位</th>
            <th style="width:100px;">详情</th>
          </tr>  
          <tr v-for="(item,index) in data" :key="index" style="text-align:center;border-bottom:1px solid #ddd;height:40px;">
            <td>{{item.guanxianmingcheng}}</td>
            <td>{{item.dijingbianhao}}</td>
            <td>{{item.danweimingcheng}}</td>
            <td>
              <router-link :to="{path:'/manholeDetail',query:{id:item.id}}">详情</router-link>
            </td>
          </tr>
        </table>
        </div>
     </div>
     <!-- 范围搜索-电杆pole-->
     <div v-if="this.type == 'pole'" style="width:100%;height:100%;">
         <div style="width:100%;height:100%;overflow-y:scroll;-webkit-overflow-scrolling: touch;">
            <table class="" style="width:100%; border-collapse: collapse; border:none;font-size:14px;min-height:100px;">
          <tr style="font-size:16px;background:#ccc;height:40px;">
            <th style="width:100px;">区局</th>
            <th style="width:120px;">端局</th>
            <th style="width:100px;">电杆编号</th>
            <th style="width:100px;">详情</th>
          </tr>  
          <tr v-for="(item,index) in data" :key="index" style="text-align:center;border-bottom:1px solid #ddd;height:40px;">
            <td>{{item.qujumingcheng}}</td>
            <td>{{item.jusuomingcheng}}</td>
            <td>{{item.dianganbianhao}}</td>
            <td>
              <router-link :to="{path:'/poleDetail',query:{id:item.id}}">详情</router-link>
            </td>
            <td>
            </td>
          </tr>
        </table>
        </div>
     </div>
     <!-- 范围搜索-管段pipe-->
     <div v-if="this.type == 'pipe'" style="width:100%;height:100%;">
         <div style="width:100%;height:100%;overflow-y:scroll;-webkit-overflow-scrolling: touch;">
            <table class="" style="width:100%; border-collapse: collapse; border:none;font-size:14px;min-height:100px;">
          <tr style="font-size:16px;background:#ccc;height:40px;">
            <th style="width:100px;">前载体</th>
            <th style="width:100px;">后载体</th>
            <th style="width:100px;">管段类型</th>
            <th style="width:100px;">详情</th>
          </tr>  
          <tr v-for="(item,index) in data" :key="index" style="text-align:center;border-bottom:1px solid #ddd;height:40px;">
            <td>{{item.ashebeimiaoshu}}</td>
            <td>{{item.bshebeimiaoshu}}</td>
            <td>{{item.guanduanleixingmingcheng}}</td>
            <td>
              <router-link :to="{path:'/tubulationDetail',query:{id:item.id}}">详情</router-link>
            </td>
          </tr>
        </table>
        </div>
     </div>
     <!-- 范围搜索-杆路段ganluduan-->
     <div v-if="this.type == 'ganluduan'" style="width:100%;height:100%;">
         <div style="width:100%;height:100%;overflow-y:scroll;-webkit-overflow-scrolling: touch;">
            <table class="" style="width:100%; border-collapse: collapse; border:none;font-size:14px;min-height:100px;">
          <tr style="font-size:16px;background:#ccc;height:40px;">
            <th style="width:100px;">前电杆</th>
            <th style="width:100px;">后电杆</th>
            <th style="width:100px;">段类型</th>
            <th style="width:100px;">详情</th>
          </tr>  
          <tr v-for="(item,index) in data" :key="index"  style="text-align:center;border-bottom:1px solid #ddd;height:40px;">
             <td>{{item.adianganbianhao}}</td>
             <td>{{item.bdianganbianhao}}</td>
             <td>{{item.duanleixingmingcheng}}</td>
             <td>
               <router-link :to="{path:'/barsectionDetail',query:{id:item.id}}">详情</router-link>
             </td>
          </tr>
        </table>
        </div>
     </div>
     <!-- 范围搜索-光缆cable-->
     <div v-if="this.type == 'cable'" style="width:100%;height:100%;">
         <div style="width:100%;height:100%;overflow-y:scroll;-webkit-overflow-scrolling: touch;">
            <table class="" style="width:100%; border-collapse: collapse; border:none;font-size:14px;min-height:100px;">
          <tr style="font-size:16px;background:#ccc;height:40px;">
            <th style="width:170px;">机房</th>
            <th style="width:170px;">光缆编号</th>
            <th style="width:100px;">缆段编号</th>
            <th style="width:100px;">详情</th>
          </tr>  
          <tr v-for="(item,index) in data" :key="index"  style="text-align:center;border-bottom:1px solid #ddd;height:40px;">
             <td>{{item.jifang}}</td>
             <td>{{item.guanglan_bianhao}}</td>
             <td>{{item.landuan_bianhao}}</td>
             <td>
               <router-link :to="{path:'/cableDetail',query:{landuanId:item.landuan_id}}">详情</router-link>
             </td>
          </tr>
        </table>
        </div>
     </div>
    <!-- 范围搜索-odf-->
     <div v-if="this.type == 'odf'" style="width:100%;height:100%;">
         <div style="width:100%;height:100%;overflow-y:scroll;-webkit-overflow-scrolling: touch;">
            <table class="" style="width:100%; border-collapse: collapse; border:none;font-size:14px;min-height:100px;">
          <tr style="font-size:16px;background:#ccc;height:40px;">
            <th style="width:400px;">机房</th>
            <th style="width:100px;">设备大类</th>
            <th style="width:200px;">设备编号</th>
            <th style="width:100px;">设备型号</th>
            <th style="width:100px;">端子空闲总数</th>
          </tr>  
          <tr v-for="(item,index) in data" :key="index"  style="text-align:center;border-bottom:1px solid #ddd;height:40px;">
             <td>{{item.jifang}}</td>
             <td>{{item.shebeidalei}}</td>
             <td>{{item.bianhao}}</td>
             <td>{{item.shebeixinghao}}</td>
             <td>{{item.duanzikongxiancount}}</td>
          </tr>
        </table>
        </div>
     </div>
  </mu-container>
    </div>
</template>

<script>
export default {
    props:['data','type'],
    data(){
         return {
            noData:false,
            title:'',
            radio:-1
        };
    },
    created(){
        this.data = JSON.parse(localStorage.getItem("datas"))
        if(this.type == 'ziyuanyupan'){
            this.title = '资源列表'
        }else if(this.type == 'build'){
            this.title = '周边楼宇列表'
        }else if(this.type == 'outdoorpoint'){
            this.title = '周边放置点列表'
        }else if(this.type == 'well'){
            this.title = '周边地井列表'
        }else if(this.type == 'pole'){
            this.title = '周边电杆列表'
        }else if(this.type == 'pipe'){
            this.title = '周边管段列表'
        }else if(this.type == 'ganluduan'){
            this.title = '周边杆路段列表'
        }else if(this.type == 'cable'){
            this.title = '周边光缆列表'
        }else if(this.type == 'odf'){
            this.title = '周边ODF列表'
        }
    },
    methods:{
        navigate_back(){
            this.$router.back(-1);
        },
        toServiceBrace(){
            if(this.radio >= 0){
                var jyName =  this.data[this.radio].ziyuanmingcheng
                var buildId = this.data[this.radio].louyuxuyhao
                var buildName = this.data[this.radio].louyumingcheng
                var ids = this.data[this.radio].ziyuanId
                var type = this.data[this.radio].ziyuanleixing
                if(type == '放置点'){
                    // type = '放置点'
                    this.$router.push({path:"/serviceBrace",query:{type:'放置点',id:ids,buildName:jyName}})
                }else if(type == '壁挂点' || type == '机房'){
                    // type = '0'
                    this.$router.push({path:"/serviceBrace",query:{type:'0',jyName:jyName,buildId:buildId,buildName:buildName,jfid:ids}})
                }
            }else{
                this.$toast.error('请选择一项');
            }
        },
    },
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
.peripheralResources{
    margin-top:57px;
}
.active-d-flex{
    position: fixed;
    bottom: 0;
    background-color: #fff;
    height: 60px;
    width:100%;
    box-shadow: -1px 4px 2px 0px rgba(0,0,0,.2), 0 5px 4px 0 rgba(0,0,0,.14), 0 -4px 10px 0 rgba(0,0,0,.12);
}
.mu-radio{
    margin-top:6px;
} 
</style>
