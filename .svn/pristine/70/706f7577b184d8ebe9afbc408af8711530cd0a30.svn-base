<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" align="center">
            <div class="handle-box">
                <el-date-picker
			      v-model="searchDate"
			      type="daterange"
			      range-separator="至"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期">
			    </el-date-picker>
                <el-button type="primary" icon="el-icon-search" @click="search" :loading="false">搜索</el-button>
            </div>
            <el-table :data="data.list" :row-class-name="tableRowClassName" border style="width: 100%" ref="multipleTable">
                <el-table-column type="expand" prop="errorMessage" label="" width="80">
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
				<el-table-column prop="mailDom" label="企业网站" :formatter="formatter">
					<template slot-scope="scope">
						<span>{{ scope.row.mailDom }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="hrSiteType" label="渠道名称" :formatter="formatter">
					<template slot-scope="scope">
						<span>{{ scope.row.hrSiteType }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="lastUpdated" label="更新时间" width="200">
					<template slot-scope="scope">
						<span>{{ scope.row.lastUpdated }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="isSendMail" label="是否发送邮件" width="150">
					<template slot-scope="scope">
						<span>{{ scope.row.isSendMail }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="warningStatus" label="告警状态" width="150">
					<template slot-scope="scope">
						<span>{{ scope.row.warningStatus }}</span>
					</template>
				</el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
                        <router-link :to="{ name: 'edit', params: { warningLog: scope.row }}">
							<el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
						</router-link>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background layout="total, sizes, prev, pager, next, jumper"
                	 @current-change="handleCurrentChange" 
                	 @size-change="handleSizeChange" 
                	 :current-page.sync="currentPage" 
                	 :page-size="5" 
                	 :page-sizes="[5, 20, 50, 100]" 
                	 :total="data.totalCount"></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                pageSize: 5,
				offset:	0,
                idx: -1,
				data: [{list:[]}],
				currentPage: 1,
				searchDate: '',
				showUrl: '/ATSConfiguration/fetchAutoPublishError'
            }
        },
        created() {
            this.getData();
        },
        computed: {},
        methods: {
            // 分页导航
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
				params.append("pageSize", pageSize)
				params.append("offset", vm.offset)
				vm.show(vm.showUrl, params)
//				vm.currentPage = page
				console.log(`每页 ${pageSize} 条`);
			},
            // 获取 easy-mock 的模拟数据
            getData() {
				var vm = this
				var params = new URLSearchParams()
				params.append("pageSize", vm.pageSize)
				params.append("offset", vm.offset)
				vm.show(vm.showUrl, params)
			},
			show(url, params) { // 定义vm变量，让它指向this,this是当前的Vue实例
				var vm = this
				vm.$http({
					method: 'get',
					url: url,
					params: params
				}).then((response) => {
					if(response.data){
						vm.$set(vm.$data, 'data', response.data)
						vm.currentPage = response.data.currentPage
						vm.pageSize = response.data.pageSize
						vm.offset = response.data.offset
						console.log(response.data)
					}else{
						this.$message.error('查找不到数据');
					}//成功回调
				}, (response) => {
					//失败回调
					this.$message.error('请求失败');
				})
			},
            formatter(row, column) {
            	console.log('*************formatter***********')
            	console.log(rwo)
            	console.log(column)
            	console.log('*************formatter***********')
//              return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
			search(){ 
				// 定义vm变量，让它指向this,this是当前的Vue实例
				var vm = this
				var params = new URLSearchParams()
				params.append("searchDate", this.searchDate)
				vm.show(vm.showUrl, params)
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

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
</style>

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
