import CsrfInput from "./csrf-input.mjs";

export default function CsrfForm({ html, state }) {
    const { attrs={} } = state
    const { action = '', method = '' } = attrs

    return html`
    <form action="${action}" method="${method}">
        ${CsrfInput({html, state})}
        <slot></slot>
    </form>
`
}