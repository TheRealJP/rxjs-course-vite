<script>
    import Page from "$lib/Page.svelte";
    import { stringObservable$ } from "$utils/rxjs-prefab";

    stringObservable$.subscribe((string) => console.log(string));
    stringObservable$.subscribe({ next: (string) => console.log(string) });
</script>

<section>
    <Page title="Appetizer" subTitle="(Open devtools)" />
</section>
