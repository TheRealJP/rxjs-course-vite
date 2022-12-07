<script lang="ts">
    import Page from "$lib/Page.svelte";
    import { getFullObserver, getFullTapObserver } from "$utils/rxjs-prefab";
    import { interval, Subject, takeUntil, tap } from "rxjs";
    import { onDestroy } from "svelte";

    const destroy$ = new Subject();

    interval(1000)
        .pipe(takeUntil(destroy$.pipe(tap(getFullTapObserver("(destroy$)")))))
        .subscribe(getFullObserver("(interval$)"));

    // often used when a component is destroyed: angular, vue & react also use this concept
    onDestroy(() => {
        destroy$.next("start teardown"); 
        destroy$.unsubscribe();
    });
</script>

<section>
    <Page title="Subject works" subTitle="(Open devtools)" />
</section>
