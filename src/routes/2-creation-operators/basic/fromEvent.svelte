<script lang="ts">
    import Page from "$lib/Page.svelte";
    import { fromEvent, Observable, Subscription } from "rxjs";
    import { onMount } from "svelte";

    onMount(() => {
        const square = document.getElementById("square");
        const clickEvent$ = fromEvent<MouseEvent>(square, "click");
        const clickEventSubscription = clickEvent$.subscribe((event) =>
            console.log("fromEvent: ", {
                eventType: event.type,
                x: event.clientX,
                y: event.clientX,
            })
        );

        const customClickEvent$ = customFromEvent<MouseEvent>(square, "click");
        const customClickEventSubscription = customClickEvent$.subscribe(
            (event) =>
                console.log("customFromEvent: ", {
                    eventType: event.type,
                    x: event.clientX,
                    y: event.clientX,
                })
        );

        setTimeout(() => {
            clickEventSubscription.unsubscribe();
            customClickEventSubscription.unsubscribe();
        }, 3000);

        // other event example
        const input = document.getElementById("input");
        const keyDownEvent$ = fromEvent<KeyboardEvent>(input, "keydown");
        keyDownEvent$.subscribe((event) => {
            console.log("fromEvent keydown: ", {
                eventType: event.type,
                key: event.key,
            });
        });

        customFromEvent<KeyboardEvent>(input, "keydown").subscribe((event) =>
            console.log("customFromEvent keydown: ", {
                eventType: event.type,
                key: event.key,
            })
        );
    });

    // how the fromEvent creation operator works 
    function customFromEvent<T extends Event>(
        target: HTMLElement | Document,
        eventName: string
    ) {
        return new Observable<T>((subscriber) => {
            // emit event data to subscriber
            const eventHandler = (event: T) => {
                console.log("customFromEvent producer: ", event.type);
                subscriber.next(event);
            };

            // producer starts listening & generating event data
            target.addEventListener(eventName, eventHandler);

            // teardown the producer eventlistener
            // return () => {
            //     target.removeEventListener(eventName, eventHandler);
            // };
        });
    }
</script>

<section class="flex flex-col h-60 justify-center items-center">
    <div id="square" class="w-16 h-16 bg-blue-600 m-6" />
    <input
        id="input"
        type="text"
        class="border border-solid border-gray-500 rounded-sm"
    />
</section>
