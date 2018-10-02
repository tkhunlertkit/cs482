var swapElements = {};

var createAccordian = function(accordianElem) {
	let index = $(".accordian").index(accordianElem.prev());
	if (swapElements[index].count % 2 == 0) {
		let temp = swapElements[index].text;
		swapElements[index].text = accordianElem.html();
		accordianElem.html(temp);
	}
	accordianElem.slideToggle(200);
	swapElements[index].count++;
};

$(document).ready(function() {
	$(".accordian").each(function(i, obj) {
		$(this).next().hide();
		swapElements[i] = {
			count: 0,
			text: "Click to reveal the secret",
		};
	});

	$(".accordian").click(function() {
		createAccordian($(this).next());
	});
});
