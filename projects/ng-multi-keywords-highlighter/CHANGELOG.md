# CHANGELOG

## Why are we adding Material to the sandbox app and not the library?
The easy answer to that question is that in this case Material is a peer dependency of our library. We don’t want it to be downloaded each time our library is installed somewhere — that can lead to things like huge final bundles when the application is built. Instead we want to mandate that whichever project is using our library needs to also have Material installed as well. 
