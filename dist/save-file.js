var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SaveFile_fileList, _SaveFile_fileInput, _SaveFile_authorized_format_file, _SaveFile_formId, _SaveFile_formData, _SaveFile_btnId, _SaveFile_spinnerId;
export class SaveFile {
    constructor(formId, fileField, authorized_format_file, btnId, spinnerId) {
        _SaveFile_fileList.set(this, void 0);
        _SaveFile_fileInput.set(this, void 0);
        _SaveFile_authorized_format_file.set(this, void 0);
        _SaveFile_formId.set(this, void 0);
        _SaveFile_formData.set(this, void 0);
        _SaveFile_btnId.set(this, void 0);
        _SaveFile_spinnerId.set(this, void 0);
        __classPrivateFieldSet(this, _SaveFile_fileList, new Set(), "f");
        __classPrivateFieldSet(this, _SaveFile_spinnerId, spinnerId, "f");
        __classPrivateFieldSet(this, _SaveFile_btnId, btnId, "f");
        __classPrivateFieldSet(this, _SaveFile_formData, new FormData(), "f");
        __classPrivateFieldSet(this, _SaveFile_formId, formId, "f");
        __classPrivateFieldSet(this, _SaveFile_fileInput, fileField, "f");
        __classPrivateFieldSet(this, _SaveFile_authorized_format_file, authorized_format_file, "f");
    }
    listen() {
        __classPrivateFieldGet(this, _SaveFile_fileInput, "f")?.addEventListener('change', () => {
            __classPrivateFieldGet(this, _SaveFile_fileList, "f").clear();
            if (__classPrivateFieldGet(this, _SaveFile_fileInput, "f") !== null && __classPrivateFieldGet(this, _SaveFile_fileInput, "f").files !== null) {
                for (var i = 0; i < __classPrivateFieldGet(this, _SaveFile_fileInput, "f").files.length; i++) {
                    if (!__classPrivateFieldGet(this, _SaveFile_authorized_format_file, "f").includes(__classPrivateFieldGet(this, _SaveFile_fileInput, "f").files[i]?.type)) {
                        alert(`You can only upload ${__classPrivateFieldGet(this, _SaveFile_authorized_format_file, "f")[0]} or ${__classPrivateFieldGet(this, _SaveFile_authorized_format_file, "f")[1]} files. The file ${__classPrivateFieldGet(this, _SaveFile_fileInput, "f")?.files[i]?.name} did not upload properly.`);
                        continue;
                    }
                    __classPrivateFieldGet(this, _SaveFile_fileList, "f").add(__classPrivateFieldGet(this, _SaveFile_fileInput, "f").files[i]);
                    console.log(`files : ${__classPrivateFieldGet(this, _SaveFile_fileList, "f").size}`);
                }
            }
        });
        return __classPrivateFieldGet(this, _SaveFile_fileList, "f");
    }
    listenSubmitAndRun() {
        $(__classPrivateFieldGet(this, _SaveFile_formId, "f")).on('submit', (e) => {
            e.preventDefault();
            this.fetchSaveFiles();
        });
        return this;
    }
    fetchSaveFiles() {
        if (__classPrivateFieldGet(this, _SaveFile_fileList, "f").size < 1) {
            alert("Add picture to upload");
            return false;
        }
        if (__classPrivateFieldGet(this, _SaveFile_fileList, "f").size > 3) {
            alert("You can upload a maximum of 3 files.");
            return false;
        }
        __classPrivateFieldGet(this, _SaveFile_fileList, "f").forEach((file) => {
            this.saveFiles(file);
        });
    }
    saveFiles(file) {
        __classPrivateFieldGet(this, _SaveFile_formData, "f").set('file', file);
        __classPrivateFieldGet(this, _SaveFile_formData, "f").set('fileName', file.name);
        $.ajax({
            type: "post",
            url: "/run.php",
            data: __classPrivateFieldGet(this, _SaveFile_formData, "f"),
            dataType: "text",
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: () => {
                $(__classPrivateFieldGet(this, _SaveFile_btnId, "f")).hide();
                $(__classPrivateFieldGet(this, _SaveFile_spinnerId, "f")).css("display", "block");
            },
            complete: () => {
                setTimeout(() => {
                    $(__classPrivateFieldGet(this, _SaveFile_spinnerId, "f")).hide();
                    $(__classPrivateFieldGet(this, _SaveFile_btnId, "f")).show();
                }, 2000);
            },
            success: (response) => {
                console.log(response);
                console.log(__classPrivateFieldGet(this, _SaveFile_formData, "f").get('fileName'));
                setTimeout(function () {
                    if (response.error !== undefined) {
                        console.log(response.error);
                        return false;
                    }
                    let message = response[0] ?? "empty response";
                    if (message.includes('successfully'))
                        $('#response').css('color', '#41cc81');
                    if (message.includes('error'))
                        $('#response').css('color', 'red');
                    $("#response").append(message);
                    return true;
                }, 2000);
            },
            error: (error) => {
                console.log(error);
            },
        });
    }
}
_SaveFile_fileList = new WeakMap(), _SaveFile_fileInput = new WeakMap(), _SaveFile_authorized_format_file = new WeakMap(), _SaveFile_formId = new WeakMap(), _SaveFile_formData = new WeakMap(), _SaveFile_btnId = new WeakMap(), _SaveFile_spinnerId = new WeakMap();
//# sourceMappingURL=save-file.js.map