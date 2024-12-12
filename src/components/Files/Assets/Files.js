import React from "react";
import { connect } from "react-redux";
import FileUpload from "./FileUpload";
import FileLayout from "./FileLayout";

function Files({ userInfo, isLoading }) {
  if (isLoading) {
    return (
      <div>
        <h1>Loading Files...</h1>
      </div>
    );
  }
  console.log(userInfo);

  return (
    <div>
      <h1>Files Component</h1>
      <FileUpload userId={userInfo?.userid} /> 
      <div className="displayFiles">
        {Object.keys(userInfo.files).map((file) => {
            let currentFile = userInfo.files[file]
            return <FileLayout file={currentFile}/>
        })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfoState, 
  isLoading: state.filesState === null || state.userInfoState === null, 
});

export default connect(mapStateToProps)(Files);
