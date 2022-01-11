<template>
  <div class="fr">
    <div class="f1" />
    <a class="l1" @click.prevent="page=page-1" v-if="page > 0"
    ><i class="uil uil-angle-left"
    /><div style="display:inline-block;transform:translate(0,-3px)">Предыдущая</div>&nbsp;</a>
    <a style="padding-top: 3px" v-if="page>2" @click.prevent="page=0">&nbsp;&nbsp;1&nbsp;&nbsp;</a>
    <div style="padding-top: 3px" v-if="page>2">&nbsp;&nbsp;...&nbsp;&nbsp;</div>
    <a style="padding-top: 3px" v-if="page>1" @click.prevent="page=page-2">&nbsp;&nbsp;{{ page - 1 }}&nbsp;&nbsp;</a>
    <a style="padding-top: 3px" v-if="page>0" @click.prevent="page=page-1">&nbsp;&nbsp;{{ page }}&nbsp;&nbsp;</a>
    <div style="padding-top: 3px">&nbsp;&nbsp;{{ page + 1 }}&nbsp;&nbsp;</div>
    <a style="padding-top: 3px" v-if="maxPage>page" @click.prevent="page=page+1">&nbsp;&nbsp;{{ page + 2 }}&nbsp;&nbsp;</a>
    <a style="padding-top: 3px" v-if="maxPage>page+1" @click.prevent="page=page+2">&nbsp;&nbsp;{{ page + 3 }}&nbsp;&nbsp;</a>
    <div style="padding-top: 3px" v-if="maxPage>page+2">&nbsp;&nbsp;...&nbsp;&nbsp;</div>
    <a style="padding-top: 3px" v-if="maxPage>page+2" @click.prevent="page=maxPage">&nbsp;&nbsp;{{ maxPage + 1 }}&nbsp;&nbsp;</a>
    <a
      class="l1"
      @click.prevent="page=page+1"
      v-if="page < maxPage"
    >&nbsp;<div style="display:inline-block;transform:translate(0,-3px)">Следующая</div><i class="uil uil-angle-right"
    /></a>
    <div style="width:3rem" />
    <div class="fr" style="transform:translate(0,-4px)">
      <div class="fc">
        <div class="f1"/>
        {{page*size+1}} - {{Math.min((page+1)*size,items)}} из {{items}}&nbsp;
        <div class="f1"/>
      </div>
      <Vselect :options="[10,20,50]" v-model="size" :clearable="false"/>
      <div class="fc">
        <div class="f1"/>
        &nbsp;на страницу
        <div class="f1"/>
      </div>
    </div>
    <div class="f1" />
  </div>
</template>

<script>
export default {
  props: ["value","items"],
  data() {
    return {};
  },
  computed: {
    page:{
      get(){
        return this.value?.page || 0
      },
      set(mew){
        this.$emit('update:value',{page:mew,size:this.size})
      }
    },
    size:{
      get(){
        return this.value?.size || 20
      },
      set(mew){
        this.$emit('update:value',{page:this.page,size:mew})
      }
    },
    maxPage(){
      return Math.ceil(this.items/(this.size))-1
    },
  },
  methods: {},
};
</script>

<style lang="scss">
</style>
