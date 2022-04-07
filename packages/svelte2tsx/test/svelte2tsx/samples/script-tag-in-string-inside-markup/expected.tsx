///<reference types="svelte" />
<></>;function render() {

    let a = 1;
;
() => (<>

<div data-abc="<scriptlet a = 1;</script"></div>
<div data-abc={"<script>let a = 1;</script>"}></div>
<sveltehead>
    { `<script type="application/ld+json">{a: 1}</script>`} 
</sveltehead></>);
return { props: {}, slots: {}, getters: {}, events: {} }}

export default class Input__SvelteComponent_ extends __sveltets_1_createSvelte2TsxComponent(__sveltets_1_partial(__sveltets_1_with_any_event(render()))) {
}