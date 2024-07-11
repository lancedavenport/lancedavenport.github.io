import { useEffect } from 'react';

export default function Contact() {
  useEffect(() => {
    window.location.href = 'mailto:lance.davenport@icloud.com';
  }, []);

  return (
    <div>
      <h1>Contact Me</h1>
      <p>If your email client did not open, you can reach me at <a href="mailto:lance.davenport@icloud.com">lance.davenport@icloud.com</a>.</p>
    </div>
  );
}
