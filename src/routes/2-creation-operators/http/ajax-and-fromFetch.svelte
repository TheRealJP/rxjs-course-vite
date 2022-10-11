<script lang="ts">
    import Page from "$lib/Page.svelte";
    import { ajax, AjaxResponse } from "rxjs/ajax";
    import { fromFetch } from "rxjs/fetch";

    // --- http request variables ---
    const url = "https://jsonplaceholder.typicode.com/posts";
    const headers = { "Content-Type": "application/json" };
    const postBody = {
        title: "Testing the POST request in RxJS",
        author: "CodeGrip",
    };
    const putBody = {
        title: "Testing the PUT request in RxJS",
        author: "CodeGrip",
    };

    // --- GET ---
    // default implicit behavior
    const ajaxDefault$ = ajax(url + "/1"); // you can pass url or { url: url + "/1", responseType: "json" }
    const fromFetchDefault$ = fromFetch(url + "/1", { selector: (response) => response.json() });

    // ajaxDefault$.subscribe({
    //     next: (res: AjaxResponse<any>) => console.log("default ajax behavior: ", res),
    //     complete: () => console.log("ajax completed!"),
    // });
    // fromFetchDefault$.subscribe({
    //     next: (res: Response) => console.log("default fromFetch behavior: ", res),
    //     complete: () => console.log("fromFetch completed!"),
    // });

    // explicit http GET methods
    const ajaxGet$ = ajax.get(url + "/1");
    const ajaxGetJson$ = ajax.getJSON(url + "/1");
    const fromFetchGet$ = fromFetch(url + "/1", {
        method: "GET", // fromFetch uses "GET" by default unless other request method is specified
        selector: (response) => response.json(), // the selector function allows us to tell fromFetch we only want the json response before we subscribe
    });

    // ajaxGet$.subscribe((res) => console.log("ajax GET: ", res));
    // ajaxGetJson$.subscribe((res) => console.log("ajax getJson: ", res));
    // // the alternative to using the selector is to handle the promise inside our next function
    // // async (res) => console.log("fromFetch GET: ", await res.json()),
    // fromFetchGet$.subscribe((res) => console.log("fromFetch GET: ", res));

    // --- POST ---
    const ajaxPost$ = ajax.post(url, postBody);
    const fromFetchPost$ = fromFetch(url, {
        method: "POST",
        body: JSON.stringify(postBody),
        headers: headers,
        selector: (response) => response.json(),
    });

    // ajaxPost$.subscribe((res) => console.log("ajax POST: ", res.response));
    // fromFetchPost$.subscribe((res) => console.log("fromFetch POST: ", res));

    // --- PUT ---
    const ajaxPut$ = ajax.put(url + "/1", putBody);
    const fromFetchPut$ = fromFetch(url + "/1", {
        method: "PUT",
        body: JSON.stringify(putBody),
        headers: headers,
        selector: (response) => response.json(),
    });

    // ajaxPut$.subscribe((res) => console.log("ajax PUT: ", res.response));
    // fromFetchPut$.subscribe((res) => console.log("fromFetch PUT: ", res));

    // --- DELETE ---
    const ajaxDelete$ = ajax.delete(url + "/1");
    const fromFetchDelete$ = fromFetch(url + "/1", {
        method: "DELETE",
        selector: (response) => response.json(),
    });

    ajaxDelete$.subscribe((res) => console.log("ajax DELETE: ", res.response));
    fromFetchDelete$.subscribe((res) => console.log("fromFetch DELETE: ", res));
</script>

<section>
    <Page title="Ajax & fromFetch works" subTitle="(Open devtools)" />
</section>

<!-- 
<script lang="ts">
    import Page from "$lib/Page.svelte";
    import { ajax, AjaxResponse } from "rxjs/ajax";
    import { fromFetch } from "rxjs/fetch";

    // --- http request variables ---
    const url = "https://jsonplaceholder.typicode.com/posts";
    const postBody = {
        title: "Testing the ajax POST request in RxJS",
        author: "CodeGrip",
    };
    const putBody = {
        title: "Testing the ajax PUT request in RxJS",
        author: "CodeGrip",
    };

    // --- GET ---
    // default implicit behavior
    const ajaxDefault$ = ajax(url + "/1"); // you can pass url or { url: url + "/1", responseType: "json" }
    const fromFetchDefault$ = fromFetch(url + "/1");

    ajaxDefault$.subscribe({
        next: (res: AjaxResponse<any>) => console.log("default ajax behavior: ", res),
        complete: () => console.log("ajax completed!"),
    });
    fromFetchDefault$.subscribe({
        next: (res: Response) => console.log("default fromFetch behavior: ", res),
        complete: () => console.log("fromFetch completed!"),
    });

    // explicit http GET methods
    const ajaxGet$ = ajax.get(url + "/1");
    const ajaxGetJson$ = ajax.getJSON(url + "/1");
    const fromFetchGet$ = fromFetch(url + "/1", {
        method: "GET", // fromFetch uses "GET" by default unless other request method is specified
        selector: (response) => response.json(),  // the selector function allows us to tell fromFetch we only want the json response before we subscribe
    });

    // ajaxGet$.subscribe((res) => console.log("ajax GET: ", res));
    // ajaxGetJson$.subscribe((res) => console.log("ajax getJson: ", res));
    // // the alternative to using the selector is to handle the promise inside our next function
    // // async (res) => console.log("fromFetch GET: ", await res.json()),
    // fromFetchGet$.subscribe((res) => console.log("fromFetch GET: ", res));

    // --- POST ---
    const ajaxPost$ = ajax.post(url, postBody);
    const fromFetchPost$ = fromFetch(url, {
        method: "POST", // fromFetch uses "GET" by default unless other request method is specified
        body: JSON.stringify(postBody),
        selector: (response) => response.json(),
    });

    // ajaxPost$.subscribe((res) => console.log("ajax POST: ", res.response));
    // fromFetchPost$.subscribe((res) => console.log("fromFetch POST: ", res));

    // --- PUT (and PATCH) ---
    const ajaxPut$ = ajax.put(url + "/1", putBody);
    const fromFetchPut$ = fromFetch(url + "/1", {
        method: "PUT", // fromFetch uses "GET" by default unless other request method is specified
        body: JSON.stringify(putBody),
        selector: (response) => response.json(),
    });

    // ajaxPut$.subscribe((res) => console.log("ajax PUT: ", res.response));
    // fromFetchPut$.subscribe((res) => console.log("fromFetch PUT: ", res));

    // --- DELETE ---
    const ajaxDelete$ = ajax.delete(url + "/1");
    const fromFetchDelete$ = fromFetch(url + "/1", {
        method: "DELETE", // fromFetch uses "GET" by default unless other request method is specified
        selector: (response) => response.json(),
    });

    // ajaxDelete$.subscribe((res) => console.log("ajax DELETE: ", res.response));
    // fromFetchDelete$.subscribe((res) => console.log("fromFetch DELETE: ", res));
</script>

<section>
    <Page title="Ajax & fromFetch works" subTitle="(Open devtools)" />
</section> -->
