import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, Table, Button  } from 'antd';
import { actionCreators } from './store';

class Users extends Component {

	componentDidMount () {
    const params = { page: 1 };
	  this.props.getUsers(params);
	}

  handleRefresh () {
    const pagination = { ...this.props.users.pagination };
    let current = pagination.current_page;
    let pageSize = pagination.per_page;
    let params = {
      page: current,
      perPage: pageSize
    }
    this.props.getUsers(params);
  }

  onShowSizeChange (current, pageSize) {
    const params = {
      page: current,
      perPage: pageSize
    };
    this.props.getUsers(params);
  }

	render() {
		const { users, getUsers } = this.props;
    const pagination = { ...users.pagination };
    const self = this;

		const users_columns = [{
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
      },{
        title: '最后访问',
        dataIndex: 'last_actived_at',
        key: 'last_actived_at',
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
          <Button style={{marginRight: '8px'}} onClick={this.handleRefresh.bind(this)}>刷新</Button>
        </div>
				<Table
          size='middle'
					columns={ users_columns }
					dataSource={users.list}
					pagination={{
            showSizeChanger: true,
						current: pagination.current_page,
						pageSize: pagination.per_page,
						total: pagination.total,
            showTotal() {return `共 ${pagination.total} 条记录`},
            onShowSizeChange(current, pageSize) { self.onShowSizeChange(current, pageSize) },
            onChange() {
              const params = {
                page: this.current,
                perPage: pagination.per_page
              };
              getUsers(params);
            }
		      }}
				/>
			</Card>
		</Fragment>
	}
}

const mapStateToProps = (state) => ({
  users: state.getIn(['user', 'users']),
});

const mapDispatchToProps = (dispatch) => ({
  getUsers (params) {
    dispatch(actionCreators.getUsers(params));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);