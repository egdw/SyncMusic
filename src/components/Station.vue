<template>
<div id="search">
  <div id="search_input_div"><input v-model="songlistid" type="number" placeholder="歌单id"><button @click="openroom">开房</button></div>
  <!-- <div id="search_tips"> -->
    <!-- <img src="/static/img/pic1.jpg" style="width:100%"/><center><span>歌单id去哪找?如上图所示</span></center> -->
  <!-- </div> -->
</div>
</template>

<script type="text/ecmascript-6">
import axios from "axios";
import swal from "sweetalert2";
export default {
  data() {
    return {
      songlistid: "937224028"
    };
  },
  methods: {
    openroom: function() {
      if (this.songlistid == "") {
        swal({
          title: "错误！",
          text: "不能为空!",
          type: "error",
          confirmButtonText: "重新输入"
        });
      } else {
        if (this.songlistid.length <= 6) {
          swal({
            title: "错误！",
            text: "不符合规范!",
            type: "error",
            confirmButtonText: "重新输入"
          });
        } else {
          //后台进行房间的创建
          this.createJson();
        }
      }
    },
    createJson: function() {
      var self = this;
      axios
        .post("https://api.myjson.com/bins", {
          params: {
            data:
              '{"sync":{"listid":"' +
              self.songlistid +
              '","time":"' +
              "0" +
              '","index":"' +
              "-1" +
              '","mode":"' +
              "none" +
              '","status":"' +
              "true" +
              '","updatetime":"' +
              new Date().getTime() +
              '"}}'
          }
        })
        .then(function(response) {
          //https://api.myjson.com/bins/s7wgy
          if (response.data != null && response.data.uri != null) {
            //获取的当前房间的配置信息
            var uri = response.data.uri;
            var index = uri.lastIndexOf("/");
            if (index != -1) {
              uri = uri.substr(index + 1);
              self.$router.push("/Music/" + uri);
            } else {
              swal({
                title: "创建房间失败！",
                text: "请稍后再试!",
                type: "error",
                confirmButtonText: "了解"
              });
            }
          }
        })
        .catch(function(error) {
          console.log(error);
          swal({
            title: "创建房间失败！",
            text: error,
            type: "error",
            confirmButtonText: "了解"
          });
        });
    }
  }
};
</script>

<style  lang="stylus" rel="stylesheet/stylus" scoped>
#search {
  height: 100%;

  #search_input_div {
    width: 100%;
    display: flex;
    margin-top: 0.4rem;

    input {
      flex: 10;
      width: 100%;
      height: 2rem;
      border: 2px solid black;
      font-size: 0.8rem;
      padding-left: 0.2rem;
      margin-left: 0.1rem;
      font-weight: solid;
      outline: none;
    }

    button {
      flex: 2;
      border: 1px solid black;
      margin-left: 0.1rem;
      font-weight: solid;
      background-color: black;
      color: white;
      font-size: 1rem;
      outline: none;
    }

    button:active {
      color: #ccc;
    }
  }

  #search_tips {
    margin-top: 0.4rem;

    span {
      text-align: center;
      font-size: 0.8rem;
    }
  }
}
</style>
