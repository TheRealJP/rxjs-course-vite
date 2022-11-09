<script lang="ts">
    import Page from "$lib/Page.svelte";
    import { getFullObserver, getFullTapObserver } from "$utils/rxjs-prefab";
    import {
        distinctUntilChanged,
        filter,
        from,
        interval,
        of,
        subscribeOn,
        tap,
        throwError,
        timer,
    } from "rxjs";
    import type { TapObserver } from "rxjs/internal/operators/tap";

    /** data */
    const data = [1, 2, 2, 3];
    let isLoading = false;
    class mockService {
        static postRequest(value: number) {
            setTimeout(() => {
                console.log("succesfully stored object in database: ", { value });
            }, 2000);
        }
    }
    const fullTabObserver: TapObserver<any> = getFullTapObserver("Tap observer");

    /** use case 1: debugging by logging the data coming through the pipeline */
    from(data)
        .pipe(
            filter((value) => value >= 2),
            tap((value) => console.log("tap BEFORE distinctUntilChanged: ", value)),
            // this doesn't work because tap doesn't affect the values, it just passes them to the next observer/operator
            tap((value) => (value += 1)),
            distinctUntilChanged(),
            tap((value) => console.log("tap AFTER distinctUntilChanged: ", value))
        )
        .subscribe(getFullObserver("debugging final observer"));

    /** use case 2: side effects -> influencing something outside the subscribed observable */
    const subscription = from(data)
        .pipe(
            tap((value) => {
                // variable living outside of observable but updated in tap operator
                isLoading = true;
                // extra api/service calls
                mockService.postRequest(value);
            }),
            filter((value) => value < 2),
            distinctUntilChanged()
        )
        .subscribe(getFullObserver("side effect final observer"));

    if (subscription.closed)
        console.log("side effect -> updated variable outside the subscription:", { isLoading });

    /**error behavior*/
    // The tap operator will pass the error notification if the error function is implemented in the tap observer object
    throwError(() => "Error")
        .pipe(tap(getFullObserver("observer inside tap operator")))
        .subscribe(getFullObserver("final observer"));

    /** full tap observer*/
    // Since RxJS 7.3.0 the tap observer has received some extra observer functions.
    // Besides the regular observer functions like next, error & complete, we now also have the "subscribe, unsubscribe and finalize" functions. 
    // todo

</script>

<section>
    <Page title="Tap works" subTitle="(Open devtools)" />
</section>
