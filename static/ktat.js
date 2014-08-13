/**
 * Created by samuelraker on 8/11/14.
 */
(function() {
    "use strict";
    $(document).ready(function() {
        var theObj, data, setOpts, ajOpts, suggTexts;

        theObj = {

            suggTexts : ["What about...", "How about...", "Why not get...", "Check it out:", "You'll look sweet with...",
            "Impress your friends with...", "Intimidate your foes with...", "Prove your cred with...", "Rock on with...",
            "Keep it real with...", "Stick it to The Man with...", "Fight the power with..."],

            data : {"jsonrpc": "2.0",
                "method": "ktat.get",
                "params": {"method": "fours",
                    "dupes": true},
                "id": 1},

            setOpts : function (opt, val) {
                theObj.data.params[opt] = val;
                console.log(theObj.data);
                return data;
                }
            };
        $("#opts").hide();
        $("#creds").hide();
        $("#setFour").on('click', function () {
            theObj.setOpts("method", "fours");
            $("#dupes").show();
            $("#setEight").removeClass("active");
            $(this).addClass('active');
        });
        $("#yesDupes").on('click', function () {
            theObj.setOpts("dupes", true);
            $("#noDupes").removeClass("active");
            $(this).addClass("active");
        });
        $("#noDupes").on('click', function () {
            theObj.setOpts("dupes", false);
            $("#yesDupes").removeClass("active");
            $(this).addClass("active");
        });
        $("#setEight").on('click', function () {
            theObj.setOpts("method", "eights");
            $("#setFour").removeClass("active");
            $(this).addClass("active");
            $("#dupes").hide();
        });
        $("#go").on('click', function () {
            $("#err").hide();
            $.ajax({contentType: "application/json",
                dataType: "json",
                parseData: false,
                type: "POST",
                url: location.origin + "/api/",
                data: JSON.stringify(theObj.data)})
                .done(function (data) {
                    $("#sugg-div").show();
                    $("#sugg").text(theObj.suggTexts[Math.floor(Math.random() * theObj.suggTexts.length)]);
                    $("#left").text(data.result.left);
                    $("#right").text(data.result.right);
                }).fail(function (req, s, err) {
                    $("#err").show();
                    $("#error").text(err);
                });
        });
        $(".opts-div").hover(
            function () {
                $("#opts").show();
                $("#options").css({"color": "#000"});
            },
            function () {
                $("#opts").hide();
                $("#options").css({"color": "#ddd"});
            });
        $("#credits-div").hover(
            function () {
                $("#creds").show();
                $("#credits").css({"color": "#000"});
            },
            function () {
                $("#creds").hide();
                $("#credits").css({"color": "#ddd"});
            });
    });
})();