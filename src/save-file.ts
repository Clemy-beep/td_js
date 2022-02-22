import { ServerResponse } from './serverResponse.js';

export class SaveFile {
    #fileList: Set<File>;
    #fileInput: HTMLInputElement | null;
    #authorized_format_file: string[];
    #formId: string;
    #formData: FormData;
    #btnId: string;
    #spinnerId: string;

    constructor(formId: string, fileField: HTMLInputElement | null, authorized_format_file: string[], btnId: string, spinnerId: string) {
        this.#fileList = new Set();
        this.#spinnerId = spinnerId;
        this.#btnId = btnId;
        this.#formData = new FormData();
        this.#formId = formId;
        this.#fileInput = fileField;
        this.#authorized_format_file = authorized_format_file;
    }

    listen(): this {
        this.#fileInput?.addEventListener('change', (): void => {
            this.#fileList.clear();
            if (this.#fileInput !== null && this.#fileInput.files !== null) {
                for (var i = 0; i < this.#fileInput.files.length; i++) {
                    if (!this.#authorized_format_file.includes(this.#fileInput.files[i]?.type)) {
                        alert(`You can only upload ${this.#authorized_format_file[0]} or ${this.#authorized_format_file[1]} files. The file ${this.#fileInput?.files[i]?.name} did not upload properly.`);
                        continue;
                    }
                    this.#fileList.add(this.#fileInput.files[i]);
                    console.log(`files : ${this.#fileList.size}`);
                }
            }
        });
        return this;
    }

    listenSubmitAndRun(): this {
        $(this.#formId).on('submit', (e: Event): void => {
            e.preventDefault();
            this.fetchSaveFiles();
        });
        return this;
    }

    private fetchSaveFiles(): Boolean | void {
        if (this.#fileList.size < 1) {
            alert("Add picture to upload");
            return false;
        }

        if (this.#fileList.size > 3) {
            alert("You can upload a maximum of 3 files.");
            return false;
        }
        this.#fileList.forEach((file: File): void => {
            this.saveFiles(file);
        });
    }

    private saveFiles(file: File) {
        this.#formData.set('file', file);
        this.#formData.set('file_name', file.name);
        $.ajax({
            type: "post",
            url: "/run.php",
            data: this.#formData,
            dataType: "text",
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: (): void => {
                $(this.#btnId).hide();
                $(this.#spinnerId).css("display", "block");
            },
            complete: (): void => {
                setTimeout(() => {
                    $(this.#spinnerId).hide();
                    $(this.#btnId).show();
                }, 2000);
            },
            success: (response: ServerResponse): void => {
                console.log(response);
                console.log(this.#formData.get('fileName'));
                setTimeout(function (): Boolean {
                    if (response.error !== undefined) {
                        console.log(response.error);
                        return false;
                    }
                    let message: string = response["0"]?.replace('[', '') ?? "empty response";
                    // if (message.includes('successfully')) $('#response').css('color', '#41cc81');
                    // if (message.includes('error')) $('#response').css('color', 'red');
                    $("#response").append(message);
                    return true;
                }, 2000);
            },
            error: (error: JQuery.jqXHR<any>): void => {
                console.log(error);
            },
        });
    }
}