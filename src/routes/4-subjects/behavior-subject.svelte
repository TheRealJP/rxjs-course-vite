<script lang="ts">
    import Page from "$lib/Page.svelte";

    
    /** asObservable use case */
    function newsLetterObservable() {
        return this.s.asObservable();
    }

    /** keep in mind pipe turns it in an observable */
    // s.pipe(tap(getFullObserver("tap"))).subscribe(getFullObserver("observer"));
    // s.next("value");
    // s.pipe(share()).subscribe();
</script>

<section>
    <Page title="BehaviorSubject works" subTitle="(Open devtools)" />
</section>
