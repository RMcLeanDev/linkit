export const getFileMetadata = (file) => {
    return new Promise((resolve) => {
      if (file.type.startsWith("image/")) {
        const img = new Image();
        const reader = new FileReader();
  
        reader.onload = (e) => {
          img.src = e.target.result;
        };
  
        img.onload = () => {
          resolve({
            width: img.width,
            height: img.height,
            size: file.size,
            type: file.type,
            duration: null, 
          });
        };
  
        reader.readAsDataURL(file);
      } else if (file.type.startsWith("video/")) {
        const video = document.createElement("video");
        const reader = new FileReader();
  
        reader.onload = (e) => {
          video.src = e.target.result;
          video.preload = "metadata";
        };
  
        video.onloadedmetadata = () => {
          resolve({
            width: video.videoWidth,
            height: video.videoHeight,
            size: file.size,
            type: file.type,
            duration: video.duration.toFixed(2),
          });
        };
  
        reader.readAsDataURL(file);
      } else {
        resolve({
          width: null,
          height: null,
          size: file.size,
          type: file.type,
          duration: null,
        });
      }
    });
  };
  