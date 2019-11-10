function rotate(obj, rot_stt, rot_end, step=null, intv=6) {
	if(step == null)
		step = (rot_end - rot_stt) > 0 ? 1 : -1;

	var rot_intv;
	var cur = rot_stt;

	function real_rotate() {
		if(cur == rot_end)
			clearInterval(rot_intv);
		obj.css("-webkit-transform", "rotate(" + cur.toString() + "deg)");
		cur += step;
	}

	rot_intv = setInterval(real_rotate, intv);
}

function pop_view(obj) {
    obj.addClass("popping");
    setTimeout(function() {
        obj.removeClass("popping");
    }, 700);
}
