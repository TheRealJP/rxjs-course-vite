<script>
    import Page from "$lib/Page.svelte";
    import { range } from "rxjs";

    const range$ = range(1, 5);
    range$.subscribe((x) => console.log(x));
</script>

<section>
    <Page title="FromFetch works" subTitle="(Open devtools)" />
</section>
