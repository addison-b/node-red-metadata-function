# What is this?

  If you're stumbling across this somehow and you don't know me or why I made this - the quick and dirty of it is that we had one application that was sending metadata with bad formatting, the problem is that we needed it to get the data into another application in a neat and tidy format. This js file is what is living inside a function node on Node-RED.
  
For better or for worse, we chose to manipulate the semicolon separated metadata string with Node-RED. There's a bit of filtering and tagging that goes on prior to the messages getting processed through this function node, but this basically does it all.

# Before and After
<sup>*Here is an example of what this function does to the messages, if you want to understand it more, read the code comments.*</sup>

### Before

When being sent, the data categories are all included, including any empty ones.
```
Asset_Type=Song; Album=Neon Genesis Evangelion (Original Series Soundtrack); Artist=Yoko Takahashi; Category=X2A; Link_Product=; Link_Sponsor=; Runtime=04:05; ISRC=TWA532002207; Title=A Cruel Angel's Thesis; TaskType=; TaskParamString=; ParentName=; TaskCommandID=; AlbumLabel=Sparrow Records; ReleaseYear=2012; LinkOwner=
```

### After

The application receiving these wants data in a very specific Artist, Album, Title, Runtime, Category, *misc* format.

<sup>The receiving app is expecting some odd category we aren't passing, but we're adding another data point in there for testing.</sup>

Messages start with a ^ and end with a | and fields are separated by ~. 

```
^Yoko Takahashi~Neon Genesis Evangelion (Original Series Soundtrack)~A Cruel Angel's Thesis~04:05~Song~X2A|
```




