import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Drawer, Row, Col, Divider, List, Avatar, Form, Button  } from 'antd';
import { DescriptionItem } from '../style';
import FromOrder from './FromOrder';

const PayMent = ({ paid_at, method, no }) => (
  <Row>
    <Col span={12}>
      <DescriptionItem>
        支付时间：
        <p>{paid_at.date}</p>
      </DescriptionItem>
    </Col>
    <Col span={12}>
      <DescriptionItem>
        {method}：
        <p>{no}</p>
      </DescriptionItem>
    </Col>
  </Row>
);

class Order extends Component {

	render() {
		const { drawer, order, closeOrder } = this.props;
    const paid_at = {...order.paid_at};
    const address = {...order.address};
    const orderItem = {...order.orderItem};
    const ship_data = {...order.ship_data}
    const agency_data = {...order.agency_data}

		return  <Drawer
              width={640}
              className="order-drawer"
              placement="right"
              onClose={closeOrder}
              visible={drawer}
            >
              <h1>No.{order.no}</h1>
              <Row>
                <Col span={12}>
                  <DescriptionItem>
                    订单状态：
                    <p>{paid_at.date}</p>
                  </DescriptionItem>
                </Col>
                <Col span={12}>
                  <DescriptionItem>
                    订单金额：
                    <p>{order.total_amount} RMB</p>
                  </DescriptionItem>
                </Col>
              </Row>
              { 
                order.paid_at
                ? <PayMent
                    paid_at={paid_at}
                    method={order.payment_method}
                    no={order.payment_no}
                  />
                : null
              }
              <Row>
                <Col span={12}>
                  {
                    order.paid_at && order.agency_data
                    ? <DescriptionItem>
                        {agency_data.agency_company}：
                        <p>{agency_data.agency_no}</p>
                      </DescriptionItem>
                    : null
                  }
                </Col>
                <Col span={12}>
                  {
                    order.agency_data && order.ship_data
                    ? <DescriptionItem>
                        {ship_data.express_company}：
                        <p>{ship_data.express_no}</p>
                      </DescriptionItem>
                    : null
                  }
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <DescriptionItem>
                    收货信息：
                    <p>{address.name + '，' + address.phone + '，' + address.address}</p>
                  </DescriptionItem>
                </Col>
              </Row>
              <Divider />
              <List
                split={false}
                itemLayout="horizontal"
                dataSource={orderItem.data}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar shape="square" size={48} src={item.index_img_url} />}
                      title={<a target="_blank" href={"/item/" + item.item_id}>{item.title}</a>}
                      description={item.style.color + '/' + item.style.size + '，' + item.price + ' x ' + item.amount}
                    />
                  </List.Item>
                )}
              />
              {
                order.paid_at && !order.agency_data
                ? <Fragment>
                    <Divider />
                    <FromOrder label="平台" select={['自营', '天猫', '京东']} />
                  </Fragment>
                : null
              }
              {
                order.agency_data && !order.ship_data
                ? <Fragment>
                    <Divider />
                    <FromOrder label="物流" select={['EMS', '中通', '申通', '圆通']} />
                  </Fragment>
                : null
              }
              <Divider />
              <Row>
                <Col span={20}>
                  <DescriptionItem>
                    下单时间：
                    <p>{order.created_at}</p>
                  </DescriptionItem>
                </Col>
                <Col span={4}>
                  {!order.closed ? <Button type="danger">关闭订单</Button> : null}
                </Col>
              </Row>
            </Drawer>
	}
}

const mapStateToProps = (state) => ({
  drawer: state.getIn(['order', 'drawer']),
  order: state.getIn(['order', 'order']).toJS(),
});

const mapDispatchToProps = (dispatch) => ({
  closeOrder() {
    dispatch({
      type: 'CLOSE_DRAWER',
    });
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Order));