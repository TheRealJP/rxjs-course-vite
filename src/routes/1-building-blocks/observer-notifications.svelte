<script lang="ts">
    import { Observable, type PartialObserver, type TeardownLogic } from "rxjs";

    // const observer: Partial<Observer<string>> = {
    const observer: PartialObserver<string> = {
        next: (value) => console.log("Next notification: ", value),
        error: (err) => console.error("Error notification: ", err),
        complete: () => console.log("Observable completed!"),
    };

    const observable$ = new Observable<string>((subscriber): TeardownLogic => {
        subscriber.next("(sync) Rhinoceros beetle");
        subscriber.next("(sync) Singularity point");

        subscriber.complete();
        subscriber.error("Error message!!");

        setTimeout(() => {
            subscriber.next("(async) Heaven");
        }, 2000);

        return () => {
            console.log("Teardown function activated");
        };
    });

    console.log("------ before subscribe ------");
    observable$.subscribe(observer);
    console.log("------ after subscribe ------");
</script>

<section>
    observer-notifications works
</section>