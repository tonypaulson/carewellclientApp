import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'grdFilter'
})
export class GrdFilterPipe implements PipeTransform {
    transform(items?: any, filter?: any, defaultFilter?: boolean): any {
        if (!filter) {
            return items;
        }

        if (!Array.isArray(items)) {
            return items;
        }

        if (filter && Array.isArray(items)) {
            let filterKeys = Object.keys(filter);

            Object.keys(filter).forEach(function (key) {
                if (filter[key] !== undefined) {
                    filter[key] = (filter[key] as string).trim();
                }
            });

            if (defaultFilter) {
                return items.filter(item =>
                    filterKeys.reduce((x, keyName) =>
                        (x && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] == "", true));
            }
            else {
                return items.filter(item => {
                    return filterKeys.some((keyName) => {
                        return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] == "";
                    });
                });
            }
        }
    }
}