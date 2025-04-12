let currentTargetContainer = null;
let currentWidths = [];

window.addEventListener('DOMContentLoaded', () => {
	const editor = document.getElementById('editor');
	const wrapper = document.createElement('div');
	wrapper.classList.add('content');
	wrapper.style.maxWidth = '800px';
	wrapper.style.margin = '0 auto';
	wrapper.style.backgroundColor = '#ffffff';
	wrapper.style.padding = '20px';
	wrapper.addEventListener('click', (e) => {
		e.stopPropagation();
		selectBlock(wrapper);
	});
	editor.appendChild(wrapper);
});

function addBlock(type) {
	const container = currentTargetContainer || document.querySelector('.content');
	let block;

	switch (type) {
		case 'heading':
			block = document.createElement('h2');
			block.contentEditable = true;
			block.innerText = 'Naslov...';
			block.classList.add('block-heading');
			break;
		case 'paragraph':
			block = document.createElement('p');
			block.contentEditable = true;
			block.innerText = 'Ovde ide paragraf...';
			block.classList.add('block-paragraph');
			break;
		case 'image':
			const url = prompt('Unesi URL slike:');
			if (!url) return;
			block = document.createElement('img');
			block.src = url;
			block.style.maxWidth = '100%';
			block.classList.add('block-image');
			break;
		default:
			return;
	}

	block.classList.add('editor-block');
	block.addEventListener('click', (e) => {
		e.stopPropagation();
		selectBlock(block);
	});

	container.appendChild(block);
}
function selectBlock(block) {
	document.querySelectorAll('.selected-block').forEach(el => el.classList.remove('selected-block'));
	block.classList.add('selected-block');
	currentTargetContainer = block;

	const panel = document.getElementById('settingsPanel');
	panel.innerHTML = '';

	if (block.tagName === 'H2' || block.tagName === 'P') {
		const input = document.createElement('textarea');
		input.value = block.innerText;
		input.oninput = () => block.innerText = input.value;
		panel.appendChild(input);

		const controls = document.createElement('div');
		controls.innerHTML = `
			<fieldset class="settings-column">
				<legend>Font:</legend>
				<div class="w-full between">
					<p>Veličina fonta:</p>
					<input type="number" value="${parseInt(block.style.fontSize) || 16}" id="fontSizeControl" class="w-50">
				</div>
				<div class="w-full between">
					<p>Boja teksta:</p>
					<input type="color" value="${block.style.color || '#000000'}" id="colorControl" class="w-50">
				</div>
				<div class="w-full between">
					<p>Pozadina teksta:</p>
					<input type="color" value="${block.style.backgroundColor || '#ffffff'}" id="bgColorTextControl"	class="w-50">
				</div>
			</fieldset>
			<fieldset class="settings-row">
				<legend>Poravnanje:</legend>
				<button id="alignLeft" title="Levo" class="square-button">
					<img src="../../../public/icon/text-left.svg" width="20" height="20" alt="Levo" />
				</button>
				<button id="alignCenter" title="Centar" class="square-button">
					<img src="../../../public/icon/text-center.svg" width="20" height="20" alt="Centar" />
				</button>
				<button id="alignRight" title="Desno" class="square-button">
					<img src="../../../public/icon/text-right.svg" width="20" height="20" alt="Desno" />
				</button>
			</fieldset>
			<fieldset class="settings-row">
				<legend>Stil fonta:</legend>
				<button id="boldBtn" title="Podebljano" class="square-button">
					<img src="../../../public/icon/bold.svg" width="20" height="20" alt="Podebljano" />
				</button>
				<button id="italicBtn" title="Iskošeno" class="square-button">
					<img src="../../../public/icon/italic.svg" width="20" height="20" alt="Iskošeno" />
				</button>
				<button id="underlineBtn" title="Podvučeno" class="square-button">
					<img src="../../../public/icon/underline.svg" width="20" height="20" alt="Podvučeno" />
				</button>
			</fieldset>
		`;
		panel.appendChild(controls);

		document.getElementById('fontSizeControl').oninput = (e) => block.style.fontSize = `${e.target.value}px`;
		document.getElementById('colorControl').oninput = (e) => block.style.color = e.target.value;
		document.getElementById('bgColorTextControl').oninput = (e) => block.style.backgroundColor = e.target.value;
		document.getElementById('alignLeft').onclick = () => block.style.textAlign = 'left';
		document.getElementById('alignCenter').onclick = () => block.style.textAlign = 'center';
		document.getElementById('alignRight').onclick = () => block.style.textAlign = 'right';
		document.getElementById('boldBtn').onclick = () => block.style.fontWeight = block.style.fontWeight === 'bold' ? 'normal' : 'bold';
		document.getElementById('italicBtn').onclick = () => block.style.fontStyle = block.style.fontStyle === 'italic' ? 'normal' : 'italic';
		document.getElementById('underlineBtn').onclick = () => block.style.textDecoration = block.style.textDecoration === 'underline' ? 'none' : 'underline';
	} else if (block.tagName === 'IMG') {
		const input = document.createElement('input');
		input.type = 'text';
		input.value = block.src;
		input.oninput = () => block.src = input.value;
		panel.appendChild(input);
	} else if (block.classList.contains('column')) {
		const controls = document.createElement('div');
		controls.innerHTML = `
			<fieldset class="settings-row">
				<legend>Pozadina:</legend> 
				<input type="color" value="${block.style.backgroundColor || '#ffffff'}" id="bgColorControl">
			</fieldset>
			<fieldset class="settings-row">
				<legend>Visina:</legend>
				<label>Visina (px): <input type="number" id="heightControl" value="${parseInt(block.style.height) || 100}" class="w-50"></label>
			</fieldset>
			<fieldset class="settings-row">
				<legend>Border podešavanja:</legend>
				<div class="w-full settings-column">
					<div class="w-full between">
						<p>Stil linije:</p>
						<select id="borderStyle" class="w-100">
							<option value="none">None</option>
							<option value="solid">Solid</option>
							<option value="dashed">Dashed</option>
							<option value="dotted">Dotted</option>
						</select>
					</div>					
					<div class="w-full between" style="display: none;">
						<p>Debljina (px):</p>
						<input type="number" id="borderWidth" value="1" min="0" class="w-50">
					</div>
					<div class="w-full between" style="display: none;">
						<p>Boja:</p>
						<input type="color" id="borderColor" value="#cccccc" class="w-50">
					</div>
					<div class="w-full between" style="display: none;">
						<p>Primeni za sve strane</p>
						<input type="checkbox" id="borderUniform" checked />
					</div>
					<div id="individualBorderSettings" style="display: none; margin-top: 8px;" class="w-full">
						<fieldset class="settings-column w-full">
							<legend>Gornja ivica:</legend>
							<div class="w-full between">
								<div class="w-half between">
									<p>Debljina (px):</p>
									<input type="number" id="borderTopWidth" value="1" min="0" style="width: 50px;" />
								</div>
								<div class="w-half between">
									<p>Boja:</p>
									<input type="color" id="borderTopColor" value="#cccccc" style="width: 50px;" />
								</div>
							</div>
						</fieldset>
						<fieldset class="settings-column w-full">
							<legend>Desna ivica:</legend>
							<div class="w-full between">
								<div class="w-half between">
									<p>Debljina (px):</p>
									<input type="number" id="borderRightWidth" value="1" min="0" style="width: 50px;" />
								</div>
								<div class="w-half between">
									<p>Boja:</p>
									<input type="color" id="borderRightColor" value="#cccccc" style="width: 50px;" />
								</div>
							</div>
						</fieldset>
						<fieldset class="settings-column w-full">
							<legend>Donja ivica:</legend>
							<div class="w-full between">
								<div class="w-half between">
									<p>Debljina (px):</p>
									<input type="number" id="borderBottomWidth" value="1" min="0" style="width: 50px;" />
								</div>
								<div class="w-half between">
									<p>Boja:</p>
									<input type="color" id="borderBottomColor" value="#cccccc" style="width: 50px;" />
								</div>
							</div>
						</fieldset>
						<fieldset class="settings-column w-full">
							<legend>Leva ivica:</legend>
							<div class="w-full between">
								<div class="w-half between">
									<p>Debljina (px):</p>
									<input type="number" id="borderLeftWidth" value="1" min="0" style="width: 50px;" />
								</div>
								<div class="w-half between">
									<p>Boja:</p>
									<input type="color" id="borderLeftColor" value="#cccccc" style="width: 50px;" />
								</div>
							</div>
						</fieldset>
					</div>
				</div>
			</fieldset>
			<fieldset class="settings-row">
				<legend>Poravnanje horizontalno:</legend>
				<button id="hAlignLeft" title="Levo" class="square-button">
					<img src="../../../public/icon/align-left.svg" width="20" height="20" alt="Levo" />
				</button>
				<button id="hAlignCenter" title="Centar" class="square-button">
					<img src="../../../public/icon/align-center.svg" width="20" height="20" alt="Centar" />
				</button>
				<button id="hAlignRight" title="Desno" class="square-button">
					<img src="../../../public/icon/align-right.svg" width="20" height="20" alt="Desno" />
				</button>
			</fieldset>
			<fieldset class="settings-row">
				<legend>Poravnanje vertikalno:</legend>
				<button id="vAlignTop" title="Gore" class="square-button">
					<img src="../../../public/icon/align-top.svg" width="20" height="20" alt="Gore" />
				</button>
				<button id="vAlignMiddle" title="Sredina" class="square-button">
					<img src="../../../public/icon/align-middle.svg" width="20" height="20" alt="Sredina" />
				</button>
				<button id="vAlignBottom" title="Dole" class="square-button">
					<img src="../../../public/icon/align-bottom.svg" width="20" height="20" alt="Dole" />
				</button><br/>
			</fieldset>
		`;
		panel.appendChild(controls);

		block.style.display = 'flex';
		block.style.flexDirection = 'column';

		document.getElementById('bgColorControl').oninput = (e) => {
			block.style.backgroundColor = e.target.value;
			console.log('Background updated', e.target.value);
		};

		document.getElementById('heightControl').oninput = (e) => {
			const newHeight = parseInt(e.target.value) || 0;
			block.style.height = newHeight + 'px';
			if (newHeight < 100) {
				block.style.minHeight = '0';
			} else {
				block.style.minHeight = '100px';
			}
			console.log('Height updated', newHeight);
		};

		// Border event handlers with debugging information
		const updateBorder = () => {
			console.log('updateBorder called');
			const style = document.getElementById('borderStyle').value;

			if (style === 'none') {
				// Hide the border input controls
				document.getElementById('borderWidth').parentElement.style.display = 'none';
				document.getElementById('borderColor').parentElement.style.display = 'none';
				document.getElementById('borderUniform').parentElement.style.display = 'none';

				// Also, hide individual settings (if visible)
				document.getElementById('individualBorderSettings').style.display = 'none';

				block.style.border = 'none';
				block.style.borderTop = block.style.borderRight = block.style.borderBottom = block.style.borderLeft = '';
				console.log('Border set to none');
				return;
			} else {
				// Make sure the border input controls are visible
				document.getElementById('borderWidth').parentElement.style.display = '';
				document.getElementById('borderColor').parentElement.style.display = '';
				document.getElementById('borderUniform').parentElement.style.display = '';
			}

			const uniform = document.getElementById('borderUniform').checked;
			if (uniform) {
				const width = document.getElementById('borderWidth').value + 'px';
				const color = document.getElementById('borderColor').value;
				block.style.borderTop = block.style.borderRight = block.style.borderBottom = block.style.borderLeft = '';
				block.style.border = `${width} ${style} ${color}`;
				console.log('Uniform border applied:', block.style.border);
			} else {
				const top = document.getElementById('borderTopWidth').value + 'px ' + document.getElementById('borderTopColor').value;
				const right = document.getElementById('borderRightWidth').value + 'px ' + document.getElementById('borderRightColor').value;
				const bottom = document.getElementById('borderBottomWidth').value + 'px ' + document.getElementById('borderBottomColor').value;
				const left = document.getElementById('borderLeftWidth').value + 'px ' + document.getElementById('borderLeftColor').value;
				block.style.border = 'none';
				block.style.borderTop = top;
				block.style.borderRight = right;
				block.style.borderBottom = bottom;
				block.style.borderLeft = left;
				console.log('Individual border applied:', top, right, bottom, left);
			}
		};

		document.getElementById('borderStyle').onchange = updateBorder;
		document.getElementById('borderWidth').oninput = updateBorder;
		document.getElementById('borderColor').oninput = updateBorder;
		document.getElementById('borderUniform').onchange = (e) => {
			const indiv = document.getElementById('individualBorderSettings');
			indiv.style.display = e.target.checked ? 'none' : 'block';
			updateBorder();
		};

		[ 'borderTopWidth', 'borderTopColor', 'borderRightWidth', 'borderRightColor',
			'borderBottomWidth', 'borderBottomColor', 'borderLeftWidth', 'borderLeftColor'
		].forEach(id => {
			document.getElementById(id).oninput = updateBorder;
		});

		// Horizontal alignment buttons
		document.getElementById('hAlignLeft').onclick = () => block.style.alignItems = 'flex-start';
		document.getElementById('hAlignCenter').onclick = () => block.style.alignItems = 'center';
		document.getElementById('hAlignRight').onclick = () => block.style.alignItems = 'flex-end';
		// Vertical alignment buttons
		document.getElementById('vAlignTop').onclick = () => block.style.justifyContent = 'flex-start';
		document.getElementById('vAlignMiddle').onclick = () => block.style.justifyContent = 'center';
		document.getElementById('vAlignBottom').onclick = () => block.style.justifyContent = 'flex-end';
	} else if (block.classList.contains('row')) {
		const controls = document.createElement('div');
		controls.innerHTML = `
			<fieldset class="settings-column">
				<div class="w-full between">
					<p>Razmak (px):</p>
					<input type="number" value="${parseInt(block.style.gap) || 10}" id="gapControl" class="w-50">
				</div>
				<div class="w-full between">
					<p>Boja pozadine:</p>
					<input type="color" value="${rgbToHex(getComputedStyle(block).backgroundColor)}" id="rowBgColor" class="w-50">
				</div>
				<div class="w-full between">
			</fieldset>
			<fieldset class="settings-row">
				<legend>Vertikalno poravnanje:</legend>
				<button id="rowVAlignTop" title="Gore" class="square-button">
					<img src="../../../public/icon/align-top.svg" width="20" height="20" alt="Gore" />
				</button>
				<button id="rowVAlignMiddle" title="Sredina" class="square-button">
					<img src="../../../public/icon/align-middle.svg" width="20" height="20" alt="Sredina" />
				</button>
				<button id="rowVAlignBottom" title="Dole" class="square-button">
					<img src="../../../public/icon/align-bottom.svg" width="20" height="20" alt="Dole" />
				</button>
			</fieldset>
		`;
		panel.appendChild(controls);

		document.getElementById('gapControl').oninput = (e) => {
			block.style.gap = e.target.value + 'px';
		};
		document.getElementById('rowBgColor').oninput = (e) => {
			block.style.backgroundColor = e.target.value;
		};
		// document.getElementById('rowPadding').oninput = (e) => {
		// 	block.style.padding = e.target.value + 'px';
		// };
		// document.getElementById('rowMarginTop').oninput = (e) => {
		// 	block.style.marginTop = e.target.value + 'px';
		// };
		// document.getElementById('rowMarginBottom').oninput = (e) => {
		// 	block.style.marginBottom = e.target.value + 'px';
		// };

		// Vertical alignment buttons for row:
		document.getElementById('rowVAlignTop').onclick = () => {
			block.style.alignItems = 'flex-start';
		};
		document.getElementById('rowVAlignMiddle').onclick = () => {
			block.style.alignItems = 'center';
		};
		document.getElementById('rowVAlignBottom').onclick = () => {
			block.style.alignItems = 'flex-end';
		};
	} else if (block.classList.contains('content')) {
		const controls = document.createElement('div');
		controls.innerHTML = `
			<fieldset class="settings-column">
				<legend>Email podešavanja:</legend>
				<div class="w-full between">
					<p>Širina (px):</p>
					<input type="number" value="${block.style.maxWidth.replace('px', '') || 800}" id="wrapperWidth" class="w-50">
				</div>
				<div class="w-full between">
					<p>Boja pozadine:</p>
					<input type="color" value="${rgbToHex(getComputedStyle(block).backgroundColor)}" id="wrapperBg" class="w-50">
				</div>
			</fieldset>
		`;
		panel.appendChild(controls);

		document.getElementById('wrapperWidth').oninput = (e) => block.style.maxWidth = e.target.value + 'px';
		document.getElementById('wrapperBg').oninput = (e) => block.style.backgroundColor = e.target.value;
	} else if (block.id === 'editor') {
		const controls = document.createElement('div');
		controls.innerHTML = `
			<fieldset class="settings-column">
				<legend>Editor:</legend>
				<div class="w-full between">
					<p>Boja pozadine:</p>
					<input type="color" value="${rgbToHex(getComputedStyle(block).backgroundColor)}" id="editorBgColor" class="w-50">
				</div>
			</fieldset>
		`;
		panel.appendChild(controls);
		document.getElementById('editorBgColor').oninput = (e) => block.style.backgroundColor = e.target.value;
	}

	// New generic controls for all selected blocks
	const genericControls = document.createElement('div');
	genericControls.innerHTML = `
		<fieldset class="settings-column">
			<div class="w-full between">
				<p>Padding (px):</p>
				<input type="number" value="${parseInt(block.style.padding) || 0}" id="genericPadding" class="w-50">
			</div>
			<div class="w-full between">
				<p>Margin (px):</p>
				<input type="number" value="${parseInt(block.style.margin) || 0}" id="genericMargin" class="w-50">
			</div>
		</fieldset>
    `;
	panel.appendChild(genericControls);
	document.getElementById('genericPadding').oninput = (e) => block.style.padding = e.target.value + 'px';
	document.getElementById('genericMargin').oninput = (e) => block.style.margin = e.target.value + 'px';
}

