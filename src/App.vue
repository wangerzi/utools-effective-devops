<template>
  <template v-if="state.code === 'vpn-mobileconfig'">
    <MobileConfigVpn :code="state.code" :payload="state.payload" :type="state.type" />
  </template>
  <template v-else-if="state.code === 'home'">
    <AppConfig />
  </template>
  <template v-else>
    <el-empty description="功能暂未实现"></el-empty>
  </template>
</template>

<script setup>
import MobileConfigVpn from './components/MobileConfigVpn.vue'
import AppConfig from './components/AppConfig.vue'
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
// debug
state.code = 'home'
</script>

<style>
</style>
