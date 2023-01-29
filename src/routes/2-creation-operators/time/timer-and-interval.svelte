<script lang="ts">
    import Page from "$lib/Page.svelte";
    import { interval, Observable, timer } from "rxjs";

    /** basic interval operator functionality */
    // interval(2000).subscribe((value) => console.log("interval: ", value));

    /** basic timer operator functionality */
    // timer(2000).subscribe((number) => console.log("timer0: ", number));
    // timer(2000, 1000).subscribe((number) => console.log("timer1: ", number));
    // timer(0, 1000).subscribe((number) => console.log("timer2: ", number));

    /** custom timer operator */
    function customTimer(start: number, interval?: number) {
        return new Observable<number>((subscriber) => {
            let count = 0;
            let intervalId, timeOutId;

            timeOutId = setTimeout(() => {
                if (interval) {
                    intervalId = setInterval(() => {
                        subscriber.next(count);
                        count++;
                    }, interval);
                } else {
                    subscriber.next(count);
                    subscriber.complete();
                }
            }, start);

            return () => {
                clearInterval(intervalId);
                clearTimeout(timeOutId);
            };
        });
    }

    // const timerSubscription = customTimer(2000).subscribe((value) =>
    //     console.log("timer (timeout): ", value)
    // );
    // const timerSubscription = customTimer(2000, 1000).subscribe((value) =>
    //     console.log("timer (timeout + interval): ", value)
    // );
    // const timerSubscription = customTimer(0, 1000).subscribe((value) =>
    //     console.log("timer (interval mimic): ", value)
    // );

    // setTimeout(() => {
    //     timerSubscription.unsubscribe();
    // }, 5000);

    /** custom interval operator */
    function customInterval(interval: number) {
        return new Observable<number>((subscriber) => {
            let count = 0;

            const intervalId = setInterval(() => {
                subscriber.next(count);
                count++;
            }, interval);

            return () => {
                clearInterval(intervalId);
            };
        });
    }

    // const intervalSubscription = customInterval(1000).subscribe((value) =>
    //     console.log(value)
    // );
    // setTimeout(() => {
    //     intervalSubscription.unsubscribe();
    // }, 3000);

    /** bonus: using specific dates in the timer operator */
    const triggerDate = new Date();
    triggerDate.setSeconds(triggerDate.getSeconds() + 5);

    // timer(triggerDate).subscribe((value) => console.log("dateTimer0: ", value));
    // timer(triggerDate, 1000).subscribe((value) => console.log("dateTimer0: ", value));
</script>

<section>
    <Page title="Timer & interval works" subTitle="(Open devtools)" />
</section>
