import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, Table, Radio, Button  } from 'antd';
import { actionCreators } from './store';
import ShowOrder from './components/ShowOrder';

class Orders extends Component {
  state = {
    filter: 'all'
  };

	componentDidMount () {
    let params = new URLSearchParams(this.props.location.search.substring(1));
	  this.props.getOrders(params);
    this.setState({filter: params.get("filter")});
	}

  componentWillReceiveProps(newProps) {
    const { search } = newProps.location;
    if (this.props.location.search !== search) {
      let params = new URLSearchParams(search.substring(1));
      this.props.getOrders(params); 
      this.setState({filter: params.get("filter")});
    }
  }

  handleRefresh () {
    let params = new URLSearchParams(this.props.location.search.substring(1));
    let current = this.props.pagination.current_page;
    let pageSize = this.props.pagination.per_page;
    params.set('page', current);
    params.set('perPage', pageSize);
    this.props.getOrders(params);
  }

  handleFilterChange(e) {
    this.props.history.push(this.props.location.pathname+'?filter='+e.target.value);
  }

  onShowSizeChange(current, pageSize) {
    let params = new URLSearchParams(this.props.location.search.substring(1));
    params.set('page', current);
    params.set('perPage', pageSize);
    this.props.getOrders(params);
  }

	render() {
		const { location, orders, pagination, getOrders, showOrder } = this.props;
    const self = this;

    const orders_columns = [{
        title: '流水号',
        dataIndex: 'no',
        key: 'no',
      }, {
        title: '总额',
        dataIndex: 'total_amount',
        key: 'total_amount',
      }, {
        title: '物流',
        dataIndex: 'ship_status',
        key: 'ship_status',
      }, {
        title: '售后',
        dataIndex: 'refund_status',
        key: 'refund_status',
      }, {
        title: '状态',
        dataIndex: 'closed',
        key: 'closed',
        render: (text, record) => (
          <span>
            {record.closed ? '已关闭' : ''}
          </span>
        ),
      }, {
        title: '更新',
        dataIndex: 'updated_at',
        key: 'updated_at',
      }, {
        title: '下单',
        dataIndex: 'created_at',
        key: 'created_at',
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a onClick={() => showOrder(record)}>查看</a>
          </span>
        ),
      }];

		return <Fragment>
            <Card>
              <div style={{marginBottom: '16px'}}>
                <Button style={{marginRight: '8px'}} onClick={this.handleRefresh.bind(this)}>刷新</Button>
                <Radio.Group value={this.state.filter} onChange={this.handleFilterChange.bind(this)}>
                  <Radio.Button value="all">所有</Radio.Button>
                  <Radio.Button value="pay">待付款</Radio.Button>
                  <Radio.Button value="send">待发货</Radio.Button>
                  <Radio.Button value="arrive">待收货</Radio.Button>
                  <Radio.Button value="after">售后</Radio.Button>
                </Radio.Group>
              </div>
  						<Table
                size='middle'
  							columns={orders_columns}
  							dataSource={orders}
  							pagination={{
                  showSizeChanger: true,
  								current: pagination.current_page,
  								pageSize: pagination.per_page,
  								total: pagination.total,
                  showTotal() { return `共 ${pagination.total} 条记录` },
                  onShowSizeChange(current, pageSize) { self.onShowSizeChange(current, pageSize) },
                  onChange() {
                    let params = new URLSearchParams(location.search.substring(1));
                    params.set('page', this.current);
                    params.set('perPage', pagination.per_page);
                    getOrders(params);
                  }
  				      }}
  						/>
  					</Card>
            <ShowOrder/>
          </Fragment>
	}
}

const mapStateToProps = (state) => ({
  orders: state.getIn(['order', 'orders']).toJS(),
  pagination: state.getIn(['order', 'pagination']).toJS()
});

const mapDispatchToProps = (dispatch) => ({
  showOrder(text) {
    dispatch(actionCreators.getOrder(text.id));
  },

  getOrders (params) {
    dispatch(actionCreators.getOrders(params));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Orders);