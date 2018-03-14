function getType(item) {
    return Array.isArray(item) ? 'array' : typeof item;
}

function generateJsonSchemaFromJson(json) {
    if (getType(json) === 'object') {
        return {
            type: 'object',
            properties: Object.keys(json).reduce((obj, key) => {
                return Object.assign(obj, {
                    [key]: generateJsonSchemaFromJson(json[key])
                });
            }, {})
        }
    }

    if (getType(json) === 'array') {
        return {
            type: 'array',
            items: json[0] ? generateJsonSchemaFromJson(json[0]) : undefined
        }
    }

    return {
        type: getType(json)
    }
}
