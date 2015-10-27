import ajv from "ajv";

export default function assertSchema (schema) {
    const validate = ajv().compile(schema);
    return function (data) {
        if (!validate(data)) {
            throw new Error(validate.errors);
        } else {
            return data;
        }
    };
}
