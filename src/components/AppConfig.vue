<template>
  <el-form
    ref="configFormRef"
    :model="formData"
    class="form-data"
    :rules="formRules"
  >
    <el-form-item label="测试端点" prop="dev_host">
      <el-input v-model="formData.dev_host" placeholder="https://a.com" />
    </el-form-item>
    <el-form-item label="测试密钥" prop="dev_key">
      <el-input v-model="formData.dev_key" show-password placeholder="xxx" />
    </el-form-item>
    <el-form-item label="生产端点" prop="prod_host">
      <el-input v-model="formData.prod_host" placeholder="https://b.com" />
    </el-form-item>
    <el-form-item label="生产密钥" prop="prod_key">
      <el-input v-model="formData.prod_key" show-password placeholder="xxx" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit()">保存</el-button>
      <el-button type="info" @click="handleReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref } from "vue";

const defaultConfig = {
  dev_host: "",
  dev_key: "",
  prod_host: "",
  prod_key: "",
};
const formData = reactive({
  ...defaultConfig,
});

const formRules = reactive({
  dev_host: [{ type: "url" }],
  dev_key: [{ type: "string" }],
  prod_host: [{ type: "url" }],
  prod_key: [{ type: "string" }],
});
const configFormRef = ref();

const onSubmit = async () => {
  if (!configFormRef) {
    return false;
  }
  await configFormRef.validate((valid) => {
    if (valid) {
      console.log("save to db", formData);
      window.setAppConfig(formData);
      utools.showNotification("保存成功");
    }
  });
};

const handleReset = () => {
  const appConfig = window.getAppConfig();
  if (appConfig) {
    Object.assign(formData, appConfig);
  } else {
    Object.assign(formData, defaultConfig);
  }
};

handleReset();
</script>

<style scoped>
.form-data {
  width: 90%;
  margin: 20px auto 0;
}
</style>