import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import { useReduxDispatch } from '@nnwa/redux-saga-actions';
import {
  Button,
  Card,
  Col,
  Input,
  message,
  Modal,
  Row,
  Space,
  Spin,
} from 'antd';
import { useEffect, useState } from 'react';
import { globalActions } from '../../models/global';
import { useReduxState } from '../../store';
import UserDropdown from './UserDropdown';

function MainPage() {
  const { loading, list, query } = useReduxState((state) => state.global);
  const dispatch = useReduxDispatch();

  const [isRetry, setRetry] = useState(false);
  const refreshTuList = async () => {
    dispatch(globalActions.setState({ loading: true }));
    const success = await dispatch(globalActions.fetchPicList());
    if (success) {
      dispatch(globalActions.setState({ loading: false }));
      return;
    }
    message.warn('获取表情失败，点击重试');
    setRetry(true);
  };
  useEffect(() => {
    refreshTuList();
  }, []);

  const onSearch = () => {
    refreshTuList();
  };

  const onCopyPic = (item) => {
    window.$api.copyRemoteIMG(item.url, true).catch((err) => {
      message.error(err.message);
    });
  };

  return (
    <div>
      <Spin
        spinning={loading}
        tip={
          isRetry ? (
            <Button type="primary" size="small" onClick={refreshTuList}>
              💔 Failed...Please Retry~
            </Button>
          ) : null
        }
      >
        <Row style={{ height: 50 }} align="middle" justify="start" gutter={10}>
          <Col>
            <UserDropdown />
          </Col>
          <Col span={14}>
            <Input
              className="pic-search no-drag"
              placeholder="哈哈哈"
              onKeyPress={(e) => {
                if (e.key === 'Enter') onSearch();
              }}
              onChange={(e) => {
                dispatch(
                  globalActions.setState({
                    query: { ...query, w: e.target.value },
                  })
                );
              }}
              suffix={
                <Space>
                  <Button
                    type="primary"
                    size="small"
                    onClick={onSearch}
                    loading={loading}
                    className="pic-search-btn"
                  >
                    搜索
                  </Button>
                  <Button
                    size="small"
                    shape="circle"
                    type="primary"
                    loading={loading}
                    onClick={refreshTuList}
                    icon={<UndoOutlined />}
                  ></Button>
                </Space>
              }
            />
          </Col>
          <Col>
            <Space>
              <Button
                icon={<ArrowLeftOutlined />}
                disabled={query.start <= 0}
                loading={loading}
                onClick={() => {
                  dispatch(
                    globalActions.setState({
                      query: {
                        ...query,
                        start: query.start - query.size,
                      },
                    })
                  );
                  refreshTuList();
                }}
                shape="circle"
              />
              <Button
                icon={<ArrowRightOutlined />}
                loading={loading}
                onClick={() => {
                  dispatch(
                    globalActions.setState({
                      query: {
                        ...query,
                        start: query.start + query.size,
                      },
                    })
                  );
                  refreshTuList();
                }}
                shape="circle"
              />
            </Space>
          </Col>
        </Row>
        <Row className="pic-wrapper">
          {list
            .filter((item) => item.type !== '.gif')
            .map((item) => (
              <Card
                onDoubleClick={() => onCopyPic(item)}
                className="card-pic"
                key={item.id}
                hoverable
                cover={<img alt="example" src={item.url} />}
              />
            ))}
        </Row>
        <Row style={{ height: 20 }}>
          <div className="tips">
            &gt; 反馈可发邮件到
            <a href="mailto:zhenglfsir@gmail.com">zhenglfsir@gmail.com</a>
            <Button
              style={{ float: 'right' }}
              type="link"
              onClick={() => {
                Modal.warning({
                  title: '暂时无法解决的问题',
                  content: (
                    <div>
                      <p>
                        1. Gif 文件无法支持(Electron NativeImage 无法复制GIF,
                        待解决中)
                      </p>
                    </div>
                  ),
                  onOk: () => message.success('😚😚😚😚 感谢支持~'),
                });
              }}
            >
              局限
            </Button>
          </div>
        </Row>
      </Spin>
    </div>
  );
}

export default MainPage;
