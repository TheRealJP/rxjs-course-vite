<script>
    import Page from "$lib/Page.svelte";
    import { of } from "rxjs";

    const of$ = of([1, 2, 3], 1, 2, 3);
    of$.subscribe((x) => console.log(x));
</script>

<section>
    <Page title="FromEvent works" subTitle="(Open devtools)" />
</section>
