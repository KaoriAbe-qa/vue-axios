//今までにつくったコンポーネントを画面に表示する

  //SearchコンポーネントからloadStart/loadCompleteイベントを登録
  //ResultコンポーネントにitemsとloadProgressを送る
<template>
  <div class="root">
    <Search class="search" @loadStart="onLoadStart" @loadComplete="onLoadComplete"/>
    <Result :items="items" :loadProgress="loadProgress"/>
  </div>
</template>

<script>
//Searchコンポーネント、Resultコンポーネントを登録
import Search from "@/components/Search";
import Result from "@/components/Result";

export default {
  //dataのitemsにはAPIから取得したデータを入れる
  data() {
    return {
      items: [],
      loadProgress: false,
    };
  },
  //loadStart/loadCompleteイベント時に実行するイベントハンドラを作成
  methods: {
    onLoadStart() {
      this.loadProgress = true;
    },
    onLoadComplete({ results }) {
      this.items = results;
      this.loadProgress = false;
    },
  },
  components: {
    Search,
    Result,
  },
};
</script>


<style scoped>
.root {
  padding-top: 70px;
}
 
.search {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>
 
<style>
html {
  font-size: 62.5%;
} 
 
body {
  margin: 0;
  color: #35495e;
} 
 
p {
  margin: 0;
} 
 
ul {
  padding: 0;
  margin: 0;
}
</style>
