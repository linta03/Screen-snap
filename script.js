const screenShotBtn = document.querySelector(".scr-btn");
const screenshotPreview = document.querySelector(".screen-preview");
const closeButton = document.querySelector("#close-btn");
const download = document.querySelector("#download-img");

const captureScreen = async () => {
  try {
    //Permission of taking screenshot
    const stream = await navigator.mediaDevices.getDisplayMedia({
      preferCurrentTab: true,
    });
    //basically a screenshot that we will embed in our page
    const video = document.createElement("video");

    //When screenshort/video is loaded 
    video.addEventListener("loadedmetadata", () => {
      const canvas = document.createElement("canvas");
      //returns  canvas ===>> getContext()
      const ctx = canvas.getContext("2d");

     //passing videowidth and height as canvas widthy and height
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      //Playing video so that our screenshot cannot be null or blank
      video.play()
      //Draw img from captured video stream drawimg(image/video ,x-coordinate, y-Coordinate , width,height)
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      //Getvideotracks()  return an array of tracks of this stream
       stream.getVideoTracks()[0].stop();//Terminating first video track of the stream
       //to dataUrl returns url of the drawed img
      let imgSrc = canvas.toDataURL();
      screenshotPreview.querySelector("img").src=imgSrc;  //passing img url to img source For displaying in our page
      screenshotPreview.classList.add("showimg");
     download.href=imgSrc; //passing img url to a href For downloading 

    });
    video.srcObject = stream;//Passing captured stream data as video source
    
  } catch (error) {
    console.log(error);
    alert("Sorry Screenshot Captured Failed!!!")
  }
};
closeButton.addEventListener("click",()=>screenshotPreview.classList.toggle("showimg"))
screenShotBtn.addEventListener("click", captureScreen);
