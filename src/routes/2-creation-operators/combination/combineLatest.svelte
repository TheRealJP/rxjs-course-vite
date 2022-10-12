<script lang="ts">
    import { getFullObserver } from "$utils/rxjs-prefab";
    import { combineLatest, fromEvent, of, throwError, timer } from "rxjs";
    import { ajax } from "rxjs/ajax";
    import { onMount } from "svelte";
    const fullObserver = getFullObserver("combineLatest");

    // --- observables to combine in the combineLatest operator ---
    const httpCall$ = ajax<any>("https://www.boredapi.com/api/activity");
    const mouseClick$ = fromEvent<MouseEvent>(document, "click");
    const keyInput$ = fromEvent<KeyboardEvent>(document, "keydown");
    const error$ = throwError(() => "Something went wrong");

    /** --- basic behaviors --- */
    // --- more common: using infinite observables (sometimes mixed with finite observables) --- 
    const combineLatest$ = combineLatest([httpCall$, mouseClick$, keyInput$]);
    // combineLatest$.subscribe(([httpResponse, mouseClickData, keyInputData]) => {
    //     console.log({
    //         httpResponse: httpResponse.response.activity,
    //         mousePosition: `${mouseClickData.clientX}/${mouseClickData.clientY}`,
    //         keyboardKey: keyInputData.key,
    //     });
    // });

    // --- less common: using finite observables --- 
    const of1$ = of(3);
    const of2$ = of("C");
    // combineLatest([of1$, of2$]).subscribe(fullObserver);

    // --- combineLatest error ---
    // combineLatest([mouseClick$, error$]).subscribe(fullObserver);

    // --- combineLatest empty array ---
    // combineLatest([]).subscribe(fullObserver);

    /** --- classic combineLatest use case: applying filter criteria --- */
    interface SchoolClass {
        title: string;
        category: string;
    }
    const schoolClasses: SchoolClass[] = [
        {
            title: "biology",
            category: "science",
        },
        {
            title: "mathematics",
            category: "science",
        },
        {
            title: "drawing",
            category: "art",
        },
        {
            title: "painting",
            category: "art",
        },
    ];
    let filteredClasses: SchoolClass[] = schoolClasses;

    onMount(() => {
        const dropdown = document.getElementById("dropdown");
        const titleSearch = document.getElementById("search");
        const dropdownEvent$ = fromEvent<Event>(dropdown, "change");
        const searchEvent$ = fromEvent<InputEvent>(titleSearch, "input");

        const subscription = combineLatest([dropdownEvent$, searchEvent$]).subscribe(
            ([dropdownEvent, searchEvent]) => {
                const title = (searchEvent.target as any).value;
                const category = (dropdownEvent.target as any).value;

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
        timer(10000).subscribe(() => {
            subscription.unsubscribe();
            console.log("combineLatest unsubscribed!");
        });
    });
</script>

<main>
    <!-- filters -->
    <section id="filter-container" class="flex justify-center">
        <select id="dropdown" class="border-slate-200 border-solid  rounded-md border-2">
            <option value="default" selected>Category</option>
            <option value="science">Science</option>
            <option value="art">Art</option>
        </select>
        <input
            id="search"
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
