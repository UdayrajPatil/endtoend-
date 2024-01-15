const criteriaConfiguration = {
    Min5Chars: {
        regex: /.{5,}/,
        errorMsg: "Should Min 5 chars",
    },
    Exact10Digits: {
        regex: /^[0-9]{10}$/,
        errorMsg: "Exactly 10 digits",
    },
    OnlyAlpha: {
        regex: /^[a-zA-Z]+$/,
        errorMsg: "Alphabets Only",
    },
    EmailFormat: {
        regex: /^[a-zA-Z][a-zA-Z0-9_$\.]*@[a-zA-Z]{2,5}\.[a-z]{2,3}$/,
        errorMsg: "Should be in the Email format",
    },
    OnlyDigits: {
        regex: /^[0-9]+$/,
        errorMsg: "Enter Digits Only",
    },
    SpecialCharsNotAllowed: {
        regex: /^[a-zA-Z0-9]+$/,
        errorMsg: "Special Chars not allowed",
    },
    SholdNotAllowSpaces: {
        regex: /^\S*$/,
        errorMsg: "Should not allow spaces",
    },
    Required: {
        regex: /./,
        errorMsg: "Required!!!",
    },
    Password: {
        regex: /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/,
        errorMsg: "Min 8 chars(min 1L,1U,1S,1D)",
    },
};

const validate = (inputControlObj) => {
    const { value, criteria } = inputControlObj;
    console.log(criteria);
    for (let i = 0; i < criteria.length; i++) {
        const { regex, errorMsg } = criteriaConfiguration[criteria[i]]
        if (!regex.test(value)) {
            inputControlObj.errMsg = errorMsg;
            break;
        }
    }
}

export const fnFieldValidation = (eve, inputControls) => {
    const { name, value, type, checked } = eve.target;
    const clonedInputControls = JSON.parse(JSON.stringify(inputControls));
    const inputControlObj = clonedInputControls.find((obj) => {
        return obj.name === name
    })
    inputControlObj.errMsg = "";
    if (type === 'checkbox') {
        const chekedValues = inputControlObj.value ? inputControlObj.value.split(",") : [];
        if (checked) {
            chekedValues.push(value)
        } else {
            const index = chekedValues.indexOf(value);
            chekedValues.splice(index, 1);
        }
        inputControlObj.value = chekedValues.join(',')
    } else {
        inputControlObj.value = value;
    }
    validate(inputControlObj);
    return clonedInputControls;
}

export const fnFormValidation = (inputControls) => {
    const dataObj = {};
    const clonedInputControls = JSON.parse(JSON.stringify(inputControls));
    clonedInputControls.forEach((inputControlObj) => {
        dataObj[inputControlObj.name] = inputControlObj.value;
        validate(inputControlObj);
    })
    const isFormInValid = clonedInputControls.some((obj) => {
        return obj.errMsg != ""
    })
    return [isFormInValid, dataObj, clonedInputControls]
}

export const fnReset = (inputControls) => {
    const clonedInputControls = JSON.parse(JSON.stringify(inputControls));
    clonedInputControls.forEach((inputControlObj) => {
        inputControlObj.errMsg = "";
        inputControlObj.value = "";
    })
    return clonedInputControls
}

