import styled from 'styled-components';

export const Info = styled.ul`
	padding-top: 15px;
	li {
		margin-bottom: 5px;
    b {
    	font-weight: bold
    }
    span {
    	cursor: pointer;
    	color: #1890ff;
    }
	}
`;

export const List = styled.ul`
	margin-top: 30px;
	li {
		padding: 30px;
	  border-top: 1px dashed #e1e6eb;
	  .set-list-left {
	  	width: 140px;
	  	float: left;
		  b {
		  	font-weight: bold
		  }
	  }
	  .set-list-mid {
	  	overflow: hidden;
	  }
	  .set-list-right {
	  	width: 120px;
	  	float: right;
	    padding-left: 30px;
	    span {
	    	cursor: pointer;
	    	color: #1890ff;
	    }
	  }
	}
`;

export const ModalBody = styled.div`
	display: flex;
	.avatar-uploader {
		.ant-upload {
			width: 128px;
		  height: 128px;
		}
	}
	ul {
		padding-left: 15px;
	}
`;