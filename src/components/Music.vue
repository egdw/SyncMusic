<template>
  <div>
    <aplayer
    :music="music" :list="musiclist" ref="musicplayer"/>

    <button @click="test">sdasda</button>
  </div>
</template>

<script>
import Aplayer from "vue-aplayer";
Aplayer.disableVersionBadge = true;
import axios from "axios";
export default {
  components: {
    Aplayer,
    player: null,
    playindex: ""
  },
  methods: {
    //设置监听器
    setEventListener: function() {
      var audio = document.getElementsByTagName("audio")[0];
      console.log(audio);
      //seeked在跳跃操作完成时触发。
      audio.addEventListener("seekd", function() {
        console.log("发生跳跃操作");
      });
      //pause在暂停的时候触发
      audio.addEventListener("pause", function() {
        console.log("pause");
      });
      //canplay在媒体数据已经有足够的数据（至少播放数帧）可供播放时触发
      audio.addEventListener("canplay", function() {
        console.log("canplay");
      });
      //ended播放结束时触发。
      audio.addEventListener("ended", function() {
        console.log("ended");
      });
      //error 在发生错误时触发。
      audio.addEventListener("error", function() {
        console.log("error");
      });
      //play在媒体回放被暂停后再次开始时触发。
      audio.addEventListener("play", function() {
        console.log("play");
      });
      //pause在暂停的时候触发
      audio.addEventListener("pause", function() {
        console.log("pause");
      });
      //stalled在尝试获取媒体数据，但数据不可用时触发
      audio.addEventListener("stalled", function() {
        console.log("stalled");
      });
      //timeupdate元素的currentTime属性表示的时间已经改变。
      audio.addEventListener("timeupdate", function() {
        console.log("timeupdate");
      });
    },
    //取消设置监听器
    cancleEventListener: function() {
      var audio = document.getElementsByTagName("audio")[0];
      //seeked在跳跃操作完成时触发。
      audio.removeEventListener("seekd", function() {
        console.log("发生跳跃操作");
      });
      //pause在暂停的时候触发
      audio.removeEventListener("pause", function() {
        console.log("pause");
      });
      //canplay在媒体数据已经有足够的数据（至少播放数帧）可供播放时触发
      audio.removeEventListener("canplay", function() {
        console.log("canplay");
      });
      //ended播放结束时触发。
      audio.removeEventListener("ended", function() {
        console.log("ended");
      });
      //error 在发生错误时触发。
      audio.removeEventListener("error", function() {
        console.log("error");
      });
      //play在媒体回放被暂停后再次开始时触发。
      audio.removeEventListener("play", function() {
        console.log("play");
      });
      //pause在暂停的时候触发
      audio.addEventListener("pause", function() {
        console.log("pause");
      });
      //stalled在尝试获取媒体数据，但数据不可用时触发
      audio.removeEventListener("stalled", function() {
        console.log("stalled");
      });
      //timeupdate元素的currentTime属性表示的时间已经改变。
      audio.removeEventListener("timeupdate", function() {
        console.log("timeupdate");
      });
    },
    test: function() {
      alert(this.getPlayIndex());
    },
    getPlayIndex: function() {
      return this.player[2]._props.playIndex;
    }
  },
  data() {
    return {
      songid: "",
      musiclist: [
        {
          title: "secret base~君がくれたもの~",
          artist: "Silent Siren",
          src:
            "https://api.imjad.cn/cloudmusic/?type=song&id=420513158&raw=true",
          pic: "https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg"
        }
      ],
      music: {
        title: "secret base~君がくれたもの~",
        artist: "Silent Siren",
        src: "https://api.imjad.cn/cloudmusic/?type=song&id=420513158&raw=true",
        pic: "https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg"
      }
    };
  },
  mounted() {
    console.log(this.$route.params.id);
    //初始化获取传递过来的参数
    var id = this.$route.params.id;
    if (id == undefined || id == "") {
      this.$route.push("/");
    }
    this.songid = id;
    //初始化数据
    //可以开房了
    var self = this;
    axios
      .get("https://api.imjad.cn/cloudmusic/", {
        params: {
          id: this.songid,
          type: "playlist"
        }
      })
      .then(function(response) {
        console.log();
        var data = response.data;
        if (data.code == "200") {
          //进行数据处理
          self.player = self.$refs.musicplayer.$children;
          self.setEventListener();
        } else {
          alert("歌单不存在");
          self.$route.push("/");
        }
      })
      .catch(function(error) {
        console.log("请求错误" + error);
        self.$route.push("/");
      });
  }
};
</script>

<style>
</style>
