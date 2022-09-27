<script>
    import Page from "$lib/Page.svelte";
    import { forkJoin, range } from "rxjs";
    import { ajax } from "rxjs/ajax";

    // http call example
    const call1$ = ajax('facebook.com')
    
    const range$ = forkJoin([]);
    range$.subscribe((x) => console.log(x));
</script>

<section>
    <Page title="Concat works" subTitle="(Open devtools)" />
</section>
