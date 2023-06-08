export class Utility {
    public static isValidInstance(data: any) {
        return (data !== undefined && data !== null);
    }

    public static isValidObjectInstance(data: any) {
        return (data !== undefined && data !== null && Object.keys(data).length > 0);
    }

    public static isNotEmptyArray(data: any[]) {
        let isValid = this.isValidInstance(data);
        if (isValid) {
            isValid = data.length > 0;
        }

        return isValid;
    }

    public static isNonZeroNumber(data:any) {
        let isValid = this.isValidInstance(data);
        if (isValid) {
            isValid = data !== 0;
        }

        return isValid;
    }

    public static isNotEmptyString(data: any) {
        let isValid = this.isValidInstance(data);
        if (isValid) {
            isValid = data.toString().trim().length > 0;
        }
        return isValid;
    }

    public static isNotEmptyGuid(data: any) {
        const emptyGuid = '00000000-0000-0000-0000-000000000000';
        return data !== emptyGuid;
    }

    public static isImageDataUrl(data: string) {
        if (data !== undefined) {
            // tslint:disable-next-line:max-line-length
            const isDataURL = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;
            return !!data.match(isDataURL);
        }
    }

    public static isValidUrl(data: string) {
        // tslint:disable-next-line:max-line-length
        const urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
        return !!data.match(urlRegex);
    }

    public static formatDateTime(data: string) {
        const isValid = this.isNotEmptyString(data);
        if (isValid) {
            const localDateTime = new Date(data);
            return localDateTime.toLocaleString();
        }
        return data;
    }

    public static trimWhiteSpaces(data: string): string {
        const isValid = this.isNotEmptyString(data);
        if (isValid) {
            const trimmedData = data.replace(/\s/g, '');
            return trimmedData;
        }
        return data;
    }

    public static trimAndRemoveSpecialChars(data: string): string {
        const isValid = this.isNotEmptyString(data);
        if (isValid) {
            const trimmedData = data.replace(/\s/g, '').replace(/[`~!@#$%^&*()_|+\-=��?;:'",.<>\{\}\[\]\\\/]/gi, '');
            return trimmedData;
        }
        return data;
    }

    public static textifyData(data: string): string {
        const isValid = this.isNotEmptyString(data);
        if (isValid) {
            const textifiedData = data.replace(/&nbsp;/g, ' ').replace(/\r?\n|\r/g, ' ').replace(/\t/g, '').
                replace(/\s\s+/g, ' ').replace(/<br>/g, '\n');
            return textifiedData;
        }
        return data;
    }
}