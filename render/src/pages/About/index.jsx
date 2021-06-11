import { Typography } from 'antd';

function AboutPage() {

  return (
    <Typography>
      <Typography.Title level={4}>关于</Typography.Title>
      <Typography.Paragraph>
        该应用为业务开发，仅为兴趣，有兴趣可联系
        <a href="mailto:zhenglfsir@gmail.com">「我的邮箱」</a>
      </Typography.Paragraph>
      <Typography.Title level={4}>不足</Typography.Title>
      <Typography.Paragraph>
        <ul>
          <li>目前无法复制Gif图片（Electron 的NativeImage的限制）</li>
        </ul>
      </Typography.Paragraph>
    </Typography>
  );
}

export default AboutPage;
