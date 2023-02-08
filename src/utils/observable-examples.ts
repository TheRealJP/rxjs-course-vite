import { Observable } from "rxjs";

export const stringObservable$ = new Observable(subscriber => {
  setTimeout(() => {
    ['Charlie', 'Alice', 'Bob'].forEach(val => subscriber.next(val))
    subscriber.complete()
  }, 2000);

  return () => {
    console.log('Teardown stringObservable');
  }
});

export const numberObservable$ = new Observable(subscriber => {
  [1, 2, 3].forEach(val => subscriber.next(val))
  subscriber.complete()

  return () => {
    console.log('Teardown numberObservable');
  }
});

// interval observables
export const numberIntervalObservable$ = new Observable<number>(subscriber => {
  let counter = 0;

  const intervalId = setInterval(() => {
    subscriber.next(counter++);
    console.log('producer created a new value: ', counter);
  }, 1000);

  return () => {
    console.log('numberIntervalObservable$ teardown function activated');
    clearInterval(intervalId)
  };
});

export const stringIntervalObservable$ = new Observable<string>(subscriber => {
  let counter = 0;

  setInterval(() => {
    subscriber.next(String.fromCharCode((counter++) + 97));
  }, 1000);

  return () => {
    console.log('stringIntervalObservable$ teardown function activated');
  };
});














// Http observables
export const fakeServerRequestObservable$ = new Observable(observer => {
  setTimeout(() => {
    observer.next({ data: 'Some data returned from server' })
    observer.complete()
  }, 2000)
});
export const fakeServerRequestErrorObservable$ = new Observable(observer => {
  setTimeout(() => {
    observer.error('Something went wrong during server request')
  }, 2000)
});
