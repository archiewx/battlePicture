import { LeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useHistory } from 'react-router';

function BackButton({ children }) {
  const history = useHistory();

  return (
    <div>
      <Button type="primary" shape="round" onClick={() => history.goBack()}>
        <LeftOutlined />
        返回
      </Button>
      {children}
    </div>
  );
}

export default BackButton;
