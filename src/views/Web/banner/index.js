import React, { Component } from 'react';
import { Card, Switch, Button } from 'antd';

class Banner extends Component {
	render() {
		return <Card>
			<p
		      style={{
		        fontSize: 14,
		        color: 'rgba(0, 0, 0, 0.85)',
		        marginBottom: 16,
		        fontWeight: 500,
		      }}
		    >
		    	首页轮播图
		    </p>
			<Card
				style={{ marginTop: 16 }}
				bodyStyle={{ display: 'flex', padding: '12px 16px'}}
			>
				<div style={{width: '27%'}}>
					<img width={272} style={{display: 'block'}} alt="logo" src="http://i1.mifile.cn/a4/xmad_15407786906524_UHrOB.jpg" />
				</div>
				<div style={{width: '73%'}}>
					<p><b>标题：</b>双11活动</p>
					<p><b>跳转：</b><a target="_blank" href="http://i1.mifile.cn/a4/xmad_15407786906524_UHrOB.jpg">http://i1.mifile.cn/a4/xmad_15407786906524_UHrOB.jpg</a></p>
					<p><b>最后更新：</b>2018-11-11 22:22:22</p>
					<div style={{marginTop: 7}}>
						<Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
						<Button.Group style={{float: 'right'}}>
						<Button>上移</Button>
						<Button>更新</Button>
						<Button>下移</Button>
						</Button.Group>
					</div>
				</div>
		    </Card>
		    <Card
				style={{ marginTop: 16 }}
				bodyStyle={{ display: 'flex', padding: '12px 16px'}}
			>
				<div style={{width: '27%'}}>
					<img width={272} style={{display: 'block'}} alt="logo" src="http://i1.mifile.cn/a4/xmad_15407786906524_UHrOB.jpg" />
				</div>
				<div style={{width: '73%'}}>
					<p><b>标题：</b>双11活动</p>
					<p><b>跳转：</b><a target="_blank" href="http://i1.mifile.cn/a4/xmad_15407786906524_UHrOB.jpg">http://i1.mifile.cn/a4/xmad_15407786906524_UHrOB.jpg</a></p>
					<p><b>最后更新：</b>2018-11-11 22:22:22</p>
					<div style={{marginTop: 7}}>
						<Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
						<Button.Group style={{float: 'right'}}>
						<Button>上移</Button>
						<Button>更新</Button>
						<Button>下移</Button>
						</Button.Group>
					</div>
				</div>
		    </Card>
		    <div style={{ marginTop: 16}}>
		    	<p>tips:最多支持8张轮播图</p>
		    	<Button type="primary" style={{ float: 'right'}}>添加</Button>
	    	</div>
		</Card>
	}
}

export default Banner;