<script lang="ts">
    import Page from "$lib/Page.svelte";
    import { getFullObserver } from "$utils/rxjs-prefab";
    import { combineLatest, filter, fromEvent, interval, of, timer, withLatestFrom } from "rxjs";
    import { fromFetch } from "rxjs/fetch";

    const fullObserver = getFullObserver("withLatestFrom");

    // interval(1000)
    //     .pipe(withLatestFrom(of(123)))
    //     .subscribe(fullObserver);

    const mouseClick$ = fromEvent<MouseEvent>(document, "click");

    // mouseClick$
    //     .pipe(withLatestFrom(of("something"), interval(3000)))
    //     .subscribe(([clickEvent, ofValue, intervalValue]) =>
    //         console.log({ mouseX: clickEvent.clientX, ofValue, intervalValue })
    //     );

    const httpCall$ = fromFetch("https://www.boredapi.com/api/activity?key=5881028", {
        selector: (response) => response.json(),
    });

    const interval$ = interval(2000);

    interval$
        .pipe(
            withLatestFrom(httpCall$),
            filter(([interval, httpResponse]) => httpResponse)
        )
        .subscribe(([interval, httpResponse]) => {
            // .subscribe(data => {
            // console.log('data: ', data);

            const participants = httpResponse.participants + interval;
            console.log({ participants });
        });
</script>

<section>
    <Page title="WithLatestFrom works" subTitle="(Open devtools)" />
</section>
