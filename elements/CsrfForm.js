import CsrfInput from "./CsrfInput.js";

export default function CsrfForm({ html, state }) {
    const { attrs={} } = state
    const { action = '', method = '' } = attrs

    customElements.define("csrf-input", CsrfInput);

    return html`
    <form action="${action}" method="${method}">
        <csrf-input></csrf-input>
        <slot></slot>
    </form>
`
}