<template>
	<el-container>
		<el-header>
			<div align="center" style="margin-top: 15px;">
				<el-date-picker v-model="searchDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
				</el-date-picker>
				<el-button slot="append" @click="search" icon="el-icon-search"></el-button>
			</div>
		</el-header>
		<el-main>
			<el-table :data="data.list" :row-class-name="tableRowClassName" style="width: 100%" height="500">
				<el-table-column type="expand" sortable prop="errorMessage" label="" width="80">
					<template slot-scope="scope">
						<el-form label-position="left" inline class="demo-table-expand">
							<el-form-item label="errorMessage:">
								<span>{{ scope.row.errorMessage }}</span>
							</el-form-item>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column sortable prop="warningDate" label="告警日期" width="200">
					<template slot-scope="scope">
						<span>{{ scope.row.warningDate }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="mailDom" label="企业网站" width="200">
					<template slot-scope="scope">
						<span>{{ scope.row.mailDom }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="hrSiteType" label="渠道名称" width="100">
					<template slot-scope="scope">
						<span>{{ scope.row.hrSiteType }}</span>
					</template>
				</el-table-column>
				<el-table-column sortable prop="lastUpdated" label="更新时间" width="200">
					<template slot-scope="scope">
						<span>{{ scope.row.lastUpdated }}</span>
					</template>
				</el-table-column>
				<el-table-column sortable prop="isSendMail" label="是否发送邮件" width="150">
					<template slot-scope="scope">
						<span>{{ scope.row.isSendMail }}</span>
					</template>
				</el-table-column>
				<el-table-column sortable prop="warningStatus" label="告警状态" width="150">
					<template slot-scope="scope">
						<span>{{ scope.row.warningStatus }}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<router-link :to="{ name: 'editWarningLog', params: { warningLog: scope.row }}">
							<el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
						</router-link>
						<!--<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete">删除</el-button>-->
					</template>
				</el-table-column>
			</el-table>
		</el-main>
		<el-footer>
			<div align="center" style="margin-top: 15px;">
				<el-pagination background layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page.sync="currentPage" :page-size="5" :page-sizes="[10, 50, 100, 200]" :total="data.totalCount"></el-pagination>
			</div>
		</el-footer>
	</el-container>
</template>

<script>
	import tableData from '@/config/data'
	import Router from 'vue-router'

	export default {
		data() {
			return {
				data: [{
					list: []
				}],
				currentPage: 1,
				pageSize: 5,
				offset:	0,
				searchDate: '',
				dialogTableVisible: false,
				dialogFormVisible: false,
				rules: {
					warningStatus: [{
						required: true,
						message: '请选择告警状态',
						trigger: 'change'
					}]
				},
				currentRoute: '',
				formLabelWidth: '120px',
				saveUrl: '/ATSConfiguration/updateAutoPulishError',
				searchUrl: '/ATSConfiguration/searchAutoPulishError',
				//				showUrl: '/ATSConfiguration/fetchAutoPublishError?jobReqId=R003555&hrSiteType=JOB51&md5Value=5cbe294554d1180cbd60d99acfb6adde&mailDom=kering.com'
				showUrl: '/ATSConfiguration/fetchAutoPublishError'
			}
		},
		created: function() {
			var vm = this
			var params = new URLSearchParams()
			params.append("pageSize", vm.pageSize)
			params.append("offset", vm.offset)
			vm.show(vm.showUrl, params)
		},
		methods: {
			search() {
				// 定义vm变量，让它指向this,this是当前的Vue实例
				var vm = this
				var params = new URLSearchParams()
				params.append("searchDate", this.searchDate)
				vm.show(vm.showUrl, params)
			},
			handleCurrentChange(page) {
				var vm = this
				var params = new URLSearchParams()
				params.append("currentPage", page)
				params.append("pageSize", vm.pageSize)
				params.append("offset", vm.offset)
				vm.show(vm.showUrl, params)
//				vm.currentPage = page
				console.log('currentPage:::::::' + page);
			},
			handleSizeChange(pageSize) {
				var vm = this
				var params = new URLSearchParams()
				params.append("currentPage", 1)
				params.append("pageSize", vm.pageSize)
				params.append("offset", vm.offset)
				vm.show(vm.showUrl, params)
//				vm.currentPage = page
				console.log(`每页 ${pageSize} 条`);
			},
			handleEdit(index, row) {
				console.log(index, row.id);
			},
			handleDelete(index, row) {
				console.log(index, row);
			},
			show(url, params) { // 定义vm变量，让它指向this,this是当前的Vue实例
				var vm = this
				vm.$http({
					method: 'get',
					url: url,
					params: params
				}).then((response) => {
					if(response.data) {
						//						vm.$set(vm.$data, 'tableData3', response.data.list);
						vm.$set(vm.$data, 'data', response.data);
						vm.pageSize = response.data.pageSize
						vm.offset = response.data.offset
						console.log(response.data)
					} else {
						this.$message.error('查找不到数据');
					} //成功回调
				}, (response) => {
					//失败回调
					this.$message.error('请求失败');
				})
			},
			tableRowClassName({
				row,
				rowIndex
			}) {
				var className = '';
				switch(row.warningStatus) {
					case 'ACTIVE':
						className = 'active-row';
						break;
					case 'CONFIRMED':
						className = 'confirmed-row';
						break;
					case 'RESOLVED':
						className = 'resolved-row';
						break;
					case 'IGNORE':
						className = 'ignore-row';
						break;
					default:
						break;
				}
				return className;
			}
		}
	}
</script>
<style>
	.el-table .active-row {
		background: #f56c6c69;
	}
	
	.el-table .confirmed-row {
		background: oldlace;
	}
	
	.el-table .resolved-row {
		background: #67c23a85;
	}
	
	.el-table .ignore-row {
		background: #9093997d;
	}
	
	.demo-table-expand {
		font-size: 0;
	}
	
	.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}
	
	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 500px;
	}
</style>