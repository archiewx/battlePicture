import { useReduxDispatch } from '@nnwa/redux-saga-actions';
import { UndoOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Input,
  message,
  Pagination,
  Row,
  Space,
  Spin,
} from 'antd';
import { useEffect, useState } from 'react';
import { globalActions } from '../../models/global';
import { useReduxState } from '../../store';

function MainPage() {
  const { sgDoutu, sgLoading } = useReduxState((state) => state.global);
  const dispatch = useReduxDispatch();

  const [isRetry, setRetry] = useState(false);
  const refreshTuList = async () => {
    dispatch(globalActions.setState({ sgLoading: true }));
    const success = await dispatch(globalActions.fetchSogouTuList());
    if (success) {
      dispatch(globalActions.setState({ sgLoading: false }));
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
    window.$api
      .copyRemoteIMG(item)
      .then(() => {
        message.success('已复制粘贴板，CTRL/CMD+C直接使用~');
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  return (
    <div>
      <Spin
        spinning={sgLoading}
        tip={
          isRetry ? (
            <Button type="primary" size="small" onClick={refreshTuList}>
              💔 Failed...Please Retry~
            </Button>
          ) : null
        }
      >
        <Row style={{ height: 50 }} align="middle" justify="space-between">
          <Col span={14}>
            <Input
              className="pic-search no-drag"
              placeholder="哈哈哈"
              onKeyPress={(e) => {
                if (e.key === 'Enter') onSearch();
              }}
              onChange={(e) => {
                dispatch(globalActions.updateQuery({ query: e.target.value + ' 表情' }));
              }}
              suffix={
                <Space>
                  <Button
                    type="primary"
                    size="small"
                    onClick={onSearch}
                    loading={sgLoading}
                    className="pic-search-btn"
                  >
                    搜索
                  </Button>
                  <Button
                    size="small"
                    shape="circle"
                    type="primary"
                    loading={sgLoading}
                    onClick={refreshTuList}
                    icon={<UndoOutlined />}
                  ></Button>
                </Space>
              }
            />
          </Col>
          <Col>
            <Pagination
              className="no-drag"
              simple
              current={sgDoutu.query.start / 48 + 1}
              total={sgDoutu.total}
              pageSize={48}
              onChange={(page) => {
                dispatch(globalActions.setPage({ page }));
                refreshTuList();
              }}
            />
          </Col>
        </Row>
        <Row className="pic-wrapper">
          {sgDoutu.list
            .filter((item) => item.type !== '.gif')
            .map((item) => (
              <Card
                onDoubleClick={() => onCopyPic(item)}
                className="card-pic"
                key={item.docId}
                hoverable
                cover={<img alt="example" src={item.thumbUrl} />}
              />
            ))}
        </Row>
        <Row style={{ height: 20 }}>
          <div className="tips">
            &gt; 反馈可发邮件到
            <a href="mailto:zhenglfsir@gmail.com">zhenglfsir@gmail.com</a>
          </div>
        </Row>
      </Spin>
    </div>
  );
}

export default MainPage;
