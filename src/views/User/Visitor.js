import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, Table  } from 'antd';
import { actionCreators } from './store';

class Visitors extends Component {

	componentDidMount () {
    const params = { page: 1 }
	  this.props.getVisitors(params);
	}

  onShowSizeChange (current, pageSize) {
    const params = {
      page: current,
      perPage: pageSize
    }
    this.props.getVisitors(params);
  }

	render() {
		const { visitors, getVisitors } = this.props;
    const pagination = { ...visitors.pagination };
    const self = this;

		const visitors_columns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      }, {
        title: '用户名',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: 'IP',
        dataIndex: 'ip',
        key: 'ip',
      },{
        title: '在线时长',
        dataIndex: 'online',
        key: 'online',
      },{
        title: '最后访问',
        dataIndex: 'updated_at',
        key: 'updated_at',
      }, {
        title: '初次访问',
        dataIndex: 'created_at',
        key: 'created_at',
      }];

		return <Fragment>
			<Card>
				<Table size='middle'
					columns={ visitors_columns }
					dataSource={visitors.list}
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
              getVisitors(params);
            }
		      }}
				/>
			</Card>
		</Fragment>
	}
}

const mapStateToProps = (state) => ({
  visitors: state.getIn(['user', 'visitors']),
});

const mapDispatchToProps = (dispatch) => ({
  getVisitors (params) {
    dispatch(actionCreators.getVisitors(params));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Visitors);