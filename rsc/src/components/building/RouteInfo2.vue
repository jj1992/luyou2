<template>
    <div style="width:100%">
        <mu-divider></mu-divider>
        <mu-container style="padding:0px;" >
        <div style="position:absolute;left:0;top:100px;width:100%;background:#fff;z-index:10">   
            <div style="border-bottom:1px solid #ccc;padding:5px 0">
                <div class="routeInfo">
                    <div style="display:flex;align-items:center;width:246px;">
                        
                        <img src="../../assets/02_07.png" style="width:16px; height:16px; float:left; margin-top:6px;">
                        <mu-flex>
                        <span style="font-weight:bold;font-size:12px;color:#000;display:inline-block;margin-left:5px;min-width:340px;margin-top:10px">{{this.title}}</span>
                        </mu-flex>
                    </div>
                    <span style="font-size:12px;">{{this.specialLineCode}}</span>
                </div>                   
            </div>
            <mu-row style="text-align:center;line-height:40px;width:100%;font-weight:700;">
                <mu-col span="3"><div class="grid-cell">设备类型</div></mu-col>
                <mu-col span="3"><div class="grid-cell">设备编号</div></mu-col>
                <mu-col span="3"><div class="grid-cell">连接位置</div></mu-col>
                <mu-col span="3"><div class="grid-cell">备注</div></mu-col>
            </mu-row>
            <mu-divider></mu-divider>
        </div>
        
        <div style="margin-top:105px;">
            <div v-for="(value1,index1) in list" :key="index1" style="border-bottom:1px solid #ccc;">
                <div v-for="(value2,key2,index2) in value1" :key="index2">
                <div class="routeInfo_top">
                    <div class="routeInfo">
                        <div style="display:flex;align-items:center;">   
                            <img src="../../assets/02_07.png" style="width:16px; height:16px; float:left; margin-top:6px;">
                            <mu-flex>
                            <span style="font-weight:bold;font-size:14px;color:#000;display:inline-block;margin-left:5px;min-width:270px;">
                                【{{index1 + 1}}】{{key2}}({{selectType(index1)}})</span>
                            </mu-flex>
                        </div>
                    </div>                   
                </div>
                <mu-divider></mu-divider>
                <mu-expand-transition>
                <div style="width:100%;overflow-y:auto">
                    <div v-for="(item2,index3) in value2" :key="index3" class="routeInfo_bottom">
                        <mu-row  style="text-align:center;line-height:30px;">
                            <mu-col span="3"><div class="grid-cell">{{item2.deviceTypeName}}</div></mu-col>
                            <mu-col span="3"><div class="grid-cell">{{item2.deviceCode}}</div></mu-col>
                            <mu-col span="3"><div class="grid-cell">{{item2.connectionPosition}}</div></mu-col>
                            <mu-col span="3"><div class="grid-cell">{{item2.mark}}</div></mu-col>       
                        </mu-row>
                        <mu-divider></mu-divider>
                    </div>
                </div>
                </mu-expand-transition>
            </div>
            </div>
        </div>
        </mu-container>
    </div>
</template>
<script>
export default {
    props:['specialLineCode','title'],
    data(){
        return{
            list:[],
            typeList:[]
        }
    },
    methods:{
        postData(){
            let params=new URLSearchParams();
            params.append("specialLineCode",this.specialLineCode);
            this.$axios.post("/relaying/routeList",params).then((res) => {
                if(res.data.code==200){
                    this.list = res.data.data
                    this.getTypeName()
                }
            }).catch(() => {
            
            });
        },
        getTypeName(){
            for(var i = 0;i < this.list.length;i++){
                for(var item in this.list[i]){
                    this.typeList.push(this.list[i][item][0].typeName)
                }
            }
        },
        selectType(index){
            return this.typeName = this.typeList[index]
        }
    }, 
    mounted() {
      this.postData();
    },
}
</script>

<style scoped>
    .mu-item .mu-item-action{
      font-size: 12px;
      text-align: right;
      min-width: 100px;
      
    }  
    .mu-item-title{
      font-weight: bold;
      font-size: 14px
    }
        .routeInfo_top{
        width: 100%; 
        background: #fff;
        overflow: hidden;
        padding:8px 0;
        /* height:40px;
        line-height:40px; */
    }
    .routeInfo{
        color:rgb(39, 38, 38);
        padding-left:10px;
    }
    .routeInfo_bottom{
        background:rgb(245, 245, 245);
        clear:both;
        margin:0;   
        font-size: 12px;
    }
    .routeInfo_bottom span{
        display: inline-block;
        padding:10px 30px 10px 10px;
        color: rgb(39, 38, 38);
    }
    .routeInfo_bottom p{
      margin:0;
      padding:0
    }
</style>
