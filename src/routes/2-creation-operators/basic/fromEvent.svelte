<script lang="ts">
    import { fromEvent, Observable } from "rxjs";
    import { onMount } from "svelte";

    function customFromEventt<T extends Event>(target: HTMLElement | Document, eventName: string) {
        return new Observable<T>((subscriber) => {
            const eventHandler = (event: T) => {
                // console.log("customFromEvent producer: ", event.type); // eventHandler
                subscriber.next(event);
            };

            target.addEventListener(eventName, eventHandler);

            return () => {
                target.removeEventListener(eventName, eventHandler);
            };
        });
    }

    // move on from here

    onMount(() => {
        const square = document.getElementById("square");

        const clickEvent$ = fromEvent<MouseEvent>(square, "click");

        clickEvent$.subscribe((event) => {
            console.log("fromEvent: ", { eventTarget: event.type, x: event.x, y: event.y });
        });

        // -------- other event example, works the same way
        const input = document.getElementById("input");
        const keyDownEvent$ = customFromEventt<KeyboardEvent>(input, "keydown").subscribe((event) =>
            console.log("customFromEvent keydown: ", {
                eventType: event.type,
                key: event.key,
            })
        );

        // setTimeout(() => {
        //     clickEventSubscription.unsubscribe();
        //     customClickEventSubscription.unsubscribe();
        //     console.log("Unsubscribed");
        // }, 3000);
    });
</script>

<section class="flex flex-col h-60 justify-center items-center">
    <div id="square" class="w-36 h-36 bg-blue-600 m-6" />

    <input id="input" type="text" class="border border-solid border-gray-500 rounded-sm" />
</section>
