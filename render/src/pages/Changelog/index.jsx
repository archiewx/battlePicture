import { useEffect, useState } from 'react';

function ChangelogPage() {
  const [changelog, setChangelog] = useState(null);

  useEffect(() => {
    import('react-markdown').then(({ default: Markdown }) => {
      setChangelog(<Markdown children={process.env.REACT_APP_CHANGELOG} />);
    });
  }, []);
  return changelog;
}

export default ChangelogPage;
