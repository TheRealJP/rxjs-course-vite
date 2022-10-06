<script>
    import Page from "$lib/Page.svelte";
    import { forkJoin, range } from "rxjs";
    import { ajax } from "rxjs/ajax";

    // http call example
    const call1$ = ajax('facebook.com')
    const call2$ = ajax('facebook.com')
    
    const forkJoin$ = forkJoin([call1$, call2$]);
    forkJoin$.subscribe((x) => console.log(x));
</script>

<section>
    <Page title="Concat works" subTitle="(Open devtools)" />
</section>
