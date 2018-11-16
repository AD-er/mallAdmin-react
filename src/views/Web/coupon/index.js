import React, { Component } from 'react';
import { Card, Table, Button } from 'antd';

class Banner extends Component {
	render() {
		const coupons = [{
			title: '限双11指定促销商品',
			code: 'JKUIQWUEUBN',
			type: '比例',
			price: '199.00',
			discount: '9.0',
			count: '99/999/9999',
			active: 0,
			updated_at: '20181116',
			created_at: '20181118'
		}];
		const coupons_columns = [{
	        title: '标题',
	        dataIndex: 'title',
	        key: 'title',
	      }, {
	        title: '优惠码',
	        dataIndex: 'code',
	        key: 'code',
	      }, {
	        title: '类型',
	        dataIndex: 'type',
	        key: 'type',
	      }, {
	        title: '最低',
	        dataIndex: 'price',
	        key: 'price',
	      }, {
	        title: '折扣',
	        dataIndex: 'discount',
	        key: 'discount',
	      }, {
	        title: '开始',
	        dataIndex: 'price',
	        key: 'price',
	      }, {
	        title: '结束',
	        dataIndex: 'price',
	        key: 'price',
	      },{
	        title: '有效',
	        dataIndex: 'active',
	        key: 'active',
	        render: (text, record) => (
	          <span>
	            {record.active ? "是" : "否"}
	          </span>
	        ),
	      }, {
	        title: '已用/已领/数量',
	        dataIndex: 'count',
	        key: 'count',
	      }, {
	        title: '更新',
	        dataIndex: 'updated_at',
	        key: 'updated_at',
	      }, {
	        title: '创建',
	        dataIndex: 'created_at',
	        key: 'created_at',
	      }, {
	        title: '操作',
	        key: 'action',
	        render: (text, record) => (
	          <span>
	          </span>
	        ),
	      }];

		return <Card>
				<Table
					size='middle'
					columns={coupons_columns}
					dataSource={coupons}
					// pagination={{
					// 	showSizeChanger: true,
					// 	current: pagination.current_page,
					// 	pageSize: pagination.per_page,
					// 	total: pagination.total,
			  //           showTotal() {return `共 ${pagination.total} 条记录`},
			  //           onShowSizeChange(current, pageSize) { self.onShowSizeChange(current, pageSize) },
			  //           onChange() {
			  //           	getProfits(this.current)
			  //           }
				 //    }}
				/>
		</Card>
	}
}

export default Banner;