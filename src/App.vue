<template>
  <template v-if="state.code === 'vpn-mobileconfig'">
    <MobileConfigVpn :code="state.code" :payload="state.payload" :type="state.type" />
  </template>
  <template v-else>
    <el-empty description="这里是主页，暂未填充内容"></el-empty>
  </template>
</template>

<script setup>
import MobileConfigVpn from './components/MobileConfigVpn.vue'
import {reactive} from 'vue';

const state = reactive({
  code: '',
  type: '',
  payload: {},
});

utools.onPluginEnter(({code, type, payload}) => {
  console.log('用户进入插件', code, type, payload)
  state.code = code;
  state.type = type;
  state.payload = payload;
});
</script>

<style>
</style>
