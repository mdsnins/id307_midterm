var timeoutId = 0;
var slider_height = 0;
var slider_width = 0;

/* long click implementation, from stackoverflow */
function bind_longclick(obj, func, duration=750){
    obj.on('mousedown', function() {
        timeoutId = setTimeout(func, duration);
    }).on('mouseup mousemove', function() {
        clearTimeout(timeoutId);
    });
    obj.on('touchstart', function() {
        timeoutId = setTimeout(func, duration);
    }).on('touchend touchmove', function() {
        clearTimeout(timeoutId);
    });
}

function bind_slider(obj, val=10, func=null) {
    console.log("hi");
    obj.slider({
      range:"min",  
      min: 0,
      max: 100,
      value: 10,
      step: 1,
      slide: func
    });
}

function bind_v_slider(obj, val=10) {
    obj.slider({
      orientation: "vertical",
      value: val,
      min: 0,
      max: 30,
      step: 1,
      slide: function(event, ui) {
        var new_height = ui.value * slider_height / 30;
        $(this).height(new_height);
        if(new_height > slider_height - 15)
            $(this).css("border-radius", "15px 15px 15px 15px");
        else if (new_height < 10)
            $(this).hide();
        else 
            $(this).css("border-radius", "0px 0px 15px 15px");
      }
    });
}

function init() {

    /* initialize view port */
    $(".viewport").height($(".viewport").width() * 2);
    $(".display-region").width($(".mockup").width());
    $(".display-region").height($(".mockup").height());

    $(".display-region").click(change_to_main);

    $(".btn-toggle").click(toggle);
    $("#view_main .playback-toggle").click(music_playback);
    $("#play").click(music_play);


    /* slider */
    bind_slider($("#music_prog_slider"), 33, sample_music_slider);
    bind_v_slider($("#brg_slider"));
    bind_v_slider($("#vol_slider"), 15);

    bind_longclick($("#toggle_wifi"), function(){alert('wifi');});
    bind_longclick($("#toggle_bt"), function(){alert('bt');});
    bind_longclick($("#panel_music"), change_to_music);

    bind_longclick($("#brg_whole_slider"), function(){alert('brg');});
    bind_longclick($("#vol_whole_slider"), function(){alert('vol');});

    var elem = $("#view_main").detach();
    $("#container").append(elem);
    view_main_update();

    //change_to_music();
    $("#loader").remove();
}

function change_to_main(e)
{
    if ($(e.target).closest('#view_music').length)
        return false;
    var elem=$("#container").children().first().detach();
    $(".views").append(elem);

    elem=$("#view_main").detach();
    $("#container").append(elem);

    view_main_update();

}

function change_to_music()
{
    var elem=$("#container").children().first().detach();
    $(".views").append(elem);

    elem=$("#view_music").detach();
    $("#container").append(elem);

    view_music_update();

}

function view_main_update() {
    /* main screen setting */
    $(".v-grid").height($(".mockup").height() * 0.4);
    slider_height = $("#brg_whole_slider").parent().height();
}

function view_music_update() {
    /* music screen setting */
    $("#view_music > .content-region").height($(".mockup").height() * 0.7);
    $(".music-cover-art").height($(".music-cover-art").width());    


    slider_width = $("#music_prog_whole_slider").width();
}

function music_play() {
    var t = $(this);

    if(t.hasClass("fa-play")) {
        t.removeClass("fa-play");
        t.addClass("fa-pause");
    }
    else {
        t.removeClass("fa-pause");
        t.addClass("fa-play");
    }
}

function sample_music_slider(event, ui) {
    cur_progress = parseInt(194 * ui.value / 100);
    remain_progress = 194 - cur_progress;

    cur = sec2minsec(cur_progress);
    rem = sec2minsec(remain_progress);

    cur_string = `${cur['m']}:${cur['s']}`;
    rem_string = `-${rem['m']}:${rem['s']}`;

    $("#music_prog_cur").text(cur_string);
    $("#music_prog_remain").text(rem_string);
}

function sec2minsec(sec) {
    var _m = parseInt(sec / 60);
    var _s = sec % 60;

    _m = `${_m}`
    _s = `0${_s}`.slice(-2);
    
    return {"m":_m, "s":_s};
}

function music_playback() {
    var title = $(".sec-music-title");

    if(title.text() === "하늘 위로")
        title.text("Airplane");
    else
        title.text("하늘 위로");
}

function toggle() { 
    var t = $(this);

    if(t.hasClass("enabled")) {
        t.removeClass("enabled");
        t.addClass("disabled");
    }
    else {
        if(t.hasClass("disabled"))
            t.removeClass("disabled");
        t.addClass("enabled");
    }
}


$(document).ready(init);