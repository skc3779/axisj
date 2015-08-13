$(function () {

    setDateField();

    hideLoading();

    $("#dealerCode").change();

    /*조회*/
    $(document).on('click', "#search", function () {
        $("#selectGroup").val($("#dealerCode").val());
        showLoading();
        $("form[name=frm]").prop("action", "/venis/crm/custmaster/custsearch/salesCust.do").submit();
    });

    /*SMS전송*/
    // 		$("#smsSend").on('click', function(){
    // 		});
    /*DM발송*/
    // 		$("#dmSend").on('click', function(){
    // 		});
    /*숫자만 입력*/
    $(document).on('keyup', "[onlyNum2=Y]", function () {
        $(this).val($(this).val().replace(/[^0-9]/g, ""));
    });

    /*전체 체크 */
    $(document).on('click', "#chkAll", function () {
        if ($("#chkAll").is(":checked") == true) {
            $("#chkAll").prop("checked", true);
            $("[name=chk]").prop("checked", true);
            $("[name=arrChkValue]").val("Y");
            $("[name=arrChkSms]").val("Y");
        } else {
            $("#chkAll").prop("checked", false);
            $("[name=chk]").prop("checked", false);
            $("[name=arrChkValue]").val("N");
            $("[name=arrChkSms]").val("N");
        }
    });

    /*부분 체크 */
    $(document).on('click', "[name=chk]", function () {
        var index = $("[name=chk]").index(this);
        if ($("[name=chk]").eq(index).is(":checked") == true) {
            $("[name=arrChkValue]").eq(index).val("Y");
            $("[name=arrChkSms]").eq(index).val("Y");
        } else {
            $("[name=arrChkValue]").eq(index).val("N");
            $("[name=arrChkSms]").eq(index).val("N");
        }
    });

    /*데이터 수정여부*/
    $(document).on('keypress', "#masterTable input", function () {
        var tr = $(this).parent().parent();
        $("[name=chk]").eq(tr.index() - 2).prop("checked", true);
        $("[name=arrChkValue]").eq(tr.index() - 2).val("Y");
        $("[name=arrChkSms]").eq(tr.index() - 2).val("Y");
    });

    /*담당SC*/
    $(document).on('change', "#dealerCode", function () {
        var index = $("[name=searchDealer]").index(this);
        var dealerCode = $("[name=searchDealer]").eq(index).val();
        $("[name=searchScId]").eq(index).find("option").remove();

        $.ajax({
            type: "POST",
            dataType: "json",
            async: false,
            url: "/venis/crm/custmaster/custsearch/getScCode.do",
            data: "dealerCode=" + dealerCode,
            success: function (data) {
                if (data.resutValueFg == 'N') {
                } else {
                    $("[name=searchScId]").eq(index).append("<option value = '" + "" + "'>" + "ALL" + "</option>");
                    for (var i = 0; i < data.scCodeListSize; i++) {
                        setScCd = data.scCodeList[i].code;
                        setScNm = data.scCodeList[i].codeNm;

                        $("[name=searchScId]").eq(index).append("<option value = '" + setScCd + "'>" + setScNm + "</option>");
                    }
                }
            },
            error: function (request, status) {
                return;
            }
        });
    });

    // calendar
    $("#searchToDt").bindTwinDate({
        startTargetID: "searchFrDt",
        handleLeft: 25,
        align: "right",
        valign: "bottom",
        separator: "-",
        buttonText: "선택",
        onchange: function () {
            // toast.push(Object.toJSON(this));
        }
    });
    // 판매일자
    $("#searchFrDt").val((new Date).date().add(-1, 'm').print("yyyy-mm-dd"));
    $("#searchToDt").val((new Date).print("yyyy-mm-dd"));

});

/*고객성향등록 popup*/
function fn_Detail(contractNo) {
    NewWindow("/venis/crm/custmaster/custsearch/popupCustTrait.do?searchContract=" + contractNo, "", "500", "500", "yes", "yes");
}

function fn_send() {
    var sendType = $("#sendType").val();

    if (sendType == "S") {
        smsSend2("b", "CustSearch.getSalesCustList");
    }
}
/**
 * Created by skc37_000 on 2015-08-13.
 */
