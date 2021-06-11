import {
  ReconciliationOutlined,
  RocketOutlined,
  SmileOutlined,
  SoundOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';

function RenderLayout({ children }) {
  const history = useHistory();
  const location = useLocation();

  return (
    <Layout className="layout">
      <Layout.Sider theme="light" width={120} className="layout-aside">
        <Menu
          style={{ height: '100%' }}
          selectedKeys={[location.pathname]}
          onClick={(e) => history.push(e.key)}
        >
          <Menu.Item key="/" icon={<SmileOutlined />}>
            斗图
          </Menu.Item>
          {/* <Menu.Item key="/recently" icon={<ReconciliationOutlined />}>
            最近使用
          </Menu.Item> */}
          <Menu.Item key="/about" icon={<RocketOutlined />}>
            关于
          </Menu.Item>
          <Menu.Item key="/changelog" icon={<SoundOutlined />}>
            更新日志
          </Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout.Content className="layout-body">{children}</Layout.Content>
    </Layout>
  );
}

export default RenderLayout;
