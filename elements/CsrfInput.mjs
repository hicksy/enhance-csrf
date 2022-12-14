export default function CsrfInput({ html, state }) {
    const { attrs={}, store={} } = state
    const { name = 'csrf' } = attrs
    return html`
        <input type="hidden" name="${name}" value="${store.csrf_token}" />
    `
}