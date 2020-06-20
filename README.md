Javascript can be multi-threaded.

If you run Fibonacci in browser (1 thread) the UI will freeze in few miliseconds, here is a MVP where the UI doesn't freeze at all.


Demo link: https://webworkerproject.web.app/

Try big numbers like 979877989, moving components will stop moving when web worker is off, but when with web worker is on they won't.
