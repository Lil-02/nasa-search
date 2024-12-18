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
        font-family: Arial, sans-serif;
      }
      :host([loading]) .results {
        opacity: 0.1;
        visibility: hidden;
      }

      .results {
        visibility: visible;
        opacity: 1;
        transition: opacity 0.5s ease-in-out;
      }

      .loading-message {
        font-size: 18px;
        text-align: center;
        margin-top: 20px;
      }

      .no-results {
        font-size: 18px;
        text-align: center;
        color: #888;
        margin-top: 20px;
      }

      details {
        margin: 16px;
        padding: 16px;
        background-color: #f9f9f9;
      }

      summary {
        font-size: 24px;
        padding: 8px;
        color: #333;
        font-weight: bold;
      }

      input {
        font-size: 20px;
        line-height: 40px;
        width: 100%;
        padding: 10px;
        margin-top: 10px;
      }
    `;
  }

  constructor() {
    super();
    this.value = null;
    this.title = 'NASA Image Search';
    this.loading = false;
    this.items = [];
  }

  render() {
    return html`
      <h2>${this.title}</h2>
      <details open>
        <summary>Search for NASA Images</summary>
        <div>
          <input id="input" placeholder="Search NASA images" @input="${this.inputChanged}" />
        </div>
      </details>

      <!-- Show loading spinner if fetching data -->
      ${this.loading ? html`<div class="loading-message">Loading results...</div>` : ''}
      
      <!-- Show no results message -->
      ${this.items.length === 0 && !this.loading ? html`<div class="no-results">No results found.</div>` : ''}

      <div class="results">
        ${this.items.map((item) => html`
          <nasa-image
            source="${item.links[0].href}"
            title="${item.data[0].title}"
            alt="${item.data[0].description || 'NASA image'}"
            secondary_creator="${item.data[0].secondary_creator || 'No creator available'}"
          ></nasa-image>
        `)}
      </div>
    `;
  }

  inputChanged(e) {
    this.value = this.shadowRoot.querySelector('#input').value;
  }

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
            const secondary_creator = item.data[0].secondary_creator || 'No creator available';
            return {
              ...item,
              data: [{ ...item.data[0], secondary_creator }],
            };
          });
          this.loading = false;
        }
      })
      .catch(() => {
        this.loading = false;
        this.items = [];
      });
  }

  static get tag() {
    return 'nasa-search';
  }
}

customElements.define(NasaSearch.tag, NasaSearch);
