<template>
    <div class="activeDeviceDetail">
        <mu-appbar class="" style="width: 100%;position:fixed;top:0" color="primary">
        <mu-button icon slot="left" @click="navigate_back">
            <mu-icon value="navigate_before"></mu-icon>
        </mu-button>
        局所详情
        </mu-appbar>
        
        <mu-list style="margin-top:56px;">
      <mu-list-item :ripple="false">
        <mu-list-item-title>
          设备局号
        </mu-list-item-title>
        <mu-list-item-action>
          {{
              obj.bureauCode
          }}
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item :ripple="false">
        <mu-list-item-title>
          局所名称
        </mu-list-item-title>
        <mu-list-item-action>
          {{
              obj.bureauName
          }}
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item :ripple="false">
        <mu-list-item-title>
          局所简称
        </mu-list-item-title>
        <mu-list-item-action>
          {{
              obj.bureauAbbre
          }}
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item :ripple="false">
        <mu-list-item-title>
          局所地址
        </mu-list-item-title>
        <mu-list-item-action>
          {{
              obj.bureauAddress
          }}
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item :ripple="false">
        <mu-list-item-title>
          分公司名称
        </mu-list-item-title>
        <mu-list-item-action>
          {{
              obj.qujuName
          }}
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item :ripple="false">
        <mu-list-item-title>
          端局名称
        </mu-list-item-title>
        <mu-list-item-action>
          {{
              obj.duanjuName
          }}
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item :ripple="false">
        <mu-list-item-title>
          行政区
        </mu-list-item-title>
        <mu-list-item-action>
          {{
              obj.administrativeArea
          }}
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item :ripple="false">
        <mu-list-item-title>
          楼宇
        </mu-list-item-title>
        <mu-list-item-action>
          {{
              obj.buildName
          }}
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item :ripple="false">
        <mu-list-item-title>
          局所类别
        </mu-list-item-title>
        <mu-list-item-action>
          {{
              obj.bureauType
          }}
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item :ripple="false">
        <mu-list-item-title>
          局所地理编码
        </mu-list-item-title>
        <mu-list-item-action>
          {{
              obj.bureauGeocoding
          }}
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item :ripple="false">
        <mu-list-item-title>
          有否局界
        </mu-list-item-title>
        <mu-list-item-action>
          {{
              obj.isBoundary
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
              obj.operator
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
              obj.operationTime
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
          this.$axios.post("/bureau/details",params).then((res) => {
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


