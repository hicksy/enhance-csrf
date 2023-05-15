import CsrfInput from "./CsrfInput.mjs";

export default function CsrfForm({ html, state }) {
    const { attrs={} } = state
    const { 
        action = '', 
        method = '', 
        enctype = '',
        target='',
        acceptCharset = '',
        autocomplete = '',
        id = '',
        novalidate = false,
        rel = ''
    } = attrs

    const optional = [];
    if(enctype) optional.push(`enctype="${enctype}"`);
    if(target) optional.push(`target="${target}"`);
    if(acceptCharset) optional.push(`accept-charset="${acceptCharset}"`);
    if(autocomplete) optional.push(`autocomplete="${autocomplete}"`);
    if(id) optional.push(`id="${id}"`);
    if(novalidate) optional.push(`novalidate`);
    if(rel) optional.push(`rel="${rel}"`);

    return html`
    <form action="${action}" method="${method}" ${optional.join(' ')}>
        ${CsrfInput({html, state})}
        <slot></slot>
    </form>
`
}