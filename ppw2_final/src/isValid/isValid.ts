type validationType = {
    type: 'string' | 'number' | 'date' | 'stringArray';
    required?: boolean;
};

type definitionType = {
    [key: string]: validationType;
};

export default function isValid(definition: definitionType, body: Object) {
    try {
        verifyBodyFieldsInDefinition(body, definition);
        verifyDefinitionFieldsInBody(definition, body);
        Object.entries(definition).forEach(defitionField => {
            const [key, validation] = defitionField;
            const bodyField = body[key];
            if (!validation.required && !bodyField) return;
            if (!bodyField) throw new Error();
            switch (validation.type) {
                case 'string':
                    return validateStringField(bodyField);
                case 'number':
                    return validateNumberField(bodyField);
                case 'date':
                    return validateDateField(bodyField);
                case 'stringArray':
                    validateStringArrayField(bodyField);
                    break;
            }
        });
    } catch {
        return false;
    }
    return true;
}

function verifyBodyFieldsInDefinition(
    body: Object,
    definition: definitionType
) {
    if (!body) return;
    Object.keys(body).forEach(bodyField => {
        if (!definition[bodyField]) throw new Error();
    });
}

function verifyDefinitionFieldsInBody(
    definition: definitionType,
    body: Object
) {
    Object.entries(definition).forEach(defitionField => {
        const [key, value] = defitionField;
        if (!body[key] && value.required) throw new Error();
    });
}

function validateStringField(field) {
    if (typeof field !== 'string') throw new Error();
    if (!field.length) throw new Error();
}

function validateNumberField(field) {
    if (typeof field !== 'number') throw new Error();
    if (!(field > 0)) throw new Error();
}

function validateDateField(field) {
    if (!(field instanceof Date)) throw new Error();
    if (field.getTime() < 0) throw new Error();
}

function validateStringArrayField(field) {
    if (!Array.isArray(field)) throw new Error();
    if (!field.length) throw new Error();
}
