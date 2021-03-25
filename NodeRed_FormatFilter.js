//str variable set to payload contents for easier manipulation
str = msg.payload

/*
Declaring these because from what I gather - functions don't like
it when you try to declare variables inside them.
*/
var catSelection = "**No Selection**"
var artist = ""
var assetType = ""
var album = ""	
var category = ""
var linkProduct = ""
var linkSponsor = ""
var runtime = ""
var isrc = ""
var title = ""
var taskType = ""
var taskParamString = ""
var parentName = ""
var taskCommandID = ""
var albumLabel = ""
var releaseYear = ""
var linkOwner = ""



/*
the dropUnused function removes empty categories

it looks at every category and checks the character
immediately following the "=" to see if its a semicolon.

If it is a semicolon we can assume its an empty category and
can be stripped out.
*/
function dropUnused(s1) {
    var l = s1
    l = l.length
    
    var n = str.search(s1)
    n = parseInt(n)

    var post = l + n
    
var postS = str.charAt(post)
    
    if (postS == ";") {
        s1 += ";"
     str = str.replace(s1,"")
    }
}

/*
the isolateCat function is meant for isolating a single category in particular. 

it takes the parameter and creates a substring where the selection is first,
then looks for the ~ indicating the start of the next category,
using the ~ as the end, another substring is created and put into
the catSelection variable which should be used immediately after the 
function is run.
*/
function isolateCat(select){

    selectStart = str.search(select)
        if(selectStart == -1){
            
            catSelection = ""
            
        } else {
            
            toSelect = str.substring(selectStart)
            selectStart = 0
            selectEnd = toSelect.search("~")
                 /*
				 The search method will return a -1 if it finds nothing
				 the main situation being if there is no ~ after a 
				 substring, this only happens for the final point in the list
				 */
				if (selectEnd == -1) {
                    
                    toSelect = toSelect.substring(selectStart)
                    
                } else{
            toSelect = toSelect.substring(selectStart,selectEnd)
            }
        catSelection = toSelect
        }
}

/*
the trimExtra function cuts out whatever category is plugged into the parameter.

The function calls isolateCat and uses the catSelection as the input for a replace
method that replaces the selection with emptiness.

It contains a deprecated block that I haven't removed yet since it isn't harming anything.
*/
function trimExtra(trim) {
    var toTrim = ""
    var unTrimd = str
   /* the isolateCat function has rendered this block useless
   
    trimStart = unTrimd.search(trim)
            toTrim = unTrimd.substring(trimStart)
            trimStart = 0
            trimEnd = toTrim.search("~")
            toTrim = toTrim.substring(trimStart,trimEnd)
        trimD = unTrimd.replace(toTrim + "~", "")
        */
    isolateCat(trim)
    toTrim = catSelection
    trimD = unTrimd.replace(toTrim + "~", "")
    str = trimD
}

/*
the dropCats functions takes out all the "dataPoint=" stuff. 

The function takes the input and removes all the stuff you can see below.
Its sorta messy since I just sorta plow through every category but its 
easy to make changes to it to account for more categories. 

We don't see any issues with this since it gets called at the very end,
this also makes is so the data string retains the identifiers up until
the end so we can manipulate data easier.

This function contains a deprecated block that is commented out.
*/
function dropCats(s2) {
        var cat2 = ""
        var catS = 0
        var catE = 0
        s2 = s2.replace("Asset_Type=","")
        s2 = s2.replace("Album=","")
        s2 = s2.replace("Artist=","")
        s2 = s2.replace("Category=","")
        s2 = s2.replace("Link_Product=","") 
        s2 = s2.replace("Link_Sponsor=","")
        s2 = s2.replace("Runtime=","")
        s2 = s2.replace("ISRC=","")
        s2 = s2.replace("Title=","")    
        s2 = s2.replace("TaskType=","")
        s2 = s2.replace("TaskParamString=","")
        s2 = s2.replace("ParentName=","")
        s2 = s2.replace("TaskCommandID=","")
        s2 = s2.replace("AlbumLabel=","")
        s2 = s2.replace("ReleaseYear=","")
        s2 = s2.replace("LinkOwner=","")
            /*The trimExtra function has made this block useless
			
            catS = s2.search("Category=")
            cat2 = s2.substring(catS)
            catS = 0
            catE = cat2.search("~")
            cat2 = cat2.substring(catS,catE)
        
			s2 = s2.replace(cat2 + "~", "")
			*/
        str = s2

    
}

/*
This will be used to dump every data point into its own variable to be added together later.
*/
function dataToVar() {
	
	isolateCat("Asset_Type=")
	assetType = catSelection
	
	isolateCat("Album=")
	album = catSelection
	
	isolateCat("Artist=")
	artist = catSelection
	
	isolateCat("Category=")
	category = catSelection
	
	isolateCat("Link_Product=") 
	linkProduct = catSelection
	
	isolateCat("Link_Sponsor=")
	linkSponsor = catSelection
	
	isolateCat("Runtime=")
	runtime = catSelection
	
	isolateCat("ISRC=")
	isrc = catSelection
	
	isolateCat("Title=")
	title = catSelection
	
	isolateCat("TaskType=")
	taskType = catSelection
	
	isolateCat("TaskParamString=")
	taskParamString = catSelection
	
	isolateCat("ParentName=")
	parentName = catSelection
	
	isolateCat("TaskCommandID=")
	taskCommandID = catSelection
	
	isolateCat("AlbumLabel=")
	albumLabel = catSelection
	
	isolateCat("ReleaseYear=")
	releaseYear = catSelection
	
	isolateCat("LinkOwner=")
	linkOwner = catSelection
	
	
}



//dropUnused is called for each data point.
dropUnused(" Asset_Type=")
dropUnused(" Album=")
dropUnused(" Artist=")
dropUnused(" Category=")
dropUnused(" Link_Product=") 
dropUnused(" Link_Sponsor=")
dropUnused(" Runtime=")
dropUnused(" ISRC=")
dropUnused(" Title=")
dropUnused(" TaskType=")
dropUnused(" TaskParamString=")
dropUnused(" ParentName=")
dropUnused(" TaskCommandID=")
dropUnused(" AlbumLabel=")
dropUnused(" ReleaseYear=")
dropUnused(" LinkOwner=")

/*
This blurb here may end up being deprecated later on if I build another 
funtion for links and spots like the reOrderSong one. 

These 3 lines make the string point into an array split with semicolons.
The array then gets reversed, this is cause the order Triton wants the data
in is coincidentally(maybe not a coincidence) the reverse of how its passed.
Then we take the array and make it into a string separated with ~.
*/
str = str.split("; ")
str = str.reverse()
str = str.join("~")

dataToVar()

/*
Songs need processed a little differently
This "if" splits it off separate.
*/
if(str.search("Asset_Type=Song") == -1){

	str = linkOwner + "~" + album + "~" + title + "~" + runtime + "~" + assetType + "~" + category;

}else{
 
	str = artist + "~" + album + "~" + title + "~" + runtime + "~" + assetType + "~" + category;
}

//Drops Categories
dropCats(str)

//Adds the Triton start and end characters.
msg.payload = "^" + str + "|"

//Spits out the message
return msg;
