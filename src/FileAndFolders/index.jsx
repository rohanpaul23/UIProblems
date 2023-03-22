import React, { useState } from "react";
import "./filesAndFolders.css";

const FilesAndFolders = ({ data }) => {
  const [showChildren, setShowChildren] = useState(false);

  if (data.isFolder) {
    return (
      <div className="filesAndFolders">
        <span onClick={() => setShowChildren(showChildren => !showChildren)}>
          🗂️{data.name}
        </span>
        {showChildren && (
          <div className="childrenElements">
            {data.items.map(item => {
              return <FilesAndFolders className={"paddingFile"} data={item} />;
            })}
          </div>
        )}
      </div>
    );
  } else {
    return <span className="file">📄 {data.name}</span>;
  }
};

export default FilesAndFolders;
