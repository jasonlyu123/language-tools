<></>;function render() {


let  b = __sveltets_invalidate(() => 7);

let a;
$: a = __sveltets_invalidate(() => 5);
;
<></>
return { props: {}, slots: {}, getters: {}, events: {} }}

export default class Input__SvelteComponent_ {
    $$prop_def = __sveltets_partial(render().props)
    $$slot_def = render().slots
    $on = __sveltets_eventDef(render().events)
}
