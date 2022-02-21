import jQuery from 'jquery';

declare global {
    interface Window {
        jQuery: typeof jQuery;
        $: typeof jQuery;
    }
}

$("#form_control").on('submit', (e: Event): void => {
    e.preventDefault();
    fectchSaveFiles();
});

var fileList: Set<any> = new Set();
var fileInput: HTMLInputElement | null = <HTMLInputElement>document.getElementById('_files');
var authorized_format_file: string[] = [
    "image/jpeg",
    "image/jpg"
];
fileInput?.addEventListener('change', (): void => {
    fileList.clear();
    if (fileInput !== null && fileInput.files !== null) {
        for (var i = 0; i < fileInput.files.length; i++) {
            if (!authorized_format_file.includes(fileInput.files[i]?.type)) {
                alert(`You can only upload ${authorized_format_file[0]} or ${authorized_format_file[1]} files. The file ${fileInput?.files[i]?.name} did not upload properly.`);
                continue;
            }
            fileList.add(fileInput.files[i]);
        }
    }
});

function fectchSaveFiles(): Boolean {

    if (fileList.size < 1) {
        alert('Add a picture to upload');
        return false;
    }
    if (fileList.size > 3) {
        alert('You can upload a maximum of 3 files.');
        return false;
    }

    let isImageFile: Boolean = true;
    fileList.forEach((file): void => {
        if (authorized_format_file.includes(file.type)) {
            saveFiles(file);
        } else {
            alert('Authorized formats are jpeg & jpg only');
            isImageFile = false;
        }
    });
    return isImageFile;
}

function saveFiles(file: any): void {
    var formData: FormData = new FormData();
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
        beforeSend: (): void => {
            $("#btn").hide();
            $("#lds-dual-ring").css("display", "block");
        },
        complete: (): void => {
            setTimeout(function () {
                $("#lds-dual-ring").hide();
                $("#btn").show();
            }, 2000);
        },
        success: (response): void => {
            setTimeout(function (): Boolean {
                console.log(response);
                response = JSON.parse(response);
                if (response.error !== undefined) {
                    console.log(response.error);
                    return false;
                }
                let message: string = response[0] ? response[0] : "";
                if (message.includes('successfully')) $('#response').css('color', '#41cc81');
                if (message.includes('error')) $('#response').css('color', 'red');
                $("#response").append(message);
                return true;
            }, 2000);
        },
        error: (error): void => {
            console.log(error);
        }
    });
}