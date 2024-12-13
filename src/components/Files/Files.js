import React, {useState} from "react";
import { connect } from "react-redux";
import FileUpload from "./FileUpload";
import FileLayout from './FileLayout';
import FilesSidebar from "./FilesSidebar";

function Files({ userInfo, isLoading }) {
  const [search, setSearch] = useState("")
  if (isLoading) {
    return (
      <div>
        <h1>Loading Files...</h1>
      </div>
    );
  }
  console.log(search);

  return (
    <div>
      <h1>Files Component</h1>
      <FileUpload userId={userInfo?.userid} /> 
      <div className="contain">
        <div className="filesSideContainer">
          <FilesSidebar setSearch={setSearch} search={search}/>
        </div>
        <div className="displayFiles">
          {Object.keys(userInfo.files).map((file) => {
              let currentFile = userInfo.files[file]
              let fileName = currentFile.originalName.toLowerCase();
              return fileName.includes(search) ? (
                <FileLayout file={currentFile} key={file} />
              ) : null
          })}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfoState, 
  isLoading: state.filesState === null || state.userInfoState === null, 
});

export default connect(mapStateToProps)(Files);
