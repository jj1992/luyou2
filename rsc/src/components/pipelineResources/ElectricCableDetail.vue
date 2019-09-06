<template>
    <div class="activeDeviceDetail">
        <mu-appbar class="" style="width: 100%;position:fixed;top:0" color="primary">
        <mu-button icon slot="left" @click="navigate_back">
            <mu-icon value="navigate_before"></mu-icon>
        </mu-button>
        电缆详情
        </mu-appbar>
        
        <mu-list style="margin-top:56px;">
      <mu-list-item :ripple="false">
        <mu-list-item-title>
          电缆编号
        </mu-list-item-title>
        <mu-list-item-action>
          {{
              obj.bianhao
          }}
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item :ripple="false">
        <mu-list-item-title>
          所属局所
        </mu-list-item-title>
        <mu-list-item-action>
          {{
              obj.jusuo
          }}
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item :ripple="false">
        <mu-list-item-title>
          维护单位
        </mu-list-item-title>
        <mu-list-item-action>
          {{
              obj.weihudanwei
          }}
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item :ripple="false">
        <mu-list-item-title>
          用途
        </mu-list-item-title>
        <mu-list-item-action>
          {{
              obj.yongtu
          }}
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item :ripple="false">
        <mu-list-item-title>
          状态
        </mu-list-item-title>
        <mu-list-item-action>
          {{
              obj.zhuangtai
          }}
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item :ripple="false">
        <mu-list-item-title>
          产权类型
        </mu-list-item-title>
        <mu-list-item-action>
          {{
              obj.chanquanleixing
          }}
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item :ripple="false">
        <mu-list-item-title>
          电缆城市
        </mu-list-item-title>
        <mu-list-item-action>
          {{
              obj.dianlanchengshi
          }}
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item :ripple="false">
        <mu-list-item-title>
          产权单位
        </mu-list-item-title>
        <mu-list-item-action>
          {{
              obj.chanquandanwei
          }}
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item :ripple="false">
        <mu-list-item-title>
          纤对总数
        </mu-list-item-title>
        <mu-list-item-action>
          {{
              obj.xianduizongshu
          }}
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item :ripple="false">
        <mu-list-item-title>
          操作员
        </mu-list-item-title>
        <mu-list-item-action>
          {{
              obj.caozuoyuan
          }}
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item :ripple="false" class="active-d-list">
        <mu-list-item-title>
          操作时间
        </mu-list-item-title>
        <mu-list-item-action>
          {{
              obj.caozuoshijian
          }}
        </mu-list-item-action>
      </mu-list-item>
    </mu-list>
    </div>
</template>

<script>
export default {
  props:["id"],
    data(){
        return{
          obj:{}
        }
    },
    methods:{
        navigate_back(){
            this.$router.back(-1);
        },
        postData() {
          let params=new URLSearchParams();
          params.append("id",this.id);
          this.$axios.post("/dianlan/details",params).then((res) => {
            if(res.data.code==200){
              this.obj = res.data.data;
            }else{
              this.obj={};
            }
          })
          .catch(() => {
          
          });
        },
    },
    mounted(){
      this.postData()
    }
}
</script>

<style scoped>
    .active-d-flex{
        position: fixed;
        bottom: 0;
        background-color: #fff;
        height: 60px;
        width:100%;
        box-shadow: -1px 4px 2px 0px rgba(0,0,0,.2), 0 5px 4px 0 rgba(0,0,0,.14), 0 -4px 10px 0 rgba(0,0,0,.12);
    }
    .active-d-list{
        margin-bottom: 60px;
    }
    .mu-item{
      display:none;
    }
    .mu-item .mu-item-action{
      font-size: 12px;
      text-align: right;
      min-width: 235px;
    }  
    .mu-item-title{
      font-weight: blod;
      font-size: 14px;
    }
</style>


