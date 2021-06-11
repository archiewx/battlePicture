import { ClearOutlined } from '@ant-design/icons';
import { Card, message, Row, Button } from 'antd';
import { useEffect, useState } from 'react';

function RecentlyPage() {
  const [recentlyList, setRecentlyList] = useState([]);
  const refreshRecentlyList = async () => {
    const list = await window.$api.getAppIMAGEList();
    setRecentlyList(list);
  };
  useEffect(() => {
    refreshRecentlyList();
  }, []);

  const onCopyPic = (url) => {
    window.$api
      .copyRemoteIMG(url)
      .then(() => {
        message.success('已复制粘贴板，CTRL/CMD+C直接使用~');
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  return (
    <div>
      <Row className="pic-wrapper">
        {recentlyList.map((url, idx) => (
          <Card
            onDoubleClick={() => onCopyPic(url)}
            className="card-pic"
            key={url + idx}
            hoverable
            cover={<img alt="example" src={url} />}
          />
        ))}
      </Row>
      <Row style={{ marginTop: 10 }}>
        <Button icon={<ClearOutlined />} shape="round">清空</Button>
      </Row>
    </div>
  );
}

export default RecentlyPage;
