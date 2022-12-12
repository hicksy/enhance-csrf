export default function CsrfInput({ html, state }) {
    const { attrs={}, csrf_token } = state
    const { name = 'csrf' } = attrs

    return html`
        <input type="hidden" name="${name}" value="${csrf_token}" />
    `
  }