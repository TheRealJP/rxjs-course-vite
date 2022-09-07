<script lang="ts">
    import { Observable } from "rxjs";

    // use these html elements to update the styling
    const progressColor =
        document.querySelector<HTMLElement>(".progress-color");
    const progressText = document.querySelector<HTMLElement>(".progress-text");

    const progressBar$ = new Observable<number>((subscriber) => {
        const speed = 50;

        // ----------- create a producer that increments from 0 to 100 -----------
    });

    // update styling based on the incoming notification type
    progressBar$.subscribe({
        next: (progressCount) => {},
        error: (error) => {},
        complete: () => {},
    });
</script>

<section class="progress-container flex h-full">
    <div class="progress-color" />
    <div
        class="progress-text absolute w-full -ml-4 top-1/2 left-1/2 text-6xl"
    />
</section>
