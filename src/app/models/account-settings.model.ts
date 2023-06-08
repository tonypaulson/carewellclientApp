import { DayOffModel } from "./dayOff.model";
import { BusinessHourModel } from "./business-hour.model";

export class AccountSettingsModel {
  companyDetails: CompanyModel;
  businessHours: BusinessHourModel[];

  constructor() {
    this.companyDetails = new CompanyModel();
    this.businessHours = new Array<BusinessHourModel>();
  }
}
 
export class CompanyModel {
  id: number;
  companyTitle: string;
  companySubtitle: string;
  companyName: string;
  companyDescription: string;
  email: string;
  phone: string;
  companylogo: string;
  logo_CloudinaryPublicId: string;
  bannerImage: string;
  bannerImage_CloudinaryPublicId: string;
  website: string;
  address: string;
  city: string;
  zip: string;
  facebookURL: string;
  twitterURL: string;

  constructor() { }
}
