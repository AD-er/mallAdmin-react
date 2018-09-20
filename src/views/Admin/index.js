import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, Table, Radio, notification, message } from 'antd';
import CreateFrom from './components/CreateFrom';
import { actionCreators } from './store';
import { authRequest } from '../../utils/Api';

class Admins extends Component {
  state = {
    visible: false,
  }

	componentDidMount () {
    let params = { page: 1 }
	  this.props.getAdmins(params);
	}

  handleRefresh () {
    const pagination = { ...this.props.pagination };
    let current = pagination.current_page;
    let pageSize = pagination.per_page;
    let params = {
      page: current,
      perPage: pageSize
    }
    this.props.getAdmins(params);
  }

  showModal = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    this.formRef.props.form.resetFields();
    this.setState({ visible: false });
  }

  handleCreate = (e) => {
    e.preventDefault();
    const self = this;
    const form = this.formRef.props.form;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        authRequest({
          url: 'admins',
          method: 'POST',
          data: { ...values },
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
      }
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  onShowSizeChange (current, pageSize) {
    let params = {
      page: current,
      perPage: pageSize
    }
    this.props.getAdmins(params)
  }

	render() {
		const { admins, pagination, getAdmins } = this.props;
    const self = this;

		const admins_columns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      }, {
        title: '昵称',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '手机',
        dataIndex: 'phone',
        key: 'phone',
      }, {
        title: '电子邮箱',
        dataIndex: 'email',
        key: 'email',
      }, {
        title: '更新',
        dataIndex: 'updated_at',
        key: 'updated_at',
      }, {
        title: '创建',
        dataIndex: 'created_at',
        key: 'created_at',
      }];

		return <Fragment>
			<Card>
        <div style={{marginBottom: '16px'}}>
        <Radio.Group>
          <Radio.Button onClick={this.handleRefresh.bind(this)}>刷新</Radio.Button>
          <Radio.Button onClick={this.showModal}>新增</Radio.Button>
        </Radio.Group>
        </div>
				<Table size='middle'
					columns={admins_columns}
					dataSource={admins}
					pagination={{
            showSizeChanger: true,
						current: pagination.current_page,
						pageSize: pagination.per_page,
						total: pagination.total,
            showTotal() {return `共 ${pagination.total} 条记录`},
            onShowSizeChange(current, pageSize) { self.onShowSizeChange(current, pageSize) },
            onChange() {
              let params = {
                page: this.current,
                perPage: pagination.per_page
              }
              getAdmins(params)
            }
		      }}
				/>
			</Card>
      <CreateFrom
        wrappedComponentRef={this.saveFormRef}
        visible={this.state.visible}
        onCancel={this.handleCancel}
        onCreate={this.handleCreate}
      />
		</Fragment>
	}
}

const mapStateToProps = (state) => ({
  admins: state.getIn(['admin', 'admins']).toJS(),
  pagination: state.getIn(['admin', 'pagination']).toJS()
});

const mapDispatchToProps = (dispatch) => ({
  getAdmins (params) {
    dispatch(actionCreators.getAdmins(params));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Admins);