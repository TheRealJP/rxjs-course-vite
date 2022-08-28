<script lang="ts">
    import Card, { Content, Actions } from "@smui/card";
    import Button, { Label } from "@smui/button";
    import { push, pop, location } from "svelte-spa-router";
    export let title: string;
    export let items: any[];

    const goBack = () => {
        pop();
    };
</script>

<main class="m-20 flex justify-center flex-col">
    {#if $location !== "/"}
        <button class="flex self-baseline" on:click={goBack}>Go Back</button>
    {/if}

    <h1 class="text-5xl font-bold">{title}</h1>

    <section class="flex my-4 w-full flex-wrap">
        {#each items as item}
            <Card
                class="bg-slate-200 rounded-md p-2 m-4 flex flex-basis flex-col justify-between w-56 h-64"
            >
                <Content class="mb-10">
                    <h2 class="text-2xl font-bold">{item.name}</h2>
                    <h3 class="text-gray-400">{item.description}</h3>
                </Content>
                <Actions>
                    <Button
                        class="bg-purple-600 capitalize text-sm w-full"
                        variant="raised"
                        on:click={() => {
                            push(item.route);
                        }}
                    >
                        <Label>Start</Label>
                    </Button>
                </Actions>
            </Card>
        {/each}
    </section>
</main>
