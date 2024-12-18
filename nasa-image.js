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
        height: 300px;  /* Fixed height to match the spec */
        border: 1px solid #ccc;
        padding: 16px;
        margin: 8px;
        transition: background-color 0.3s ease, transform 0.2s ease;
        cursor: pointer;
        text-align: center;
        border-radius: 8px;
      }

      .image-card:hover {
        background-color: #f0f0f0;
        transform: scale(1.05);
      }

      .image-card:focus {
        outline: 3px solid #005fcc;
        background-color: #e0eaff;
      }

      .image img {
        width: 100%;
        height: 150px;
        object-fit: cover;  /* Ensure the image fits the container */
        border-radius: 4px;
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

      .no-image {
        font-size: 14px;
        color: #999;
        margin-top: 10px;
      }
    `];
  }

  render() {
    return html`
      <div class="image-card" tabindex="0" @click="${this.openImage}" @keypress="${this.handleKeyPress}">
        <div class="image">
          <img src="${this.source}" alt="${this.alt}" />
          <div>${this.title}</div>
          <div class="creator">By: ${this.secondary_creator || 'Unknown Creator'}</div>
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
