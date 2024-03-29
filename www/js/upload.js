/*
filedrag.js - HTML5 File Drag & Drop demonstration
Featured on SitePoint.com
Developed by Craig Buckler (@craigbuckler) of OptimalWorks.net
*/
(function() {

    // getElementById
    function $id(id) {
        return document.getElementById(id);
    }


    // output information
    function Output(msg) {
        var m = $id("messages");
        m.innerHTML = msg + m.innerHTML;
    }


    // file drag hover
    function FileDragHover(e) {
        e.stopPropagation();
        e.preventDefault();
        e.target.className = (e.type == "dragover" ? "hover" : "");
    }


    // file selection
    function FileSelectHandler(e) {

        // cancel event and hover styling
        FileDragHover(e);

        // fetch FileList object
        var files = e.target.files || e.dataTransfer.files;

        // process all File objects
        for (var i = 0, f; f = files[i]; i++) {
                ParseFile(f);
                UploadFile(f);
        }

    }


    // output file information
    function ParseFile(file) {

        Output(
            "<p>File information: <strong>" + file.name +
            "</strong> type: <strong>" + file.type +
            "</strong> size: <strong>" + file.size +
            "</strong> bytes</p>"
        );

        // display an image
        if (file.type.indexOf("image") == 0) {
            var reader = new FileReader();
            reader.onload = function(e) {
                    Output(
                            "<p><strong>" + file.name + ":</strong><br />" +
                            '<img src="' + e.target.result + '" /></p>'
                    );
            }
            reader.readAsDataURL(file);
        }

        // display text
        if (file.type.indexOf("text") == 0) {
            var reader = new FileReader();
            reader.onload = function(e) {
                    Output(
                            "<p><strong>" + file.name + ":</strong></p><pre>" +
                            e.target.result.replace(/</g, "&lt;").replace(/>/g, "&gt;") +
                            "</pre>"
                    );
            }
            reader.readAsText(file);
        }
    }


    // upload JPEG files
    function UploadFile(file) {
        console.log("uploaduju");
        console.log(file.type);
        // following line is not necessary: prevents running on SitePoint servers
        if (location.host.indexOf("sitepointstatic") >= 0) return

        var xhr = new XMLHttpRequest();
        
        var types = ["image/png", "image/jpeg"]
        
        if (xhr.upload && types.indexOf(file.type) != -1 && file.size <= $id("MAX_FILE_SIZE").value) {

            // create progress bar
            var o = $id("progress");
            var progress = o.appendChild(document.createElement("p"));
            progress.appendChild(document.createTextNode("upload " + file.name));


            // progress bar
            xhr.upload.addEventListener("progress", function(e) {
                var pc = parseInt(100 - (e.loaded / e.total * 100));
                console.log(pc);
                progress.style.backgroundPosition = pc + "% 0";
            }, false);

            // file received/failed
            xhr.onreadystatechange = function(e) {
                if (xhr.readyState == 4) {
                        progress.className = (xhr.status == 200 ? "success" : "failure");
                }
            };

            // start upload
            xhr.open("POST", uploadLink, true);
            xhr.setRequestHeader("X_FILENAME", file.name);
            xhr.send(file);
        }
    }


    // initialize
    function Init() {

        var filedrag = $id("upload-area");

        // is XHR2 available?
        var xhr = new XMLHttpRequest();
        if (xhr.upload) {
            // file drop
            //console.log(filedrag);
            filedrag.addEventListener("dragover", FileDragHover, false);
            filedrag.addEventListener("dragleave", FileDragHover, false);
            filedrag.addEventListener("drop", FileSelectHandler, false);
        }
    }

    // call initialization file
    if (window.File && window.FileList && window.FileReader) {
        Init();
    }

    $(document).ready(function() {
        window.addEventListener("paste", pasteEvent);
    });
    

    function pasteEvent(e) {
        console.log("vloženo");
        var item = e.clipboardData.items[0];
        UploadFile(item.getAsFile());
    }
    


})();
