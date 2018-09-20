import React from 'react';
import { Modal, Upload, Icon, message } from 'antd';
import { ModalBody } from '../style'

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('头像图像格式必须是JGB!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('头像图像大小不得超过2MB!');
  }
  return isJPG && isLt2M;
}

class UpdateAvatar extends React.Component {
  state = {
    loading: false,
  };

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }

  render() {
    const { visible, onCancel, onCreate } = this.props;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    return (
      <Modal
        visible={visible}
        title="更换头像"
        okText="确认"
        cancelText="取消"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <ModalBody>
          <div>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="//jsonplaceholder.typicode.com/posts/"
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
            </Upload>
          </div>
          <ul>
            <li>注：</li>
            <li>头像图像格式必须是JGB！</li>
            <li>头像图像大小不得超过2MB！</li>
            <li>请选择正方形头像，推荐140 x 140</li>
          </ul>
        </ModalBody>
      </Modal>
    );
  }
};

export default UpdateAvatar;
