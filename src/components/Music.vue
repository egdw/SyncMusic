<template>
  <div>
    <aplayer
      :music="music" preload="auto" :list="musiclist" ref="musicplayer" :class="controllerstyle" v-if="isGetDataComplete"/>

    <audio id="emitaudio" src="static/audio/emit.mp3">
      </audio>
    <button @click="test">sdasda</button>
    <div id="HelloDiv"  v-if="firstopen">
      <div id="agereeButton" @click="agree">
        <span>开始使用</span>
        <p>
          您的配置信息地址为:
        </p>
        <h1>{{configurl}}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import Aplayer from "vue-aplayer";
Aplayer.disableVersionBadge = true;
import axios from "axios";
// import {addStatusOne} from '@/assets/js/databaseutils.js'
export default {
  components: {
    Aplayer
  },
  methods: {
    //设置监听器
    setEventListener: function() {
      var self = this;
      var audio = document.getElementsByTagName("audio")[0];
      console.log(audio);
      //seeked在跳跃操作完成时触发。
      audio.addEventListener("seekd", function() {
        console.log("发生跳跃操作");
        self.sendJson();
      });
      //pause在暂停的时候触发
      audio.addEventListener("pause", function() {
        console.log("pause");
        self.sendJson();
      });
      //canplay在媒体数据已经有足够的数据（至少播放数帧）可供播放时触发
      audio.addEventListener("canplay", function() {
        console.log("canplay");
        self.$refs.musicplayer.play();
      });
      //ended播放结束时触发。
      audio.addEventListener("ended", function() {
        console.log("ended");
        if (self.random == "") {
          //说明是普通成员
          audio.pause();
        }
      });
      //error 在发生错误时触发。
      audio.addEventListener("error", function() {
        console.log("error");
      });
      //play在媒体回放被暂停后再次开始时触发。
      audio.addEventListener("play", function() {
        console.log("play");
        self.sendJson();
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
    //初始化数据
    initData: function(arr) {
      var self = this;
      this.music = arr[0];
      this.musiclist = arr;
      this.isGetDataComplete = true;
      var self = this;
      //隐藏开屏
      //防止某些浏览器无法自动播放音乐.取消监听事件
      document.removeEventListener("touchstart", function() {
        function audioAutoPlay() {
          var musicEle0 = document.getElementById("emitaudio");
          musicEle0.play();
        }
        audioAutoPlay();
      });
      this.firstopen = false;
      this.setInterval = setInterval(function() {
        console.log("定时器启动");
        self.getJson();
      }, 10 * 1000);
      console.log("定时器启动2");
      setTimeout(function() {
        self.player = self.$refs.musicplayer.$children;
        self.setEventListener();
      }, 500);
    },
    test: function() {
      // console.log(this.getPlayRandom());
      // Aplayer.play()
      // this.player[2]._props.playIndex =
      // addStatusOne("test","id","12312")
      this.getJson();
    },
    setPlayTime(time) {
      var audio = document.getElementsByTagName("audio")[0];
      audio.currentTime = time;
    },
    //设置切换的音乐index
    setPlayIndex(index) {
      this.$refs.musicplayer.onSelectSong(this.musiclist[index]);
    },
    //得到当前播放的索引
    getPlayIndex: function() {
      return this.player[2]._props.playIndex;
    },
    //得到当前播放时间
    getPlayTime: function() {
      var arr = new Array();
      //总时长
      arr[0] = this.player[1]._props.stat.duration;
      //加载时长
      arr[1] = this.player[1]._props.stat.playedTime;
      //播放时长
      arr[2] = this.player[1]._props.stat.playedTime;
      return arr;
    },
    //获取播放模式 循环播放 暂停播放 单曲循环
    getPlayMode: function() {
      var internalRepeat = this.$refs.musicplayer.internalRepeat;
      console.log(internalRepeat);
      return internalRepeat;
    },
    getPlayStatus: function() {
      return this.$refs.musicplayer.isPlaying;
    },
    //获取是否是随机播放(true)
    getPlayRandom: function() {
      var internalShuffle = this.$refs.musicplayer.internalShuffle;
      console.log(internalShuffle);
      return internalShuffle;
    },
    //点击同意按钮时,触发无声的音乐和请求数据
    agree: function() {
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
          console.log(response.data);
          var data = response.data;
          var temp = 0;
          if (data.code == "200") {
            //进行数据处理
            //获取到播放列表
            var playlist = data.playlist;
            var tracks = playlist.tracks;
            var arr = new Array();
            tracks.forEach(element => {
              //歌曲标题
              var name = element.name;
              //歌曲id
              var id = element.id;
              //作家
              var artist = "未知";
              if (element.ar[0] != null && element.ar[0].name != null) {
                artist = element.ar[0].name;
              }
              //封面
              var pic_img = "";
              if (element.al != null && element.al.picUrl != null) {
                pic_img = element.al.picUrl;
              }
              //播放地址
              var url =
                "https://api.imjad.cn/cloudmusic/?type=song&raw=true&id=" + id;
              arr[temp] = {
                title: name,
                artist: artist,
                src: url,
                pic: pic_img
              };
              temp++;
            });
            // console.log(arr);

            self.initData(arr);
          } else {
            alert("歌单不存在");
            self.$route.push("/");
          }
        });
    },
    //创建Json数据
    createJson: function() {
      var self = this;
      axios
        .post("https://api.myjson.com/bins", {
          params: {
            data:
              '{"sync":{"listid":"","time":"","index":"","mode":"","status":"","updatetime":"","random":""}}'
          }
        })
        .then(function(response) {
          //https://api.myjson.com/bins/s7wgy
          if (response.data != null && response.data.uri != null) {
            //获取的当前房间的配置信息
            uri = response.data.uri;
            self.configurl = uri;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //获取返回的json数据
    getJson: function() {
      console.log("准备获取数据");
      var self = this;
      // if(self.firstopen){
      //     window.clearInterval(self.setInterval)
      // }
      axios
        .get("https://api.myjson.com/bins/s7wgy", {})
        .then(function(response) {
          var data = response.data;
          data = eval("(" + data.params.data + ")").sync;
          console.log(data);
          console.log(response);
          if (data.updatetime != undefined) {
            console.log("数据正确");
            //说明数据没有初始化
            //说明当前播放的歌曲没有发生变化
            var othertime = parseFloat(data.time);
            //获取到总时长
            var totaltime = self.getPlayTime()[1];
            var nowtime = self.getPlayTime()[2];
            //获取上一个用户更新前触发的时间
            var updatetime = parseFloat(data.updatetime);
            //大概计算出网络传输花了多长时间(秒)
            var usingsecond = (new Date().getTime() - updatetime) / 1000;
            //获取修改用户当前应该播放的时间
            var realtime = othertime + usingsecond;
            if (
              data.index == self.playindex &&
              self.playstatus == data.status
            ) {
              if (realtime > totaltime) {
                //说明已经播放完了.暂停当前.等待下次更新新的切换歌曲
                self.$refs.musicplayer.pause();
              } else {
                //说明还可以播放
                //如果误差差五秒以内不进行跳转
                if (Math.abs(realtime - nowtime) >= 5) {
                  self.setPlayTime(realtime);
                }
              }
            } else {
              //如果是播放歌曲不同的话
              if (data.index != self.playindex) {
                //切换到新的歌曲
                if (
                  (data.index == 0 && self.playindex == -1) ||
                  (data.index == -1 && self.playindex == 0)
                ) {
                  //如果是这种情况就说明是一样的歌曲
                } else {
                  self.setPlayIndex(data.index);
                  self.setPlayTime(data.realtime);
                }
              }
              //如果暂停了.那么我也暂停.如果播放了.我也从可以播放的地方开始播放
              if (self.playstatus != data.status) {
                self.setPlayTime(realtime);
                if (data.status == "true") {
                  self.$refs.musicplayer.play();
                } else {
                  self.$refs.musicplayer.pause();
                }
                return;
              }
              //说明不相同了.
              //更改数据
              axios
                .put("https://api.myjson.com/bins/s7wgy", {
                  params: {
                    data:
                      '{"sync":{"listid":"' +
                      self.songid +
                      '","time":"' +
                      self.getPlayTime()[2] +
                      '","index":"' +
                      self.getPlayIndex() +
                      '","mode":"' +
                      self.getPlayMode() +
                      '","status":"' +
                      self.getPlayStatus +
                      '","updatetime":"' +
                      new Date().getTime() +
                      '"}}'
                  }
                })
                .then(function(response) {
                  console.log(response.data);
                })
                .catch(function(error) {});
            }
          } else {
            //初始化数据
            console.log("数据错误");
            var t =
              '{"sync":{"listid":"' +
              self.songid +
              '","time":"' +
              self.getPlayTime()[2] +
              '","index":"' +
              self.getPlayIndex() +
              '","mode":"' +
              self.getPlayMode() +
              '","status":"' +
              self.getPlayStatus() +
              '","updatetime":"' +
              new Date().getTime() +
              '"}}';

            console.log(t);
            axios
              .put("https://api.myjson.com/bins/s7wgy", {
                params: {
                  data:
                    '{"sync":{"listid":"' +
                    self.songid +
                    '","time":"' +
                    self.getPlayTime()[2] +
                    '","index":"' +
                    self.getPlayIndex() +
                    '","mode":"' +
                    self.getPlayMode() +
                    '","status":"' +
                    self.getPlayStatus() +
                    '","updatetime":"' +
                    new Date().getTime() +
                    '"}}'
                }
              })
              .then(function(response) {
                console.log(response.data);
              })
              .catch(function(error) {
                console.log("修改过的数据:" + error);
              });
          }
        })
        .catch(function(error) {});
    },
    //修改json数据
    sendJson: function() {
      var self = this;
      var pre_event_time = self.pre_event_time;
      //获取上次事件触发的时间
      self.playtime = self.getPlayTime()[2];
      self.playindex = self.getPlayIndex();
      self.playmode = self.getPlayMode();
      self.playstatus = self.getPlayStatus();
      console.log(self.playtime);
      //说明是第一次触发事件
      console.log("事件已经被触发");
      //获取到当前的时间戳
      var currenttime = new Date().getTime();
      self.pre_event_time = currenttime;
    },
    //发送当前的状态
    sendCurrentJson: function() {
      this.getJson();
    }
  },
  data() {
    // '{"sync":{"listid":"","time":"","index":"","mode":"","status":"","updatetime":"","random":""}}'

    return {
      //当前歌曲id
      songid: "",
      //当前音乐列表
      musiclist: null,
      //当前音乐
      music: null,
      //获取数据是否完成
      isGetDataComplete: false,
      //控制器样式
      controllerstyle: "not-hidden-controller",
      //是否是刚开屏
      firstopen: true,
      //配置文件地址
      configurl: "https://api.myjson.com/bins/s7wgy",
      //播放进度
      playtime: "",
      //播放索引
      playindex: "",
      //播放模式
      playmode: "",
      //播放状态
      playstatus: "",
      //随机码
      random: "",
      pre_event_time: 0
    };
  },
  mounted() {
    //防止某些浏览器无法自动播放音乐.取消监听事件
    document.addEventListener("touchend", function() {
      function audioAutoPlay() {
        var musicEle0 = document.getElementById("emitaudio");
        musicEle0.play();
      }
      audioAutoPlay();
    });
    // 创建房间
    // this.createJson()
  }
};
</script>

<style lang="stylus">
#HelloDiv {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: red;
}

.hidden-controller {
  .aplayer-controller {
    visibility: hidden;
  }
}

.not-hidden-controller {
  .aplayer-controller {
    visibility;
  }
}
</style>
