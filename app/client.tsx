import React from "react";

export default function ClientGlobally() {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `<!-- Google tag (gtag.js) --> <script async src="https://www.googletagmanager.com/gtag/js?id=G-18DYVJD5LR"></script> <script> window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-18DYVJD5LR'); </script>`,
      }}
    />
  );
}
