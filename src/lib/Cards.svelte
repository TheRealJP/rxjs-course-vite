<script lang="ts">
    import Card, { Content, Actions } from "@smui/card";
    import Button, { Label } from "@smui/button";

    export let title: string;
    export let items: any[];
</script>


<main>
    <h1 class="text-5xl font-bold">{title}</h1>

    <section class="flex my-4 w-full">
        {#each items as item}
            <Card
                class="bg-slate-200 rounded-md p-2 m-4 flex-1 flex flex-col justify-between"
            >
                <Content class="mb-10">
                    <h2 class="text-2xl font-bold">{item.name}</h2>
                    <h3 class="text-gray-400">{item.description}</h3>
                </Content>
                <Actions>
                    <Button
                        href={item.route}
                        class="bg-purple-600 capitalize text-sm w-full"
                        variant="raised"
                        on:click={() => {}}
                    >
                        <Label>Start</Label>
                    </Button>
                </Actions>
            </Card>
        {/each}
    </section>
</main>
