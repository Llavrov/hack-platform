<template>
  <div class="pageContentContainer">
    <Xnavbar />
    <div class="horizPad">
      <div />
      <div class="newsRoot pageContentRoot" v-if="!!news">
        <h1 v-t="'news.head'" class="pageHeader" />
        <div class="newsCard" v-for="it of news" :key="it.id">
          <div
            class="img fc"
            :style="`background-image:${it.media}`"
            v-if="!!it.media && !it.media.includes('youtu')"
          >
            <div class="f1" />
            <div class="f1 fc">
              <div class="f1" />
              <div class="imgTitle" v-text="it.header" />
            </div>
          </div>
          <div v-else-if="it.media?.includes('youtu')" class="fr">
            <div class="f1" />
            <iframe
              :width="$root.width > 900 ? '800px' : '100%'"
              :height="`${Math.floor(Math.min($root.width, 800) / 1.8)}`"
              :src="it.media"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <div class="f1" />
          </div>
          <div
            v-if="!it.media || it.media.includes('youtu')"
            class="nonImgTitle"
            v-text="it.header"
          ></div>
          <div class="text" v-html="it.text"></div>
        </div>
      </div>
      <div />
    </div>
    <Xfooter />
  </div>
</template>

<script>
export default {
  name: "News",
  data(){
    return{
      news:[]
    }
  },
  methods:{
    async fetch(){
      this.news = await this.http.get(`/news`)
      this.news.sort((a, b) => b.id - a.id)
    }
  },
  mounted(){
    this.fetch()
  }
};
</script>

<style lang="scss">
.newsRoot {
  .pageHeader {
    margin-bottom: 38px;
  }
  .newsCard {
    margin-bottom: 30px;
    .nonImgTitle {
      margin-top: 20px;
      margin-left: 30px;
      font-size: 22px;
      font-weight: 700;
    }
    .img {
      width: 100%;
      height: 517px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      > div:last-child {
        background: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0.0001) 0%,
          rgba(0, 0, 0, 0.62) 100%
        );
      }
      .imgTitle {
        font-size: 22px;
        font-weight: 700;
        color: #ffffff;
        margin-left: 30px;
        margin-right: 30px;
        margin-bottom: 35px;
      }
    }
    .text {
      padding: 50px 30px 30px 30px;
      p {
        margin-bottom: 35px;
      }
    }
  }
}
.md .newsRoot {
  .newsCard {
    .img {
      height: 325px;
      .imgTitle {
        margin-bottom: 20px;
      }
    }
    .text {
      padding: 30px 30px 30px 30px;
      p {
        margin-bottom: 30px;
      }
    }
  }
}
.sm .newsRoot {
  .pageHeader {
    margin-bottom: 30px;
  }
  .newsCard {
    .img {
      height: 325px;
      padding: 0 15px;
      .imgTitle {
        font-size: 20px;
        margin-bottom: 20px;
      }
    }
    .text {
      padding: 30px 15px 25px 15px;
      p {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
