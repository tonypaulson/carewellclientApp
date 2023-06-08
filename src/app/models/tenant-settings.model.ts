import { User } from '../core/models/user.model';

export class TenantSettingsModel {
    id: number | undefined;
    tenantName: string | undefined;
    tenantSubDomain: string | undefined;
    tenantPrimaryContact: string | undefined;
    logo: string | undefined;
    currencyUnitId: number | undefined;
    weekStartId: number | undefined;
    calenderViewId: number | undefined;
    admin: User | undefined;
}