<template>
	<el-card>
	<div class="container">
		<md-editor class="mgb20" v-model="text" />
		<el-button type="primary" style="margin-right: 0;">提交</el-button>
	</div>
</el-card>
</template>
<script setup>
import { ref } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const text = ref('Hello Editor!');
</script>
<style lang="less" scoped>
.plugins-tips{
	font-size: 16px;
}
</style>