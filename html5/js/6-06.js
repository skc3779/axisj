// 문서가 로드된 이후에 처리되는 함수 정의
$(document).ready(function() {
    var video = document.getElementById("video1");  
    
    // 동영상의 기초정보를 화면에 디스플레이
    video.addEventListener("loadedmetadata", function () {
        vLength = video.duration.toFixed(0);
        $("#vLength").html(vLength);
        $("#vTime").html("0");
    }, false);
    
    // 동영상의 현재 재생시간을 디스플레이
    video.addEventListener("timeupdate", function () {
        var vTime = video.currentTime;
        $("#vTime").html(vTime.toFixed(0));
    }, false);    
    
    // Play 버튼 클릭시 동영상 재생/일시정지
    $(".btn_play").click(function(){
        // 일시정지 상태인 경우 재생
        if (video.paused) {
            video.play();
            $("#vPlay").html("Pause");
            $("#play").removeClass("btn_play");
            $("#play").addClass("btn_pause");
        } 
        // 재생 상태인 경우 일시정지
        else {
            video.pause();
            $("#vPlay").html("Play");
            $("#play").removeClass("btn_pause");
            $("#play").addClass("btn_play");
        }
        return false;
    });
    
    // Mute 버튼 클릭시 음소거/음재생
    $(".btn_mute").click(function(){
        // 음소거 상태인 경우 음재생
        if (video.muted) {
            video.muted = false;
            video.volume = 1;
            $("#vVolume").html("100%");
        }
        // 음재생 상태인 경우 음소거
        else {
            video.muted = true;
            $("#vVolume").html("0%");
        }
        return false;
    });
    
    // Volumn Down 버튼 클릭시 볼륨 다운
    $(".btn_volumeDown").click(function(){
        // 10%씩 감소
        setVolume(-0.1);
        return false;
    });    
    
    // Volumn Up 버튼 클릭시 볼륨 업
    $(".btn_volumeUp").click(function(){
        // 10%씩 증가
        setVolume(0.1);
        return false;
    });    
    
    // 볼륨 조정
    function setVolume(value) {
        var vol = video.volume;
        vol += value;
        vol = vol.toFixed(1);
        // 볼륨이 0 ~ 1(0% ~ 100%) 사이에서만 조정되도록 처리
        if (vol >= 0 && vol <= 1) {
            video.volume = vol;
        } else {
            video.volume = (vol < 0) ? 0 : 1;                        
        }
        $("#vVolume").html(video.volume * 100 + "%");
    }    
    
    // Play Speed Down 버튼 클릭시 재생속도 다운
    $(".btn_speedDown").click(function(){
        // 1배속씩 감소
        setSpeed(-1);
        return false;
    });    
    
    // Play Speed Up 버튼 클릭시 재생속도 업
    $(".btn_speedUp").click(function(){
        // 1배속씩 증가
        setSpeed(1);
        return false;
    });   
    
    // 재생속도 조정
    function setSpeed(value) {
        var speed = video.playbackRate;
        speed += value;
        // 재생속도가 1 ~ 4배속 사이에서만 조정되도록 처리
        if (speed >= 1 && speed <= 4) {
            video.playbackRate = speed;
        } else {
            video.playbackRate = (speed < 1) ? 1 : 4;                        
        }
        $("#vSpeed").html(video.playbackRate);
    }    
});