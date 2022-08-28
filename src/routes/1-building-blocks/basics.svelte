<script lang="ts">
    import {Observable, Subscription} from 'rxjs'

    /** -------- Simple Observable -------- */
    // const simpleObservable$ = new Observable<number>((subscriber) => {
    //   subscriber.next(42)
    //   subscriber.next(120)
    // })
    const observable$ = new Observable<number>((subscriber) => {
        // execute code
        subscriber.next(42);
        subscriber.next(120);
        setTimeout(() => {
            subscriber.next(310);
            subscriber.complete();
        }, 3000);

        return () => {
            console.log("Teardown");
        };
    });

    /** -------- Producer examples -------- */
    const numberObservable$ = new Observable<number>((subscriber) => {
        subscriber.next(42);
        subscriber.next(3.14);
    });

    const arrayObservable$ = new Observable<number>((subscriber) => {
        const array = [1, 2, 3, 4];

        array.forEach((val) => {
            subscriber.next(val);
        });
    });

    const httpObservable$ = new Observable<Event>((subscriber) => {
        const http = new XMLHttpRequest();
        const url = "https://jsonplaceholder.typicode.com/todos/1";
        http.open("GET", url);
        http.send();

        http.onreadystatechange = (httpEvent) => {
            subscriber.next(http.response);
        };
    });

    const eventListenerObservable$ = new Observable<{}>((subscriber) => {
        document.addEventListener("click", (event) => {
            subscriber.next({ x: event.clientX, y: event.clientY });
        });
    });

    const webSocketObservable$ = new Observable<MessageEvent>((subscriber) => {
        const ws = new WebSocket(
            "wss://demo.piesocket.com/v3/channel_1?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self"
        );

        ws.addEventListener("message", (event) => subscriber.next(event));
    });

    /** -------- Observer -------- */
    const observer = {
        // notify (observer pattern) + next (iterator pattern) = RxJS observer.next
        next: (value: number) => {
            console.log("The observable has sent a new value: ", value);
        },
    };

    /** -------- Subscribe -------- */
    // const subscription: Subscription = simpleObservable$.subscribe(observer)
    // const subscription: Subscription = observable$.subscribe((value: number) => {
    //   // console.log('The observable has sent a new value: ', value)
    // })

    // observable$ + observerr
    const subscription: Subscription = observable$.subscribe(
        // (value: number) => {
        //     console.log("The observable has sent a new value: ", value);
        // }
        observer
    );

    // subscription.unsubscribe()
    // if (subscription.closed) console.log('Unsubscribed')

    /** -------- Unsubscribe -------- */
    setTimeout(() => {
        // observer stops listening to incoming next notifications from the observable
        subscription.unsubscribe()
        if (subscription.closed) console.log("Unsubscribed");
    }, 2000);
</script>

<section>Basic works</section>