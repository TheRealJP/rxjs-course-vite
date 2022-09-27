<script>
    import Page from "$lib/Page.svelte";
    import { combineLatest, fromEvent, of, range } from "rxjs";

    const valve$ = fromEvent(document, 'click')
    const combineLatest$ = combineLatest([]);


    range$.subscribe((x) => console.log(x));
</script>

<section>
    <Page title="CombineLatest works" subTitle="(Open devtools)" />
</section>
