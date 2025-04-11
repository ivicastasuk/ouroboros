let currentTargetContainer = null;
let currentWidths = [];

window.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('editor');
    const wrapper = document.createElement('div');
    wrapper.classList.add('email-wrapper');
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
    const container = currentTargetContainer || document.querySelector('.email-wrapper');
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
    document.querySelectorAll('.selected-block').forEach(el => {
        el.classList.remove('selected-block');
    });

    block.classList.add('selected-block');
    currentTargetContainer = block;

    const panel = document.getElementById('settingsPanel');
    panel.innerHTML = '';

    if (block.tagName === 'H2' || block.tagName === 'P') {
        const input = document.createElement('textarea');
        input.value = block.innerText;
        input.oninput = () => {
            block.innerText = input.value;
        };
        panel.appendChild(input);

        const controls = document.createElement('div');
        controls.innerHTML = `
      <label>Veličina fonta:
        <input type="number" value="${parseInt(block.style.fontSize) || 16}" min="8" max="72" id="fontSizeControl">
      </label><br/>
      <label>Boja:
        <input type="color" value="${block.style.color || '#000000'}" id="colorControl">
      </label><br/>
      <label>Poravnanje:
        <select id="alignControl">
          <option value="left">Levo</option>
          <option value="center">Centar</option>
          <option value="right">Desno</option>
        </select>
      </label><br/>
      <button id="boldBtn">Bold</button>
      <button id="italicBtn">Italic</button>
      <button id="underlineBtn">Underline</button>
    `;
        panel.appendChild(controls);

        // Dodatna podešavanja za padding i margin
        const spacingControls = document.createElement('div');
        spacingControls.innerHTML = `
      <label>Padding (px):
        <input type="number" value="${parseInt(block.style.padding) || 0}" id="paddingControl">
      </label><br/>
      <label>Margin Top (px):
        <input type="number" value="${parseInt(block.style.marginTop) || 0}" id="marginTopControl">
      </label><br/>
      <label>Margin Bottom (px):
        <input type="number" value="${parseInt(block.style.marginBottom) || 0}" id="marginBottomControl">
      </label><br/>
    `;
        panel.appendChild(spacingControls);

        document.getElementById('paddingControl').oninput = (e) => {
            block.style.padding = e.target.value + 'px';
        };
        document.getElementById('marginTopControl').oninput = (e) => {
            block.style.marginTop = e.target.value + 'px';
        };
        document.getElementById('marginBottomControl').oninput = (e) => {
            block.style.marginBottom = e.target.value + 'px';
        };


        document.getElementById('fontSizeControl').oninput = (e) => {
            block.style.fontSize = `${e.target.value}px`;
        };
        document.getElementById('colorControl').oninput = (e) => {
            block.style.color = e.target.value;
        };
        document.getElementById('alignControl').onchange = (e) => {
            block.style.textAlign = e.target.value;
        };
        document.getElementById('boldBtn').onclick = () => {
            block.style.fontWeight = block.style.fontWeight === 'bold' ? 'normal' : 'bold';
        };
        document.getElementById('italicBtn').onclick = () => {
            block.style.fontStyle = block.style.fontStyle === 'italic' ? 'normal' : 'italic';
        };
        document.getElementById('underlineBtn').onclick = () => {
            block.style.textDecoration = block.style.textDecoration === 'underline' ? 'none' : 'underline';
        };

    } else if (block.classList.contains('editor-column')) {
        const controls = document.createElement('div');
        controls.innerHTML = `
      <label>Pozadina:
        <input type="color" value="${block.style.backgroundColor || '#ffffff'}" id="bgColorControl">
      </label><br/>
      <label>Border:
        <input type="text" value="${block.style.border || '1px dashed #ccc'}" id="borderControl">
      </label><br/>
      <label>Poravnanje horizontalno:
        <select id="hAlignControl">
          <option value="flex-start">Levo</option>
          <option value="center">Centar</option>
          <option value="flex-end">Desno</option>
        </select>
      </label><br/>
      <label>Poravnanje vertikalno:
        <select id="vAlignControl">
          <option value="flex-start">Gore</option>
          <option value="center">Sredina</option>
          <option value="flex-end">Dole</option>
        </select>
      </label>
    `;
        panel.appendChild(controls);

        // Dodatna podešavanja za padding i margin
        const spacingControls = document.createElement('div');
        spacingControls.innerHTML = `
      <label>Padding (px):
        <input type="number" value="${parseInt(block.style.padding) || 0}" id="paddingControl">
      </label><br/>
      <label>Margin Top (px):
        <input type="number" value="${parseInt(block.style.marginTop) || 0}" id="marginTopControl">
      </label><br/>
      <label>Margin Bottom (px):
        <input type="number" value="${parseInt(block.style.marginBottom) || 0}" id="marginBottomControl">
      </label><br/>
    `;
        panel.appendChild(spacingControls);

        document.getElementById('paddingControl').oninput = (e) => {
            block.style.padding = e.target.value + 'px';
        };
        document.getElementById('marginTopControl').oninput = (e) => {
            block.style.marginTop = e.target.value + 'px';
        };
        document.getElementById('marginBottomControl').oninput = (e) => {
            block.style.marginBottom = e.target.value + 'px';
        };


        block.style.display = 'flex';
        block.style.flexDirection = 'column';

        document.getElementById('bgColorControl').oninput = (e) => {
            block.style.backgroundColor = e.target.value;
        };
        document.getElementById('borderControl').oninput = (e) => {
            block.style.border = e.target.value;
        };
        document.getElementById('hAlignControl').onchange = (e) => {
            block.style.alignItems = e.target.value;
        };
        document.getElementById('vAlignControl').onchange = (e) => {
            block.style.justifyContent = e.target.value;
        };


    } else if (block.id === 'editor') {
        const controls = document.createElement('div');
        controls.innerHTML = `
      <label>Pozadina editora (body):
        <input type="color" value="${rgbToHex(getComputedStyle(block).backgroundColor)}" id="editorBgColor">
      </label>
    `;
        panel.appendChild(controls);

        document.getElementById('editorBgColor').oninput = (e) => {
            block.style.backgroundColor = e.target.value;
        };


    } else if (block.classList.contains('editor-row')) {
        const controls = document.createElement('div');
        controls.innerHTML = `
      <label>Razmak između kolona (gap u px):
        <input type="number" value="${parseInt(block.style.gap) || 10}" id="gapControl">
      </label><br/>
    `;
        panel.appendChild(controls);

        document.getElementById('gapControl').oninput = (e) => {
            block.style.gap = e.target.value + 'px';
        };

    } else if (block.classList.contains('email-wrapper')) {
        const controls = document.createElement('div');
        controls.innerHTML = `
      <label>Širina (px): 
        <input type="number" value="${block.style.maxWidth.replace('px', '') || 800}" id="wrapperWidth">
      </label><br/>
      <label>Pozadina:
        <input type="color" value="${rgbToHex(getComputedStyle(block).backgroundColor)}" id="wrapperBg">
      </label>
    `;
        panel.appendChild(controls);

        // Dodatna podešavanja za padding i margin
        const spacingControls = document.createElement('div');
        spacingControls.innerHTML = `
      <label>Padding (px):
        <input type="number" value="${parseInt(block.style.padding) || 0}" id="paddingControl">
      </label><br/>
      <label>Margin Top (px):
        <input type="number" value="${parseInt(block.style.marginTop) || 0}" id="marginTopControl">
      </label><br/>
      <label>Margin Bottom (px):
        <input type="number" value="${parseInt(block.style.marginBottom) || 0}" id="marginBottomControl">
      </label><br/>
    `;
        panel.appendChild(spacingControls);

        document.getElementById('paddingControl').oninput = (e) => {
            block.style.padding = e.target.value + 'px';
        };
        document.getElementById('marginTopControl').oninput = (e) => {
            block.style.marginTop = e.target.value + 'px';
        };
        document.getElementById('marginBottomControl').oninput = (e) => {
            block.style.marginBottom = e.target.value + 'px';
        };


        document.getElementById('wrapperWidth').oninput = (e) => {
            block.style.maxWidth = `${e.target.value}px`;
        };
        document.getElementById('wrapperBg').oninput = (e) => {
            block.style.backgroundColor = e.target.value;
        };
    }
}

