import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class NasaImage extends DDDSuper(LitElement) {
  constructor() {
    super();
    this.title = '';
    this.source = '';
    this.alt = '';
    this.secondary_creator = '';
  }

  static get properties() {
    return {
      source: { type: String },
      title: { type: String },
      alt: { type: String },
      secondary_creator: { type: String }
    };
  }

  static get styles() {
    return [css`
      .image-card {
        display: inline-block;
        width: 240px;
        height: auto;
        border: 1px solid #ccc;
        padding: 16px;
        margin: 8px;
        transition: background-color 0.3s ease;
        cursor: pointer;
        text-align: center;
      }

      .image-card:hover {
        background-color: #f0f0f0;
      }

      .image-card:focus {
        outline: none;
        background-color: #d0e0ff;
      }

      .image img {
        width: 240px;
        height: auto;
      }

      .image div {
        margin-top: 8px;
        font-size: 16px;
        font-weight: bold;
      }

      .creator {
        margin-top: 4px;
        font-size: 14px;
        color: #714343;
      }
    `];
  }

  render() {
    return html`
      <div class="image-card" tabindex="0" @click="${this.openImage}" @keypress="${this.handleKeyPress}">
        <div class="image">
          <img src="${this.source}" alt="${this.alt}" />
          <div>${this.title}</div>
          <div class="creator">By: ${this.secondary_creator}</div>
        </div>
      </div>
    `;
  }

  openImage() {
    window.open(this.source, '_blank');
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.openImage();
    }
  }

  static get tag() {
    return "nasa-image";
  }
}

customElements.define(NasaImage.tag, NasaImage);
