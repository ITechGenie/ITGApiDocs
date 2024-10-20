import React, { useState, useEffect } from "react";
import "rapidoc"; // <-- import rapidoc

const SwaggerViewer = ({ swaggerUrl }) => {
  const [url, setUrl] = useState(swaggerUrl);
  console.log("Otained swagger url: ", swaggerUrl);
  useEffect(() => {
    setUrl(swaggerUrl);
  }, [swaggerUrl]);

  return (
    <div style={{ marginTop: "20px" }}>
      {url && <rapi-doc spec-url={url} theme="light" render-style="read" style={{ width: "100%", height: "600px" }} />}
    </div>
  );
};

export default SwaggerViewer;
