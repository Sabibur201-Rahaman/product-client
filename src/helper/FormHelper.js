import toast from "react-hot-toast";
let EmailRegx = /\S+@\S+\.\S+/;
let MobileRegx = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[789]\d{9}$/;


class FormHelper {

    IsEmpty(value) {
        return value.length === 0;
    }

    IsMobile(value){
        return MobileRegx.test(value);
    }

    IsEmail(value) {
        return !EmailRegx.test(value);
    }

    ErrorToast(msg) {
        toast.error(msg, { position: "bottom-center" });
    }
    SuccessToast(msg) {
        toast.success(msg, { position: "bottom-center" });
    }


    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }


}

export const {
    IsEmpty,
    IsMobile,
    IsEmail,
    ErrorToast,
    getBase64,
    SuccessToast
} = new FormHelper();