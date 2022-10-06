<script>
    import Page from "$lib/Page.svelte";
    import { merge, fromEvent, interval, of } from "rxjs";

    const clicks = fromEvent(document, "click");
    const timer = interval(1000);
    const finite = of(1,2,3);
    const clicksOrTimer = merge(clicks, timer, finite);
    clicksOrTimer.subscribe((x) => console.log(x));
</script>

<section>
    <Page title="Merge works" subTitle="(Open devtools)" />
</section>


