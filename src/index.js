"use strict";
exports.__esModule = true;
var save_file_js_1 = require("./save-file.js");
new save_file_js_1.SaveFile("#form_control", document.getElementById('_files'), ["image/jpeg", "image/jpg"], '#btn', '#lds-dual-ring').listen().listenSubmitAndRun();
// saveFiles.listen();
// saveFiles.listenSubmitAndRun();
// $("#form_control").on('submit', (e: Event): void => {
//     e.preventDefault();
//     fectchSaveFiles();
// });
// var fileList: Set<any> = new Set();
// var fileInput: HTMLInputElement | null = <HTMLInputElement>document.getElementById('_files');
// var authorized_format_file: string[] = [
//     "image/jpeg",
//     "image/jpg"
// ];
// fileInput?.addEventListener('change', (): void => {
//     fileList.clear();
//     if (fileInput !== null && fileInput.files !== null) {
//         for (var i = 0; i < fileInput.files.length; i++) {
//             if (!authorized_format_file.includes(fileInput.files[i]?.type)) {
//                 alert(`You can only upload ${authorized_format_file[0]} or ${authorized_format_file[1]} files. The file ${fileInput?.files[i]?.name} did not upload properly.`);
//                 continue;
//             }
//             fileList.add(fileInput.files[i]);
//         }
//     }
// });
// function fectchSaveFiles(): Boolean | void {
//     if (fileList.size < 1) {
//         alert('Add a picture to upload');
//         return false;
//     }
//     if (fileList.size > 3) {
//         alert('You can upload a maximum of 3 files.');
//         return false;
//     }
//     fileList.forEach((file: File): void => {
//         saveFiles(file);
//     });
// }
// function saveFiles(file: File): void {
//     var formData: FormData = new FormData();
//     formData?.set('file', file);
//     formData?.set('file_name', file.name);
//     $.ajax({
//         type: "post",
//         url: "/run.php",
//         data: formData,
//         dataType: "text",
//         cache: false,
//         contentType: false,
//         processData: false,
//         beforeSend: (): void => {
//             $("#btn").hide();
//             $("#lds-dual-ring").css("display", "block");
//         },
//         complete: (): void => {
//             setTimeout(function () {
//                 $("#lds-dual-ring").hide();
//                 $("#btn").show();
//             }, 2000);
//         },
//         success: (response: ServerResponse): void => {
//             setTimeout(function (): Boolean {
//                 console.log(response);
//                 if (response.error !== undefined) {
//                     console.log(response.error);
//                     return false;
//                 }
//                 let message: string = response[0] ?? "empty response";
//                 if (message.includes('successfully')) $('#response').css('color', '#41cc81');
//                 if (message.includes('error')) $('#response').css('color', 'red');
//                 $("#response").append(message);
//                 return true;
//             }, 2000);
//         },
//         error: (error: JQuery.jqXHR<any>): void => {
//             console.log(error);
//         }
//     });
// }
// type ServerResponse = {
//     error?: string,
//     "0"?: string
// };
