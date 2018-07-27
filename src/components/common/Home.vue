<template>
	<div id="app">
		<el-container>
			<el-header class="header">
				<vheader></vheader>
			</el-header>
			<el-container>
				<el-aside width="15%" height="500">
					<navmenu></navmenu>
				</el-aside>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<template>
	<div class="wrapper">
		<v-head></v-head>
		<v-sidebar></v-sidebar>
		<div class="content-box" :class="{'content-collapse':collapse}">
			<v-tags></v-tags>
			<div class="content">
				<transition name="move" mode="out-in">
					<keep-alive :include="tagsList">
						<router-view></router-view>
					</keep-alive>
				</transition>
			</div>
		</div>
	</div>
</template>

<script>
	import vHead from './Header.vue';
	import vSidebar from './Sidebar.vue';
	import vTags from './Tags.vue';
	import bus from './bus';

	export default {
		name: 'App',
		data() {
			return {
				tagsList: [],
				collapse: false
			}
		},
		components: {
			vHead,
			vSidebar,
			vTags
		},
		created() {
			bus.$on('collapse', msg => {
				this.collapse = msg;
			})

			// 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
			bus.$on('tags', msg => {
				let arr = [];
				for(let i = 0, len = msg.length; i < len; i++) {
					msg[i].name && arr.push(msg[i].name);
				}
				this.tagsList = arr;
			})
		}
	}
</script>

<style>
	.header {
		background-color: #1e5882;
		color: #fff;
		line-height: 60px;
	}
</style>