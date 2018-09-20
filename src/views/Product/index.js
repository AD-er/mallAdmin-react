import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Card, Table, Radio, Input, message, notification  } from 'antd';
import { actionCreators } from './store';
import FromProduct from './components/FromProduct';
import { authRequest } from '../../utils/Api';

class Profits extends Component {
	state = {
    visible: false,
  }

	componentDidMount () {
		this.props.getProfits();
	}

  handleRefresh () {
    const pagination = { ...this.props.pagination };
    let current = pagination.current_page;
    let pageSize = pagination.per_page;
    let params = {
      page: current,
      perPage: pageSize
    }
    this.props.getProfits(params);
  }

	clickUpdate = () => {
		const { pagination, getProfits } = this.props;
		authRequest({
      url: 'products/profit',
      method: 'PUT'
    }).then((res) => {
    	if (res && res.status === 201) {
    		let params = {
    			page: pagination.current_page,
    			perPage: pagination.per_page,
    		}
    		getProfits(params);
    		notification['success']({
    		  message: '生成成功！'
    		})
    	}
    })
	}

  showModal = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      var items = values.description.split("\n");
      let self = this;
      authRequest({
      	url: 'products/profit',
      	method: 'POST',
      	data: { items },
      	validateStatus: function (status) {
	  	    return status >= 200 && status < 500;
	  	}
      }).then((res) => {
      	if (res && res.status === 422) {
      		var error = Object.values(res.data.errors)
      		notification['error']({
      		    message: '创建失败！',
      		    description: error[0][0]
      		})
      	}
      	if (res && res.status === 201) {
      		notification['success']({
      		    message: '创建成功！'
      		})
	      form.resetFields();
	      self.setState({ visible: false });
      	}
      }).catch(err => { 
		    console.log(err);
		    message.error('接口异常！请联系管理员');
		  });
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  onShowSizeChange(current, pageSize) {
    let params= {
    	page: current,
    	perPage: pageSize
    }
    this.props.getProfits(params);
  }

	render() {
		const { profits, pagination, getProfits, showOrder } = this.props;
		const self = this;

		const profits_columns = [{
	        title: 'ID',
	        dataIndex: 'id',
	        key: 'id',
	      }, {
	        title: '管理员',
	        dataIndex: 'admin_id',
	        key: 'admin_id',
	      }, {
	        title: '商品ID',
	        dataIndex: 'item_id',
	        key: 'item_id',
	        render: (text, record) => (
	          <span>
	            {
	            	record.item_id === "0"
	            	? "默认全部"
	            	: <a target="_blank" href={"/item/" + record.item_id}>{record.item_id}</a>
	            }
	          </span>
	        )
	      }, {
	        title: '价格',
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
	          	{record.item_id === "0" ? "不可删除" : <a onClick={() => showOrder(record)}>删除</a>}
	          </span>
	        ),
	      }];
		return <Card>
						<div style={{marginBottom: '16px'}}>
		          <Radio.Group>
		          	<Radio.Button onClick={this.handleRefresh.bind(this)}>刷新</Radio.Button>
		          	<Radio.Button onClick={this.clickUpdate}>生成</Radio.Button>
		          	<Radio.Button onClick={this.showModal}>增/改</Radio.Button>
		          </Radio.Group>
		          <div style={{float: 'right'}}>
		          	<Input.Search
		      	      placeholder="请输入商品ID"
		      	      enterButton="搜索"
		      	      onSearch={value => console.log(value)}
		      	    />
		          </div>
		      	</div>
						<Table
							size='middle'
							columns={profits_columns}
							dataSource={profits}
							pagination={{
								showSizeChanger: true,
								current: pagination.current_page,
								pageSize: pagination.per_page,
								total: pagination.total,
		            showTotal() {return `共 ${pagination.total} 条记录`},
		            onShowSizeChange(current, pageSize) { self.onShowSizeChange(current, pageSize) },
		            onChange() {
		              getProfits(this.current)
		            }
				      }}
						/>
						<FromProduct
							wrappedComponentRef={this.saveFormRef}
							visible={this.state.visible}
							onCancel={this.handleCancel}
		          onCreate={this.handleCreate}
						/>
					</Card>
	}
}

const mapStateToProps = (state) => ({
  profits: state.getIn(['profit', 'profits']).toJS(),
  pagination: state.getIn(['profit', 'pagination']).toJS()
});

const mapDispatchToProps = (dispatch) => ({
  getProfits (page) {
    dispatch(actionCreators.getProfits(page));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Profits);
