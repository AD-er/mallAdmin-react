import styled from 'styled-components';
import { Layout } from 'antd';

export const Logo = styled.div`
	height: 60px;
	overflow: hidden;
	h1 { 
		color: #fff;
		font-size: 24px;
		line-height: 60px;
		text-align: center;
	}
`;

export const Header = styled(Layout.Header)`
	padding: 0;
	background: #fff;
	.trigger {
		font-size: 18px;
		line-height: 64px;
		padding: 0 20px;
		cursor: pointer;
		transition: color .3s;
		&:hover {
		  color: #1890ff;
		  background: rgba(0, 0, 0, 0.03);
		}
	}
	.breadcrumb {
		display: inline;
		margin: 16px 0
	}
	.right-menu {
		display: flex;
		float: right;
		li {
			color: #777;
			cursor: pointer;
			padding: 0 15px;
			&:hover {
			  background: rgba(0, 0, 0, 0.03);
			}
		}
		.avatar {
			margin-right: 5px;
		}
	}
`;