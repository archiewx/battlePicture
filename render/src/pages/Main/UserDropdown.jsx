import { UserOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import { useHistory } from 'react-router';

function UserDropdown() {
  const history = useHistory();

  return (
    <Dropdown
      trigger={['click']}
      overlay={
        <Menu onClick={(e) => history.push(e.key)}>
          <Menu.ItemGroup title="功能">
            <Menu.Item key="/recently">最近使用</Menu.Item>
          </Menu.ItemGroup>
        </Menu>
      }
    >
      <UserOutlined />
    </Dropdown>
  );
}
export default UserDropdown;