function rgbToHex(rgb) {
	const result = rgb.match(/\d+/g);
	if (!result) return "#ffffff";
	return "#" + result.slice(0, 3).map(x => ("0" + parseInt(x).toString(16)).slice(-2)).join("");
}

function exportHTML() {
	const content = document.querySelector('.content');
	const cloned = content.cloneNode(true);
	cloned.querySelectorAll('.selected-block').forEach(el => el.classList.remove('selected-block'));

	const html = formatHTML(cloned.outerHTML);
	const fullHTML = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Email šablon</title>
  </head>
  <body>
${indentLines(html, 2)}
  </body>
</html>`;

	document.getElementById('htmlOutput').value = fullHTML;
}

function formatHTML(html) {
	// Ukloni contenteditable iz svih tagova
	html = html.replace(/ contenteditable="true"/g, "");

	const tab = '   ';
	let result = '';
	let indent = '';

	html.split(/>\s*</).forEach((element, index, array) => {
		element = element.trim();
		if (index !== 0) element = '<' + element;
		if (index !== array.length - 1) element = element + '>';
		if (element.startsWith('</')) indent = indent.substring(tab.length);
		result += indent + element + '\n';
		if (element.match(/^<[^!/][^>]*[^/]?>$/)) indent += tab;
	});

	return result.trim();
}

function indentLines(str, level = 1) {
	const indentation = '  '.repeat(level);
	return str.split('\n').map(line => indentation + line).join('\n');
}

function addRow() {
	document.getElementById('rowModal').classList.remove('hidden');
	generateWidthInputs(2);
}

function closeModal() {
	document.getElementById('rowModal').classList.add('hidden');
	document.getElementById('widthInputs').innerHTML = '';
}

function generateWidthInputs(n) {
	const container = document.getElementById('widthInputs');
	container.innerHTML = '';
	currentWidths = [];

	for (let i = 0; i < n; i++) {
		const input = document.createElement('input');
		input.type = 'number';
		input.min = '1';
		input.max = '100';
		input.value = Math.floor(100 / n);
		input.dataset.index = i;
		input.placeholder = `Širina kolone ${i + 1} (%)`;
		input.style.margin = '5px 0';
		currentWidths.push(input);
		container.appendChild(input);
		container.appendChild(document.createElement('br'));
	}
}

document.getElementById('numColsInput').addEventListener('input', (e) => {
	const n = parseInt(e.target.value);
	if (n >= 1 && n <= 4) generateWidthInputs(n);
});

document.getElementById('createRowBtn').addEventListener('click', () => {
	const widths = currentWidths.map(i => parseInt(i.value));
	const total = widths.reduce((a, b) => a + b, 0);
	if (total > 100 || widths.some(w => isNaN(w) || w <= 0)) {
		alert("Ukupna širina mora biti do 100%, sve vrednosti moraju biti pozitivne.");
		return;
	}

	const row = document.createElement('div');
	row.classList.add('editor-block', 'row');
	row.style.display = 'flex';
	row.style.gap = '10px';
	// row.style.border = '2px dashed #ccc';
	row.style.marginBottom = '15px';

	// Add a click handler on row to select it
	row.addEventListener('click', (e) => {
		e.stopPropagation();
		selectBlock(row);
	});

	for (let w of widths) {
		const col = document.createElement('div');
		col.classList.add('editor-block', 'column');
		col.style.width = `${w}%`;
		// col.style.border = '1px dashed #ccc';
		col.style.minHeight = '100px';
		col.style.padding = '10px';
		col.style.boxSizing = 'border-box';
		col.addEventListener('click', (e) => {
			e.stopPropagation();
			selectBlock(col);
		});
		row.appendChild(col);
	}

	document.querySelector('.content').appendChild(row);
	closeModal();
});

document.querySelector('.email-canvas').addEventListener('click', (e) => {
	e.stopPropagation();

	// Deselect all elements.
	document.querySelectorAll('.selected-block').forEach(el => el.classList.remove('selected-block'));

	// Use the canvas element as the current target.
	const canvas = document.querySelector('.email-canvas');
	currentTargetContainer = canvas;

	// Clear any existing settings in the panel.
	const panel = document.getElementById('settingsPanel');
	panel.innerHTML = '';

	// Create and append the background color control for the canvas.
	const controls = document.createElement('div');
	controls.innerHTML = `
		<fieldset class="settings-column">
			<legend>Editor:</legend>
			<div class="w-full between">
				<p>Boja pozadine:</p>
				<input type="color" value="${rgbToHex(getComputedStyle(canvas).backgroundColor)}" id="canvasBgColor" class="w-50">
			</div>
		</fieldset>
    `;
	panel.appendChild(controls);

	// Update canvas background color when the color input changes.
	document.getElementById('canvasBgColor').oninput = (e) => {
		canvas.style.backgroundColor = e.target.value;
	};
});