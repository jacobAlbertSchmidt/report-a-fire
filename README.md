# report-a-fire
## Inspiration
Australia has had some of the worst wildfires in recorded history, so we just wanted to build a tool to help every-day Australians get through this crisis.
## What it does
Our website helps aggregate, via crowd-sourcing, crucial information about the spread of wildfires in Australia.
## How we built it
We hosted a web-server using Go, and created the client-side using Google's Maps-API and a lot of JavaScript.
## Challenges we ran into
A-synchronized requests between the client and server posed serious issues for this project. We attempted to simplify the relationship between the server and client as much as possible in order to resolve this issue. 
## Accomplishments that we're proud of
The website turned out to be both incredibly simple to use, and incredibly helpful. For this, we are extremely proud.
## What we learned
A lot... We worked with google's map-api for the first time. We learned a great deal about client-server interactions, and a lot of javascipt.
## What's next for Report A Fire
We're going to host a website (not just locally), and possibly create a smartphone app
## For Use
Simply clone repository, and if Go is already dowladed, type "go run main.go" into the command line, and open localhost:8080 in chrome.