function exportHTML() {
    const content = document.getElementById('editor');
    const formatted = formatHTML(content.innerHTML.trim());

    const fullHTML = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Email šablon</title>
  </head>
  <body>
${indentLines(formatted, 2)}
  </body>
</html>`;

    document.getElementById('htmlOutput').value = fullHTML;
}

function formatHTML(html) {
    const tab = '  ';
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

function rgbToHex(rgb) {
    const result = rgb.match(/\d+/g);
    if (!result) return "#ffffff";
    return (
        "#" +
        result
            .slice(0, 3)
            .map((x) => ("0" + parseInt(x).toString(16)).slice(-2))
            .join("")
    );
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
    row.classList.add('editor-block', 'editor-row');
    row.style.display = 'flex';
    row.style.gap = '10px';
    row.style.border = '2px dashed #ccc';
    row.style.marginBottom = '15px';

    for (let w of widths) {
        const col = document.createElement('div');
        col.classList.add('editor-column');
        col.style.width = `${w}%`;
        col.style.border = '1px dashed #ccc';
        col.style.minHeight = '100px';
        col.style.padding = '10px';
        col.style.boxSizing = 'border-box';

        col.addEventListener('click', (e) => {
            e.stopPropagation();
            selectBlock(col);
        });

        row.appendChild(col);
    }

    document.querySelector('.email-wrapper').appendChild(row);
    closeModal();
});