///<reference types="svelte" />
//----------------------------------------------------------------------------------------------------------------------------------------------------
<></>;function render() { let $$props = __sveltets_1_allPropsType(); let $$restProps = __sveltets_1_restPropsType(); let $$slots = __sveltets_1_slotsType({});{/**
=#                                                                                                                                                                 Originless mappings
<></>;function•render()•{•let•$$props•=•__sveltets_1_allPropsType();•let•$$restProps•=•__sveltets_1_restPropsType();•let•$$slots•=•__sveltets_1_slotsType({});↲    [generated] line 2
  <   s                                                                                                                                                            
<s                                                                                                                                                                 
<script>↲                                                                                                                                                          [original] line 1 (rest generated at line 3)
------------------------------------------------------------------------------------------------------------------------------------------------------ */}
                                                                                                                                                      {/**
↲            [generated] line 3                                                                                                                       
        ↲                                                                                                                                             
<script>↲    [original] line 1 (rest generated at line 2)                                                                                             
------------------------------------------------------------------------------------------------------------------------------------------------------ */}
    $$slots;
    $$restProps;
    $$props;                                                                                                                                          {/**
------------------------------------------------------------------------------------------------------------------------------------------------------ */}
    let  foo = __sveltets_1_invalidate(() => ({...$$slots, ...$$restProps, ...$$props}));                                                             {/**
   ╚let••foo•=•__sveltets_1_invalidate(()•=>•({...$$slots,•...$$restProps,•...$$props}));↲    [generated] line 7                                      
   ╚    •foo•=•                               {...$$slots,•...$$restProps,•...$$props} ; ↲                                                            
   ╚  •foo•=•{...$$slots,•...$$restProps,•...$$props};↲                                                                                               
   ╚$:•foo•=•{...$$slots,•...$$restProps,•...$$props};↲                                       [original] line 5                                       
------------------------------------------------------------------------------------------------------------------------------------------------------ */}
;                                                                                                                                                     {/**
;↲            [generated] line 8                                                                                                                      
<                                                                                                                                                     
</script>↲    [original] line 6 (rest generated at line 9)                                                                                            
------------------------------------------------------------------------------------------------------------------------------------------------------ */}
() => (<>                                                                                                                                             {/**
========#     Originless mappings                                                                                                                     
()•=>•(<>↲    [generated] line 9                                                                                                                      
         ↲                                                                                                                                            
</script>↲    [original] line 6 (rest generated at line 8)                                                                                            
------------------------------------------------------------------------------------------------------------------------------------------------------ */}
                                                                                                                                                      {/**
------------------------------------------------------------------------------------------------------------------------------------------------------ */}
{($$slots.foo) ? <>                                                                                                                                   {/**
{($$slots.foo)•?•<>↲    [generated] line 11                                                                                                           
{ $$slots.foo}     ↲                                                                                                                                  
{    $$slots.foo}↲                                                                                                                                    
{#if•$$slots.foo}↲      [original] line 8                                                                                                             
------------------------------------------------------------------------------------------------------------------------------------------------------ */}
    {$$restProps.bar}
    <Component
        {...$$props}
    />                                                                                                                                                {/**
------------------------------------------------------------------------------------------------------------------------------------------------------ */}
</> : <></>}</>);                                                                                                                                     {/**
</>•:•<></>}</>);↲    [generated] line 16                                                                                                             
{                                                                                                                                                     
{/if}                 [original] line 13                                                                                                              
------------------------------------------------------------------------------------------------------------------------------------------------------ */}
return { props: {}, slots: {}, getters: {}, events: {} }}

export default class Input__SvelteComponent_ extends __sveltets_1_createSvelte2TsxComponent(__sveltets_1_partial_with_any(__sveltets_1_with_any_event(render()))) {
}