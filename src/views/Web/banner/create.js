import React, { Component } from 'react';
import { Card, Upload, Icon, message, Switch, Button, Form, Input } from 'antd';

const Dragger = Upload.Dragger;

const props = {
  name: 'file',
  multiple: true,
  action: '//jsonplaceholder.typicode.com/posts/',
  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const formItemLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 20 },
};
const buttonItemLayout = {
    wrapperCol: { span: 20, offset: 4 },
}; 
class BannerCreate extends Component {
	render() {
		const { getFieldDecorator } = this.props.form;
		return <Card>
			<p
		      style={{
		        fontSize: 14,
		        color: 'rgba(0, 0, 0, 0.85)',
		        marginBottom: 16,
		        fontWeight: 500,
		      }}
		    >
		    	添加轮播图
		    </p>
		    <Card
				style={{ marginTop: 16 }}
				bodyStyle={{ display: 'flex', padding: '12px 16px'}}
			>
				<div style={{width: '45%'}}>
					<Dragger {...props}>
					    <p className="ant-upload-drag-icon">
					      <Icon type="inbox" />
					    </p>
					    <p className="ant-upload-text">单击或拖动文件到此区域上传</p>
					    <p className="ant-upload-hint">请上传指定尺寸文件。严禁上传公司数据或其他频段文件</p>
					</Dragger>
				</div>
				<div style={{width: '55%'}}>
					<Form onSubmit={this.handleSubmit}>
						<Form.Item
							{...formItemLayout}
				        	label="标题："
				        >
				          {getFieldDecorator('title', {
				            rules: [
				              { required: true, message: '请输入轮播图的标题!'},
				            ],
				          })(
				            <Input placeholder="请输入轮播图的标题" />
				          )}
				        </Form.Item>
					</Form>
					<Form onSubmit={this.handleSubmit}>
						<Form.Item
							{...formItemLayout}
				        	label="图片地址："
				        >
				          {getFieldDecorator('src', {
				            rules: [
				              { required: true, message: '请输入轮播图的地址!' },
				            ],
				          })(
				            <Input placeholder="请输入轮播图的地址" />
				          )}
				        </Form.Item>
					</Form>

					<Form onSubmit={this.handleSubmit}>
						<Form.Item
							{...formItemLayout}
				        	label="跳转链接："
				        >
				          {getFieldDecorator('href', {
				            rules: [
				              { required: true, message: '请输入轮播图的跳转链接!' },
				            ],
				          })(
				            <Input placeholder="请输入轮播图的跳转链接" />
				          )}
				        </Form.Item>
					</Form>
					<Form.Item
			          {...formItemLayout}
			          label="是否显示："
			          style={{marginBottom: 5}}
			        >
			          {getFieldDecorator('switch', { valuePropName: 'checked' })(
			            <Switch />
			          )}
			        </Form.Item>
					<Form.Item {...buttonItemLayout} style={{marginBottom: 5}}>
			            <Button type="primary">提交</Button>
			        </Form.Item>
				</div>
		    </Card>
		</Card>
	}
}

export default Form.create()(BannerCreate);