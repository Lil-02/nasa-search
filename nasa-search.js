import { LitElement, html, css } from 'lit';
import "./nasa-image.js";

export class NasaSearch extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      loading: { type: Boolean, reflect: true },
      items: { type: Array },
      value: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      :host([loading]) .results {
        opacity: 0.1;
        visibility: hidden;
        height: 1px;
      }
      .results {
        visibility: visible;
        height: 100%;
        opacity: 1;
        transition-delay: .5s;
        transition: .5s all ease-in-out;
      }

      details {
        margin: 16px;
        padding: 16px;
        background-color: pink;
      }
      summary {
        font-size: 24px;
        padding: 8px;
        color: white;
        font-size: 42px;
      }
      input {
        font-size: 20px;
        line-height: 40px;
        width: 100%;
      }
    `;
  }

  constructor() {
    super();
    this.value = null;
    this.title = '';
    this.loading = false;
    this.items = [];
  }

  render() {
    return html`
      <h2>${this.title}</h2>
      <details open>
        <summary>Search inputs</summary>
        <div>
          <input id="input" placeholder="Search NASA images" @input="${this.inputChanged}" />
        </div>
      </details>
      <div class="results">
        ${this.items.map((item, index) => html`
          <nasa-image
            source="${item.links[0].href}"
            title="${item.data[0].title}"
            alt="${item.data[0].description || 'NASA image'}"
            secondary_creator="${item.data[0].secondary_creator || 'no se, lo siento'}"
          ></nasa-image>
        `)}
      </div>
    `;
  }

  inputChanged(e) {
    this.value = this.shadowRoot.querySelector('#input').value;
  }

  // life cycle will run when anything defined in `properties` is modified
  updated(changedProperties) {
    if (changedProperties.has('value') && this.value) {
      this.updateResults(this.value);
    } else if (changedProperties.has('value') && !this.value) {
      this.items = [];
    }
  }

  updateResults(value) {
    this.loading = true;
    fetch(`https://images-api.nasa.gov/search?media_type=image&q=${value}`)
      .then((response) => (response.ok ? response.json() : {}))
      .then((data) => {
        if (data.collection) {
          this.items = data.collection.items.map((item) => {
            // Ensure secondary_creator exists, fallback to 'Unknown' if not available
            const secondary_creator = item.data[0].secondary_creator || 'no se, lo siento';
            return {
              ...item,
              data: [{ ...item.data[0], secondary_creator }],
            };
          });
          this.loading = false;
        }
      });
  }

  static get tag() {
    return 'nasa-search';
  }
}

customElements.define(NasaSearch.tag, NasaSearch);
