import CsrfInput from "./CsrfInput.js";

export default function CsrfForm({ html, state }) {
    const { attrs={} } = state
    const { action = '', method = '' } = attrs

    return html`
    <form action="${action}" method="${method}">
        ${CsrfInput()}
        <slot></slot>
    </form>
`
}