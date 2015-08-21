$(document).ready(function() {
    var video = document.getElementById("video-full");  
    
    // 동영상이 준비되고 나면 화면크기에 맞도록 크기 조정
    video.addEventListener("loadedmetadata", function () {
    	setVideoFullsize();
    }, false);
    
    // 윈도우 크기가 변경되면 화면크기에 맞도록 크기 조정
    $(window).resize(function(){
    	setVideoFullsize();
    }).resize();  
    
    // 동영상 크기 조정
    function setVideoFullsize() {
		video.height = $(window).height() - 70;
    }
});