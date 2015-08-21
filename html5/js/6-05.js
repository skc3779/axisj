// 문서가 로드된 이후에 처리되는 함수 정의
$(document).ready(function() {
    // 이미지 슬라이더 생성
    $("#slider").imageSlides({
        speed: 500,
        namespace: "slider",
    });
});
    
// 이미지 슬라이더 함수
(function ($, window, i) {
    $.fn.imageSlides = function (options) {
        // 기본 설정
        var settings = $.extend({
            // 변환효과 시간
            "speed": 500,
            // 이미지 슬라이드명
            "namespace": "slider",
            // callback 함수
            "before": $.noop,
            "after": $.noop
        }, options);

        return this.each(function () {
            i++;

            var $this = $(this),

            // 변수
            vendor,
            index = 0,
            $slide = $this.children(),
            length = $slide.size(),
            fadeTime = parseFloat(settings.speed),

            // 슬라이더명
            namespace = settings.namespace,
            namespaceIdx = namespace + i,

            // CSS 클래스
            navClass = namespace + "_nav " + namespaceIdx + "_nav",
            visibleClass = namespaceIdx + "_on",
            slideClassPrefix = namespaceIdx + "_s",

            // 슬라이드 보여주기/숨기기 스타일
            visible = {"float": "left", 
                       "position": "relative", 
                       "opacity": 1, "zIndex": 2},
            hidden = {"float": "none", 
                      "position": "absolute", 
                      "opacity": 0, "zIndex": 1},

            // 변환효과 지원여부 검사
            supportsTransitions = (function () {
                var docBody = document.body || document.documentElement;
                var styles = docBody.style;
                var prop = "transition";
                if (typeof styles[prop] === "string") {
                    return true;
                }
                vendor = ["Moz", "Webkit", "Khtml", "O", "ms"];
                prop = prop.charAt(0).toUpperCase() + prop.substr(1);
                var i;
                for (i = 0; i < vendor.length; i++) {
                    if (typeof styles[vendor[i] + prop] === "string") {
                        return true;
                    }
                }
                return false;
            })(),

            // 이미지 바꾸기시 애니메이션 처리
            slideTo = function (idx) {
                settings.before(idx);
                // CSS3 변환효과 지원시
                if (supportsTransitions) {
                    $slide
                        .removeClass(visibleClass)
                        .css(hidden)
                        .eq(idx)
                        .addClass(visibleClass)
                        .css(visible);
                    index = idx;
                    setTimeout(function () {
                        settings.after(idx);
                    }, fadeTime);
                // CSS3 변환효과 지원하지 않으면 jQuery 기능 사용
                } else {
                    $slide
                        .stop()
                        .fadeOut(fadeTime, function () {
                            $(this)
                                .removeClass(visibleClass)
                                .css(hidden)
                                .css("opacity", 1);
                        })
                        .eq(idx)
                        .fadeIn(fadeTime, function () {
                            $(this)
                                .addClass(visibleClass)
                                .css(visible);
                            settings.after(idx);
                            index = idx;
                        });
                }
            };

            // 각 슬라이드에 ID 부여
            $slide.each(function (i) {
                this.id = slideClassPrefix + i;
            });

            // 첫번째만 남기고 모두 숨기기
            $slide.hide().css(hidden).eq(0)
                .addClass(visibleClass).css(visible).show();

            // CSS 변환효과
            if (supportsTransitions) {
                $slide.show().css({
                    "-webkit-transition": "opacity "
                        + fadeTime + "ms ease-in-out",
                    "-moz-transition": "opacity "
                        + fadeTime + "ms ease-in-out",
                    "-o-transition": "opacity "
                        + fadeTime + "ms ease-in-out",
                    "transition": "opacity "
                        + fadeTime + "ms ease-in-out"
                    });
            }

            // 이미지가 하나 이상일때
            if ($slide.size() > 1) {
                // 네비게이션
                var navMarkup =
                    "<a href='#' class='" + navClass + " prev'></a>" +
                    "<a href='#' class='" + navClass + " next'></a>";

                // 네비게이션 추가
                $this.after(navMarkup);

                var $trigger = $("." + namespaceIdx + "_nav"),
                $prev = $trigger.filter(".prev");

                // 네비게이션 클릭시 수행
                $trigger.bind("click", function (e) {
                    e.preventDefault();

                    var $visibleClass = $("." + visibleClass);

                    // 보여줄 슬라이드 결정
                    var idx = $slide.index($visibleClass),
                    prevIdx = idx - 1,
                    nextIdx = idx + 1 < length ? index + 1 : 0;

                    // 슬라이드 이동
                    slideTo($(this)[0] === $prev[0] ? prevIdx : nextIdx);
                });
            }
        });
    };
})(jQuery, this, 0);