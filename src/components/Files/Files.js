import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import FileUpload from "./FileUpload";
import FileLayout from './FileLayout';
import FilesSidebar from "./FilesSidebar";
import FilesHeader from "./FilesHeader";

function Files({ userInfo, isLoading }) {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("alasc")
  const [imageSize, setImageSize] = useState("sm")
  const [showDot, setShowDot] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowDot((prev) => !prev); 
    }, 1000); 

    return () => clearInterval(interval); 
  }, []);

  useEffect(() => {
    const dotColorMap = {
      sm: "🔵", 
      md: "🔴", 
      lg: "🟢", 
    };

    const dot = dotColorMap[imageSize] || "";
    document.title = showDot ? `${dot} ${imageSize.toUpperCase()} View` : `${imageSize.toUpperCase()} View`;
  }, [showDot, imageSize]);

  if (isLoading) {
    return (
      <div>
        <h1>Loading Files...</h1>
      </div>
    );
  }

  let sortedFiles = Object.keys(userInfo.files).map((file) => userInfo.files[file]);

  if (filter) {
    sortedFiles.sort((a, b) => {
      switch (filter) {
        case "cdasc": 
          return b.createdAt - a.createdAt;
        case "cddes": 
          return a.createdAt - b.createdAt;
        case "laasc": 
          return b.modifiedAt - a.modifiedAt;
        case "lades": 
          return a.modifiedAt - b.modifiedAt;
        case "alasc": 
          return a.originalName.toLowerCase().localeCompare(b.originalName.toLowerCase());
        case "aldes": 
          return b.originalName.toLowerCase().localeCompare(a.originalName.toLowerCase());
        default:
          return 0;
      }
    });
  }

  return (
    <div style={{marginBottom:"75px", paddingTop: "15px"}}>
      <FilesHeader filter={filter} setFilter={setFilter} imageSize={imageSize} setImageSize={setImageSize}/>
      <FileUpload userId={userInfo?.userid} /> 
      <div className="contain">
        <div className="filesSideContainer">
          <FilesSidebar setSearch={setSearch} search={search}/>
        </div>
        <div className={`displayFiles ${imageSize}`}>
          {sortedFiles.map((file) => {
            let fileName = file.originalName.toLowerCase();
            return fileName.includes(search) ? (
              <FileLayout file={file} key={file.imageId} imageSize={imageSize}/>
            ) : null;
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
