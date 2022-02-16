$("#form_control").on('submit', function(e) {
    e.preventDefault();
    fectchSaveFiles();
});

var fileList = [];
var fileInput = document.getElementById('_files');
fileInput.addEventListener('change', function() {
    fileList = [];
    for (var i = 0; i < fileInput.files.length; i++) {
        fileList.push(fileInput.files[i]);
    }
});

function fectchSaveFiles() {
    let authorized_format_file = [
        "image/jpeg",
        "image/jpg"
    ];
    if (fileList.length < 1) {
        alert('Add a picture to upload');
        return false;
    }
    if (fileList.length > 3) {
        alert('You can upload a maximum of 3 files.');
        return false;
    }

    let isImageFile = true;
    fileList.forEach(function(file) {
        if (authorized_format_file.includes(file.type)) {
            saveFiles(file);
        } else {
            alert('Authorized formats are jpeg & jpg only');
            isImageFile = false;
        }
    });
    return isImageFile;
}

function saveFiles(file) {
    var formData = new FormData();
    formData.set('file', file);
    formData.set('file_name', file.name);

    $.ajax({
        type: "post",
        url: "/run.php",
        data: formData,
        dataType: "text",
        cache: false,
        contentType: false,
        processData: false,
        success: function(response) {
            response = JSON.parse(response);
            if (response.error !== undefined) {
                return false;
            }
            let message = response[0] ? response[0] : "";
            $("#response").append(message);
        },
        error: function(error) {
            console.log(error);
        }
    });
}