

export function validation(element:HTMLElement,props:{title:string}) {
    function mouseOver(event) {
		element.setAttribute('title', "");
	}
	function onInvalid(event) {
		event.target.setAttribute('title', props.title);
	}
	function onBlur(event) {
		event.target.setAttribute('title', "");
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