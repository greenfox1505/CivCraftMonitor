# CivCraftMonitor
A Monitoring tool for putting CivCraft server status on the web.


## Design
This tool has 2 main parts and a web service (Uone line, thanks to 
express). 

The first part parses UDP packets. For now that won't be too complex. 
No error checking. No malicous packing cleaning. etc. It's important 
that I purge sections of the data that haven't been updated recantly so 
servers that are down don't polute the web side.

The secound part will be the web API that serves one thing: a JSON doc
of the data collected by the UDP packet parser. Maybe I'll add some more
interesting content like uptime and such, but for now that's not 
important. I probably will write an agument that allows you to show just
one server's up status. But not right now.

The web service will be for all static content. An HTML page will be
needed. Maybe I'll do some fun things with Jade, but for now it will
just be a web widget that connects to the server from part two and 
populates HTML with the content being shared. This could be served from
an iFrame too. I'm getting away from myself. But all this is just static
content that lets the browser show content from part two.
