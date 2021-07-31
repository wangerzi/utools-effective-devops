<template>
  <template v-if="state.state === 'empty'">
    <el-empty description="请先复制 .mobileconfig 文件"></el-empty>
  </template>
  <template v-else-if="state.state === 'modify'">
    <el-form label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="globalUserPwd.user"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="globalUserPwd.pwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleGlobalReplace">全局替换</el-button>
      </el-form-item>
    </el-form>
    <el-form label-width="80px">
      <template v-for="v in state.sourceObject.PayloadContent" :key="v.PayloadUUID">
        <el-card style="margin-top: 20px;">
          <template #header>
            {{v.VPNType}} - {{v.UserDefinedName}}
          </template>
          <el-form-item label="用户名">
            <el-input v-model="v[v.VPNType].AuthName"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="v[v.VPNType].AuthPassword"></el-input>
          </el-form-item>
        </el-card>
      </template>
    </el-form>
    <el-button icon="el-icon-copy-document" type="primary" plain class="copy-button" @click="handleCopy">复制（{{copyText}}）</el-button>
  </template>
  <template v-else-if="state.state === 'error'">
    <el-empty :description="state.errorMsg"></el-empty>
  </template>
  <template v-else>
    处理中
  </template>
</template>

<script setup>
import {onMounted, onUnmounted, defineProps, reactive} from 'vue'
import {debounce} from 'lodash'
import plist from 'plist'
import {build} from '../thirdparty/build'

const props = defineProps(["type", 'payload', 'code'])

const state = reactive({
  state: "",
  fileName: "",
  filePath: "",
  sourceContent: "",
  errorMsg: "",
  sourceObject: {}
})

const globalUserPwd = reactive({
  user: "",
  pwd: ""
})

console.log('payload is', props.payload);

if (props.type === 'files' && props.payload && props.payload.length > 0) {
  const fileName = props.payload[0].name
  const filePath = props.payload[0].path

  state.fileName = fileName
  state.filePath = filePath
  state.sourceContent = readMobileConfig(filePath)

  try {
    state.sourceObject = resolveMobileConfig(state.sourceContent)

    console.log("source object", state.sourceObject);

    state.state = 'modify'
    console.log("source file is ", filePath, 'content', JSON.stringify(state.sourceObject));
  } catch (e) {
    state.state = 'error';
    state.errorMsg = e.toString();
  }
} else {
  state.state = 'empty'
}

function resolveMobileConfig(content) {
  return plist.parse(content)
}

function handleGlobalReplace() {
  for (let i = 0; i < state.sourceObject.PayloadContent.length; i++) {
    let v = state.sourceObject.PayloadContent[i];
    v[v.VPNType].AuthName = globalUserPwd.user;
    v[v.VPNType].AuthPassword = globalUserPwd.pwd;
  }
}

function handleCopy() {
  try {
    // 生成临时文件并复制
    const content = build(state.sourceObject);
    const savePath = window.saveTmpFile(state.fileName, content)
    console.log('wirte file path', savePath, content);
    utools.copyFile(savePath);
    utools.hideMainWindow();
  } catch (e) {
    utools.showNotification('错误：' + e.toString());
    console.error(e);
  }
}

const listenerKeyboard = debounce((e) => {
  if (e.key === 'c' && (window.utools.isMacOs() ? e.metaKey : e.ctrlKey)){
    e.preventDefault();
    handleCopy()
  }
}, 200)
onMounted(() => {
  document.addEventListener('keydown', listenerKeyboard);
})
onUnmounted(() => {
  document.removeEventListener('keydown', listenerKeyboard)
})

const copyText = (utools.isMacOs()?'⌘':'Ctrl') + " + C"
</script>

<style scoped>
.copy-button {
  margin: 20px auto;
  display: block;
}
</style>
