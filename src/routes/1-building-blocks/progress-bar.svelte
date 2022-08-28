<script lang="ts">
    import { Observable } from "rxjs";

    // use these html elements to update the styling
    const progressColor =
        document.querySelector<HTMLElement>(".progress-color");
    const progressText = document.querySelector<HTMLElement>(".progress-text");

    const progressBar$ = new Observable<number>((subscriber) => {
        const speed = 50;

        // ----------- create a producer that increments from 0 to 100 -----------
        let counter = 0;
        const intervalId = setInterval(() => {
            if (counter > 100) subscriber.complete();
            if (counter > 30) subscriber.error("Something went wrong!");

            subscriber.next(counter++);
        }, speed);

        return () => {
            clearInterval(intervalId);
        };
    });

    // update styling based on the incoming notification type
    progressBar$.subscribe({
        next: (progressCount) => {
            progressText.textContent = progressCount + "%";
            progressColor.style.width = progressCount + "%";
        },
        error: (error) => {
            progressText.textContent = error;
            progressText.style.color = "#fff";
            progressText.className += " error-text";
            progressColor.className += " error-color";
        },
        complete: () => {
            progressText.textContent = "Complete!";
            progressText.style.color = "#fff";
            progressText.className += " finished-text";
            progressColor.className += " finished-color";
        },
    });
</script>

<section class="progress-container flex h-full">
    progress bar works
    <div class="progress-color" />
    <div
        class="progress-text absolute w-full -ml-4 top-1/2 left-1/2 text-6xl"
    />
</section>