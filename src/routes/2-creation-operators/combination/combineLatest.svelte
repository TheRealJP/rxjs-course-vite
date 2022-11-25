<script lang="ts">
    import { schoolClassMap } from "$utils/constants";
    import type { ISchoolClass } from "$utils/interfaces";
    import { getFullObserver } from "$utils/rxjs-prefab";
    import { combineLatest, fromEvent, of, throwError, timer } from "rxjs";
    import { ajax } from "rxjs/ajax";
    import { fromFetch } from "rxjs/fetch";
    import { onMount } from "svelte";
    const fullObserver = getFullObserver("combineLatest");

    /** --- basic behaviors --- */
    // --- observables to combine in the combineLatest operator ---
    const httpCall$ = fromFetch("https://www.boredapi.com/api/activity?key=5881028", {
        selector: (response) => response.json(),
    });
    const mouseClick$ = fromEvent<MouseEvent>(document, "click");
    const keyInput$ = fromEvent<KeyboardEvent>(document, "keydown");
    const error$ = throwError(() => "Something went wrong");

    // --- more common: using infinite observables (sometimes mixed with finite observables) ---
    const combineLatest$ = combineLatest([httpCall$, mouseClick$, keyInput$]);

    // combineLatest$.subscribe(([httpResponse, mouseClickData, keyInputData]) => {
    //     console.log({
    //         httpResponse: httpResponse.activity,
    //         mousePosition: `${mouseClickData.clientX}/${mouseClickData.clientY}`,
    //         keyboardKey: keyInputData.key,
    //     });
    // });

    // --- less common: using finite observables ---
    const of1$ = of(3);
    const of2$ = of("C");
    // combineLatest([of1$, of2$]).subscribe(fullObserver);

    // --- combineLatest error ---
    // combineLatest([mouseClick$, keyInput$, error$]).subscribe(fullObserver);

    // --- combineLatest empty array ---
    // combineLatest([]).subscribe(fullObserver);

    /** --- classic combineLatest use case: applying filter criteria --- */
    const schoolClasses: ISchoolClass[] = [
        { ...schoolClassMap.biology },
        { ...schoolClassMap.mathematics },
        { ...schoolClassMap.drawing },
        { ...schoolClassMap.painting },
    ];
    let filteredClasses: ISchoolClass[] = schoolClasses;

    onMount(() => {
        const categoryDropdown = document.getElementById("category-dropdown");
        const titleSearch = document.getElementById("title-search");

        // --- we'll also do this part together ---
        const categoryDropdown$ = fromEvent<Event>(categoryDropdown, "change");
        const titleSearch$ = fromEvent<InputEvent>(titleSearch, "input");

        const subscription = combineLatest([categoryDropdown$, titleSearch$]).subscribe(
            ([dropdownValue, titleValue]) => {
                const title = (titleValue.target as any).value;
                const category = (dropdownValue.target as any).value;

                filteredClasses = schoolClasses.filter(
                    (cl) => cl.title.includes(title) && cl.category === category
                );

                // if default is selected show all the classes and only allow filtering on title
                if (category === "default") {
                    filteredClasses = schoolClasses.filter((cl) => cl.title.includes(title));
                }
            }
        );

        // fromEvent is an infinite observable, so normally we need to unsubscribe the combineLatest subscription
        // for this use case we dont unsubscribe because we want to keep filtering
        // this unsubscribe is just for demo purposes
        timer(7000).subscribe(() => {
            subscription.unsubscribe();
            console.log("combineLatest unsubscribed!");
        });
    });
</script>

<main>
    <!-- filters -->
    <section id="filter-container" class="flex justify-center">
        <select id="category-dropdown" class="border-slate-200 border-solid rounded-md border-2">
            <option value="default" selected>--- Category ---</option>
            <option value="science">Science</option>
            <option value="art">Art</option>
        </select>
        <input
            id="title-search"
            type="text"
            class="ml-4 border-slate-200 rounded-md border-solid border-2"
        />
    </section>

    <!-- cards -->
    <section class="flex my-4 h-48 w-full flex-wrap justify-center">
        {#each filteredClasses as schoolClass}
            <div
                class="bg-slate-200 rounded-md p-4 m-4 flex flex-basis flex-col justify-between w-48 h-48"
            >
                <div class="mb-12">
                    <h2 class="text-2xl font-bold mb-1">{schoolClass.title}</h2>
                    <h3 class="text-gray-400 text-">{schoolClass.category}</h3>
                </div>
            </div>
        {/each}
    </section>
</main>
