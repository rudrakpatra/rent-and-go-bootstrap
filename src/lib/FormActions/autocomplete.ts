

export function autocomplete(element:HTMLElement,props?:{
	data: string[]|string,
	}) {
    function mouseOver(event) {
	}
	function onInvalid(event) {
	}
	function onBlur(event) {
	}
    element.addEventListener('mouseover', mouseOver);
	element.addEventListener('invalid', onInvalid);
	element.addEventListener('blur', onBlur);
	return {
		destroy() {
            element.removeEventListener('mouseover', mouseOver);
			element.removeEventListener('invalid', onInvalid);
			element.removeEventListener('focus', onBlur);
		}
	}
}