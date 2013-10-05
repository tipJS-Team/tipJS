<@
    if(data.length < 1) {
@>
        <p class="empty-text">display image is nothing</p>
<@
    }
    else {
@>
            <h1>Image list contain current page</h1>
<@
        for(var i=0; i < data.length; i++) {
@>
            <img src="<@= data[i].src @>" width="<@= data[i].width @>" height="<@= data[i].height @>">
<@
        }
    }
@>
