// ⚡️ Import Styles
import './style.scss';
import feather from 'feather-icons';
import { showNotification } from './modules/showNotification.js';

// ⚡️ Render Skeleton
document.querySelector('#app').innerHTML = `
<div class='app-container'>
  <div class='qr-code'>
    <h2>QR Code Generator</h2>
    <p>Paste a url or enter text to create QR code</p>

    <form data-form=''>
      <input type='text' name='text' placeholder='Enter text or url' />
      <input type='color' name='color' value='#E88C8C'>
      <select name='size'>
        ${[100, 200, 300, 400, 500, 600, 700].map(index => index === 300 ? `<option selected value='${index}'>${index}x${index}</option>` : `<option value='${index}'>${index}x${index}</option>`).join('')}
      </select>
      <button type='submit' data-submit=''>Generate QR Code</button>
    </form>

    <div class='content' data-container=''>
      <canvas id='qrcode'></canvas>
      <a class='button' href='#' download='qrcode' data-save=''>Save Image</a>
    </div>
  </div>

  <a class='app-author' href='https://github.com/nagoev-alim' target='_blank'>${feather.icons.github.toSvg()}</a>
</div>
`;

// ⚡️Class
class App {
  constructor() {
    this.DOM = {
      form: document.querySelector('[data-form]'),
      submitBtn: document.querySelector('[data-submit]'),
      qrcode: document.querySelector('#qrcode'),
      saveBtn: document.querySelector('[data-save]'),
      container: document.querySelector('[data-container]'),
    };

    this.DOM.form.addEventListener('submit', this.onSubmit);
  }

  /**
   * @function onSubmit - Form submit handler
   * @param event
   */
  onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    this.DOM.qrcode.innerHTML = ``;
    this.DOM.container.classList.remove('is-show');

    const { text, size, color } = Object.fromEntries(new FormData(form).entries());
    if (!text) {
      showNotification('danger', 'Please enter a valid URL');
      return;
    }

    this.DOM.submitBtn.textContent = 'Generating QR Code...';

    const qrCode = new QRious({
      element: this.DOM.qrcode,
      backgroundAlpha: 0.8,
      foreground: `${color}`,
      foregroundAlpha: 0.8,
      level: 'H',
      size: Number(size),
      value: text,
    });

    setTimeout(() => {
      this.DOM.saveBtn.href = qrCode.toDataURL();
      this.DOM.container.classList.add('is-show');
      this.DOM.submitBtn.textContent = 'Generate QR Code';
    }, 1000);
  };
}

// ⚡️Class Instance
new App();

