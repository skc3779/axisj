// 문서가 로드된 이후에 처리되는 함수 정의
$(document).ready(function() {
    // 1레벨 메뉴 클릭시 하위 메뉴 펼치기/접기
    $(".accordion > ul > li > a").on("click", function(){
        var element = $(this).parent("li");
        
        // 하위 메뉴가 펼쳐져 있는 경우
        // 현재의 하위 메뉴는 접음
        if (element.hasClass("open")) {
            element.removeClass("open");
            element.find("li").removeClass("open");
            element.find("ul").slideUp();
        }
        // 하위 메뉴가 졉혀 있는 경우
        // 현재의 하위 메뉴를 펼치면서 다른 하위 메뉴는 접음
        else {
            element.addClass("open");
            element.children("ul").slideDown();
            element.siblings("li").children("ul").slideUp();
            element.siblings("li").removeClass("open");
            element.siblings("li").find("li").removeClass("open");
            element.siblings("li").find("ul").slideUp();
        }
	});
    
    // 문서 로드후 처리
    // 2레벨 메뉴를 모두 접음
    $(".accordion ul ul").hide();
    // 1레벨 메뉴중 “open”으로 되어 있는 메뉴의 하위메뉴를 펼침
    $(".open").children("ul").slideDown();
});