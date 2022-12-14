<script lang="ts">
    import Page from "$lib/Page.svelte";
    import { newsLetters } from "$utils/constants";
    import { getFullObserver, getFullTapObserver } from "$utils/rxjs-prefab";
    import { delayWhen, from, interval, map, Subject, takeUntil, tap, timer } from "rxjs";
    import { onDestroy } from "svelte";

    /** basic subject behavior */
    const subject = new Subject();

    // multiple subscriptions, but shares same data with all observers
    // subject.subscribe(getFullObserver("observer 1"));
    // subject.subscribe(getFullObserver("observer 2"));

    // emit values
    subject.next("something");
    // subject.error(() => new Error("something went wrong"));
    subject.complete();

    /** newsLetter scenario */
    const newsLetterSubject$ = new Subject();
    from(newsLetters).pipe(
        // delays until a certain date
        delayWhen((newsLetter) => timer(newsLetter.releaseDate)),
        map((newsLetter) => ({ headline: newsLetter.headline }))
        // finalize(() => newsLetterSubject$.complete())
    );
    // .subscribe(newsLetterSubject$);
    // .subscribe({
    //     next: (newsLetter) => {
    //         console.log("---- emitting new newsLetter ----");
    //         newsLetterSubject$.next(newsLetter);
    //     },
    //     // also let the subject know that the source observable is done
    //     // by explicitly calling the complete function on the subject
    //     // or you can also just pass the subject as an observer object.
    //     // this way we will handle all notifications automatically.
    //     // complete: () => newsLetterSubject$.complete(),
    // });

    // if the subject is still running we should be able to multicast another value
    // timer(20000).subscribe(() => {
    //     // basic
    //     // we can call the unsubscribe function directly on our subject because it also implements the subscription interface
    //     newsLetterSubject$.unsubscribe();

    //     console.log("---- extra newsLetter ----");
    //     newsLetterSubject$.next({ headline: "This is an extra newsletter" });
    // });

    // // subscriptions
    // newsLetterSubject$.pipe(tap(getFullTapObserver("(wizard subscriber)"))).subscribe();
    // newsLetterSubject$.pipe(tap(getFullTapObserver("(orc subscriber)"))).subscribe();
    // timer(7000).subscribe(() =>
    //     newsLetterSubject$.pipe(tap(getFullTapObserver("(fairy subscriber)"))).subscribe()
    // );

    /** using subjects in combination with takeUntil */
    const destroy$ = new Subject();
    interval(1000)
        .pipe(
            // as usual, a single next notification destroys the subscription, in this case its coming from the subject when the component is destroyed
            takeUntil(destroy$.pipe(tap(getFullTapObserver("(destroy$)"))))
        )
        .subscribe(getFullObserver("interval"));

    // end of component lifecycle (eg: moving to another page route)
    // often used when a component is destroyed: angular, vue & react also use this "component lifecycle" concept
    onDestroy(() => {
        destroy$.next(
            "OnDestroy was triggered, sending last next notfification to all subscribers"
        );
        destroy$.unsubscribe();
    });
</script>

<section>
    <Page title="Subject works" subTitle="(Open devtools)" />
</section>
