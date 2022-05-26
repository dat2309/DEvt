const validate = {
    usernameValidate: (username) => {
        const patterUsername = /^[a-z]\w{6,}$/;
        if (username.match(patterUsername)) {
            return true;
        }
        return "Username must be at least 7 characters include lowercase and number";
    },

    passwordValidate: (password) => {
        const patternPassword = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/;
        if (password.match(patternPassword)) {
            return true;
        }
        return "Password must be at least 8 characters, include one letter and one number";
    },
    emailValidate: (email) => {
        const patternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.match(patternEmail)) {
            return true;
        }
        return "Email has wrong format";
    },
    nameValidate: (name) => {
        const patternName = /^[A-Z][a-z]*$/;
        if (name.match(patternName)) {
            return true;
        }
        return "Name has wrong format";
    },
    addressValidate: (address) => {
        const patternAddress = /^[A-Z][a-z]*(\s[A-z][a-z]*)*/;

        const street = address.street;
        const province = address.province;
        const ward = address.ward;
        const district = address.district;

        if (street.match(patternAddress) && province.match(patternAddress)) {
            if (ward.length > 3 && ward.match(patternAddress)) {
                return true;
            }
            return true;
        }
        return "Address has wrong format";
    },
};

export default validate;
