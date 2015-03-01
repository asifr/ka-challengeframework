// function updateTypes (r, elm) {
// 	for (var i = 0; i < elm.length; i++) {
// 		if (elm[i].selected) {
// 			r[r.length] = elm[i].value;
// 		};
// 	};
// 	return r;
// };


function updateTypes (req, blk) {
	elms = $("#types input[type=radio]").filter(":checked");

	for (var i = 0; i < elms.length; i++) {
		if (elms[i].value == 1) { req[req.length] = elms[i].name; };
		if (elms[i].value == 0) { blk[blk.length] = elms[i].name; };
	};
	return [req, blk];
};