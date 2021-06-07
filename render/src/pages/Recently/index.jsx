import { Card, message, Row } from 'antd';
import { useEffect, useState } from 'react';
import BackButton from '../../components/BackButton';

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
      <BackButton></BackButton>
      <Row className="pic-wrapper">
        {recentlyList.map((url) => (
          <Card
            onDoubleClick={() => onCopyPic(url)}
            className="card-pic"
            key={url}
            hoverable
            cover={<img alt="example" src={url} />}
          />
        ))}
      </Row>
    </div>
  );
}

export default RecentlyPage;
