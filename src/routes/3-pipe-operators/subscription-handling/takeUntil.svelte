<script lang="ts">
    import Page from "$lib/Page.svelte";
    import { getFullObserver, getFullTapObserver } from "$utils/rxjs-prefab";
    import {
        timer,
        interval,
        Observable,
        fromEvent,
        map,
        combineLatest,
        delay,
        takeUntil,
        tap,
        filter,
        NEVER,
        of,
        debounceTime,
    } from "rxjs";
    import { onMount } from "svelte";
    import { getCat } from "../error-handling/animals";

    const webSocketObservable$ = new Observable<MessageEvent>((subscriber) => {
        const ws = new WebSocket(
            "wss://demo.piesocket.com/v3/channel_1?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV"
        );

        ws.addEventListener("message", (event) => subscriber.next(event));
    }).pipe(
        map((message, i) => `(${i}) ${message.data}`),
        debounceTime(500)
    );

    onMount(() => {
        /** --- basic unsubscribe strategy --- */
        // issue 1: using an arbitrary timer is not a good unsubscribe strategy, especially when your app becomes more complex
        // const subscription = interval1$.subscribe(getFullObserver('classic unsubscription'))
        // timer(5000).subscribe(() => subscription.unsubscribe())

        // issue 2:
        // in real life we have lots of subscriptions and you'll need to call the unsubscribe function on each subscription
        // this will eventually lead to memory leaks because its easy to forget about a subscription
        // this is not optimal or manageable, especially in bigger projects
        const subscription1 = interval(1000).subscribe();
        const subscription2 = interval(1000).subscribe();
        const subscription3 = interval(1000).subscribe();
        const subscription4 = interval(1000).subscribe();
        const subscription5 = interval(1000).subscribe();
        const subscription6 = interval(1000).subscribe();

        subscription1.unsubscribe();
        subscription2.unsubscribe();
        subscription3.unsubscribe();
        subscription4.unsubscribe();
        subscription5.unsubscribe();
        subscription6.unsubscribe();

        /** --- subscription management with takeUntil  --- */
        // notifiers: observables that emit a single next notification to let the takeuntil operator know it needs to send a complete notification
        const timerNotifier$ = timer(5000);
        const intervalNotifier$ = interval(5000);
        const httpNotifier$ = getCat().pipe(delay(5000));
        const clickNotifier$ = fromEvent(document.querySelector("#stop-button"), "click");
        const neverNotifier$ = NEVER;

        // fill in your notifier observable here
        const notifier$ = intervalNotifier$;

        /** example 1: interval producer */
        const infiniteSource1$ = interval(2000).pipe(takeUntil(notifier$));
        const infiniteSource2$ = webSocketObservable$.pipe(takeUntil(notifier$));

        infiniteSource1$.subscribe(getFullObserver("interval$"));
        infiniteSource2$.subscribe(getFullObserver("websocket$"));

        /** example 2: takeUntil on combineLatest operator */
        combineLatest([infiniteSource1$, infiniteSource2$]).pipe(
            takeUntil(
                // adding an observer to check whether the interval observable keeps emitting values
                // after the first one is emitted
                notifier$.pipe(tap(getFullObserver("(tap)")))
            )
        );
        // .subscribe(getFullObserver("combineLatest"));
    });
</script>

<section>
    <Page title="TakeUntil works" subTitle="(Open devtools)" />

    <!-- takeUntil -->
    <button
        data-mdb-ripple="true"
        type="button"
        class="bg-red-500 text-sm rounded-sm h-16 w-72 text-white font-bold mt-8"
        data-mdb-ripple-color="light"
        id="stop-button"
    >
        Stop all subscriptions
    </button>
</section>

<!-- /** --- first & take --- */
// another efficient way to unsubscribe is by using the take or first operator
// they only take a certain amount of values until they destroy the observable
// first operator takes the first incoming value and take can take as many
// interval1$.pipe(first()).subscribe(getFullObserver('first'));
// interval1$.pipe(take(1)).subscribe(getFullObserver('take 1'));

// how do first & take behave when we pass an empty observable?
// EMPTY.pipe(first()).subscribe(getFullObserver('first EMPTY'));
// EMPTY.pipe(take(1)).subscribe(getFullObserver('take 1 EMPTY')); -->
